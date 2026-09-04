import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';
import './Galaxy.css';

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uGlowTightness;
uniform float uGlowCap;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uFocusStrength;
uniform float uDepthFocus;
uniform float uFieldOpacity;
uniform float uAutoCenterRepulsion;
uniform bool uTransparent;
uniform float uLightMode;

varying vec2 vUv;

#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float tri(float x) {
  return abs(fract(x) * 2.0 - 1.0);
}

float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float Star(vec2 uv, float flare) {
  // Avoid an unbounded hotspot at the exact star centre. WebKit is more
  // prone to spreading that saturated pixel during canvas compositing.
  float d = max(length(uv), 0.0005);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);

  vec2 gv = fract(uv) - 0.5; 
  vec2 id = floor(uv);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + vec2(float(x), float(y));
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;

      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);
      
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));

      vec2 pad = vec2(tris(seed * 34.0 + uTime / 10.0), tris(seed * 38.0 + uTime / 30.0)) - 0.5;

      float star = Star(gv - offset - pad, flareSize);
      vec3 color = base;

      float twinkle = trisn(uTime + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;
      
      col += star * size * color;
    }
  }

  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

  vec2 mouseNorm = uMouse - vec2(0.5);
  
  if (uAutoCenterRepulsion > 0.0) {
    vec2 centerUV = vec2(0.0, 0.0);
    float centerDist = length(uv - centerUV);
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
    uv += repulsion * 0.05;
  } else if (uMouseRepulsion) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    float mouseDist = length(uv - mousePosUV);
    vec2 mouseDirection = mouseDist > 0.0001 ? normalize(uv - mousePosUV) : vec2(0.0);
    float localFocus = exp(-mouseDist * mouseDist * 22.0) * uMouseActiveFactor;
    vec2 repulsion = mouseDirection * (uRepulsionStrength / (mouseDist + 0.18));
    uv += repulsion * 0.012 * localFocus;
    uv += mouseDirection * uFocusStrength * 0.048 * localFocus;
  } else {
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
    uv += mouseOffset;
  }

  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;

  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

  vec3 col = vec3(0.0);

  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    vec2 layerOffset = vec2(i * 453.32);
    vec3 stars = StarLayer(uv * scale + layerOffset);
    // A second, radially offset sample creates a short forward-depth trace
    // around the focal point without translating or shaking the camera.
    vec3 depthTrace = StarLayer(uv * scale * (1.0 - 0.034 * uDepthFocus) + layerOffset);
    col += (stars + depthTrace * (0.62 * uDepthFocus)) * fade;
  }

  col *= uFieldOpacity;
  // Apply the Safari halo correction once per pixel rather than inside every
  // star sample, keeping the shader cost effectively unchanged.
  float haloMask = smoothstep(0.015, 0.16, length(col));
  col *= mix(1.0, haloMask, uGlowTightness);
  col = min(col, vec3(uGlowCap));

  if (uLightMode > 0.5) {
    float energy = max(max(col.r, col.g), col.b);
    float coverage = clamp(smoothstep(0.0, 0.42, energy) * 0.92, 0.0, 0.92);
    vec3 ink = clamp(col * 0.48, 0.0, 0.82);
    gl_FragColor = vec4(mix(vec3(1.0), ink, coverage), 1.0);
  } else if (uTransparent) {
    float alpha = length(col);
    alpha = smoothstep(0.0, 0.3, alpha);
    alpha = min(alpha, 1.0);
    gl_FragColor = vec4(col, alpha);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`;

export default function Galaxy({
  focal = [0.5, 0.5],
  rotation = [1.0, 0.0],
  starSpeed = 0.5,
  density = 1,
  hueShift = 140,
  disableAnimation = false,
  speed = 1.0,
  mouseInteraction = true,
  glowIntensity = 0.3,
  saturation = 0.0,
  mouseRepulsion = true,
  repulsionStrength = 2,
  twinkleIntensity = 0.3,
  rotationSpeed = 0.1,
  autoCenterRepulsion = 0,
  transparent = true,
  lightMode = false,
  interactionTargetRef,
  sceneStateRef,
  ...rest
}) {
  const ctnDom = useRef(null);
  const targetMousePos = useRef({ x: 0.5, y: 0.5 });
  const smoothMousePos = useRef({ x: 0.5, y: 0.5 });
  const targetMouseActive = useRef(0.0);
  const smoothMouseActive = useRef(0.0);

  useEffect(() => {
    if (!ctnDom.current) return;
    const ctn = ctnDom.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldAnimate = !disableAnimation && !reduceMotion;
    const isSafari = /^((?!chrome|crios|android).)*safari/i.test(navigator.userAgent);
    const safariGlowScale = isSafari ? 0.78 : 1;
    const safariDepthScale = isSafari ? 0.82 : 1;
    const renderer = new Renderer({
      alpha: transparent,
      depth: false,
      stencil: false,
      antialias: false,
      premultipliedAlpha: false,
      dpr: 1
    });
    const gl = renderer.gl;

    // Keep the drawing buffer in the same colour space on Safari and Chromium.
    try {
      if ('drawingBufferColorSpace' in gl) gl.drawingBufferColorSpace = 'srgb';
    } catch {
      // Older WebGL implementations expose no writable colour-space control.
    }

    if (lightMode) {
      gl.clearColor(1, 1, 1, 1);
    } else if (transparent) {
      // The fullscreen shader replaces every pixel. Internal blending is not
      // needed; the browser compositor handles this straight-alpha canvas.
      gl.disable(gl.BLEND);
      gl.clearColor(0, 0, 0, 0);
    } else {
      gl.clearColor(0, 0, 0, 1);
    }

    let program;

    function resize() {
      const scale = 1;
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
      if (program) {
        program.uniforms.uResolution.value = new Color(
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height
        );
      }
    }
    window.addEventListener('resize', resize, false);
    resize();

    const geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
        },
        uFocal: { value: new Float32Array(focal) },
        uRotation: { value: new Float32Array(rotation) },
        uStarSpeed: { value: starSpeed },
        uDensity: { value: density },
        uHueShift: { value: hueShift },
        uSpeed: { value: speed },
        uMouse: {
          value: new Float32Array([smoothMousePos.current.x, smoothMousePos.current.y])
        },
        uGlowIntensity: { value: glowIntensity * safariGlowScale },
        uGlowTightness: { value: isSafari ? 0.38 : 0.0 },
        uGlowCap: { value: isSafari ? 1.05 : 8.0 },
        uSaturation: { value: saturation },
        uMouseRepulsion: { value: mouseRepulsion },
        uTwinkleIntensity: { value: twinkleIntensity },
        uRotationSpeed: { value: rotationSpeed },
        uRepulsionStrength: { value: repulsionStrength },
        uMouseActiveFactor: { value: 0.0 },
        uFocusStrength: { value: 0.18 },
        uDepthFocus: { value: 0.0 },
        uFieldOpacity: { value: 1.0 },
        uAutoCenterRepulsion: { value: autoCenterRepulsion },
        uTransparent: { value: transparent },
        uLightMode: { value: lightMode ? 1 : 0 }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    let animateId;
    let isRunning = false;
    let isInViewport = false;
    let lastFrameTime = 0;
    let travelDepth = 0;
    let animationTime = 0;
    const smoothScene = {
      speed,
      starSpeed,
      density,
      glowIntensity,
      mouseInfluence: 0.34,
      focusStrength: 0.18,
      depthFocus: 0,
      fieldOpacity: 1
    };

    function update(t) {
      if (shouldAnimate && isRunning) animateId = requestAnimationFrame(update);
      const requestedScene = sceneStateRef?.current || {};
      const hoverSpeed = requestedScene.hoverSpeed || 0;
      const hoverStrength = requestedScene.hoverStrength || 0;
      const sceneLerp = 0.065;
      smoothScene.speed += ((requestedScene.speed ?? speed) + hoverSpeed - smoothScene.speed) * sceneLerp;
      smoothScene.starSpeed += ((requestedScene.starSpeed ?? starSpeed) - smoothScene.starSpeed) * sceneLerp;
      smoothScene.density += ((requestedScene.density ?? density) - smoothScene.density) * sceneLerp;
      smoothScene.glowIntensity += ((requestedScene.glowIntensity ?? glowIntensity) - smoothScene.glowIntensity) * sceneLerp;
      smoothScene.mouseInfluence += ((requestedScene.mouseInfluence ?? 0.34) - smoothScene.mouseInfluence) * sceneLerp;
      smoothScene.focusStrength += ((requestedScene.focusStrength ?? 0.18) + hoverStrength - smoothScene.focusStrength) * sceneLerp;
      smoothScene.depthFocus += ((requestedScene.depthFocus ?? 0) - smoothScene.depthFocus) * sceneLerp;
      smoothScene.fieldOpacity += ((requestedScene.fieldOpacity ?? 1) - smoothScene.fieldOpacity) * sceneLerp;

      const frameTime = t * 0.001;
      const deltaTime = lastFrameTime === 0 ? 0 : Math.min(0.05, Math.max(0, frameTime - lastFrameTime));
      lastFrameTime = frameTime;
      animationTime += deltaTime * smoothScene.speed;
      travelDepth += deltaTime * smoothScene.starSpeed * 0.1;
      program.uniforms.uTime.value = animationTime;
      program.uniforms.uStarSpeed.value = travelDepth;
      // Keep shader phase continuous when the high-level scene speed changes.
      // Multiplying absolute time by a changing speed caused visible reversals.
      program.uniforms.uSpeed.value = 1;
      program.uniforms.uDensity.value = smoothScene.density;
      program.uniforms.uGlowIntensity.value = smoothScene.glowIntensity * safariGlowScale;
      program.uniforms.uFocusStrength.value = smoothScene.focusStrength;
      program.uniforms.uDepthFocus.value = smoothScene.depthFocus * safariDepthScale;
      program.uniforms.uFieldOpacity.value = smoothScene.fieldOpacity;

      const lerpFactor = 0.05;
      smoothMousePos.current.x += (targetMousePos.current.x - smoothMousePos.current.x) * lerpFactor;
      smoothMousePos.current.y += (targetMousePos.current.y - smoothMousePos.current.y) * lerpFactor;

      smoothMouseActive.current += (targetMouseActive.current - smoothMouseActive.current) * lerpFactor;

      program.uniforms.uMouse.value[0] = smoothMousePos.current.x;
      program.uniforms.uMouse.value[1] = smoothMousePos.current.y;
      program.uniforms.uMouseActiveFactor.value = smoothMouseActive.current * smoothScene.mouseInfluence;

      renderer.render({ scene: mesh });
    }

    function start() {
      if (!shouldAnimate || isRunning || !isInViewport || document.hidden) return;
      isRunning = true;
      lastFrameTime = 0;
      animateId = requestAnimationFrame(update);
    }

    function stop() {
      isRunning = false;
      cancelAnimationFrame(animateId);
    }

    ctn.appendChild(gl.canvas);
    update(0);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isInViewport = entry.isIntersecting;
      if (isInViewport) start();
      else stop();
    });
    visibilityObserver.observe(ctn);

    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const interactionTarget = interactionTargetRef?.current || ctn;

    function handleMouseMove(e) {
      const rect = ctn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      targetMousePos.current = { x, y };
      targetMouseActive.current = 1.0;
    }

    function handleMouseLeave() {
      targetMouseActive.current = 0.0;
    }

    if (mouseInteraction && !reduceMotion) {
      interactionTarget.addEventListener('pointermove', handleMouseMove, { passive: true });
      interactionTarget.addEventListener('pointerleave', handleMouseLeave);
    }

    return () => {
      stop();
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', resize);
      if (mouseInteraction && !reduceMotion) {
        interactionTarget.removeEventListener('pointermove', handleMouseMove);
        interactionTarget.removeEventListener('pointerleave', handleMouseLeave);
      }
      if (gl.canvas.parentNode === ctn) ctn.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [
    focal,
    rotation,
    starSpeed,
    density,
    hueShift,
    disableAnimation,
    speed,
    mouseInteraction,
    glowIntensity,
    saturation,
    mouseRepulsion,
    twinkleIntensity,
    rotationSpeed,
    repulsionStrength,
    autoCenterRepulsion,
    transparent,
    lightMode,
    interactionTargetRef,
    sceneStateRef
  ]);

  return <div ref={ctnDom} className="galaxy-container" {...rest} />;
}
