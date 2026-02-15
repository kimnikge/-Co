<section class="panel">
	<p class="eyebrow">Админ-панель</p>
	<h1>Заявки и статусы</h1>
	<p>Минимальный демонстрационный вид CRM: список лидов, текущий статус и быстрые действия.</p>
</section>

<section class="panel">
	<div class="toolbar">
		<select>
			<option>Все статусы</option>
			<option>new</option>
			<option>in_progress</option>
			<option>closed</option>
		</select>
		<button>Экспорт CSV</button>
	</div>
	<div class="table-wrap">
		<table>
			<thead>
				<tr><th>Дата</th><th>Имя</th><th>Телефон</th><th>Режим</th><th>Статус</th></tr>
			</thead>
			<tbody>
				<tr><td>2026-02-13</td><td>Айдар</td><td>+7 777 111 22 33</td><td>УСН</td><td>new</td></tr>
				<tr><td>2026-02-12</td><td>Мадина</td><td>+7 701 555 66 77</td><td>ОУР</td><td>in_progress</td></tr>
			</tbody>
		</table>
	</div>
</section>

<style>
	.panel { border: 1px solid var(--panel-border); background: var(--panel); border-radius: 20px; padding: 1.2rem; box-shadow: var(--shadow); margin-bottom: 1rem; }
	.eyebrow { margin: 0; color: var(--accent); font-weight: 700; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; }
	h1 { margin: 0.35rem 0 0.65rem; }
	p { margin: 0; color: var(--muted); line-height: 1.6; }
	.toolbar { display: flex; gap: 0.6rem; margin-bottom: 0.8rem; }
	select, button { border: 1px solid var(--panel-border); background: rgba(148, 163, 184, 0.08); color: var(--text); border-radius: 10px; padding: 0.55rem 0.7rem; }
	button { background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: #f8fafc; border: 0; font-weight: 600; }
	.table-wrap { overflow: auto; }
	table { width: 100%; border-collapse: collapse; min-width: 640px; }
	th, td { text-align: left; padding: 0.6rem; border-bottom: 1px solid var(--panel-border); color: var(--muted); }
	th { color: var(--text); }
</style>