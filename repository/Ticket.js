import pool from "../config/db.js";
import Ticket from "../services/TicketService.js";

class TicketRepository {
    static async getTicket(candidateNumber) {
        try {
            const [rows] = await pool.query(
                "SELECT ts.HoTen, lt.LoaiChungChi, lt.CapBac, pdt.Diem, pdt.MaPhieuDuThi as 'Ma Phieu Du Thi', ts.MaThiSinh as 'Ma Thi Sinh', pdk.MaPhieuDangKi as 'Ma Phieu Dang Ki', lt.MaLichThi as 'Ma Lich Thi' " +
                "FROM PhieuDuThi pdt " +
                "JOIN ThiSinh ts ON pdt.MaThiSinh = ts.MaThiSinh " +
                "JOIN PhieuDangKi pdk ON ts.MaPhieuDangKi = pdk.MaPhieuDangKi " +
                "JOIN LichThi lt ON pdk.LichThi = lt.MaLichThi " +
                "WHERE pdt.SoBaoDanh = ?",
                [candidateNumber]
            );

            if (rows.length > 0) {
                const ticket = Ticket.fromDB(rows[0]);
                return ticket;
            } else {
                return null;
            }
        } catch (error) {
            console.error("ERROR IN READING EXAM RESULT BY CANDIDATE NUMBER", error);
            return null;
        }
    }
}

export default TicketRepository;
