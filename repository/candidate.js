import pool from "../config/db.js";

class CandidateRepository {
    static async addCandidate(candidate) {
        const sql = `
            INSERT INTO ThiSinh (HoTen, SDT, Email, DiaChi, MaPhieuDangKi)
            VALUES (?, ?, ?, ?, ?)
        `;

        const values = [
            candidate.name,
            candidate.phoneNumber,
            candidate.email,
            candidate.home,
            candidate.registrationID
        ];

        try {
            const [result] = await pool.execute(sql, values);
            return result.insertId;
        } catch (error) {
            console.log(error);
            console.error('Lỗi khi thêm Thí sinh:', error);
            throw error;
        }
    }

    static async getCandidatesByRegistrationID(registrationID) {
        try {
            const [rows] = await pool.query(
                "SELECT MaThiSinh, HoTen, SDT, Email, DiaChi, MaPhieuDangKi FROM ThiSinh WHERE MaPhieuDangKi = ?",
                [registrationID]
            );

            return rows; 
        } catch (error) {
            console.error("ERROR WHEN FETCHING CANDIDATES BY REGISTRATION ID", error);
            return [];
        }
    }
}

export default CandidateRepository