// Ramón Rondón Portfolio Interactions

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // Profile video play/pause on hover
  const circles = document.querySelectorAll('.hero-portrait-circle');
  circles.forEach(circle => {
    const video = circle.querySelector('.hero-avatar-video');
    if (video) {
      circle.addEventListener('mouseenter', () => {
        video.play().catch(e => console.warn("Video play interrupted:", e));
      });
      circle.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    }
  });

  // Orbit Line Drawing/Animation Setup
  setupOrbits();
});

function setupOrbits() {
  const svg = document.querySelector('.orbit-svg');
  if (!svg) return;
  
  const line = svg.querySelector('.orbit-line');
  if (!line) return;

  // Set dash array to animate
  line.style.strokeDasharray = '5, 5';
  line.style.animation = 'dash 30s linear infinite';
  
  // Inject keyframe animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes dash {
      to {
        stroke-dashoffset: -1000;
      }
    }
  `;
  document.head.appendChild(style);
}
