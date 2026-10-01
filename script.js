const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const animatedSections = document.querySelectorAll('[data-reveal], .story-row, .ai-art');

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
