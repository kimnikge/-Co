<script>
	import { onMount } from 'svelte';

	const THEME_KEY = 'pa-theme';
	let darkMode = true;
	let menuOpen = false;

	/** @param {boolean} isDark */
	function applyTheme(isDark) {
		document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
	}

	function toggleTheme() {
		darkMode = !darkMode;
		applyTheme(darkMode);
		localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light');
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}

	onMount(() => {
		const savedTheme = localStorage.getItem(THEME_KEY);
		if (savedTheme === 'dark' || savedTheme === 'light') {
			darkMode = savedTheme === 'dark';
		} else {
			darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}

		applyTheme(darkMode);
	});
</script>

<style>
	:global(:root) {
		--bg: #f2f5fb;
		--bg-soft: #e9eef8;
		--panel: rgba(255, 255, 255, 0.8);
		--panel-border: rgba(255, 255, 255, 0.65);
		--text: #0f172a;
		--muted: #4b5563;
		--accent: #4158d0;
		--accent-2: #6f7cff;
		--shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
	}

	:global(:root[data-theme='dark']) {
		--bg: #070d1a;
		--bg-soft: #0f172a;
		--panel: rgba(15, 23, 42, 0.62);
		--panel-border: rgba(148, 163, 184, 0.2);
		--text: #e2e8f0;
		--muted: #94a3b8;
		--accent: #7c8cff;
		--accent-2: #4f7cff;
		--shadow: 0 25px 60px rgba(2, 6, 23, 0.55);
	}

	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
		background: radial-gradient(circle at 15% 15%, #253a7a 0%, transparent 45%),
			radial-gradient(circle at 85% 10%, #3a2f74 0%, transparent 42%),
			var(--bg);
		color: var(--text);
		transition: background 0.35s ease, color 0.35s ease;
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(a) {
		color: inherit;
		text-decoration: none;
	}

	.shell {
		max-width: 1120px;
		margin: 0 auto;
		padding: 1rem 1rem 2.5rem;
	}

	.glass {
		backdrop-filter: blur(14px);
		background: var(--panel);
		border: 1px solid var(--panel-border);
		box-shadow: var(--shadow);
		border-radius: 20px;
	}

	.topbar {
		position: sticky;
		top: 0.8rem;
		z-index: 10;
		position: sticky;
		position: -webkit-sticky;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.85rem 1rem;
		right: 0;
		left: 0;
	}

	.header-actions {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.brand {
		font-weight: 700;
		letter-spacing: 0.02em;
		white-space: nowrap;
	}

	.icon-btn {
		border: 1px solid var(--panel-border);
		background: rgba(148, 163, 184, 0.12);
		color: var(--text);
		width: 2.4rem;
		height: 2.4rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
		font-size: 1rem;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.icon-btn:hover {
		background: rgba(99, 102, 241, 0.18);
	}

	.menu {
		position: absolute;
		top: calc(100% + 0.6rem);
		right: 0;
		width: min(260px, calc(100vw - 2.5rem));
		padding: 0.45rem;
		opacity: 0;
		pointer-events: none;
		transform: translateY(-6px);
		transition: opacity 0.18s ease, transform 0.18s ease;
	}

	.menu.open {
		opacity: 1;
		pointer-events: auto;
		transform: translateY(0);
	}

	.menu a {
		display: block;
		padding: 0.65rem 0.75rem;
		border-radius: 10px;
		font-size: 0.94rem;
		color: var(--muted);
	}

	.menu a:hover {
		background: rgba(99, 102, 241, 0.14);
		color: var(--text);
	}

	.content {
		margin-top: 1rem;
	}

	.footer {
		margin-top: 2rem;
		padding: 1.25rem 1rem;
		text-align: center;
	}

	.footer nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.8rem;
	}

	.footer a {
		font-size: 0.9rem;
		color: var(--muted);
	}

	.footer a:hover {
		color: var(--text);
	}

	.footer-copy {
		margin-top: 0.75rem;
		font-size: 0.85rem;
		color: var(--muted);
	}

	@media (max-width: 560px) {
		.brand {
			font-size: 0.95rem;
		}
	}
</style>

<div class="shell">
	<header class="topbar glass">
		<a class="brand" href="/">Бухгалтерская фирма "Партнеры&Co"</a>

		<div class="header-actions">
			<button class="icon-btn" on:click={toggleTheme} aria-label="Сменить тему">
				{darkMode ? '☀️' : '🌙'}
			</button>
			<button class="icon-btn" on:click={toggleMenu} aria-label="Открыть меню" aria-expanded={menuOpen}>
				{menuOpen ? '✕' : '☰'}
			</button>

			<nav class="menu glass" class:open={menuOpen}>
				<a href="/" on:click={closeMenu}>Главная</a>
				<a href="/tax-2026" on:click={closeMenu}>НК 2026</a>
				<a href="/services" on:click={closeMenu}>Услуги</a>
				<a href="/price" on:click={closeMenu}>Прайс</a>
				<a href="/calculator" on:click={closeMenu}>Калькулятор</a>
				<a href="/cases" on:click={closeMenu}>Кейсы</a>
				<a href="/contact" on:click={closeMenu}>Контакты</a>
				<a href="/admin" on:click={closeMenu}>Админ</a>
			</nav>
		</div>
	</header>

	<main class="content">
		<slot />
	</main>

	<footer class="footer glass">
		<nav>
			<a href="/privacy">Политика конфиденциальности</a>
			<a href="/agreement">Пользовательское соглашение</a>
			<a href="/disclaimer">Отказ от ответственности</a>
			<a href="/requisites">Реквизиты компании</a>
		</nav>
		<div class="footer-copy">© 2026 Partners Accounting</div>
	</footer>
</div>