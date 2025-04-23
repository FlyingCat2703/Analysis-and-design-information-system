// select ptt.MaPhieuThanhToan as 'Ma Phieu Thanh Toan', pdk.MaPhieuDangKi as 'Ma Phieu Dang Ki', pgh.MaPhieuGiaHan as 'Ma Phieu Gia Han', ts.HoTen as 'ho ten thi sinh', ts.SDT, ts.Email, ts.DiaChi, ptt.ThanhTien, ptt.PhanTramGiamGia, ptt.SoTienCanTra from PhieuThanhToan ptt, PhieuDangKi pdk, PhieuGiaHan pgh, ThiSinh ts where ptt.MaPhieuThanhToan = 1 and ptt.MaPhieuDangKi = pdk.MaPhieuDangKi and pgh.MaPhieuDangKi = pdk.MaPhieuDangKi and ts.MaPhieuDangKi = pdk.MaPhieuDangKi
import pool from "../config/db.js"
import Receipt_create_info from "../services/ReceiptService.js"


class ReceiptRepository {
    async getReceiptRepository(paymentSlipID) {
        try {
            const [rows] = await pool.query(
                "SELECT ptt.MaPhieuThanhToan as 'Ma Phieu Thanh Toan', pdk.MaPhieuDangKi as 'Ma Phieu Dang Ki',pdk.TenKhachHang, pgh.MaPhieuGiaHan as 'Ma Phieu Gia Han', ts.HoTen as 'ho ten thi sinh', ts.SDT, ts.Email, ts.DiaChi, ptt.ThanhTien, ptt.PhanTramGiamGia, ptt.SoTienCanTra " +
                "FROM PhieuThanhToan ptt " +
                "LEFT JOIN PhieuDangKi pdk ON ptt.MaPhieuDangKi = pdk.MaPhieuDangKi " +
                "LEFT JOIN PhieuGiaHan pgh ON pgh.MaPhieuDangKi = pdk.MaPhieuDangKi " +
                "LEFT JOIN ThiSinh ts ON ts.MaPhieuDangKi = pdk.MaPhieuDangKi " +
                "WHERE ptt.MaPhieuThanhToan = ?",
                [paymentSlipID]
            );
            if (rows.length > 0) {
                return Receipt_create_info.fromDB(rows[0]);
            } else {
                return null;
            }
        } catch (error) {
            console.log("ERROR IN CREATE Receipt BY ID!!");
            return null;
        }
    }

    async insertInvoice(NgayLapHoaDon, ThanhTien, MaPhieuGiaHan, MaPhieuDangKi, MaPhieuThanhToan, NVKTPhuTrach) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
    
            await connection.query(
                "INSERT INTO HoaDon (NgayLapHoaDon, ThanhTien, MaPhieuGiaHan, MaPhieuDangKi, MaPhieuThanhToan, NVKTPhuTrach) VALUES (?, ?, ?, ?, ?, ?)",
                [NgayLapHoaDon, ThanhTien, MaPhieuGiaHan, MaPhieuDangKi, MaPhieuThanhToan, NVKTPhuTrach]
            );
    
            await connection.query(
                "UPDATE PhieuDangKi SET TrangThai = 1 WHERE MaPhieuDangKi = ?",
                [MaPhieuDangKi]
            );
    
            await connection.commit();
            return true;
        } catch (error) {
            await connection.rollback();
            console.log("ERROR INSERTING INTO HoaDon and updating PhieuDangKi:", error);
            return false;
        } finally {
            connection.release();
        }
    }
    
}

export default new ReceiptRepository();