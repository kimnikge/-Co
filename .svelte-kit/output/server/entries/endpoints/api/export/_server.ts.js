import { json2csv } from "json-2-csv";
import fs from "fs";
import path from "path";
function isAuthorized(cookies) {
  const session = cookies.get("admin_session");
  const secret = process.env.SESSION_SECRET || "default-secret";
  return session === secret;
}
const GET = async ({ cookies }) => {
  if (!isAuthorized(cookies)) {
    return new Response("Unauthorized", { status: 401 });
  }
  const filePath = path.resolve("data/requests.json");
  let data = [];
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
  }
  if (data.length === 0) {
    return new Response("id,date,name,phone,businessType,regime,status", {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="requests.csv"'
      }
    });
  }
  const csv = await json2csv(data);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="requests.csv"'
    }
  });
};
export {
  GET
};
