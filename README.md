# Partners Accounting

PWA-сайт бухгалтерских услуг (премиальный формат)

## Структура
- SvelteKit SSR
- PWA (vite-plugin-pwa)
- CRM на JSON
- Калькулятор налоговой нагрузки
- Telegram уведомления
- Админ-панель с авторизацией через ENV
- Премиальный визуал (dark theme, glassmorphism, анимации)

## Запуск
1. Установите зависимости:
   ```
   npm install
   ```
2. Запустите проект:
   ```
   npm run dev
   ```

## Конфиг ставок
Все налоговые ставки централизованы в [src/lib/config/taxConfig.ts](src/lib/config/taxConfig.ts).

## Хранилище заявок
Файл: [data/requests.json](data/requests.json)

## PWA
- manifest.webmanifest
- sw.js

## Логирование
Файл: [logs/app.log](logs/app.log)

## Эндпоинты
- POST /contact
- GET /api/requests
- PATCH /api/requests/:id
- GET /api/export

## Юридические страницы
- Политика конфиденциальности
- Пользовательское соглашение
- Отказ от ответственности
- Реквизиты компании

## KPI
- Lighthouse ≥ 90
- TTFB < 500ms
- Конверсия 8–12%
- Bounce rate < 40%
- Повторные визиты > 20%

## Масштабирование
- JSON → PostgreSQL
- ORM
- Разделение API и frontend
- RBAC

---
Подробнее см. [docs/tz.md](docs/tz.md)
