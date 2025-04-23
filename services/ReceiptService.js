import ReceiptRepository from "../repository/Receipt.js";

class Receipt_create_info{
    constructor({ PaymentSlipID = null, RegistrationID = null, RescheduleFormID = null, ExamineeName = null, ExamineePhone = null, ExamineeEmail = null, ExamineeAddress = null, subtotal = null, DiscountPercent = null, total = null, CustomerName = null }) {
        this.PaymentSlipID = PaymentSlipID;
        this.RegistrationID = RegistrationID;
        this.RescheduleFormID = RescheduleFormID;
        this.ExamineeName = ExamineeName;
        this.ExamineePhone = ExamineePhone;
        this.ExamineeAddress = ExamineeAddress;
        this.ExamineeEmail = ExamineeEmail;
        this.subtotal = subtotal;
        this.DiscountPercent = DiscountPercent;
        this.total = total;
        this.CustomerName = CustomerName;
    }

    static fromDB(row) {
        return new Receipt_create_info({
            PaymentSlipID: row['Ma Phieu Thanh Toan'],
            RegistrationID: row['Ma Phieu Dang Ki'],
            RescheduleFormID: row['Ma Phieu Gia Han'],
            ExamineeName: row['ho ten thi sinh'],
            CustomerName: row.TenKhachHang,
            ExamineePhone: row.SDT,
            ExamineeAddress: row.DiaChi,
            ExamineeEmail: row.Email,
            subtotal: row.ThanhTien,
            DiscountPercent: row.PhanTramGiamGia,
            total: row.SoTienCanTra,
        });
    }

    static async getReceiptRepository(paymentSlipID) {
        try {
            const receipt = await ReceiptRepository.getReceiptRepository(paymentSlipID);
            return receipt;
        } catch (error) {
            console.log("ERROR WHEN TRYING TO GET Receipt BY ID!!");
            return null;
        }
    }
}

export default Receipt_create_info;