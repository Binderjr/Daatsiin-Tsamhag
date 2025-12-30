document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".social-btn[data-transition]");
  const overlay = document.getElementById("page-transition");

  links.forEach(link => {
    link.addEventListener("click", event => {
      const url = link.href;

      if (!overlay) {
        window.location.href = url;
        return;
      }

      event.preventDefault();
      overlay.style.opacity = "1";

      setTimeout(() => {
        window.location.href = url;
      }, 400);
    });
  });
});
