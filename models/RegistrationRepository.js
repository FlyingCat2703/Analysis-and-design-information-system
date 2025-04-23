import pool from '../config/db.js';
import Registration from '../services/Registration.js';

class RegistrationRepository {
  static async addRegistration(registration) {
    const sql = `
        INSERT INTO PhieuDangKi (NgayDangKy, SoLuongDangKi, TrangThai, TenKhachHang, LoaiKhachHang, LichThi)
        VALUES (NOW(), ?, 0, ?, ?, ?)
    `;

    const values = [
        registration.quantity,
        registration.customerName,
        registration.customerType,
        registration.scheduleID
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
    const [rows] = await pool.query('SELECT * FROM PhieuDangKi;');
    return rows.map(row => Registration.fromDB(row));
  } 

  static async getRegistrationByCustomerName(name) {
    const [rows] = await pool.query('SELECT * FROM PhieuDangKi WHERE TenKhachHang = ?;', [name]);
    return rows.map(row => Registration.fromDB(row));
  }
}

export default RegistrationRepository;
