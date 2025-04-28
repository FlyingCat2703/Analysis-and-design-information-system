import pool from "../config/db.js";
import Registration from "../services/registrationServices.js";
import CandidateRepository from "./candidate.js";

class RegistrationRepository {
    static async createOrganizationRegistration(registrationInfo, candidateInfo) {
        try {
            const row = await pool.query("INSERT INTO PHIEUDANGKI (NgayDangKy, SoLuongDangKi, TrangThai, TenKhachHang, LoaiKhachHang, LichThi, NVTNPhuTrach) VALUES (CURDATE(), ?, 0, ?, 1, ?, ?);", [registrationInfo.currentQuantity, registrationInfo.name, registrationInfo.scheduleID, registrationInfo.currentEmployee]);
            const registrationID = row[0].insertId;
            const tranformedCandidate = candidateInfo.map(item => ({
                name: item["Ten"],
                phoneNumber: item["So dien thoai"],
                email: item["Email"],
                home: item["Dia chi"],
                registrationID: registrationID
            }));

            for (const candidate of tranformedCandidate) {
                await CandidateRepository.addCandidate(candidate);
            }

            return registrationID;
        } catch (error) {
            console.log("ERROR IN CREATING ORGANIZATION REGISTRATION: ", error);
            return null;
        }
    }

    static async addRegistration(registration) {
        const sql = `
            INSERT INTO PhieuDangKi (NgayDangKy, SoLuongDangKi, TrangThai, TenKhachHang, LoaiKhachHang, LichThi, NVTNPhuTrach)
            VALUES (NOW(), ?, 0, ?, ?, ?, ?)
        `;
    
        const values = [
            registration.quantity,
            registration.customerName,
            registration.customerType,
            registration.scheduleID,
            registration.currentEmployee
        ];
    
        try {
            const [result] = await pool.execute(sql, values);
            return result.insertId;
        } catch (error) {
            console.error('Lỗi khi thêm Registration:', error);
            throw error;
        }
    }

    static async getRegistration() {
        const [rows] = await pool.query('SELECT * FROM PhieuDangKi ORDER BY NgayDangKy DESC;');
        return rows.map(row => Registration.fromDB(row));
    } 
    
      static async getRegistrationByCustomerName(name) {
        const [rows] = await pool.query('SELECT * FROM PhieuDangKi WHERE TenKhachHang = ? ORDER BY NgayDangKy DESC;', [name]);
        return rows.map(row => Registration.fromDB(row));
    }
}

export default RegistrationRepository;