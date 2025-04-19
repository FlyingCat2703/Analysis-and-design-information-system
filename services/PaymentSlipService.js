import PaymentSlip_list from "../models/PaymentSlip_List.js";
// import { validateDateFormat, isFutureDate } from "../utils/dateUtils.js";


class PaymentSlip {
    constructor({ id = null, date = null, subtotal = null, DiscountPercent = null, total = null, RegistrationID = null }) {
        this.id = id;
        this.date = date;
        this.subtotal = subtotal;
        this.DiscountPercent = DiscountPercent;
        this.total = total;
        this.RegistrationID = RegistrationID;
    }

    static fromDB(row) {
        return new PaymentSlip({
            id: row.MaPhieuThanhToan,
            date: row.NgayLapPhieu,
            subtotal: row.ThanhTien,
            DiscountPercent: row.PhanTramGiamGia,
            total: row.SoTienCanTra,
            RegistrationID: row.MaPhieuDangKi,
        });
    }

    static async getPaymentSlipList() {
            try {
                const PaymentSlips = await PaymentSlip_list.getPaymentSlipList();
                return PaymentSlips;
            } catch (error) {
                console.log("ERROR WHEN TRYING TO GET PAYMENT SLIP LIST!!");
                return null;
            }
        }


}

export default PaymentSlip;