// Sidebar scroll progress logic
function updateScrollProgressSidebar() {
  const scrollBar = document.querySelector('.scroll-bar');
  const percentLabel = document.querySelector('.scroll-percent');
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  let percent = docHeight > 0 ? (scrolled / docHeight) : 0;
  percent = Math.max(0, Math.min(1, percent));
  if (scrollBar) {
    scrollBar.style.height = Math.round(percent * 180) + 'px'; // 180px is .scroll-progress height
  }
  if (percentLabel) {
    percentLabel.textContent = Math.round(percent * 100) + '%';
  }
}
window.addEventListener('scroll', updateScrollProgressSidebar);
document.addEventListener('DOMContentLoaded', updateScrollProgressSidebar);

// Fun facts for sidebar widget
const funFacts = [
  "The first website was published in 1991.",
  "HTML stands for HyperText Markup Language.",
  "CSS was first proposed in 1994.",
  "JavaScript was created in just 10 days.",
  "GitHub Pages lets you host static sites for free.",
  "The favicon is the small icon in your browser tab.",
  "Responsive design adapts to any screen size.",
  "The web color #2196f3 is called 'Blue 500' in Material Design.",
  "SVG stands for Scalable Vector Graphics.",
  "You can use <kbd>F12</kbd> to open browser dev tools!"
];
function setRandomFact() {
  const factEl = document.getElementById('sidebar-fact');
  if (factEl) {
    const fact = funFacts[Math.floor(Math.random() * funFacts.length)];
    factEl.textContent = fact;
  }
}
document.addEventListener('DOMContentLoaded', setRandomFact);

document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.querySelector('.sidebar');
  const toggleBtn = document.querySelector('.sidebar-toggle');
  const toggleArea = document.querySelector('.sidebar-toggle-area');
  const chevronIcon = document.querySelector('.sidebar-toggle-icon');

  // Make the entire collapsed sidebar clickable
  function handleSidebarToggle(e) {
    // Only expand/collapse if clicking in collapsed state or on the toggle button
    if (sidebar.classList.contains('collapsed') || e.target === toggleBtn || e.target === chevronIcon || e.target.closest('.sidebar-toggle')) {
      const expanded = sidebar.classList.toggle('expanded');
      sidebar.classList.toggle('collapsed', !expanded);
      toggleBtn.setAttribute('aria-label', expanded ? 'Collapse sidebar' : 'Expand sidebar');
      chevronIcon.innerHTML = expanded ? '&#8249;' : '&#8250;'; // < for expanded, > for collapsed
      updateSidebarStats();
    }
  }

  if (sidebar && toggleArea) {
    toggleArea.addEventListener('click', handleSidebarToggle);
    // Also allow keyboard navigation
    sidebar.addEventListener('keydown', function(e) {
      if ((e.key === 'Enter' || e.key === ' ') && sidebar.classList.contains('collapsed')) {
        handleSidebarToggle(e);
      }
    });
  }

  // Stats calculation
  function updateSidebarStats() {
    const charsEl = document.querySelector('.scroll-chars');
    const wordsEl = document.querySelector('.scroll-words');
    const sectionsEl = document.querySelector('.scroll-sections');
    if (!sidebar.classList.contains('expanded')) {
      if (charsEl) charsEl.style.display = 'none';
      if (wordsEl) wordsEl.style.display = 'none';
      if (sectionsEl) sectionsEl.style.display = 'none';
      return;
    }
    // Calculate stats from visible content blocks
    const blocks = document.querySelectorAll('.content-block');
    let chars = 0, words = 0, sections = 0;
    blocks.forEach(block => {
      const rect = block.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const text = block.textContent || '';
        chars += text.length;
        words += text.trim().split(/\s+/).length;
        sections++;
      }
    });
    if (charsEl) {
      charsEl.textContent = `Characters read: ${chars}`;
      charsEl.style.display = 'block';
    }
    if (wordsEl) {
      wordsEl.textContent = `Words read: ${words}`;
      wordsEl.style.display = 'block';
    }
    if (sectionsEl) {
      sectionsEl.textContent = `Sections viewed: ${sections}`;
      sectionsEl.style.display = 'block';
    }
  }

  window.addEventListener('scroll', updateSidebarStats);
  document.addEventListener('DOMContentLoaded', updateSidebarStats);
});

// Settings modal logic
function setupSettingsModal() {
  const settingsBtn = document.querySelector('.sidebar-settings-btn');
  const modal = document.getElementById('settings-modal');
  const closeBtn = document.querySelector('.settings-modal-close');
  const blurToggle = document.getElementById('toggle-blur-effect');
  const scrollAnimToggle = document.getElementById('toggle-scroll-animations');

  // Open modal
  if (settingsBtn && modal) {
    settingsBtn.addEventListener('click', function() {
      modal.style.display = 'flex';
      modal.focus();
    });
  }
  // Close modal
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  }
  // Close modal when clicking outside content
  if (modal) {
    modal.addEventListener('mousedown', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
  // ESC key closes modal
  if (modal) {
    modal.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        modal.style.display = 'none';
      }
    });
  }

  // Load preferences
  function loadSettings() {
    const blurEnabled = localStorage.getItem('blurEffectEnabled');
    const scrollAnimEnabled = localStorage.getItem('scrollAnimationsEnabled');
    if (blurToggle) blurToggle.checked = blurEnabled !== 'false';
    if (scrollAnimToggle) scrollAnimToggle.checked = scrollAnimEnabled !== 'false';
  }
  loadSettings();

  // Save preferences and notify
  function saveSetting(key, value) {
    localStorage.setItem(key, value);
    window.dispatchEvent(new CustomEvent('settingsChanged', { detail: { key, value } }));
  }
  if (blurToggle) {
    blurToggle.addEventListener('change', function() {
      saveSetting('blurEffectEnabled', blurToggle.checked);
    });
  }
  if (scrollAnimToggle) {
    scrollAnimToggle.addEventListener('change', function() {
      saveSetting('scrollAnimationsEnabled', scrollAnimToggle.checked);
    });
  }
}
document.addEventListener('DOMContentLoaded', setupSettingsModal);
