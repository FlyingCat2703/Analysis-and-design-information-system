import pool from "../config/db.js";
import ExamSchedule from "../services/ExamSchedule.js";

class ExamScheduleRepository {
    static async getExamSchedule() {
        const [rows] = await pool.query('SELECT * FROM LichThi WHERE NgayThi > CURDATE();');
        return rows.map(row => ExamSchedule.fromDB(row));
    }
}

export default ExamScheduleRepository