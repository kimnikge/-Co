import { c as create_ssr_component, b as add_attribute, e as escape, f as each } from "../../../chunks/ssr.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".panel.svelte-tlntnn.svelte-tlntnn{border:1px solid var(--panel-border);background:var(--panel);border-radius:20px;padding:1.2rem;box-shadow:var(--shadow);margin-bottom:1rem}.eyebrow.svelte-tlntnn.svelte-tlntnn{margin:0;color:var(--accent);font-weight:700;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.06em}h1.svelte-tlntnn.svelte-tlntnn{margin:0.35rem 0 0}.login-panel.svelte-tlntnn.svelte-tlntnn{max-width:380px;margin:4rem auto}.login-form.svelte-tlntnn.svelte-tlntnn{display:flex;flex-direction:column;gap:0.7rem;margin-top:1rem}.login-form.svelte-tlntnn input.svelte-tlntnn{border:1px solid var(--panel-border);background:rgba(148,163,184,0.08);color:var(--text);border-radius:10px;padding:0.7rem 0.85rem;font-size:1rem}.login-form.svelte-tlntnn input.svelte-tlntnn:focus{outline:2px solid var(--accent);border-color:transparent}.error.svelte-tlntnn.svelte-tlntnn{color:#ef4444;margin:0;font-size:0.88rem}.btn-primary.svelte-tlntnn.svelte-tlntnn{background:linear-gradient(135deg, var(--accent), var(--accent-2));color:#f8fafc;border:0;border-radius:10px;padding:0.7rem;font-weight:600;font-size:1rem;cursor:pointer}.admin-header.svelte-tlntnn.svelte-tlntnn{display:flex;align-items:flex-start;justify-content:space-between}.btn-logout.svelte-tlntnn.svelte-tlntnn{border:1px solid var(--panel-border);background:rgba(148,163,184,0.08);color:var(--muted);border-radius:10px;padding:0.5rem 0.85rem;cursor:pointer;font-size:0.88rem}.btn-logout.svelte-tlntnn.svelte-tlntnn:hover{background:rgba(239,68,68,0.15);color:#ef4444}.toolbar.svelte-tlntnn.svelte-tlntnn{display:flex;align-items:center;gap:0.6rem;margin-bottom:0.8rem;flex-wrap:wrap}select.svelte-tlntnn.svelte-tlntnn{border:1px solid var(--panel-border);background:rgba(148,163,184,0.08);color:var(--text);border-radius:10px;padding:0.5rem 0.7rem}.count.svelte-tlntnn.svelte-tlntnn{font-size:0.85rem;color:var(--muted)}.btn-export.svelte-tlntnn.svelte-tlntnn{background:linear-gradient(135deg, var(--accent), var(--accent-2));color:#f8fafc;border:0;border-radius:10px;padding:0.5rem 0.8rem;font-weight:600;cursor:pointer;margin-left:auto}.btn-refresh.svelte-tlntnn.svelte-tlntnn{border:1px solid var(--panel-border);background:rgba(148,163,184,0.08);border-radius:10px;padding:0.5rem 0.6rem;cursor:pointer;font-size:1rem}.table-wrap.svelte-tlntnn.svelte-tlntnn{overflow:auto}table.svelte-tlntnn.svelte-tlntnn{width:100%;border-collapse:collapse;min-width:740px}th.svelte-tlntnn.svelte-tlntnn,td.svelte-tlntnn.svelte-tlntnn{text-align:left;padding:0.55rem 0.5rem;border-bottom:1px solid var(--panel-border);color:var(--muted);font-size:0.9rem}th.svelte-tlntnn.svelte-tlntnn{color:var(--text);font-weight:600}td.svelte-tlntnn a.svelte-tlntnn{color:var(--accent)}.status-badge.svelte-tlntnn.svelte-tlntnn{display:inline-block;padding:0.2rem 0.55rem;border-radius:8px;font-size:0.8rem;font-weight:600}.status-new.svelte-tlntnn.svelte-tlntnn{background:rgba(59,130,246,0.15);color:#3b82f6}.status-progress.svelte-tlntnn.svelte-tlntnn{background:rgba(245,158,11,0.15);color:#f59e0b}.status-closed.svelte-tlntnn.svelte-tlntnn{background:rgba(34,197,94,0.15);color:#22c55e}.actions.svelte-tlntnn.svelte-tlntnn{white-space:nowrap}.btn-sm.svelte-tlntnn.svelte-tlntnn{background:linear-gradient(135deg, var(--accent), var(--accent-2));color:#f8fafc;border:0;border-radius:8px;padding:0.3rem 0.6rem;font-size:0.78rem;font-weight:600;cursor:pointer}.btn-sm-muted.svelte-tlntnn.svelte-tlntnn{background:rgba(148,163,184,0.15);color:var(--muted)}.muted-text.svelte-tlntnn.svelte-tlntnn{color:var(--muted);text-align:center;padding:2rem 0}",
  map: null
};
function formatDate(iso) {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filtered;
  let { data } = $$props;
  let isAuth = data.isAuth;
  let login = "";
  let password = "";
  let requests = [];
  let loading = false;
  async function loadRequests() {
    loading = true;
    try {
      const res = await fetch("/api/requests");
      if (res.ok) {
        requests = await res.json();
        requests.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
    } catch {
    }
    loading = false;
  }
  const statusLabels = {
    new: "Новая",
    in_progress: "В работе",
    closed: "Закрыта"
  };
  const statusClasses = {
    new: "status-new",
    in_progress: "status-progress",
    closed: "status-closed"
  };
  function statusLabel(s) {
    return statusLabels[s] || s;
  }
  function statusClass(s) {
    return statusClasses[s] || "";
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  filtered = requests;
  {
    if (isAuth && requests.length === 0) {
      loadRequests();
    }
  }
  return `${!isAuth ? `<section class="panel login-panel svelte-tlntnn"><h1 class="svelte-tlntnn" data-svelte-h="svelte-1jvfy53">Вход в админ-панель</h1> <form class="login-form svelte-tlntnn"><input type="text" placeholder="Логин" autocomplete="username" required class="svelte-tlntnn"${add_attribute("value", login, 0)}> <input type="password" placeholder="Пароль" autocomplete="current-password" required class="svelte-tlntnn"${add_attribute("value", password, 0)}> ${``} <button type="submit" class="btn-primary svelte-tlntnn" data-svelte-h="svelte-110ro5o">Войти</button></form></section>` : `<section class="panel svelte-tlntnn"><div class="admin-header svelte-tlntnn"><div data-svelte-h="svelte-15mqojp"><p class="eyebrow svelte-tlntnn">Админ-панель</p> <h1 class="svelte-tlntnn">Заявки</h1></div> <button class="btn-logout svelte-tlntnn" data-svelte-h="svelte-zeikqt">Выйти</button></div></section> <section class="panel svelte-tlntnn"><div class="toolbar svelte-tlntnn"><select class="svelte-tlntnn"><option value="all" data-svelte-h="svelte-1ezqm8n">Все статусы</option><option value="new" data-svelte-h="svelte-1hbapzp">Новые</option><option value="in_progress" data-svelte-h="svelte-qo3eyb">В работе</option><option value="closed" data-svelte-h="svelte-1spajga">Закрытые</option></select> <span class="count svelte-tlntnn">${escape(filtered.length)} из ${escape(requests.length)}</span> <button class="btn-export svelte-tlntnn" data-svelte-h="svelte-1tvytsv">Экспорт CSV</button> <button class="btn-refresh svelte-tlntnn" data-svelte-h="svelte-1hmi41q">🔄</button></div> ${loading ? `<p class="muted-text svelte-tlntnn" data-svelte-h="svelte-1u58exm">Загрузка...</p>` : `${filtered.length === 0 ? `<p class="muted-text svelte-tlntnn" data-svelte-h="svelte-1qne5r">Заявки не найдены</p>` : `<div class="table-wrap svelte-tlntnn"><table class="svelte-tlntnn"><thead data-svelte-h="svelte-1k2tj6e"><tr><th class="svelte-tlntnn">Дата</th> <th class="svelte-tlntnn">Имя</th> <th class="svelte-tlntnn">Телефон</th> <th class="svelte-tlntnn">Тип</th> <th class="svelte-tlntnn">Режим</th> <th class="svelte-tlntnn">Статус</th> <th class="svelte-tlntnn">Действия</th></tr></thead> <tbody>${each(filtered, (req) => {
    return `<tr><td class="svelte-tlntnn">${escape(formatDate(req.date))}</td> <td class="svelte-tlntnn">${escape(req.name)}</td> <td class="svelte-tlntnn"><a href="${"tel:" + escape(req.phone, true)}" class="svelte-tlntnn">${escape(req.phone)}</a></td> <td class="svelte-tlntnn">${escape(req.businessType || "—")}</td> <td class="svelte-tlntnn">${escape(req.regime)}</td> <td class="svelte-tlntnn"><span class="${"status-badge " + escape(statusClass(req.status), true) + " svelte-tlntnn"}">${escape(statusLabel(req.status))}</span></td> <td class="actions svelte-tlntnn">${req.status === "new" ? `<button class="btn-sm svelte-tlntnn" data-svelte-h="svelte-17xqk61">В работу</button>` : ``} ${req.status === "in_progress" ? `<button class="btn-sm svelte-tlntnn" data-svelte-h="svelte-14zen8y">Закрыть</button>` : ``} ${req.status === "closed" ? `<button class="btn-sm btn-sm-muted svelte-tlntnn" data-svelte-h="svelte-lut4gu">Вернуть</button>` : ``}</td> </tr>`;
  })}</tbody></table></div>`}`}</section>`}`;
});
export {
  Page as default
};
