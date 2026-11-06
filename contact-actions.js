(() => {
  const phone = '97337212318';
  const whatsapp = `https://wa.me/${phone}`;
  const style = document.createElement('style');
  style.textContent = `
    .customer-contact-actions{position:fixed;z-index:90;right:16px;bottom:16px;display:flex;gap:8px;align-items:center}
    .customer-contact-actions a{display:inline-flex;min-height:44px;align-items:center;justify-content:center;padding:0 16px;border:1px solid rgba(255,255,255,.2);border-radius:999px;color:#fff;background:#211a15;text-decoration:none;font:700 13px system-ui;box-shadow:0 8px 26px rgba(0,0,0,.35)}
    .customer-contact-actions a:last-child{color:#17120c;background:#eab66f}
    @media(max-width:580px){.customer-contact-actions{right:10px;bottom:10px;left:10px}.customer-contact-actions a{flex:1;padding:0 10px}}
  `;
  document.head.append(style);
  const actions = document.createElement('nav');
  actions.className = 'customer-contact-actions';
  actions.setAttribute('aria-label', 'Contact the restaurant');
  actions.innerHTML = `<a href="tel:+${phone}">Call 3721 2318</a><a href="${whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp</a>`;
  document.body.append(actions);
})();
