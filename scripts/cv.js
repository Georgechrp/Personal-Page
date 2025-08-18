(function () {
    const cvUrl = 'assets/George_Christopoulos_CV.pdf'; // Βάλε εδώ το δικό σου URL (π.χ. /cv/George_Chr.pdf ή πλήρες https URL)

    const openBtn = document.querySelector('.cv-btn');
    const modal = document.getElementById('cvModal');
    const frame = document.getElementById('cvFrame');
    const download = document.getElementById('cvDownload');
    let lastFocused = null;

    function openModal() {
      lastFocused = document.activeElement;
      frame.src = cvUrl;
      download.href = cvUrl;
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // Μετακινεί focus στο close για προσβασιμότητα
      setTimeout(() => modal.querySelector('.cv-close').focus(), 0);
    }

    function closeModal() {
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      frame.src = ''; // καθαρισμός
      if (lastFocused) lastFocused.focus();
    }

    openBtn.addEventListener('click', openModal);
    modal.addEventListener('click', (e) => {
      if (e.target.matches('[data-close]')) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (modal.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') {
        closeModal();
      }
    });
  })();