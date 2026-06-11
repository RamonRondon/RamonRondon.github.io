// Ramón Rondón Portfolio Interactions

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      // Basic toggle for mobile view
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      
      // Visual feedback on hamburger lines
      const spans = menuBtn.querySelectorAll('span');
      if (spans.length === 3) {
        if (!isVisible) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }
    });

    // Reset styles on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
        const spans = menuBtn.querySelectorAll('span');
        if (spans.length === 3) {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      } else {
        navLinks.style.display = 'none';
      }
    });
  }

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
