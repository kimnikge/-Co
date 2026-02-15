import { getStore } from "@netlify/blobs";
import crypto from "crypto";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const RATE_LIMIT_WINDOW = 15 * 60 * 1e3;
const RATE_LIMIT_MAX_REQUESTS = 100;
const rateLimitMap = /* @__PURE__ */ new Map();
function isRateLimited(ip) {
  const currentTime = Date.now();
  const requestLog = rateLimitMap.get(ip) || [];
  const filteredLog = requestLog.filter((timestamp) => currentTime - timestamp < RATE_LIMIT_WINDOW);
  filteredLog.push(currentTime);
  rateLimitMap.set(ip, filteredLog);
  return filteredLog.length > RATE_LIMIT_MAX_REQUESTS;
}
async function readRequests() {
  try {
    const store = getStore({ name: "requests", consistency: "strong" });
    const data = await store.get("requests", { type: "json" });
    return data || [];
  } catch {
    return [];
  }
}
async function writeRequests(data) {
  const store = getStore({ name: "requests", consistency: "strong" });
  await store.setJSON("requests", data);
}
async function sendTelegramNotification(message) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID)
    return;
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message })
    });
  } catch {
  }
}
const POST = async ({ request, getClientAddress }) => {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0].trim() || getClientAddress();
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ success: false, message: "Rate limit exceeded" }), {
      status: 429,
      headers: { "Content-Type": "application/json" }
    });
  }
  let formData;
  try {
    formData = await request.json();
  } catch {
    return new Response(JSON.stringify({ success: false, message: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  if (!formData.name || !formData.phone || !formData.regime || !formData.consent) {
    return new Response(JSON.stringify({ success: false, message: "validation_error" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const entry = {
    id: crypto.randomUUID(),
    date: (/* @__PURE__ */ new Date()).toISOString(),
    name: formData.name,
    phone: formData.phone,
    businessType: formData.businessType || "",
    regime: formData.regime,
    status: "new"
  };
  const requests = await readRequests();
  requests.push(entry);
  await writeRequests(requests);
  const message = `📩 Новая заявка:
Имя: ${formData.name}
Телефон: ${formData.phone}
Тип: ${formData.businessType || "—"}
Режим: ${formData.regime}`;
  await sendTelegramNotification(message);
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" }
  });
};
export {
  POST
};
