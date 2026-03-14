(function () {
  'use strict';

  const MONTHS = 12;
  const STORAGE_KEY = 'partners-budget';

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

  function recalculate() {
    let planTotal = 0;
    let factTotal = 0;
    let planHasAny = false;
    let factHasAny = false;

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
        const p = plan ?? 0;
        const f = fact ?? 0;
        const diff = f - p;
        diffSpan.textContent = fmt(diff);
        if (diff > 0) {
          diffSpan.className = 'diff-val positive';
        } else if (diff < 0) {
          diffSpan.className = 'diff-val negative';
        } else {
          diffSpan.className = 'diff-val';
        }
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
      if (totalDiff > 0) {
        diffTotalEl.className = 'diff-val total-val positive';
      } else if (totalDiff < 0) {
        diffTotalEl.className = 'diff-val total-val negative';
      } else {
        diffTotalEl.className = 'diff-val total-val';
      }
    }
  }

  // ===== localStorage =====

  function saveData() {
    var data = { plan: {}, fact: {} };
    for (var m = 1; m <= MONTHS; m++) {
      var planInput = document.querySelector('.plan-input[data-month="' + m + '"]');
      var factInput = document.querySelector('.fact-input[data-month="' + m + '"]');
      data.plan[m] = planInput ? planInput.value : '';
      data.fact[m] = factInput ? factInput.value : '';
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function loadData() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var data = JSON.parse(raw);
      for (var m = 1; m <= MONTHS; m++) {
        var planInput = document.querySelector('.plan-input[data-month="' + m + '"]');
        var factInput = document.querySelector('.fact-input[data-month="' + m + '"]');
        if (planInput && data.plan && data.plan[m] !== undefined) planInput.value = data.plan[m];
        if (factInput && data.fact && data.fact[m] !== undefined) factInput.value = data.fact[m];
      }
    } catch (e) {}
  }

  var statusTimer = null;
  function showSaved() {
    var el = document.getElementById('saveStatus');
    if (!el) return;
    el.textContent = 'Сохранено';
    el.classList.add('visible');
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () {
      el.classList.remove('visible');
    }, 2000);
  }

  // ===== Init =====

  document.addEventListener('DOMContentLoaded', function () {
    loadData();
    recalculate();

    document.querySelectorAll('.cell-input').forEach(function (input) {
      input.addEventListener('input', function () {
        recalculate();
        saveData(); // автосохранение при каждом вводе
      });
    });

    var saveBtn = document.getElementById('saveBtn');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        saveData();
        showSaved();
      });
    }
  });
})();
