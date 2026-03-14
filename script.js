(function () {
  'use strict';

  const MONTHS = 12;
  const STORAGE_KEY = 'partners-budget';

  // ← Вставь сюда URL из Google Apps Script после деплоя
  const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzdkoitgP52X8JAJGtkhFC1I55qj8ia1yVNMDHsXEuvbwtVXDg7C5FHdyaXbusU9Rg/exec';

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
    var data = { plan: {}, fact: {}, cat1: [], cat2: [], cat3: [] };
    for (var m = 1; m <= MONTHS; m++) {
      var pi = document.querySelector('.plan-input[data-month="' + m + '"]');
      var fi = document.querySelector('.fact-input[data-month="' + m + '"]');
      data.plan[m] = pi ? pi.value : '';
      data.fact[m] = fi ? fi.value : '';
    }
    [1, 2, 3].forEach(function (n) {
      var names = document.querySelectorAll('.cat' + n + '-name');
      var vals  = document.querySelectorAll('.cat' + n + '-val');
      var rows  = [];
      for (var r = 0; r < 6; r++) {
        rows.push({
          name: names[r] ? names[r].value : '',
          a:    vals[r * 2]     ? vals[r * 2].value     : '',
          b:    vals[r * 2 + 1] ? vals[r * 2 + 1].value : ''
        });
      }
      data['cat' + n] = rows;
    });
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
    [1, 2, 3].forEach(function (n) {
      var rows = data['cat' + n];
      if (!rows) return;
      var names = document.querySelectorAll('.cat' + n + '-name');
      var vals  = document.querySelectorAll('.cat' + n + '-val');
      for (var r = 0; r < rows.length; r++) {
        if (names[r]) names[r].value = rows[r].name || '';
        if (vals[r * 2])     vals[r * 2].value     = rows[r].a || '';
        if (vals[r * 2 + 1]) vals[r * 2 + 1].value = rows[r].b || '';
      }
    });
    recalculate();
    recalcAllCatTotals();
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

  // ===== Category Totals =====

  function recalcatTotals(cls, idA, idB) {
    var inputs = document.querySelectorAll('.' + cls);
    var sumA = 0, sumB = 0;
    for (var i = 0; i < inputs.length; i += 2) {
      sumA += parseFloat(inputs[i].value) || 0;
      sumB += parseFloat(inputs[i + 1].value) || 0;
    }
    var elA = document.getElementById(idA);
    var elB = document.getElementById(idB);
    if (elA) elA.textContent = sumA % 1 === 0 ? sumA : sumA.toFixed(2);
    if (elB) elB.textContent = sumB % 1 === 0 ? sumB : sumB.toFixed(2);
  }

  function recalcAllCatTotals() {
    recalcatTotals('cat1-val', 'cat1-total-a', 'cat1-total-b');
    recalcatTotals('cat2-val', 'cat2-total-a', 'cat2-total-b');
    recalcatTotals('cat3-val', 'cat3-total-a', 'cat3-total-b');
  }

  // ===== Init =====

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.cell-input').forEach(function (input) {
      input.addEventListener('input', function () {
        recalculate();
        lsSave(collectData()); // автосохранение в localStorage
      });
    });

    document.querySelectorAll('.cat-input-val').forEach(function (input) {
      input.addEventListener('input', recalcAllCatTotals);
    });
    recalcAllCatTotals();

    var saveBtn = document.getElementById('saveBtn');
    if (saveBtn) saveBtn.addEventListener('click', saveAll);

    // Автосохранение каждые 30 секунд
    setInterval(saveAll, 30000);

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
