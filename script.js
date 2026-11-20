// 1. 3D-Mesh / Cloud Network "Flash" Animation for Homepage
const canvas = document.getElementById('flashCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 1.5,
      dx: (Math.random() - 0.5) * 1.1,
      dy: (Math.random() - 0.5) * 1.1
    });
  }

  function animateNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connecting lines (3D Mesh / Cloud effect)
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
        if (dist < 110) {
          ctx.strokeStyle = `rgba(165, 243, 252, ${1 - dist / 110})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw glowing nodes
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    requestAnimationFrame(animateNetwork);
  }
  animateNetwork();
}

// 2. Interactive Comment Form Submission
const commentForm = document.getElementById('commentForm');
if (commentForm) {
  commentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const rating = document.getElementById('rating').value;
    const message = document.getElementById('message').value;

    const display = document.getElementById('commentDisplay');
    const card = document.createElement('div');
    card.className = 'card';
    card.style.marginTop = '1rem';
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
        <strong>${name}</strong>
        <span style="font-size:0.85rem; color:#4f46e5; font-weight:600;">${rating}</span>
      </div>
      <p style="color:#475569;">${message}</p>
    `;

    display.appendChild(card);
    this.reset();
  });
}