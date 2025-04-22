import pool from '../config/db.js';

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
}

export default RegistrationRepository;
