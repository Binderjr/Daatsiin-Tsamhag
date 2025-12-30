const trigger = document.getElementById("langTrigger");
const windowBox = document.getElementById("langWindow");

trigger.addEventListener("click", () => {
  windowBox.style.display =
    windowBox.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", (e) => {
  if (!windowBox.contains(e.target) && !trigger.contains(e.target)) {
    windowBox.style.display = "none";
  }
});
