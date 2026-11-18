'use strict';
(function () {
  const overlay = document.querySelector('#intro-overlay');
  const timeline = window.__timelines?.['coffee-intro'];
  const main = document.querySelector('main');
  const sidebar = document.querySelector('.sidebar');
  const skipLink = document.querySelector('.skip-link');
  const opening = overlay?.querySelector('.intro-opening');
  const startBtn = overlay?.querySelector('#intro-start');
  const skipBtn = overlay?.querySelector('#intro-skip');
  let phase = 'idle', finishing = false, previousFocus = null, fallbackTimer = null, exitAnim = null, runId = 0;

  function clearTimers() {
    clearTimeout(fallbackTimer);
  }

  function setLocked(locked) {
    if (main) main.inert = locked;
    if (sidebar) sidebar.inert = locked;
    if (skipLink) skipLink.inert = locked;
  }

  function resetOpeningState() {
    overlay.classList.remove('is-playing', 'is-finishing');
    if (opening) opening.inert = false;
    if (startBtn) {
      startBtn.disabled = false;
      startBtn.classList.remove('is-pressed');
    }
  }

  function endIntro() {
    if (!overlay || overlay.hidden || finishing) return;
    finishing = true;
    phase = 'finishing';
    clearTimers();
    timeline?.pause();
    try { localStorage.setItem('ruang-kopi-intro-seen', '1'); } catch (_) {
      try { sessionStorage.setItem('ruang-kopi-intro-seen', '1'); } catch (_) {}
    }
    const id = runId;
    const finish = () => {
      if (runId !== id) return;
      exitAnim?.cancel?.();
      exitAnim = null;
      overlay.hidden = true;
      resetOpeningState();
      document.body.classList.remove('intro-active');
      setLocked(false);
      phase = 'idle';
      finishing = false;
      const page = document.querySelector('#page');
      const recovery = document.querySelector('#storage-recovery');
      const target = previousFocus && previousFocus !== document.body && previousFocus.isConnected && !previousFocus.closest('[inert]')
        ? previousFocus
        : (page?.inert ? recovery : page);
      target?.focus({ preventScroll: true });
    };
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && overlay.animate) {
      overlay.classList.add('is-finishing');
      document.body.classList.remove('intro-active');
      setLocked(false);
      document.dispatchEvent(new window.Event('rk:intro-end'));
      exitAnim = overlay.animate(
        [{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(1.02)' }],
        { duration: 1100, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'forwards' }
      );
      exitAnim.finished.then(finish, finish);
    } else {
      finish();
      document.dispatchEvent(new window.Event('rk:intro-end'));
    }
  }

  function beginPlayback() {
    if (!overlay || !timeline || phase !== 'paused' || finishing || overlay.hidden) return;
    phase = 'playing';
    if (startBtn) {
      startBtn.classList.add('is-pressed');
      startBtn.disabled = true;
    }
    if (opening) opening.inert = true;
    overlay.focus({ preventScroll: true });
    overlay.classList.add('is-playing');
    // Frame 1 (001.webp) is already the background; start sequence immediately from Frame 2 (index 1 of 117 remaining frames).
    window.RKMotion?.drawIntroFrame?.(1 / 117);
    clearTimers();
    if (typeof timeline.timeScale === 'function') timeline.timeScale(1.35);
    timeline.restart();
    fallbackTimer = setTimeout(endIntro, 9000);
  }

  function startIntro() {
    if (!overlay || !timeline) return;
    ++runId;
    clearTimers();
    if (exitAnim) { exitAnim.cancel?.(); exitAnim = null; }
    finishing = false;
    phase = 'paused';
    previousFocus = document.activeElement;
    resetOpeningState();
    overlay.hidden = false;
    setLocked(true);
    document.body.classList.add('intro-active');
    document.dispatchEvent(new window.Event('rk:intro-start'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timeline.eventCallback?.('onUpdate', null);
      timeline.progress(1).pause();
      endIntro();
      return;
    }
    timeline.eventCallback('onUpdate', () => {
      const p = timeline.progress();
      window.RKMotion?.drawIntroFrame?.(1 / 117 + p * (116 / 117));
    });
    timeline.eventCallback('onComplete', endIntro);
    if (typeof timeline.progress === 'function') timeline.progress(0);
    timeline.pause?.();
    window.RKMotion?.preload?.();
    (startBtn || overlay).focus({ preventScroll: true });
  }

  startBtn?.addEventListener('click', beginPlayback);
  skipBtn?.addEventListener('click', endIntro);

  function handleOverlayKeydown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      endIntro();
      return;
    }
    if (event.key === 'Tab') {
      event.preventDefault();
      const focusables = [startBtn, skipBtn].filter(el => el && !el.disabled && !el.hidden && !el.closest('[hidden],[inert]'));
      if (!focusables.length) {
        overlay.focus({ preventScroll: true });
        return;
      }
      const currentIndex = focusables.indexOf(document.activeElement);
      const nextIndex = currentIndex === -1
        ? (event.shiftKey ? focusables.length - 1 : 0)
        : (currentIndex + (event.shiftKey ? -1 : 1) + focusables.length) % focusables.length;
      focusables[nextIndex].focus({ preventScroll: true });
    }
  }

  overlay?.addEventListener('keydown', handleOverlayKeydown);
  document.addEventListener('keydown', event => {
    if (!overlay || overlay.hidden || finishing || overlay.contains(event.target)) return;
    handleOverlayKeydown(event);
  });

  try {
    if (sessionStorage.getItem('ruang-kopi-intro-seen') === '1') {
      localStorage.setItem('ruang-kopi-intro-seen', '1');
    }
  } catch (_) {}
  if (document.querySelector('#storage-recovery')?.hidden && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    startIntro();
  }
  window.RKIntro = { start: startIntro, skip: endIntro };
})();
