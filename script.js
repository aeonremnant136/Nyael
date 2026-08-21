// ========================================
// Nyael — Mouse Sparkle Effect
// ========================================

document.addEventListener("mousemove", function (e) {
  const sparkle = document.createElement("span");

  sparkle.className = "mouse-sparkle";

  const size = Math.random() * 5 + 3;
  const offsetX = (Math.random() - 0.5) * 16;
  const offsetY = (Math.random() - 0.5) * 16;

  sparkle.style.width = `${size}px`;
  sparkle.style.height = `${size}px`;
  sparkle.style.left = `${e.clientX + offsetX}px`;
  sparkle.style.top = `${e.clientY + offsetY}px`;

  sparkle.style.setProperty(
    "--sparkle-color",
    Math.random() > 0.5 ? "#EB00BD" : "#8B00FF"
  );

  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 700);
});


// ========================================
// Nyael — Floating Widget
// ========================================

const widget = document.querySelector(".nyael-widget");

if (widget) {
  const closeButton = widget.querySelector(".widget-close");

  if (closeButton) {
    closeButton.addEventListener("click", function () {
      widget.classList.add("is-hidden");
    });
  }
}
