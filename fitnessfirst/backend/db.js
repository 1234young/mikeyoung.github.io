import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin@#1234',
  database: 'fitnessapp',   
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection on startup
pool.getConnection()
  .then(conn => {
    console.log('✅ MySQL connected to fitnessapp');
    conn.release();
  })
  .catch(err => console.error('❌ MySQL connection error:', err.message));

export default pool;