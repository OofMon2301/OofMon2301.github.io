// =====================
// Homepage Scroll Animations
// =====================
function handleScrollAnimations() {
  const blocks = document.querySelectorAll('.content-block');
  if (localStorage.getItem('scrollAnimationsEnabled') === 'false') {
    // If animations are disabled, show all blocks
    blocks.forEach(block => block.classList.add('in-view'));
    return;
  }
  blocks.forEach(block => {
    const rect = block.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60 && rect.bottom > 60) {
      block.classList.add('in-view');
    } else {
      block.classList.remove('in-view');
    }
  });
}
window.addEventListener('scroll', handleScrollAnimations);
document.addEventListener('DOMContentLoaded', handleScrollAnimations);
window.addEventListener('settingsChanged', (e) => {
  if (e.detail.key === 'scrollAnimationsEnabled') {
    handleScrollAnimations();
  }
});

// =====================
// Homepage Scroll Progress Bar
// =====================
function updateScrollProgress() {
  const scrollBar = document.querySelector('.scroll-bar');
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  let percent = docHeight > 0 ? (scrolled / docHeight) : 0;
  percent = Math.max(0, Math.min(1, percent));
  if (scrollBar) {
    scrollBar.style.height = Math.round(percent * 180) + 'px'; // 180px is .scroll-progress height
  }
}
window.addEventListener('scroll', updateScrollProgress);
document.addEventListener('DOMContentLoaded', updateScrollProgress);

// =====================
// Homepage Content Block Focus/Blur Effect
// =====================
function setupContentBlockFocus() {
  if (localStorage.getItem('blurEffectEnabled') === 'false') return;
  const blocks = document.querySelectorAll('.content-block');
  let overlay = document.querySelector('.focus-blur-overlay');
  let blurTimeout = null;

  // Create overlay if not present
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'focus-blur-overlay hide';
    document.body.appendChild(overlay);
  }

  function showOverlay() {
    overlay.classList.remove('hide');
  }
  function hideOverlay() {
    overlay.classList.add('hide');
  }

  function focusBlock(block) {
    document.querySelectorAll('.content-block-focused').forEach(b => b.classList.remove('content-block-focused'));
    block.classList.add('content-block-focused');
    showOverlay();
    if (blurTimeout) {
      clearTimeout(blurTimeout);
      blurTimeout = null;
    }
  }

  function blurBlock(block) {
    // Delay removal for smooth transition
    blurTimeout = setTimeout(() => {
      block.classList.remove('content-block-focused');
      hideOverlay();
      blurTimeout = null;
    }, 120); // 120ms delay for relaxed transition
  }

  blocks.forEach(block => {
    block.addEventListener('mouseenter', () => {
      focusBlock(block);
    });
    block.addEventListener('mouseleave', () => {
      blurBlock(block);
    });
    block.addEventListener('focus', () => {
      focusBlock(block);
    });
    block.addEventListener('blur', () => {
      blurBlock(block);
    });
  });
}
document.addEventListener('DOMContentLoaded', setupContentBlockFocus);
window.addEventListener('settingsChanged', (e) => {
  if (e.detail.key === 'blurEffectEnabled') {
    // Remove any focused/blurred state and overlay
    document.querySelectorAll('.content-block-focused').forEach(b => b.classList.remove('content-block-focused'));
    const overlay = document.querySelector('.focus-blur-overlay');
    if (overlay) overlay.classList.add('hide');
    // Re-setup focus logic
    setupContentBlockFocus();
  }
});
