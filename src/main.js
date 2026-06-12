// Ramón Rondón Portfolio Interactions
import { getProfileData, buildVCard, generateQRElement, renderAboutPage } from './profile-loader.js';


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
        // Only play video if QR is not active
        if (!circle.classList.contains('qr-active')) {
          video.play().catch(e => console.warn("Video play interrupted:", e));
        }
      });
      circle.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    }
  });

  // Orbit Line Drawing/Animation Setup
  setupOrbits();

  // QR Toggle
  const qrToggleBtn = document.getElementById('hero-qr-toggle');
  const qrContainer = document.getElementById('hero-qr-container');
  const portraitCircle = document.querySelector('.hero-portrait-circle');

  if (qrToggleBtn && qrContainer && portraitCircle) {
    let qrGenerated = false;
    let qrActive = false;

    qrToggleBtn.addEventListener('click', async () => {
      if (!qrGenerated) {
        const data = await getProfileData();
        const vcard = buildVCard(data);
        const qrEl = generateQRElement(vcard);
        qrContainer.appendChild(qrEl);
        qrGenerated = true;
      }

      qrActive = !qrActive;
      portraitCircle.classList.toggle('qr-active', qrActive);
      qrContainer.classList.toggle('active', qrActive);

      const qrIcon = qrToggleBtn.querySelector('.qr-icon');
      const photoIcon = qrToggleBtn.querySelector('.photo-icon');
      if (qrIcon && photoIcon) {
        qrIcon.style.display = qrActive ? 'none' : 'block';
        photoIcon.style.display = qrActive ? 'block' : 'none';
      }

      qrToggleBtn.setAttribute('aria-label', qrActive ? 'Show photo' : 'Show QR code');
    });
  }

  // About page dynamic rendering
  if (document.getElementById('contacto-directo')) {
    getProfileData()
      .then(data => renderAboutPage(data))
      .catch(e => console.warn('Profile data not loaded:', e));
  }
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
