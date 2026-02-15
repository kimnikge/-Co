import { c as create_ssr_component } from './ssr-75050fa2.js';

const css = {
  code: ".panel.svelte-16vktkp{border:1px solid var(--panel-border);background:var(--panel);border-radius:20px;padding:1.2rem;box-shadow:var(--shadow);margin-bottom:1rem}.eyebrow.svelte-16vktkp{margin:0;color:var(--accent);font-weight:700;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.06em}h1.svelte-16vktkp{margin:0.35rem 0 0.65rem}p.svelte-16vktkp{margin:0;color:var(--muted);line-height:1.6}.form.svelte-16vktkp{display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:0.9rem}label.svelte-16vktkp{display:flex;flex-direction:column;gap:0.35rem;color:var(--muted);font-size:0.9rem}input.svelte-16vktkp{border:1px solid var(--panel-border);background:rgba(148, 163, 184, 0.08);color:var(--text);border-radius:10px;padding:0.65rem 0.75rem}button.svelte-16vktkp{grid-column:1 / -1;border:0;border-radius:12px;padding:0.7rem 1rem;font-weight:600;color:#f8fafc;background:linear-gradient(135deg, var(--accent), var(--accent-2));cursor:pointer}@media(max-width: 860px){.form.svelte-16vktkp{grid-template-columns:1fr}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<section class="panel svelte-16vktkp" data-svelte-h="svelte-1ckbbjj"><p class="eyebrow svelte-16vktkp">Контакты</p> <h1 class="svelte-16vktkp">Запрос на консультацию</h1> <p class="svelte-16vktkp">Оставьте заявку — вернёмся с расчётом нагрузки и рекомендацией по режиму налогообложения.</p></section> <section class="panel svelte-16vktkp"><form class="form svelte-16vktkp" data-svelte-h="svelte-cx9u"><label class="svelte-16vktkp"><span>Имя</span> <input type="text" placeholder="Ваше имя" class="svelte-16vktkp"></label> <label class="svelte-16vktkp"><span>Телефон</span> <input type="tel" placeholder="+7 7XX XXX XX XX" class="svelte-16vktkp"></label> <label class="svelte-16vktkp"><span>Тип бизнеса</span> <input type="text" placeholder="ТОО / ИП" class="svelte-16vktkp"></label> <label class="svelte-16vktkp"><span>Режим налогообложения</span> <input type="text" placeholder="УСН / ОУР" class="svelte-16vktkp"></label> <button type="submit" class="svelte-16vktkp">Отправить заявку</button></form> </section>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-6939a992.js.map
