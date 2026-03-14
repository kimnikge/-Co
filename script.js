(function () {
  'use strict';

  const MONTHS = 12;
  const STORAGE_KEY = 'partners-budget';

  // ← Вставь сюда URL из Google Apps Script после деплоя
  const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxcBpPFa1xlhhUTnu-1R_fTAM1s_h0b7J9tZFNhbmy32L84tXkIjc7MuKN6LCRHlMMI/exec';

  // ===== Helpers =====

  function parseVal(input) {
    if (!input || input.value.trim() === '') return null;
    return parseFloat(input.value.replace(',', '.')) || 0;
  }

  function fmt(val) {
    if (val === null) return '—';
    const abs = Math.abs(val);
    const sign = val < 0 ? '−\u202f' : val > 0 ? '+\u202f' : '';
    const str = abs.toLocaleString('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return sign + str + '\u202fмлн';
  }

  function fmtTotal(val) {
    if (val === null || val === 0) return '—';
    return val.toLocaleString('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }) + '\u202fмлн';
  }

  // ===== Recalculate =====

  function recalculate() {
    let planTotal = 0, factTotal = 0;
    let planHasAny = false, factHasAny = false;

    for (let m = 1; m <= MONTHS; m++) {
      const planInput = document.querySelector(`.plan-input[data-month="${m}"]`);
      const factInput = document.querySelector(`.fact-input[data-month="${m}"]`);
      const diffSpan  = document.querySelector(`.diff-val[data-month="${m}"]`);

      const plan = parseVal(planInput);
      const fact = parseVal(factInput);

      if (plan !== null) { planTotal += plan; planHasAny = true; }
      if (fact !== null) { factTotal += fact; factHasAny = true; }

      if (plan === null && fact === null) {
        diffSpan.textContent = '—';
        diffSpan.className = 'diff-val';
      } else {
        const diff = (fact ?? 0) - (plan ?? 0);
        diffSpan.textContent = fmt(diff);
        diffSpan.className = 'diff-val' + (diff > 0 ? ' positive' : diff < 0 ? ' negative' : '');
      }
    }

    document.getElementById('plan-total').textContent = fmtTotal(planHasAny ? planTotal : null);
    document.getElementById('fact-total').textContent = fmtTotal(factHasAny ? factTotal : null);

    const diffTotalEl = document.getElementById('diff-total');
    if (!planHasAny && !factHasAny) {
      diffTotalEl.textContent = '—';
      diffTotalEl.className = 'diff-val total-val';
    } else {
      const totalDiff = factTotal - planTotal;
      diffTotalEl.textContent = fmt(totalDiff);
      diffTotalEl.className = 'diff-val total-val' + (totalDiff > 0 ? ' positive' : totalDiff < 0 ? ' negative' : '');
    }
  }

  // ===== Collect data from inputs =====

  function collectData() {
    var data = { plan: {}, fact: {} };
    for (var m = 1; m <= MONTHS; m++) {
      var pi = document.querySelector('.plan-input[data-month="' + m + '"]');
      var fi = document.querySelector('.fact-input[data-month="' + m + '"]');
      data.plan[m] = pi ? pi.value : '';
      data.fact[m] = fi ? fi.value : '';
    }
    return data;
  }

  // ===== Populate inputs from data =====

  function populateData(data) {
    for (var m = 1; m <= MONTHS; m++) {
      var pi = document.querySelector('.plan-input[data-month="' + m + '"]');
      var fi = document.querySelector('.fact-input[data-month="' + m + '"]');
      if (pi && data.plan && data.plan[m] !== undefined) pi.value = data.plan[m];
      if (fi && data.fact && data.fact[m] !== undefined) fi.value = data.fact[m];
    }
    recalculate();
  }

  // ===== localStorage (резервное хранилище) =====

  function lsSave(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
  }

  function lsLoad() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  // ===== Google Sheets =====

  function sheetsSave(data) {
    if (!SHEETS_URL) return Promise.resolve();
    var encoded = encodeURIComponent(JSON.stringify(data));
    return fetch(SHEETS_URL + '?action=save&data=' + encoded)
      .catch(function () {});
  }

  function sheetsLoad() {
    if (!SHEETS_URL) return Promise.resolve(null);
    return fetch(SHEETS_URL + '?action=load')
      .then(function (r) { return r.json(); })
      .catch(function () { return null; });
  }

  // ===== Status =====

  var statusTimer = null;
  function showStatus(msg, isError) {
    var el = document.getElementById('saveStatus');
    if (!el) return;
    el.textContent = msg;
    el.style.color = isError ? 'var(--color-negative)' : 'var(--color-positive)';
    el.classList.add('visible');
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { el.classList.remove('visible'); }, 2500);
  }

  // ===== Save =====

  function saveAll() {
    var data = collectData();
    lsSave(data);
    setBtnState(true);
    sheetsSave(data).then(function () {
      setBtnState(false);
      showStatus('Сохранено');
    });
  }

  function setBtnState(loading) {
    var btn = document.getElementById('saveBtn');
    if (!btn) return;
    btn.disabled = loading;
    btn.textContent = loading ? 'Сохраняю...' : 'Сохранить';
  }

  // ===== Init =====

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.cell-input').forEach(function (input) {
      input.addEventListener('input', function () {
        recalculate();
        lsSave(collectData()); // автосохранение в localStorage
      });
    });

    var saveBtn = document.getElementById('saveBtn');
    if (saveBtn) saveBtn.addEventListener('click', saveAll);

    // Загружаем: сначала localStorage (мгновенно), потом Google Sheets (перезаписывает)
    var local = lsLoad();
    if (local) populateData(local);

    if (SHEETS_URL) {
      showStatus('Загрузка...');
      sheetsLoad().then(function (data) {
        if (data && (Object.keys(data.plan || {}).length || Object.keys(data.fact || {}).length)) {
          populateData(data);
          lsSave(data);
          showStatus('Данные загружены');
        } else {
          document.getElementById('saveStatus').classList.remove('visible');
        }
      });
    }
  });
})();
