import mysql from "mysql2/promise";
import config from "./config.js";

const pool = mysql.createPool({
    ...config.mysqlConnection,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connect to mySQL successfully!');
    } catch (err) {
        console.log('Connect to mySQL failed: ' + err);
    }
})();

export default pool;