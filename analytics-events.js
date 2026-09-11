(() => {
  const send = (name, parameters = {}) => {
    if (typeof window.gtag === 'function') window.gtag('event', name, parameters);
  };

  document.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (link.dataset.track?.startsWith('book_')) send('begin_booking', { placement: link.dataset.track });
    if (href.startsWith('tel:')) send('contact_click', { method: 'phone' });
    if (href.startsWith('mailto:')) send('contact_click', { method: 'email' });
    if (href.includes('instagram.com')) send('contact_click', { method: 'instagram' });
    if (href.includes('maps.app.goo.gl')) send('contact_click', { method: 'google_business_profile' });
  });

  const form = document.getElementById('inquiry-form');
  if (form) form.addEventListener('submit', () => send('form_submit_attempt', {
    service: form.elements.service?.value || 'unspecified',
    preferred_contact: form.elements.preferred_contact?.value || 'unspecified'
  }));
})();
