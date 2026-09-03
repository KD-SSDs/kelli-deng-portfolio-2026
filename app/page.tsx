"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Galaxy from "../components/Galaxy";
import DriftWall from "../components/DriftWall";
import ScrollReveal from "../components/ScrollReveal";
import { Footer, GlobalNav } from "./components/PortfolioShell";

const selectedWork = [
  { number: "01", title: "副屏产品线 CMF 策略 & 主力机开发", english: "Value-Tier Product Portfolio Strategy", subtitle: "Strategy & Portfolio", href: "/work/value-tier-portfolio", image: "/assets-owner/project-01-preview.png" },
  { number: "02", title: "A200 Series Product Storytelling & GTM", english: "Product Storytelling & GTM", subtitle: "旗舰视觉转译", href: "/work/a200", image: "/assets-owner/project-02-preview.png" },
  { number: "03", title: "A200s Series Agile CMF Upgrade", english: "Agile CMF Upgrade", subtitle: "敏捷CMF升级", href: "/work/a200#a200s", image: "/assets-owner/project-03-preview.png" },
  { number: "04", title: "P90 ✕ GenAI N+1 设计语言", english: "GenAI-assisted Next-gen Exploration", subtitle: "时尚轻三防新航道设计语言迭代", href: "/work/genai-next-gen", image: "/assets-owner/project-04-preview.png" },
];

const motionItems = Array.from({ length: 15 }, (_, index) =>
  ({
    image: `/assets-owner/item${String(index + 1).padStart(2, "0")}.png`,
    title: `Project archive image ${String(index + 1).padStart(2, "0")}`,
  })
);

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);
  const heroSceneRef = useRef<HTMLElement>(null);
  const galaxyStateRef = useRef({
    speed: 0.28,
    starSpeed: 0.3,
    density: 1.38,
    glowIntensity: 0.24,
    mouseInfluence: 0.26,
    focusStrength: 0.12,
    depthFocus: 0,
    fieldOpacity: 0.92,
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const context = gsap.context(() => {
      mm.add({
        motionOK: "(prefers-reduced-motion: no-preference)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
        desktop: "(min-width: 801px)",
      }, (media) => {
        const { motionOK, reduceMotion, desktop } = media.conditions as Record<string, boolean>;
        const scene = galaxyStateRef.current;

        if (reduceMotion) {
          Object.assign(scene, { speed: 0.12, starSpeed: 0.16, density: 1.08, glowIntensity: 0.18, mouseInfluence: 0, focusStrength: 0, depthFocus: 0, fieldOpacity: 0.78 });
          gsap.set([".home-identity-item", ".home-belief-heading", ".home-principle", ".home-principle .word"], { autoAlpha: 1, y: 0, scale: 1, filter: "none" });
          gsap.set(".home-spatial-track", { yPercent: 0 });
        } else if (motionOK) {
          gsap.set([".home-identity-item", ".home-belief-heading"], { autoAlpha: 0 });
          gsap.set(".home-principle", { autoAlpha: 0, y: 0, clipPath: "inset(0% 0% 0% 0%)" });
          gsap.set(".home-principle .word", { autoAlpha: 0.08, y: 22, filter: "blur(4px)" });
          gsap.set(".home-drift-wall-inner", { autoAlpha: 0.55, scale: 0.985, transformOrigin: "50% 0%" });

          gsap.timeline({ defaults: { ease: "power3.out" } })
            .fromTo(".home-identity-item", { autoAlpha: 0, y: 18, filter: "blur(8px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.86, stagger: 0.11, clearProps: "filter" });

          const heroTimeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: ".home-hero-sequence",
              start: "top top",
              end: desktop ? "+=430%" : "+=385%",
              pin: ".home-hero-sequence",
              scrub: 1.15,
              anticipatePin: 1,
            },
          });

          heroTimeline
            .addLabel("belief", 0.42)
            .to(".home-belief-heading", { autoAlpha: 1, duration: 0.3 }, "belief")
            .addLabel("principle-one", 0.82)
            .to(".home-principle-1", { autoAlpha: 1, duration: 0.12 }, "principle-one")
            .to(".home-principle-1 .word", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.46, stagger: 0.055 }, "principle-one")
            .to(scene, { speed: 0.48, starSpeed: 0.56, glowIntensity: 0.29, mouseInfluence: 0, focusStrength: 0, depthFocus: 0.86, duration: 0.5 }, "principle-one")
            .addLabel("one-settle", 1.42)
            .to(scene, { speed: 0.26, starSpeed: 0.27, density: 1.38, glowIntensity: 0.23, mouseInfluence: 0.28, focusStrength: 0.15, depthFocus: 0, duration: 0.32 }, "one-settle")
            .addLabel("one-exit", 1.88)
            .to(".home-principle-1", { autoAlpha: 0, y: -36, scale: 0.97, clipPath: "inset(100% 0% 0% 0%)", filter: "blur(5px)", duration: 0.52 }, "one-exit")
            .to(scene, { speed: 0.48, starSpeed: 0.56, glowIntensity: 0.29, mouseInfluence: 0, focusStrength: 0, depthFocus: 0.86, duration: 0.5 }, "one-exit")
            .to(scene, { speed: 0.26, starSpeed: 0.27, density: 1.38, glowIntensity: 0.23, mouseInfluence: 0.28, focusStrength: 0.15, depthFocus: 0, duration: 0.28 }, "one-exit+=0.54")
            .addLabel("principle-two", 2.62)
            .to(".home-principle-2", { autoAlpha: 1, duration: 0.12 }, "principle-two")
            .to(".home-principle-2 .word", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.46, stagger: 0.055 }, "principle-two")
            .to(scene, { speed: 0.48, starSpeed: 0.56, glowIntensity: 0.29, mouseInfluence: 0, focusStrength: 0, depthFocus: 0.86, duration: 0.5 }, "principle-two")
            .addLabel("two-settle", 3.22)
            .to(scene, { speed: 0.27, starSpeed: 0.28, density: 1.38, glowIntensity: 0.23, mouseInfluence: 0.28, focusStrength: 0.15, depthFocus: 0, duration: 0.3 }, "two-settle")
            .addLabel("two-exit", 3.66)
            .to(".home-principle-2", { autoAlpha: 0, y: -36, scale: 0.97, clipPath: "inset(100% 0% 0% 0%)", filter: "blur(5px)", duration: 0.5 }, "two-exit")
            .to(scene, { speed: 0.48, starSpeed: 0.56, glowIntensity: 0.29, mouseInfluence: 0, focusStrength: 0, depthFocus: 0.86, duration: 0.48 }, "two-exit")
            .addLabel("calm", 4.2)
            .to(scene, { speed: 0.26, starSpeed: 0.27, density: 1.38, glowIntensity: 0.23, mouseInfluence: 0.28, focusStrength: 0.15, depthFocus: 0, duration: 0.34 }, "calm")
            .addLabel("handoff", 4.64)
            .to([".home-identity", ".home-belief-heading"], { autoAlpha: 0, y: -18, duration: 0.34 }, "handoff")
            .to(scene, { speed: 0.33, starSpeed: 0.32, density: 1.02, glowIntensity: 0.2, mouseInfluence: 0.02, focusStrength: 0.02, depthFocus: 0, fieldOpacity: 0.58, duration: 0.82 }, "handoff")
            .to(".home-spatial-track", { yPercent: -56.5217, duration: 1.2 }, "handoff")
            .to(".home-drift-wall-inner", { autoAlpha: 1, scale: 1, duration: 0.96 }, "handoff+=0.16")
            .to(".home-galaxy-stage", { autoAlpha: 0, duration: 0.26 }, "handoff+=0.94");

        gsap.utils.toArray<HTMLElement>(".home-project-preview").forEach((project) => {
          const heading = project.querySelector(".home-project-heading");
          const media = project.querySelector(".home-project-media");
          const image = project.querySelector(".home-project-media img");
          gsap.timeline({ scrollTrigger: { trigger: project, start: "top 78%", end: "top 28%", scrub: 0.75 } })
            .fromTo(heading, { y: 34, autoAlpha: 0.3 }, { y: 0, autoAlpha: 1, ease: "none" }, 0)
            .fromTo(media, { y: 42, autoAlpha: 0.35 }, { y: 0, autoAlpha: 1, ease: "none" }, 0)
            .fromTo(image, { scale: 1.025 }, { scale: 1, ease: "none" }, 0);
        });

          gsap.timeline({ scrollTrigger: { trigger: ".home-approach-preview", start: "top 72%", toggleActions: "play none none reverse" }, defaults: { ease: "power3.out" } })
            .fromTo([".home-preview-heading", ".home-approach-copy"], { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.66, stagger: 0.09 })
            .fromTo(".home-approach-media", { autoAlpha: 0, scale: 0.965, clipPath: "inset(18% 24% 18% 24%)" }, { autoAlpha: 0.2, scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.05 }, "-=0.22");
        }
      });
    }, pageRef);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      mm.revert();
      context.revert();
    };
  }, []);

  return (
    <main className="portfolio-page home-experience" ref={pageRef}>
      <GlobalNav />

      <section className="home-hero-sequence" aria-labelledby="home-title">
        <div className="home-spatial-track">
        <div className="home-galaxy-stage" aria-hidden="true">
          <Galaxy interactionTargetRef={heroSceneRef} sceneStateRef={galaxyStateRef} focal={[0.5, 0.53]} starSpeed={0.3} density={1.38} hueShift={115} speed={0.28} glowIntensity={0.24} saturation={0} mouseInteraction mouseRepulsion repulsionStrength={1.1} twinkleIntensity={0.22} rotationSpeed={0.035} transparent />
        </div>
        <section className="home-hero-scene" ref={heroSceneRef}>
        <div className="home-galaxy-veil" aria-hidden="true" />
        <div className="home-hero-copy">
          <div className="home-identity">
            <p className="home-role home-identity-item">Strategic Designer</p>
            <h1 id="home-title" className="home-identity-item">Kelli Deng <span>邓楮月</span></h1>
          </div>
          <div className="home-belief-scene">
            <p className="home-belief-heading">Design belief <span>设计观</span></p>
            <div className="home-principle home-principle-1">
              <ScrollReveal managed baseRotation={0} enableBlur blurStrength={4} containerClassName="home-scroll-reveal home-scroll-reveal-en">“Designers are researchers”</ScrollReveal>
              <ScrollReveal managed baseRotation={0} enableBlur blurStrength={3} containerClassName="home-scroll-reveal home-scroll-reveal-zh">设计师是研究者</ScrollReveal>
            </div>
            <div className="home-principle home-principle-2">
              <ScrollReveal managed baseRotation={0} enableBlur blurStrength={4} containerClassName="home-scroll-reveal home-scroll-reveal-en">“Designers are storytellers”</ScrollReveal>
              <ScrollReveal managed baseRotation={0} enableBlur blurStrength={3} containerClassName="home-scroll-reveal home-scroll-reveal-zh">设计师是叙事者</ScrollReveal>
            </div>
          </div>
        </div>
        </section>
        <div className="home-galaxy-tail" aria-hidden="true" />
        <section className="home-drift-wall-section" aria-labelledby="selected-work-title">
          <div className="home-drift-wall-inner">
            <DriftWall items={motionItems} columns={5} tileWidth={240} tileHeight={240} gap={18} radius={16} tilt={9} turn={-8} depth={64} speed={27} variance={0.25} parallax={0.24} lift={42} fade={0.92} dim={0.72} grayscale overlayColor="#0b0c0d" />
          </div>
          <h2 id="selected-work-title">Selected Work</h2>
        </section>
        </div>
      </section>

      <section className="home-projects" aria-label="Selected projects">
        {selectedWork.map((project) => (
          <article className="home-project-preview" key={project.number}>
            <a href={project.href} className="home-project-link">
              <header className="home-project-heading">
                <span>{project.number}</span>
                <div><p>{project.subtitle}</p><h2>{project.title}</h2><h3>{project.english}</h3></div>
                <span className="home-project-arrow" aria-hidden="true">↗</span>
              </header>
              <figure className="home-project-media"><img src={project.image} alt={`${project.title} project preview`} /></figure>
            </a>
          </article>
        ))}
      </section>

      <section className="portfolio-section home-approach-preview" aria-labelledby="approach-preview-title">
        <div className="home-preview-heading"><p>Approach</p><h2 id="approach-preview-title">CMF Competitive<br />Intelligence</h2></div>
        <div className="home-approach-copy"><p>建立多维可视化框架保持设计趋势敏锐度，再真实助力设计决策提效</p><a href="/approach">Explore approach →</a></div>
        <a className="home-approach-media" href="/approach" aria-label="Explore CMF Competitive Intelligence"><img src="/embeds/approach/assets/hero.png" alt="CMF Competitive Intelligence trend analysis" /></a>
      </section>

      <Footer />
    </main>
  );
}
