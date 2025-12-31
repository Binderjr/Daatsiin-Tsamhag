/* =========================
   Message rotation
========================= */

const messages = [
  "Hello, please select your language",
  "Сайн байна уу, Та хэлээ сонгоно уу",
  "こんにちは、言語を選択してください",
  "안녕하세요, 언어를 선택하세요",
  "你好，请选择你的语言",
  "Привет, выберите язык"
];

let messageIndex = 0;
let hintElement = null;

function rotateMessage() {
  if (!hintElement) return;

  // 1. Start fade out
  hintElement.classList.add("fade");

  // 2. Wait for CSS transition, change text, fade in
  setTimeout(() => {
    hintElement.textContent = messages[messageIndex];
    hintElement.classList.remove("fade");
    messageIndex = (messageIndex + 1) % messages.length;
  }, 450); // Ensure this matches your CSS transition time for opacity
}

/* =========================
   Initialization & Logic
========================= */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Remove Preload
  document.body.classList.remove("preload");

  // 2. Setup Year
  const yearEl = document.getElementById("footer-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 3. Setup Message Rotation
  hintElement = document.getElementById("lang-hint");
  if (hintElement) {
    setInterval(rotateMessage, 2800);
  }

  // 4. Unified Button Logic
  const buttons = document.querySelectorAll(".lang-grid button");
  
  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault(); // Good practice

      // Visual: Trigger fade-out animation
      document.body.classList.add("fade-out");

      // Logic: Determine where to go
      const directUrl = button.getAttribute('data-url');
      const langCode = button.getAttribute('data-lang');
      
      let targetUrl = '';

      if (directUrl) {
        // Priority 1: If the HTML has a specific URL (like your EN/MN buttons)
        targetUrl = directUrl;
      } else if (langCode) {
        // Priority 2: If it only has a lang code (like your JA button)
        targetUrl = `/pages/homepage/homepage.html?lang=${langCode}`;
      } else {
        // Fallback
        targetUrl = '/'; 
      }

      // Wait for animation, then go
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 500); // Matches CSS .fade-out transition duration
    });
  });
});