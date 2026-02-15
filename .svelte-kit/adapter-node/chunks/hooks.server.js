import fs from "fs";
import path from "path";
const LOG_FILE = path.resolve("logs/app.log");
function logEvent(event) {
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const logMessage = `[${timestamp}] ${event}
`;
  fs.appendFileSync(LOG_FILE, logMessage);
}
const handle = async ({ event, resolve }) => {
  try {
    const response = await resolve(event);
    logEvent(`Request: ${event.url.pathname} - ${response.status}`);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logEvent(`Error: ${message}`);
    throw error;
  }
};
export {
  handle
};
