const root = document.documentElement;
function readPreference(key) { try { return localStorage.getItem(key); } catch { return null; } }
function savePreference(key,value) { try { localStorage.setItem(key,value); } catch {} }
if (readPreference('language') === 'en') root.lang = 'en';
const savedTheme = readPreference('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) root.dataset.theme = 'dark';
function updateLabels() {
 const en = root.lang === 'en';
 document.getElementById('languageButton').setAttribute('aria-label',en ? 'Switch to Chinese' : '切换至英文');
 const theme = document.getElementById('themeButton');
 theme.setAttribute('aria-label', en ? 'Toggle dark mode' : '切换深色模式');
 theme.setAttribute('aria-pressed',String(root.dataset.theme === 'dark'));
 document.querySelector('nav').setAttribute('aria-label',en ? 'Main navigation' : '主导航');
 if (document.body.dataset.titleZh) document.title = (en ? document.body.dataset.titleEn : document.body.dataset.titleZh) + ' | Iris’s Place';
}
document.getElementById('languageButton').addEventListener('click',()=>{
 root.lang = root.lang === 'en' ? 'zh-CN' : 'en';
 savePreference('language',root.lang === 'en' ? 'en' : 'zh'); updateLabels();
});
document.getElementById('themeButton').addEventListener('click',()=>{
 root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
 savePreference('theme',root.dataset.theme); updateLabels();
});
document.getElementById('year').textContent = new Date().getFullYear();
updateLabels();
