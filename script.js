/* Message rotation */
const messages = [
  "Hello, please select your language",
  "Сайн байна уу, Та хэлээ сонгоно уу",
  "こんにちは、言語を選択してください",
  "안녕하세요, 언어를 선택하세요",
  "你好，请选择你的语言",
  "Привет, выберите язык"
];

const hint = document.getElementById("lang-hint");
let index = 0;

setInterval(() => {
  hint.classList.add("fade");
  setTimeout(() => {
    hint.textContent = messages[index];
    hint.classList.remove("fade");
    index = (index + 1) % messages.length;
  }, 450);
}, 2800);

/* Page transition */
function navigateWithFade(url) {
  const overlay = document.getElementById("page-transition");
  overlay.style.opacity = "1";
  setTimeout(() => {
    window.location.href = url;
  }, 400);
}
