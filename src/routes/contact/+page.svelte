<section class="panel">
	<p class="eyebrow">Контакты</p>
	<h1>Запрос на консультацию</h1>
	<p>Оставьте заявку — вернёмся с расчётом нагрузки и рекомендацией по режиму налогообложения.</p>
</section>

<section class="panel">
	<form class="form" on:submit|preventDefault>
		<label>
			<span>Имя</span>
			<input type="text" placeholder="Ваше имя" />
		</label>
		<label>
			<span>Телефон</span>
			<input type="tel" placeholder="+7 7XX XXX XX XX" />
		</label>
		<label>
			<span>Тип бизнеса</span>
			<input type="text" placeholder="ТОО / ИП" />
		</label>
		<label>
			<span>Режим налогообложения</span>
			<input type="text" placeholder="УСН / ОУР" />
		</label>
		<button type="submit">Отправить заявку</button>
	</form>
</section>

<style>
	.panel { border: 1px solid var(--panel-border); background: var(--panel); border-radius: 20px; padding: 1.2rem; box-shadow: var(--shadow); margin-bottom: 1rem; }
	.eyebrow { margin: 0; color: var(--accent); font-weight: 700; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; }
	h1 { margin: 0.35rem 0 0.65rem; }
	p { margin: 0; color: var(--muted); line-height: 1.6; }
	.form { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.9rem; }
	label { display: flex; flex-direction: column; gap: 0.35rem; color: var(--muted); font-size: 0.9rem; }
	input { border: 1px solid var(--panel-border); background: rgba(148, 163, 184, 0.08); color: var(--text); border-radius: 10px; padding: 0.65rem 0.75rem; }
	button { grid-column: 1 / -1; border: 0; border-radius: 12px; padding: 0.7rem 1rem; font-weight: 600; color: #f8fafc; background: linear-gradient(135deg, var(--accent), var(--accent-2)); cursor: pointer; }
	@media (max-width: 860px) { .form { grid-template-columns: 1fr; } }
</style>