<script lang="ts">
	export let data: { isAuth: boolean };

	/** @typedef {{ id: string; date: string; name: string; phone: string; businessType: string; regime: string; status: 'new' | 'in_progress' | 'closed' }} Request */

	let isAuth = data.isAuth;
	let login = '';
	let password = '';
	let loginError = '';
	let requests: Array<{ id: string; date: string; name: string; phone: string; businessType: string; regime: string; status: string }> = [];
	let filterStatus = 'all';
	let loading = false;

	async function doLogin() {
		loginError = '';
		const res = await fetch('/admin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ action: 'login', login, password })
		});
		const result = await res.json();
		if (result.success) {
			isAuth = true;
			await loadRequests();
		} else {
			loginError = result.message || 'Ошибка входа';
		}
	}

	async function doLogout() {
		await fetch('/admin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ action: 'logout' })
		});
		isAuth = false;
		requests = [];
	}

	async function loadRequests() {
		loading = true;
		try {
			const res = await fetch('/api/requests');
			if (res.ok) {
				requests = await res.json();
				requests.sort((a: { date: string }, b: { date: string }) => new Date(b.date).getTime() - new Date(a.date).getTime());
			}
		} catch { /* ignore */ }
		loading = false;
	}

	async function changeStatus(id: string, newStatus: string) {
		const res = await fetch('/api/requests', {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id, status: newStatus })
		});
		if (res.ok) {
			await loadRequests();
		}
	}

	async function exportCSV() {
		const res = await fetch('/api/export');
		if (res.ok) {
			const blob = await res.blob();
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'requests.csv';
			a.click();
			URL.revokeObjectURL(url);
		}
	}

	$: filtered = filterStatus === 'all'
		? requests
		: requests.filter((r) => r.status === filterStatus);

	$: if (isAuth && requests.length === 0) {
		loadRequests();
	}

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleDateString('ru-RU', {
			day: '2-digit', month: '2-digit', year: 'numeric',
			hour: '2-digit', minute: '2-digit'
		});
	}

	const statusLabels: Record<string, string> = { new: 'Новая', in_progress: 'В работе', closed: 'Закрыта' };
	const statusClasses: Record<string, string> = { new: 'status-new', in_progress: 'status-progress', closed: 'status-closed' };

	function statusLabel(s: string): string {
		return statusLabels[s] || s;
	}

	function statusClass(s: string): string {
		return statusClasses[s] || '';
	}
</script>

{#if !isAuth}
	<section class="panel login-panel">
		<h1>Вход в админ-панель</h1>
		<form on:submit|preventDefault={doLogin} class="login-form">
			<input type="text" bind:value={login} placeholder="Логин" autocomplete="username" required />
			<input type="password" bind:value={password} placeholder="Пароль" autocomplete="current-password" required />
			{#if loginError}<p class="error">{loginError}</p>{/if}
			<button type="submit" class="btn-primary">Войти</button>
		</form>
	</section>
{:else}
	<section class="panel">
		<div class="admin-header">
			<div>
				<p class="eyebrow">Админ-панель</p>
				<h1>Заявки</h1>
			</div>
			<button class="btn-logout" on:click={doLogout}>Выйти</button>
		</div>
	</section>

	<section class="panel">
		<div class="toolbar">
			<select bind:value={filterStatus}>
				<option value="all">Все статусы</option>
				<option value="new">Новые</option>
				<option value="in_progress">В работе</option>
				<option value="closed">Закрытые</option>
			</select>
			<span class="count">{filtered.length} из {requests.length}</span>
			<button class="btn-export" on:click={exportCSV}>Экспорт CSV</button>
			<button class="btn-refresh" on:click={loadRequests}>🔄</button>
		</div>

		{#if loading}
			<p class="muted-text">Загрузка...</p>
		{:else if filtered.length === 0}
			<p class="muted-text">Заявки не найдены</p>
		{:else}
			<div class="table-wrap">
				<table>
					<thead>
						<tr>
							<th>Дата</th>
							<th>Имя</th>
							<th>Телефон</th>
							<th>Тип</th>
							<th>Режим</th>
							<th>Статус</th>
							<th>Действия</th>
						</tr>
					</thead>
					<tbody>
						{#each filtered as req (req.id)}
							<tr>
								<td>{formatDate(req.date)}</td>
								<td>{req.name}</td>
								<td><a href="tel:{req.phone}">{req.phone}</a></td>
								<td>{req.businessType || '—'}</td>
								<td>{req.regime}</td>
								<td><span class="status-badge {statusClass(req.status)}">{statusLabel(req.status)}</span></td>
								<td class="actions">
									{#if req.status === 'new'}
										<button class="btn-sm" on:click={() => changeStatus(req.id, 'in_progress')}>В работу</button>
									{/if}
									{#if req.status === 'in_progress'}
										<button class="btn-sm" on:click={() => changeStatus(req.id, 'closed')}>Закрыть</button>
									{/if}
									{#if req.status === 'closed'}
										<button class="btn-sm btn-sm-muted" on:click={() => changeStatus(req.id, 'new')}>Вернуть</button>
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</section>
{/if}

<style>
	.panel { border: 1px solid var(--panel-border); background: var(--panel); border-radius: 20px; padding: 1.2rem; box-shadow: var(--shadow); margin-bottom: 1rem; }
	.eyebrow { margin: 0; color: var(--accent); font-weight: 700; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; }
	h1 { margin: 0.35rem 0 0; }

	/* Login */
	.login-panel { max-width: 380px; margin: 4rem auto; }
	.login-form { display: flex; flex-direction: column; gap: 0.7rem; margin-top: 1rem; }
	.login-form input {
		border: 1px solid var(--panel-border);
		background: rgba(148,163,184,0.08);
		color: var(--text);
		border-radius: 10px;
		padding: 0.7rem 0.85rem;
		font-size: 1rem;
	}
	.login-form input:focus { outline: 2px solid var(--accent); border-color: transparent; }
	.error { color: #ef4444; margin: 0; font-size: 0.88rem; }

	.btn-primary {
		background: linear-gradient(135deg, var(--accent), var(--accent-2));
		color: #f8fafc; border: 0; border-radius: 10px;
		padding: 0.7rem; font-weight: 600; font-size: 1rem; cursor: pointer;
	}

	/* Admin header */
	.admin-header { display: flex; align-items: flex-start; justify-content: space-between; }
	.btn-logout {
		border: 1px solid var(--panel-border);
		background: rgba(148,163,184,0.08);
		color: var(--muted); border-radius: 10px;
		padding: 0.5rem 0.85rem; cursor: pointer; font-size: 0.88rem;
	}
	.btn-logout:hover { background: rgba(239,68,68,0.15); color: #ef4444; }

	/* Toolbar */
	.toolbar { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.8rem; flex-wrap: wrap; }
	select {
		border: 1px solid var(--panel-border);
		background: rgba(148,163,184,0.08);
		color: var(--text); border-radius: 10px;
		padding: 0.5rem 0.7rem;
	}
	.count { font-size: 0.85rem; color: var(--muted); }
	.btn-export {
		background: linear-gradient(135deg, var(--accent), var(--accent-2));
		color: #f8fafc; border: 0; border-radius: 10px;
		padding: 0.5rem 0.8rem; font-weight: 600; cursor: pointer; margin-left: auto;
	}
	.btn-refresh {
		border: 1px solid var(--panel-border);
		background: rgba(148,163,184,0.08);
		border-radius: 10px; padding: 0.5rem 0.6rem;
		cursor: pointer; font-size: 1rem;
	}

	/* Table */
	.table-wrap { overflow: auto; }
	table { width: 100%; border-collapse: collapse; min-width: 740px; }
	th, td { text-align: left; padding: 0.55rem 0.5rem; border-bottom: 1px solid var(--panel-border); color: var(--muted); font-size: 0.9rem; }
	th { color: var(--text); font-weight: 600; }
	td a { color: var(--accent); }

	.status-badge {
		display: inline-block; padding: 0.2rem 0.55rem;
		border-radius: 8px; font-size: 0.8rem; font-weight: 600;
	}
	.status-new { background: rgba(59,130,246,0.15); color: #3b82f6; }
	.status-progress { background: rgba(245,158,11,0.15); color: #f59e0b; }
	.status-closed { background: rgba(34,197,94,0.15); color: #22c55e; }

	.actions { white-space: nowrap; }
	.btn-sm {
		background: linear-gradient(135deg, var(--accent), var(--accent-2));
		color: #f8fafc; border: 0; border-radius: 8px;
		padding: 0.3rem 0.6rem; font-size: 0.78rem; font-weight: 600; cursor: pointer;
	}
	.btn-sm-muted {
		background: rgba(148,163,184,0.15);
		color: var(--muted);
	}

	.muted-text { color: var(--muted); text-align: center; padding: 2rem 0; }
</style>