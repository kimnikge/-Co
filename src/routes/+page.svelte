<section class="hero panel">
	<p class="eyebrow">Налоговая трансформация 2026</p>
	<h1>Бухгалтерская фирма "Партнеры&Co"</h1>
	<p class="lead">С 2026 года ТОО на упрощёнке теряют вычеты. Переводим бизнес на оптимальный режим без штрафов, потерь и репутационных рисков.</p>
	<div class="cta">
		<a class="btn btn-primary" href="/calculator">Рассчитать нагрузку</a>
		<a class="btn btn-secondary" href="/contact">Получить консультацию</a>
	</div>
</section>

<section class="grid">
	<article class="panel">
		<h2>Бухгалтерские услуги</h2>
		<ul>
			<li>ТОО и ИП: УСН / ОУР</li>
			<li>Ведение отчётности и контроль сроков</li>
			<li>Настройка процессов под НК 2026</li>
		</ul>
		<a class="card-link" href="/services">Перейти к услугам →</a>
	</article>

	<article class="panel">
		<h2>Консультации по налогам</h2>
		<ul>
			<li>Разбор текущего режима и рисков</li>
			<li>Сценарии перехода на оптимальный формат</li>
			<li>Практические рекомендации по шагам</li>
		</ul>
		<a class="card-link" href="/price">Тарифы консультаций →</a>
	</article>

	<article class="panel">
		<h2>Обучение на практике</h2>
		<ul>
			<li>Индивидуальный подход под ваш бизнес</li>
			<li>Разбор рабочих кейсов и документов</li>
			<li>Формат «сразу применить в учёте»</li>
		</ul>
		<a class="card-link" href="/price">Стоимость обучения →</a>
	</article>
</section>

<section class="panel proof">
	<h2>Социальное доказательство</h2>
	<div class="proof-grid">
		<div>
			<strong>150+</strong>
			<span>клиентов на сопровождении</span>
		</div>
		<div>
			<strong>12 лет</strong>
			<span>практики в налоговом учёте</span>
		</div>
		<div>
			<strong>₸ 1.2 млрд+</strong>
			<span>оптимизированной налоговой нагрузки</span>
		</div>
	</div>
</section>

<style>
	.panel {
		border: 1px solid var(--panel-border);
		background: var(--panel);
		border-radius: 20px;
		padding: 1.4rem;
		backdrop-filter: blur(14px);
		box-shadow: var(--shadow);
		margin-bottom: 1rem;
	}

	.hero h1 {
		margin: 0.35rem 0 0.75rem;
		font-size: clamp(1.8rem, 4vw, 3.2rem);
		line-height: 1.1;
	}

	.eyebrow {
		margin: 0;
		color: var(--accent);
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		font-size: 0.78rem;
	}

	.lead {
		margin: 0;
		color: var(--muted);
		max-width: 780px;
		line-height: 1.7;
	}

	.cta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1.1rem;
	}

	.btn {
		padding: 0.7rem 1.05rem;
		border-radius: 12px;
		font-weight: 600;
		transition: transform 0.2s ease, opacity 0.2s ease;
	}

	.btn:hover {
		transform: translateY(-1px);
		opacity: 0.95;
	}

	.btn-primary {
		background: linear-gradient(135deg, var(--accent), var(--accent-2));
		color: #f8fafc;
	}

	.btn-secondary {
		border: 1px solid var(--panel-border);
		color: var(--text);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	h2 {
		margin-top: 0;
		margin-bottom: 0.7rem;
	}

	ul {
		margin: 0;
		padding-left: 1rem;
		color: var(--muted);
		line-height: 1.65;
	}

	.card-link {
		display: inline-block;
		margin-top: 0.9rem;
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--accent);
	}

	.card-link:hover {
		text-decoration: underline;
	}

	.proof-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.75rem;
	}

	.proof-grid div {
		border: 1px solid var(--panel-border);
		border-radius: 14px;
		padding: 0.9rem;
		background: rgba(148, 163, 184, 0.08);
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.proof-grid strong {
		font-size: 1.12rem;
	}

	.proof-grid span {
		font-size: 0.92rem;
		color: var(--muted);
	}

	@media (max-width: 860px) {
		.grid,
		.proof-grid {
			grid-template-columns: 1fr;
		}
	}
</style>