const { Pool } = require('pg');

const {
  env: { DB_URL, MAX_CONNECTIONS = 5 }
} = process;

const pool = new Pool({
  connectionString: DB_URL,
  max: MAX_CONNECTIONS
});

const initialize = async () => {
  const client = await pool.connect();
  await client.release();
  return pool;
};

const query = async (text, params) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;

  /* eslint-disable-next-line */
  console.debug('Executed query', { text, params, duration, rows: res.rowCount });
  return res;
};

module.exports = {
  query,
  initialize
};
