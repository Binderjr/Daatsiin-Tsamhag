document.addEventListener("DOMContentLoaded", () => {
  // 1. Set the Current Year
  const yearEl = document.getElementById("footer-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Fetch and Inject Social Buttons
  const socialContainer = document.getElementById("footer-social");
  if (socialContainer) {
    fetch("/components/social-btn/social-btn.html")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load social buttons");
        return res.text();
      })
      .then(html => {
        socialContainer.innerHTML = html;
      })
      .catch(err => console.error(err));
  }
});