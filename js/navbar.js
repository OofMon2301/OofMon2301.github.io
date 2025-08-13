document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.navbar-toggle');
  const links = document.querySelector('.navbar-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const isOpen = links.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // Optional: Close menu when clicking outside (mobile)
  document.addEventListener('click', function (e) {
    if (window.innerWidth <= 800 && links.classList.contains('open')) {
      if (!e.target.closest('.navbar-container')) {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

