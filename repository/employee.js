import pool from "../config/db.js"
import Employee from "../services/employeeService.js"

class EmployeeRepository {
    async findByUsername(username) {
        try {
            const [rows] = await pool.query("SELECT * FROM NhanVien WHERE TaiKhoan = ?", [username]);
            if (rows) {
                return Employee.fromDB(rows[0]);
            } else {
                return null;
            }
        } catch (error) {
            console.log("ERROR IN FINDING STAFF BY USERNAME!!")
            return null;
        }
        
    }
}

export default new EmployeeRepository;