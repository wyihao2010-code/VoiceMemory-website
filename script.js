const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const animatedSections = document.querySelectorAll('[data-reveal], .story-row, .ai-art');

/* 滚动进入视口时渐显。 */
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -25px 0px' });
  animatedSections.forEach((section) => observer.observe(section));
} else {
  animatedSections.forEach((section) => section.classList.add('in-view'));
}

/* 移动端导航开合。桌面宽度下按钮不显示，面板回到常驻状态。 */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const wideViewport = window.matchMedia('(min-width: 701px)');

if (navToggle && navLinks) {
  const isOpen = () => navToggle.getAttribute('aria-expanded') === 'true';
  const setOpen = (open) => {
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
    navLinks.classList.toggle('is-open', open);
  };

  navToggle.addEventListener('click', () => setOpen(!isOpen()));

  navLinks.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !isOpen()) return;
    setOpen(false);
    navToggle.focus();
  });

  document.addEventListener('click', (event) => {
    if (!isOpen()) return;
    if (navLinks.contains(event.target) || navToggle.contains(event.target)) return;
    setOpen(false);
  });

  wideViewport.addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}

/* 滚动高亮：以固定顶栏下方约 140px 处为判定线，取最后越过该线的章节。 */
const header = document.querySelector('.site-header');
const spyLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
const spySections = spyLinks
  .map((link) => document.getElementById(link.getAttribute('href').slice(1)))
  .filter(Boolean);

let spyQueued = false;

function updateScrollState() {
  spyQueued = false;

  if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);

  const line = window.scrollY + 140;
  let currentId = '';
  for (const section of spySections) {
    if (section.offsetTop <= line) currentId = section.id;
  }

  for (const link of spyLinks) {
    if (link.getAttribute('href') === `#${currentId}`) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  }
}

function requestScrollState() {
  if (spyQueued) return;
  spyQueued = true;
  window.requestAnimationFrame(updateScrollState);
}

window.addEventListener('scroll', requestScrollState, { passive: true });
window.addEventListener('resize', requestScrollState, { passive: true });
window.addEventListener('load', requestScrollState);
updateScrollState();
