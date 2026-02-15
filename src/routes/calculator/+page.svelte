<section class="panel">
	<p class="eyebrow">Калькулятор</p>
	<h1>Быстрый расчёт налоговой нагрузки</h1>
	<p>Минимальная форма для наглядной оценки УСН и ОУР на основе выручки, ФОТ и НДС.</p>
</section>

<section class="panel">
	<form class="form" on:submit|preventDefault>
		<label><span>Выручка в месяц (₸)</span><input type="number" placeholder="12000000" /></label>
		<label><span>ФОТ в месяц (₸)</span><input type="number" placeholder="2500000" /></label>
		<label><span>НДС</span><select><option>Нет</option><option>Да</option></select></label>
		<label><span>Текущий режим</span><select><option>УСН</option><option>ОУР</option></select></label>
		<button type="submit">Рассчитать</button>
	</form>
	<div class="result">Оценка появится после подключения расчётной логики.</div>
	<p class="legal-note">Данные в этой форме не сохраняются и не передаются третьим лицам. Расчёты носят исключительно ознакомительный характер и не являются налоговой консультацией.</p>
</section>

<style>
	.panel { border: 1px solid var(--panel-border); background: var(--panel); border-radius: 20px; padding: 1.2rem; box-shadow: var(--shadow); margin-bottom: 1rem; }
	.eyebrow { margin: 0; color: var(--accent); font-weight: 700; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; }
	h1 { margin: 0.35rem 0 0.65rem; }
	p { margin: 0; color: var(--muted); line-height: 1.6; }
	.form { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.9rem; }
	label { display: flex; flex-direction: column; gap: 0.35rem; color: var(--muted); font-size: 0.9rem; }
	input, select { border: 1px solid var(--panel-border); background: rgba(148, 163, 184, 0.08); color: var(--text); border-radius: 10px; padding: 0.65rem 0.75rem; }
	button { grid-column: 1 / -1; border: 0; border-radius: 12px; padding: 0.7rem 1rem; font-weight: 600; color: #f8fafc; background: linear-gradient(135deg, var(--accent), var(--accent-2)); cursor: pointer; }
	.result { margin-top: 0.9rem; color: var(--muted); border: 1px dashed var(--panel-border); border-radius: 12px; padding: 0.8rem; }
	.legal-note { margin-top: 0.7rem; font-size: 0.82rem; color: var(--muted); line-height: 1.5; opacity: 0.9; }
	@media (max-width: 860px) { .form { grid-template-columns: 1fr; } }
</style>