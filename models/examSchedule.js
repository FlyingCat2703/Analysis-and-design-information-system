import pool from "../config/db.js"
import ExamSchedule from "../services/examScheduleService.js"

class ExamScheduleRepository { 
    async getExamSchedule() {
        try {
            const [rows] = await pool.query("SELECT * FROM LichThi WHERE NgayThi >= CURRENT_DATE + INTERVAL 14 DAY");
            if (rows) {
                let listExamSchedule = []
                rows.forEach(row => {
                    const examSchedule = ExamSchedule.fromDB(row);
                    
                    // convert date to yyyy-mm-dd
                    const dateObj = new Date(examSchedule.date);
                    examSchedule.date = dateObj.toLocaleDateString('en-CA');
                    
                    listExamSchedule.push(examSchedule);
                });

                return listExamSchedule;
            } else {
                return null;
            }
        } catch (error) {
            console.log("ERROR IN READING EXAM SCHEDULE");
            return null;
        }
    }

    async getExamScheduleInDate(date) {
        try {
            console.log(date);
            const [rows] = await pool.query("SELECT * FROM LichThi WHERE NgayThi = ?", [date]);
            console.log(rows);
            if (rows) {
                let listExamSchedule = []
                rows.forEach(row => {
                    const examSchedule = ExamSchedule.fromDB(row);
                    
                    // convert date to yyyy-mm-dd
                    const dateObj = new Date(examSchedule.date);
                    examSchedule.date = dateObj.toLocaleDateString('en-CA');
                    
                    listExamSchedule.push(examSchedule);
                });

                return listExamSchedule;
            } else {
                return null;
            }
        } catch (error) {
            console.log("ERROR IN READING EXAM SCHEDULE IN A SPECIFIC DATE");
            return null;    
        }
    }
}

export default new ExamScheduleRepository;