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
  hintElement.classList.add("fade");

  setTimeout(() => {
    hintElement.textContent = messages[messageIndex];
    hintElement.classList.remove("fade");
    messageIndex = (messageIndex + 1) % messages.length;
  }, 450);
}

/* =========================
   Page transition
========================= */

function navigateWithFade(url) {
  document.body.classList.add("fade-out");

  setTimeout(() => {
    window.location.href = url;
  }, 400);
}

/* =========================
   Initialization
========================= */

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.remove("preload");

  hintElement = document.getElementById("lang-hint");

  setInterval(rotateMessage, 2800);

  document.querySelectorAll(".lang-grid button").forEach(button => {
    button.addEventListener("click", () => {
      navigateWithFade(button.dataset.url);
    });
  });
});

const yearEl = document.getElementById("footer-year");
yearEl.textContent = new Date().getFullYear();
