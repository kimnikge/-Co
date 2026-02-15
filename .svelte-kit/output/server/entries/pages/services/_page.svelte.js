import { c as create_ssr_component } from "../../../chunks/ssr.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".panel.svelte-1slyvvm{border:1px solid var(--panel-border);background:var(--panel);border-radius:20px;padding:1.2rem;box-shadow:var(--shadow);margin-bottom:1rem}.eyebrow.svelte-1slyvvm{margin:0;color:var(--accent);font-weight:700;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.06em}h1.svelte-1slyvvm{margin:0.35rem 0 0.65rem}h2.svelte-1slyvvm{margin:0 0 0.4rem;font-size:1.05rem}p.svelte-1slyvvm{margin:0;color:var(--muted);line-height:1.6}.grid.svelte-1slyvvm{display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:1rem}@media(max-width: 860px){.grid.svelte-1slyvvm{grid-template-columns:1fr}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<section class="panel svelte-1slyvvm" data-svelte-h="svelte-5ipwnj"><p class="eyebrow svelte-1slyvvm">Услуги</p> <h1 class="svelte-1slyvvm">Бухгалтерское и налоговое сопровождение</h1> <p class="svelte-1slyvvm">Минимальный набор услуг для быстрого старта: аудит, расчёты и ведение отчётности под изменения НК 2026.</p></section> <section class="grid svelte-1slyvvm" data-svelte-h="svelte-v54qe2"><article class="panel svelte-1slyvvm"><h2 class="svelte-1slyvvm">ТОО на ОУР</h2><p class="svelte-1slyvvm">Переход, настройка учёта, контроль налоговой нагрузки.</p></article> <article class="panel svelte-1slyvvm"><h2 class="svelte-1slyvvm">ТОО на УСН</h2><p class="svelte-1slyvvm">Проверка рисков и подготовка к изменениям по вычетам.</p></article> <article class="panel svelte-1slyvvm"><h2 class="svelte-1slyvvm">ИП</h2><p class="svelte-1slyvvm">Подбор режима, закрытие ошибок, безопасная отчётность.</p></article> <article class="panel svelte-1slyvvm"><h2 class="svelte-1slyvvm">ВЭД</h2><p class="svelte-1slyvvm">Сопровождение экспортно-импортных операций и документов.</p></article> <article class="panel svelte-1slyvvm"><h2 class="svelte-1slyvvm">Оптимизация</h2><p class="svelte-1slyvvm">Законные сценарии снижения нагрузки и финансовый прогноз.</p></article> </section>`;
});
export {
  Page as default
};
