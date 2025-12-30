document.getElementById("footer-year").textContent =
  new Date().getFullYear();

fetch("/components/social-btn/social-btn.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("footer-social").innerHTML = html;
  });
