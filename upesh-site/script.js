// Mobile nav
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  });
}

// Theme toggle (persisted)
const themeToggle = document.getElementById('themeToggle');
(function initTheme(){
  const saved = localStorage.getItem('theme') || 'dark';
  if (saved === 'light') {
    document.documentElement.style.setProperty('--bg', '#ffffff');
    document.documentElement.style.setProperty('--fg', '#0a0a0a');
    document.documentElement.style.setProperty('--card', '#f7f7f8');
    document.documentElement.style.setProperty('--line', '#e5e7eb');
    if (themeToggle) themeToggle.textContent = '☀️';
  }
})();
if (themeToggle){
  themeToggle.addEventListener('click', () => {
    const isDark = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() === '#0a0a0a';
    if (isDark) {
      document.documentElement.style.setProperty('--bg', '#ffffff');
      document.documentElement.style.setProperty('--fg', '#0a0a0a');
      document.documentElement.style.setProperty('--card', '#f7f7f8');
      document.documentElement.style.setProperty('--line', '#e5e7eb');
      localStorage.setItem('theme', 'light');
      themeToggle.textContent = '☀️';
    } else {
      document.documentElement.style.setProperty('--bg', '#0a0a0a');
      document.documentElement.style.setProperty('--fg', '#f5f5f5');
      document.documentElement.style.setProperty('--card', '#121212');
      document.documentElement.style.setProperty('--line', '#1f1f23');
      localStorage.setItem('theme', 'dark');
      themeToggle.textContent = '🌙';
    }
  });
}

// Hero video control
const video = document.getElementById('heroVideo');
const videoToggle = document.getElementById('videoToggle');
if (video && videoToggle){
  videoToggle.addEventListener('click', () => {
    if (video.paused){ video.play(); videoToggle.textContent = '⏸'; }
    else { video.pause(); videoToggle.textContent = '▶️'; }
  });
}

// Dynamic year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Journal (local only)
const journalForm = document.getElementById('journalForm');
const journalInput = document.getElementById('journalInput');
const journalList = document.getElementById('journalList');

function renderJournal(){
  const items = JSON.parse(localStorage.getItem('journal') || '[]');
  journalList.innerHTML = '';
  items.forEach((it, i) => {
    const div = document.createElement('div');
    div.className = 'journal-item';
    div.innerHTML = `<span>${it.text}</span><time>${new Date(it.ts).toLocaleString()}</time>`;
    div.addEventListener('click', ()=>{ // remove on click
      items.splice(i,1);
      localStorage.setItem('journal', JSON.stringify(items));
      renderJournal();
    });
    journalList.appendChild(div);
  });
}
if (journalList) renderJournal();

if (journalForm){
  journalForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const text = journalInput.value.trim();
    if(!text) return;
    const items = JSON.parse(localStorage.getItem('journal') || '[]');
    items.unshift({ text, ts: Date.now() });
    localStorage.setItem('journal', JSON.stringify(items));
    journalInput.value = '';
    renderJournal();
  });
}

// Contact (demo only – no backend)
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');
if (contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    contactStatus.textContent = 'Thanks! I will reply within 24 hours.';
    contactForm.reset();
  });
}
