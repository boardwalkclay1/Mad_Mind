// bubbles.js
// Simple floating bubble engine for Mad Mind pages

export function initBubbles(options = {}) {
  const {
    count = 10,
    clickable = true,
    attachTo = document.body,
    labels = [], // optional: [{ text, onClick }]
  } = options;

  const layer = document.createElement("div");
  layer.className = "bubble-layer";
  attachTo.appendChild(layer);

  const width = window.innerWidth;
  const height = window.innerHeight;
  const bubbles = [];

  for (let i = 0; i < count; i++) {
    const b = document.createElement("div");
    b.className = "bubble " + (Math.random() > 0.5 ? "gold" : "");
    const size = 60 + Math.random() * 50;
    b.style.width = `${size}px`;
    b.style.height = `${size}px`;
    b.style.left = `${Math.random() * (width - size)}px`;
    b.style.top = `${Math.random() * (height - size)}px`;

    const velocity = {
      x: (Math.random() * 0.6 - 0.3) || 0.2,
      y: (Math.random() * 0.6 - 0.3) || -0.2,
    };

    const bubbleObj = { el: b, size, velocity };
    bubbles.push(bubbleObj);

    if (clickable) {
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        b.style.transform = "scale(1.15)";
        b.style.boxShadow = "0 0 26px rgba(255,255,255,0.9)";
        setTimeout(() => {
          b.style.transform = "";
          b.style.boxShadow = "";
        }, 150);
      });
    }

    layer.appendChild(b);
  }

  function animate() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (const b of bubbles) {
      const rect = b.el.getBoundingClientRect();
      let x = rect.left + b.velocity.x;
      let y = rect.top + b.velocity.y;

      if (x <= 0 || x + b.size >= w) {
        b.velocity.x *= -1;
        x = Math.max(0, Math.min(w - b.size, x));
      }
      if (y <= 0 || y + b.size >= h) {
        b.velocity.y *= -1;
        y = Math.max(0, Math.min(h - b.size, y));
      }

      b.el.style.left = `${x}px`;
      b.el.style.top = `${y}px`;
    }
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  return layer;
}
