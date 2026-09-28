const heroBars = [...document.querySelectorAll('.hero-soundline span')];
heroBars.forEach((bar, index) => {
  const distance = Math.abs(index - (heroBars.length - 1) / 2);
  const envelope = Math.max(0.1, 1 - distance / (heroBars.length / 2));
  const detail = Math.abs(Math.sin(index * 1.43) * Math.cos(index * 0.31));
  bar.style.setProperty('--h', `${Math.round(12 + envelope * (36 + detail * 150))}px`);
  bar.style.setProperty('--o', String(0.35 + envelope * 0.65));
});

const hero = document.querySelector('.hero');
const heroVisual = document.querySelector('.hero-visual');
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let framePending = false;
  window.addEventListener('scroll', () => {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(() => {
      const progress = Math.min(1, window.scrollY / hero.offsetHeight);
      heroVisual.style.transform = `translate3d(0, ${Math.round(progress * -70)}px, 0)`;
      heroVisual.style.opacity = String(1 - progress * 0.7);
      framePending = false;
    });
  }, { passive: true });
}

const tabs = [...document.querySelectorAll('.app-tab')];

function activateTab(tab, moveFocus = false) {
  tabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
    const panel = document.getElementById(`panel-${item.dataset.panel}`);
    panel.hidden = !active;
    panel.classList.toggle('is-active', active);
  });
  if (moveFocus) tab.focus();
}

tabs.forEach((tab, index) => {
  tab.tabIndex = index === 0 ? 0 : -1;
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    activateTab(tabs[next], true);
  });
});

const wave = document.getElementById('demo-waveform');
for (let index = 0; index < 68; index += 1) {
  const bar = document.createElement('span');
  const shape = Math.abs(Math.sin(index * 0.49) * Math.cos(index * 0.13));
  bar.style.height = `${12 + Math.round(shape * 80)}px`;
  bar.style.setProperty('--delay', `${(index % 11) * -0.075}s`);
  wave.appendChild(bar);
}

const playButton = document.getElementById('demo-play');
const timeLabel = document.getElementById('demo-time');
const statusLabel = document.getElementById('demo-status');
const transcript = document.getElementById('demo-transcript');
const sampleLines = [
  ['00:00', '林悦', '今天我们先把产品的核心体验说清楚。'],
  ['00:04', '周明', '录音之后，文字和时间点要能够一起回看。'],
  ['00:08', '林悦', '人物候选可以提示，但最后还是由我来确认。'],
  ['00:12', '周明', '这样每段内容都能回到它原来的语境。']
];
let playing = false;
let elapsed = 0;
let timer = null;

function renderDemo() {
  timeLabel.textContent = `00:${String(elapsed).padStart(2, '0')}`;
  const line = sampleLines[Math.min(Math.floor(elapsed / 4), sampleLines.length - 1)];
  transcript.innerHTML = `<b>${line[1]} · ${line[0]}</b><br>${line[2]}`;
}

function stopDemo(reset = false) {
  playing = false;
  clearInterval(timer);
  timer = null;
  wave.classList.remove('is-playing');
  playButton.textContent = '▶';
  playButton.setAttribute('aria-label', '播放模拟演示');
  statusLabel.textContent = '准备就绪';
  if (reset) elapsed = 0;
}

playButton.addEventListener('click', () => {
  if (playing) {
    stopDemo();
    return;
  }
  if (elapsed >= 16) elapsed = 0;
  playing = true;
  wave.classList.add('is-playing');
  playButton.textContent = 'Ⅱ';
  playButton.setAttribute('aria-label', '暂停模拟演示');
  statusLabel.textContent = '演示播放中';
  renderDemo();
  timer = setInterval(() => {
    elapsed += 1;
    renderDemo();
    if (elapsed >= 16) stopDemo();
  }, 1000);
});

const search = document.getElementById('demo-search');
const projectButtons = [...document.querySelectorAll('.project-item')];
const projectDetail = document.getElementById('project-detail-text');
const projectDescriptions = {
  '产品讨论': '产品讨论 · 会议中的重点与后续事项，连同原音频和转写稿保存在本机。',
  '周会记录': '周会记录 · 每周的讨论按时间归档，随时回看原话与对应片段。',
  '灵感随记': '灵感随记 · 零散的想法也能整理到同一个项目里。'
};

projectButtons.forEach((button) => button.addEventListener('click', () => {
  projectButtons.forEach((item) => item.classList.toggle('is-selected', item === button));
  projectDetail.textContent = projectDescriptions[button.dataset.project];
}));

search.addEventListener('input', () => {
  const query = search.value.trim().toLocaleLowerCase('zh-CN');
  projectButtons.forEach((button) => {
    button.hidden = !button.dataset.project.toLocaleLowerCase('zh-CN').includes(query);
  });
});

const reviewToggle = document.getElementById('review-toggle');
const reviewExplain = document.getElementById('review-explain');
reviewToggle.setAttribute('aria-expanded', 'false');
reviewToggle.setAttribute('aria-controls', 'review-explain');
reviewToggle.addEventListener('click', () => {
  reviewExplain.hidden = !reviewExplain.hidden;
  reviewToggle.setAttribute('aria-expanded', String(!reviewExplain.hidden));
  reviewToggle.textContent = reviewExplain.hidden ? '查看确认方式' : '收起说明';
});

const revealItems = [...document.querySelectorAll('.reveal')];
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.11, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
