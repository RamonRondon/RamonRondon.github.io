import qrcode from 'qrcode-generator';

/** @type {Promise<object> | null} */
let profileCache = null;

/**
 * Fetches and caches profile data from the JSON file.
 * @returns {Promise<object>}
 */
export function getProfileData() {
  if (!profileCache) {
    profileCache = fetch('./src/data/profile-data.json').then(res => {
      if (!res.ok) throw new Error(`Failed to load profile data: ${res.status}`);
      return res.json();
    });
  }
  return profileCache;
}

/**
 * Builds a vCard 3.0 string from profile data.
 * @param {object} data
 * @returns {string}
 */
export function buildVCard(data) {
  const noteEntries = (data.education || [])
    .map(e => `${e.degree} - ${e.institution}`)
    .join('\\n');

  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${data.name.last};${data.name.first};;;`,
    `FN:${data.name.full}`,
    `TITLE:${data.title}`,
    `TEL;TYPE=CELL:${data.phone}`,
    `EMAIL;TYPE=INTERNET:${data.email}`,
    `ADR;TYPE=WORK:;;${data.location.city};${data.location.city};;${data.location.country}`,
    `URL:${data.website}`,
    `NOTE:${noteEntries}`,
    'END:VCARD',
  ].join('\r\n');
}

/**
 * Generates a QR code DOM element (SVG) from the given text.
 * @param {string} text
 * @returns {SVGElement}
 */
export function generateQRElement(text) {
  const qr = qrcode(0, 'M');
  qr.addData(text);
  qr.make();

  const svgTag = qr.createSvgTag({ scalable: true });
  const wrapper = document.createElement('div');
  wrapper.innerHTML = svgTag;
  const svg = wrapper.firstElementChild;

  svg.classList.add('hero-qr-svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');

  return svg;
}

/**
 * Populates elements with data-profile attributes on the about page.
 * @param {object} data
 */
export function renderAboutPage(data) {
  // Phone
  const phoneEl = document.querySelector('[data-profile="phone"]');
  if (phoneEl) {
    phoneEl.href = `tel:${data.phone}`;
  }
  const phoneText = document.querySelector('[data-profile="phone-text"]');
  if (phoneText) {
    phoneText.textContent = data.phone.replace(/^\+57/, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
  }

  // Email
  const emailEl = document.querySelector('[data-profile="email"]');
  if (emailEl) {
    emailEl.href = `mailto:${data.email}`;
  }
  const emailText = document.querySelector('[data-profile="email-text"]');
  if (emailText) {
    emailText.textContent = data.email;
  }

  // Location
  const locationEl = document.querySelector('[data-profile="location"]');
  if (locationEl) {
    locationEl.textContent = `${data.location.city} - ${data.location.country}`;
  }

  // Education timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, i) => {
    const entry = data.education[i];
    if (!entry) return;

    const h3 = item.querySelector('.timeline-content h3');
    if (h3) h3.textContent = entry.degree;

    const institution = item.querySelector('.timeline-institution');
    if (institution) institution.textContent = entry.institution;

    const p = item.querySelector('.timeline-content p');
    if (p) p.textContent = entry.description;
  });
}
