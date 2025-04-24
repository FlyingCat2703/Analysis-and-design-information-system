import pool from "../config/db.js"
import ExamSchedule from "../services/examScheduleService.js"

class ExamScheduleRepository { 
    static async getExamSchedule() {
        try {
            const [rows] = await pool.query("SELECT * FROM LichThi WHERE NgayThi >= NOW()");
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

    static async getExamScheduleInDate(date) {
        try {
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

    static async createExamSchedule(scheduleInfo) {
        try {
            const row = await pool.query("INSERT INTO LICHTHI (NGAYTHI, THOIGIANBATDAU, THOIGIANKETTHUC, LOAICHUNGCHI, CAPBAC, LOAITOCHUC, MAPHONGTHI, SOLUONGHIENTAI) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [scheduleInfo.date, scheduleInfo.startTime, scheduleInfo.endTime, scheduleInfo.certificateType, scheduleInfo.certificateLevel, 1, scheduleInfo.roomID, scheduleInfo.currentQuantity]);
            return row[0].insertId;
        } catch (error) {
            console.log("ERROR IN CREATING NEW EXAM SCHEDULE");
            return null;
        }
    }
}

export default ExamScheduleRepository;