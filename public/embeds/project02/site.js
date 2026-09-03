const nav = document.querySelector('.site-nav');
const menuButton = document.querySelector('.menu-button');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.site-nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('menu-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' });

document.querySelectorAll('.reveal, .proof-scene, .proof-reveal, .color-story, .color-phase, .launch-kv, .sixview-list figure').forEach((el) => revealObserver.observe(el));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting || !entry.target.id) return;
    document.querySelectorAll('.site-nav nav a').forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { threshold: 0.2, rootMargin: '-20% 0px -65% 0px' });

document.querySelectorAll('main > section[id]').forEach((section) => sectionObserver.observe(section));

const a200sColorStack = document.querySelector('.a200s-color-stack');

if (a200sColorStack) {
  let stackFrame = 0;

  const updateA200sStack = () => {
    stackFrame = 0;
    const rect = a200sColorStack.getBoundingClientRect();
    const distance = Math.max(1, a200sColorStack.offsetHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, -rect.top / distance));
    const step = Math.min(3, Math.floor(progress * 4));
    a200sColorStack.dataset.step = String(step);
  };

  const requestStackUpdate = () => {
    if (stackFrame) return;
    stackFrame = requestAnimationFrame(updateA200sStack);
  };

  window.addEventListener('scroll', requestStackUpdate, { passive: true });
  window.addEventListener('resize', requestStackUpdate);
  updateA200sStack();
}

document.querySelectorAll('[data-slider-target]').forEach((button) => {
  button.addEventListener('click', () => {
    const track = document.getElementById(button.dataset.sliderTarget);
    if (!track) return;

    const firstItem = track.firstElementChild;
    const trackStyle = getComputedStyle(track);
    const gap = parseFloat(trackStyle.columnGap || trackStyle.gap) || 0;
    const step = (firstItem?.getBoundingClientRect().width || track.clientWidth) + gap;
    const direction = Number(button.dataset.direction) || 1;

    track.scrollBy({ left: step * direction, behavior: 'smooth' });
  });
});
