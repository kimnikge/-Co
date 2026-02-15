<section class="panel hero">
	<p class="eyebrow">Прайс</p>
	<h1>Тарифы и расценки</h1>
	<p>Ориентировочные цены по ключевым направлениям: бухгалтерские услуги, консультации и обучение на практике.</p>
</section>

<section class="grid three">
	<article class="panel card card-services">
		<h2>Бухгалтерские услуги</h2>
		<ul>
			<li><strong>ТОО (до 3 сотрудников):</strong> УСН — от ₸80 000, ОУР — от ₸150 000</li>
			<li><strong>ИП (до 3 сотрудников):</strong> УСН — от ₸80 000, ОУР — от ₸150 000</li>
			<li><strong>Дополнительно:</strong> строительство +₸100 000, производство +₸100 000</li>
			<li><strong>НДС:</strong> +₸100 000</li>
			<li><strong>КПН (авансовые платежи):</strong> +₸100 000</li>
			<li><strong>Работники:</strong> +₸10 000 за каждого физ.лица</li>
		</ul>
	</article>

	<article class="panel card card-consulting">
		<h2>Консультации</h2>
		<ul>
			<li><strong>В офисе (1 час):</strong> ₸25 000 для физ.лиц / ₸35 000 для юр.лиц</li>
			<li><strong>На выезде (1 час):</strong> ₸40 000 для юр.лиц</li>
			<li>Темы: бухучёт, налоговый учёт, 1С, оптимизация и налоговая нагрузка</li>
		</ul>
	</article>

	<article class="panel card card-training">
		<h2>Обучение на практике</h2>
		<ul>
			<li><strong>По запросу:</strong> 1 час — ₸25 000</li>
			<li>Индивидуальный формат под задачи компании</li>
			<li>Разбор кейсов и документов «на практике»</li>
		</ul>
	</article>
</section>

<section class="panel note">
	<p>Тарифы указаны для предварительной оценки и могут уточняться после брифа по задаче.</p>
</section>

<style>
	.panel {
		position: relative;
		overflow: hidden;
		border: 1px solid var(--panel-border);
		background: var(--panel);
		border-radius: 20px;
		padding: 1.2rem;
		box-shadow: var(--shadow);
		margin-bottom: 1rem;
	}

	.hero {
		background:
			radial-gradient(circle at 15% 20%, rgba(79, 124, 255, 0.22), transparent 45%),
			radial-gradient(circle at 80% 15%, rgba(124, 140, 255, 0.2), transparent 42%),
			var(--panel);
	}

	.eyebrow { margin: 0; color: var(--accent); font-weight: 700; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; }
	h1 { margin: 0.35rem 0 0.65rem; }
	h2 { margin: 0 0 0.55rem; }
	p, li { color: var(--muted); line-height: 1.6; }

	.grid { display: grid; gap: 1rem; }
	.grid.three { grid-template-columns: repeat(3, minmax(0, 1fr)); }

	.card::before {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: 0.45;
	}

	.card-services::before {
		background:
			linear-gradient(140deg, rgba(99, 102, 241, 0.14), transparent 60%),
			repeating-linear-gradient(0deg, rgba(148, 163, 184, 0.08) 0 2px, transparent 2px 9px);
	}

	.card-consulting::before {
		background:
			radial-gradient(circle at 90% 10%, rgba(59, 130, 246, 0.2), transparent 40%),
			repeating-linear-gradient(45deg, rgba(148, 163, 184, 0.08) 0 3px, transparent 3px 11px);
	}

	.card-training::before {
		background:
			linear-gradient(180deg, rgba(99, 102, 241, 0.16), transparent 55%),
			radial-gradient(circle at 20% 80%, rgba(148, 163, 184, 0.16), transparent 44%);
	}

	.card > * {
		position: relative;
		z-index: 1;
	}

	ul { margin: 0; padding-left: 1rem; }
	.note p { margin: 0; font-size: 0.92rem; }

	@media (max-width: 980px) {
		.grid.three { grid-template-columns: 1fr; }
	}
</style>
