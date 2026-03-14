(function () {
  'use strict';

  const MONTHS = 12;

  // Parse input value; comma or dot as decimal separator
  function parseVal(input) {
    if (!input || input.value.trim() === '') return null;
    return parseFloat(input.value.replace(',', '.')) || 0;
  }

  // Format number: 30500000 → "30,5 млн", 1500000 → "1,5 млн"
  // Values are entered directly in millions, so 30.5 → "30,5 млн"
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

  // Same but no sign prefix (for plan/fact totals)
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

      // Diff cell
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

    // Year totals
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

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.cell-input').forEach(function (input) {
      input.addEventListener('input', recalculate);
    });
    recalculate();
  });
})();
