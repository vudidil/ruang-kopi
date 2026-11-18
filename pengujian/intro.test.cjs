const { setup } = require('./core.test.cjs');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(path.join(__dirname, '../website/intro-controller.js'), 'utf8');

function boot(local = new Map(), session = new Map(), reduced = false) {
  const storage = { getItem: k => local.get(k) ?? null, setItem: (k, v) => local.set(k, v) };
  const t = setup(null, storage);
  const { context, doc, window } = t;
  context.sessionStorage = { getItem: k => session.get(k) ?? null, setItem: (k, v) => session.set(k, v) };
  window.matchMedia = () => ({ matches: reduced });

  let active = doc.body;
  Object.defineProperty(doc, 'activeElement', { configurable: true, get: () => active });
  window.HTMLElement.prototype.focus = function () { active = this; };

  let now = 0, timerId = 0;
  const timers = new Map();
  context.setTimeout = (fn, delay = 0) => {
    const id = ++timerId;
    timers.set(id, { fn, at: now + Number(delay) });
    return id;
  };
  context.clearTimeout = id => timers.delete(id);
  const advance = ms => {
    const target = now + ms;
    while (true) {
      let nextId = null, nextTimer = null;
      for (const [id, entry] of timers.entries()) {
        if (entry.at <= target && (!nextTimer || entry.at < nextTimer.at)) {
          nextId = id;
          nextTimer = entry;
        }
      }
      if (!nextTimer) break;
      timers.delete(nextId);
      now = nextTimer.at;
      nextTimer.fn();
    }
    now = target;
  };

  let starts = 0, progress = 0, scale = 1, drawCalls = 0, callbacks = {};
  window.RKMotion = {
    drawIntroFrame() { drawCalls++; }
  };
  const timeline = {
    pause() { return this; },
    timeScale(v) { if (v !== undefined) { scale = v; return this; } return scale; },
    restart() { starts++; progress = 0; return this; },
    progress(v) {
      if (v !== undefined) {
        progress = v;
        if (v === 1) callbacks.onComplete?.();
        return this;
      }
      return progress;
    },
    eventCallback(n, f) { callbacks[n] = f; return this; }
  };
  window.__timelines = { 'coffee-intro': timeline };
  vm.runInContext(source, context);
  return { ...t, local, session, callbacks, advance, active: () => active, starts: () => starts, scale: () => scale, drawCalls: () => drawCalls, pendingTimers: () => timers.size };
}

// 1. First visit pauses on opening screen without preloading or starting fallback timer.
const first = boot();
const overlay = first.doc.querySelector('#intro-overlay');
const startBtn = first.doc.querySelector('#intro-start');
const skipBtn = first.doc.querySelector('#intro-skip');
assert.equal(first.starts(), 0);
assert.equal(first.drawCalls(), 0);
assert.equal(first.pendingTimers(), 0);
assert(!overlay.hidden);
assert(!overlay.classList.contains('is-playing'));
assert(first.doc.querySelector('main').inert);
assert(first.doc.querySelector('.sidebar').inert);
assert(first.doc.querySelector('.skip-link').inert);
assert.equal(first.local.get('ruang-kopi-intro-seen'), undefined);
assert.equal(startBtn?.tagName, 'BUTTON');
assert.equal(startBtn?.textContent.trim(), 'Mulai Usahamu');
assert.equal(skipBtn?.tagName, 'BUTTON');
assert.equal(skipBtn?.textContent.trim(), 'Lewati intro');
assert.equal(overlay.querySelectorAll('h1').length, 0);
assert.equal(first.doc.querySelectorAll('h1').length, 1);
assert.equal(overlay.querySelectorAll('img').length, 0);

// 2. Stays paused indefinitely until user activates start or skip.
first.advance(15000);
assert.equal(first.starts(), 0);
assert(!overlay.hidden);

// 3. Focus trap cycles Tab / Shift+Tab between visible controls inside #intro-overlay.
assert.equal(first.active(), startBtn);
const key = (k, shiftKey = false) => {
  const ev = new first.window.Event('keydown', { bubbles: true, cancelable: true });
  ev.key = k;
  ev.shiftKey = shiftKey;
  overlay.dispatchEvent(ev);
};
key('Tab');
assert.equal(first.active(), skipBtn);
key('Tab');
assert.equal(first.active(), startBtn);
key('Tab', true);
assert.equal(first.active(), skipBtn);
first.doc.body.focus();
const bodyShiftTab = new first.window.Event('keydown', { bubbles: true, cancelable: true });
bodyShiftTab.key = 'Tab';
bodyShiftTab.shiftKey = true;
first.doc.body.dispatchEvent(bodyShiftTab);
assert.equal(first.active(), skipBtn);

// 4. Clicking start immediately begins playback from frame 2 (no delay) -> completion.
first.click(startBtn);
assert(overlay.classList.contains('is-playing'));
assert(startBtn.classList.contains('is-pressed'));
assert(startBtn.disabled);
assert.equal(first.drawCalls(), 1);
assert.equal(first.starts(), 1);
assert.equal(first.scale(), 1.35);
first.window.__timelines['coffee-intro'].progress(0.5);
first.callbacks.onUpdate?.();
assert.equal(first.drawCalls(), 2);
first.callbacks.onComplete();
assert(overlay.hidden);
assert(!overlay.classList.contains('is-playing'));
assert(!first.doc.querySelector('main').inert);
assert(!first.doc.querySelector('.sidebar').inert);
assert(!first.doc.querySelector('.skip-link').inert);
assert.equal(first.local.get('ruang-kopi-intro-seen'), '1');
assert.equal(first.active(), first.doc.querySelector('#page'));

// 4b. Stalled playback closes cleanly via 9000ms fallbackTimer.
const stalled = boot();
const stalledOverlay = stalled.doc.querySelector('#intro-overlay');
stalled.click(stalled.doc.querySelector('#intro-start'));
assert.equal(stalled.starts(), 1);
assert(!stalledOverlay.hidden);
stalled.advance(8999);
assert(!stalledOverlay.hidden);
stalled.advance(1);
assert(stalledOverlay.hidden);
assert(!stalled.doc.querySelector('main').inert);
assert.equal(stalled.local.get('ruang-kopi-intro-seen'), '1');
assert.equal(stalled.active(), stalled.doc.querySelector('#page'));

// 5. Return visit still opens intro in paused state and supports Escape & Skip.
const nextTab = boot(first.local);
assert.equal(nextTab.starts(), 0);
const nextOverlay = nextTab.doc.querySelector('#intro-overlay');
const nextStart = nextTab.doc.querySelector('#intro-start');
const nextSkip = nextTab.doc.querySelector('#intro-skip');
assert(!nextOverlay.hidden);
assert(!nextOverlay.classList.contains('is-playing'));
assert(!nextStart.disabled);
nextTab.click(nextStart);
assert.equal(nextTab.starts(), 1);
nextTab.click(nextSkip);
assert(nextOverlay.hidden);

nextTab.window.RKIntro.start();
const esc = new nextTab.window.Event('keydown', { bubbles: true, cancelable: true });
esc.key = 'Escape';
nextOverlay.dispatchEvent(esc);
assert(nextOverlay.hidden);
assert(!nextTab.doc.querySelector('main').inert);
assert(!nextTab.doc.querySelector('.skip-link').inert);

// 6. Legacy sessionStorage migration, reduced motion, and storage-recovery precedence.
const legacy = boot(new Map(), new Map([['ruang-kopi-intro-seen', '1']]));
assert.equal(legacy.starts(), 0);
assert(!legacy.doc.querySelector('#intro-overlay').hidden);
assert.equal(legacy.local.get('ruang-kopi-intro-seen'), '1');

const reduced = boot(new Map(), new Map(), true);
assert.equal(reduced.starts(), 0);
assert.equal(reduced.drawCalls(), 0);
assert(reduced.doc.querySelector('#intro-overlay').hidden);
reduced.window.RKIntro.start();
assert.equal(reduced.drawCalls(), 0);
assert(reduced.doc.querySelector('#intro-overlay').hidden);
assert(!reduced.doc.querySelector('main').inert);
assert(!reduced.doc.querySelector('.skip-link').inert);

const corrupt = boot(new Map([['ruang-kopi-v3', '{broken']]));
assert.equal(corrupt.starts(), 0);
assert(corrupt.doc.querySelector('#intro-overlay').hidden);
assert(!corrupt.doc.querySelector('#storage-recovery').hidden);

console.log('PASS: paused first visit, 3D start transition, focus trap, persistent intro, session migration, skip/escape, reduced motion and recovery priority.');
