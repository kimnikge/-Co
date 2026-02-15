import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
const GET = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM requests");
    return new Response(JSON.stringify(result.rows), {
      headers: { "Content-Type": "application/json" }
    });
  } finally {
    client.release();
  }
};
const POST = async ({ request }) => {
  const client = await pool.connect();
  const data = await request.json();
  try {
    await client.query(
      "INSERT INTO requests (id, date, name, phone, businessType, regime, status) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [data.id, data.date, data.name, data.phone, data.businessType, data.regime, data.status]
    );
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } finally {
    client.release();
  }
};

export { GET, POST };
//# sourceMappingURL=_server.ts-5a5274dd.js.map
