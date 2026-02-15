import { json2csv } from 'json-2-csv';
import fs from 'fs';
import path from 'path';

const GET = async () => {
  const filePath = path.resolve("data/requests.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const csv = await json2csv(data);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="requests.csv"'
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-398a2d5c.js.map
