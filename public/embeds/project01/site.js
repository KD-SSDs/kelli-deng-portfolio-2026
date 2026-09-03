const byId = (id) => document.getElementById(id);

const menuButton = document.querySelector('.menu-button');
const mobileMenu = byId('mobile-menu');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  mobileMenu.classList.toggle('is-open', !open);
});
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('is-open');
}));

document.querySelectorAll('.research-tabs button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.research-tabs button').forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    const image = byId('research-image');
    image.classList.add('is-changing');
    window.setTimeout(() => {
      image.src = button.dataset.researchImage;
      image.alt = button.dataset.title;
      byId('research-kicker').textContent = button.dataset.kicker;
      byId('research-title').textContent = button.dataset.title;
      image.classList.remove('is-changing');
    }, 160);
  });
});

const pathData = {
  integrated: { label: '一体化结构', detail: '聚焦摄像头、副屏与一体黑区域', scale: 1.62, origin: '24% 15%' },
  recognition: { label: '功能 / 耐用一眼识别', detail: '退开一步，读取一体黑与包裹式装饰件', scale: 1.28, origin: '28% 18%' },
  craft: { label: '精工精致质感', detail: '回到完整产品，理解细节如何服务整体', scale: 1, origin: '50% 50%' }
};
document.querySelectorAll('.path-item').forEach((item) => item.addEventListener('click', () => {
  document.querySelectorAll('.path-item').forEach((entry) => entry.classList.remove('is-active'));
  item.classList.add('is-active');
  const data = pathData[item.dataset.path];
  byId('path-label').textContent = data.label;
  byId('path-detail').textContent = data.detail;
  byId('path-image').style.transformOrigin = data.origin;
  byId('path-image').style.transform = `scale(${data.scale})`;
}));
byId('path-image').style.transformOrigin = pathData.integrated.origin;
byId('path-image').style.transform = `scale(${pathData.integrated.scale})`;

const anchorData = {
  high: { image: 'assets/三档产品——高.png', title: '高档：一体黑成为创新引领的视觉锚点', description: '副屏、摄像头与装饰件被整合进横向一体黑区域，形成系列中最强的价值表达。', alt: '高档产品一体黑 DECO 区域' },
  mid: { image: 'assets/三档产品——中.png', title: '中档：承接一体黑的横向关系', description: '取消副屏后仍保留一体黑与横向矩阵关系，让高档视觉资产在中档完成承接转化。', alt: '中档产品一体黑 DECO 区域' },
  low: { image: 'assets/三档产品——低.png', title: '底部：以更克制的强度夯实识别', description: '通过更大圆角、黑色高亮与横向结构保留系列识别，同时匹配底部产品的价值强度。', alt: '底部产品一体黑 DECO 区域' }
};
document.querySelectorAll('.mode-switch button').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.mode-switch button').forEach((item) => item.classList.remove('is-active'));
  button.classList.add('is-active');
  const data = anchorData[button.dataset.anchor];
  const image = byId('anchor-image');
  image.classList.add('is-changing');
  window.setTimeout(() => { image.src = data.image; image.alt = data.alt; image.classList.remove('is-changing'); }, 160);
  byId('anchor-title').textContent = data.title;
  byId('anchor-description').textContent = data.description;
}));

const tierData = {
  all: '横向矩阵大 DECO、更大圆角与一体黑镜面灵动光影，在三档中保持连续识别并改变表达强度。',
  high: '创新引领：副屏与一体黑大玻璃形成最强视觉锚点，并以精工 CMF 补充近距离价值。',
  mid: '承接转化：取消副屏，保留一体黑与横向矩阵关系，以夜光 / 光变转译高价值感。',
  low: '夯实基础：降低表达强度，以更大 R 角、黑色高亮与横向结构保留系列识别。'
};
document.querySelectorAll('.tier-controls button').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.tier-controls button').forEach((item) => item.classList.remove('is-active'));
  button.classList.add('is-active');
  const tier = button.dataset.tier;
  document.querySelectorAll('[data-tier-figure]').forEach((figure) => figure.classList.toggle('is-muted', tier !== 'all' && figure.dataset.tierFigure !== tier));
  document.querySelectorAll('[data-matrix-tier]').forEach((row) => row.classList.toggle('is-muted', tier !== 'all' && row.dataset.matrixTier !== tier));
  byId('tier-note').textContent = tierData[tier];
}));

const themeOrder = ['craft', 'geometry', 'honest'];
const activateTheme = (theme, alignToStart = false) => {
  document.querySelectorAll('.theme-tabs button').forEach((item) => item.classList.remove('is-active'));
  document.querySelector(`.theme-tabs button[data-theme="${theme}"]`)?.classList.add('is-active');
  document.querySelectorAll('[data-theme-group]').forEach((group) => {
    const active = group.dataset.themeGroup === theme;
    group.hidden = !active;
    group.classList.toggle('is-active', active);
  });
  const index = themeOrder.indexOf(theme);
  byId('theme-status').textContent = `${String(index + 1).padStart(2, '0')} / 03`;
  window.requestAnimationFrame(() => {
    document.querySelector(`[data-theme-group="${theme}"]`)?.querySelectorAll('[data-card-carousel]').forEach((carousel) => carousel.renderCarousel?.());
  });
  if (alignToStart) document.querySelector('.theme-evidence-groups')?.scrollIntoView({ block: 'start' });
};
document.querySelectorAll('.theme-tabs button').forEach((button) => button.addEventListener('click', () => activateTheme(button.dataset.theme, true)));
document.querySelectorAll('[data-next-theme]').forEach((button) => button.addEventListener('click', () => activateTheme(button.dataset.nextTheme, true)));

document.querySelectorAll('[data-scheme-reader]').forEach((reader) => {
  const figures = [...reader.querySelectorAll('.scheme-sequence figure')];
  let index = 0;
  const render = () => {
    figures.forEach((figure, figureIndex) => {
      const active = figureIndex === index;
      figure.hidden = !active;
      figure.classList.toggle('is-active', active);
    });
    reader.querySelector('[data-scheme-count]').textContent = `${String(index + 1).padStart(2, '0')} / ${String(figures.length).padStart(2, '0')}`;
  };
  reader.querySelector('[data-scheme-prev]').addEventListener('click', () => { index = (index - 1 + figures.length) % figures.length; render(); });
  reader.querySelector('[data-scheme-next]').addEventListener('click', () => { index = (index + 1) % figures.length; render(); });
  render();
});

document.querySelectorAll('[data-card-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.theme-card-track');
  const cards = [...track.querySelectorAll('figure')];
  let index = 0;
  const render = () => {
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const requestedOffset = cards.slice(0, index).reduce((sum, card) => sum + card.getBoundingClientRect().width + gap, 0);
    const maximumOffset = Math.max(0, track.scrollWidth - carousel.clientWidth);
    track.style.transform = `translateX(-${Math.min(requestedOffset, maximumOffset)}px)`;
    carousel.querySelector('[data-card-count]').textContent = `${String(index + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
  };
  carousel.querySelector('[data-card-prev]').addEventListener('click', () => { index = Math.max(0, index - 1); render(); });
  carousel.querySelector('[data-card-next]').addEventListener('click', () => { index = Math.min(cards.length - 1, index + 1); render(); });
  window.addEventListener('resize', render);
  carousel.renderCarousel = render;
  render();
});

document.querySelectorAll('[data-scroll-target]').forEach((button) => button.addEventListener('click', () => {
  const target = byId(button.dataset.scrollTarget);
  const direction = button.dataset.scrollDirection === 'next' ? 1 : -1;
  target?.scrollBy({ left: direction * Math.max(320, target.clientWidth * .72), behavior: 'smooth' });
}));

const finalData = {
  cherry: { image: 'assets/蜂巢营销色主推dark cherry.opt.webp', kicker: 'Primary marketing color', title: '深樱桃色', description: '与一体黑设计契合，以更显性的蜂巢阵列加强视觉传播与结构符号。', alt: '深樱桃主推营销色产品' },
  orange: { image: 'assets/蜂巢营销色备选建渐变橙色.opt.webp', kicker: 'Alternate proposal', title: '橙色 · 营销色储备', description: '作为系列营销色备选方案保留，不替代最终主推营销色。', alt: '橙色备选营销色产品' }
};
document.querySelectorAll('.color-switch button').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.color-switch button').forEach((item) => item.classList.remove('is-active'));
  button.classList.add('is-active');
  const data = finalData[button.dataset.final];
  const image = byId('final-product-image');
  image.classList.add('is-changing');
  window.setTimeout(() => { image.src = data.image; image.alt = data.alt; image.classList.remove('is-changing'); }, 160);
  byId('final-kicker').textContent = data.kicker;
  byId('final-title').textContent = data.title;
  byId('final-description').textContent = data.description;
}));

const finalScrollScene = document.querySelector('[data-final-scroll]');
const updateFinalScroll = () => {
  if (!finalScrollScene) return;
  const rect = finalScrollScene.getBoundingClientRect();
  const range = Math.max(1, rect.height - window.innerHeight);
  const progress = Math.min(1, Math.max(0, -rect.top / range));
  const activeIndex = Math.min(3, Math.floor(progress * 4));
  finalScrollScene.querySelectorAll('[data-final-layer]').forEach((layer) => {
    const active = Number(layer.dataset.finalLayer) === activeIndex;
    layer.classList.toggle('is-active', active);
    layer.setAttribute('aria-hidden', String(!active));
  });
  finalScrollScene.querySelectorAll('[data-final-step]').forEach((step) => step.classList.toggle('is-active', Number(step.dataset.finalStep) === activeIndex));
  byId('final-scroll-count').textContent = `${String(activeIndex + 1).padStart(2, '0')} / 04`;
  finalScrollScene.querySelector('.final-scroll-progress i').style.transform = `scaleX(${(activeIndex + 1) / 4})`;
};
window.addEventListener('scroll', updateFinalScroll, { passive: true });
window.addEventListener('resize', updateFinalScroll);
updateFinalScroll();

const scrollZoomScene = document.querySelector('[data-scroll-zoom]');
const updateScrollZoom = () => {
  if (!scrollZoomScene) return;
  const rect = scrollZoomScene.getBoundingClientRect();
  const distance = Math.max(1, rect.height - window.innerHeight * .72);
  const progress = Math.min(1, Math.max(0, (window.innerHeight * .24 - rect.top) / distance));
  const image = scrollZoomScene.querySelector('.far-near-visual img');
  image.style.transform = `scale(${1 + progress * .78})`;
  image.style.transformOrigin = '50% 24%';
};
window.addEventListener('scroll', updateScrollZoom, { passive: true });
window.addEventListener('resize', updateScrollZoom);
updateScrollZoom();

const sectionLinks = [...document.querySelectorAll('.site-nav nav a')];
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    sectionLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-30% 0px -60% 0px' });
document.querySelectorAll('main > section[id]').forEach((section) => observer.observe(section));
