import pool from "../config/db.js"
import PaymentSlip from "../services/PaymentSlipService.js"

class PaymentSlipRepository {
    static async getPaymentSlipList() {
        try{
            const [rows] = await pool.query("SELECT PhieuThanhToan.* FROM PhieuThanhToan, PhieuDangKi WHERE PhieuThanhToan.MaPhieuDangKi = PhieuDangKi.MaPhieuDangKi AND PhieuDangKi.TrangThai = 0")
            if(rows){
                let listPaymentSlip = []
                rows.forEach(row => {
                    const paymentSlip = PaymentSlip.fromDB(row);

                    // convert date to yyyy-mm-dd
                    const dateObj = new Date(paymentSlip.date);
                    paymentSlip.date = dateObj.toLocaleDateString('en-CA');

                    listPaymentSlip.push(paymentSlip);
                })
                return listPaymentSlip;
            }else{
                return []
            }
        } catch (error) {
            console.log("ERROR IN READING PAYMENT SLIP LIST");
            return null;
        }
    }
}

export default PaymentSlipRepository;