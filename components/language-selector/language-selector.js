/* ===============================
   LANGUAGE SELECTOR CONTROLLER
================================ */

const langPanel = document.getElementById("langPanel");
const pageTransition = document.getElementById("page-transition");

/* ===== TOGGLE PANEL ===== */

function toggleLang() {
  langPanel.classList.toggle("active");
}

/* ===== CLOSE WHEN CLICK OUTSIDE ===== */

document.addEventListener("click", (e) => {
  const selector = e.target.closest(".language-selector");
  if (!selector && langPanel.classList.contains("active")) {
    langPanel.classList.remove("active");
  }
});

/* ===== PAGE TRANSITION NAVIGATION ===== */

function navigateWithFade(url) {
  pageTransition.style.opacity = "1";

  setTimeout(() => {
    window.location.href = url;
  }, 360);
}

/* ===== AUTO CLOSE ON SELECTION ===== */

langPanel.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    langPanel.classList.remove("active");
  });
});
