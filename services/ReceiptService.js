import ReceiptRepository from "../repository/Receipt.js";

class Receipt{
    constructor({ PaymentSlipID = null, RegistrationID = null, RescheduleFormID = null, ExamineeName = null, ExamineePhone = null, ExamineeEmail = null, ExamineeAddress = null, subtotal = null, DiscountPercent = null, total = null, CustomerName = null, CustomerType = null, NumberOfExaminees = null, registerDate = null, examSchedule = null }) {
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
        this.CustomerType = CustomerType;
        this.NumberOfExaminees = NumberOfExaminees;
        this.registerDate = registerDate;
        this.examSchedule = examSchedule;
    }

    static fromDB(row) {
        return new Receipt({
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
            CustomerType: row.LoaiKhachHang,
            NumberOfExaminees: row.SoLuongDangKi,
            registerDate: row.NgayDangKy instanceof Date ? row.NgayDangKy.toLocaleDateString('en-CA') : new Date(row.NgayDangKy).toLocaleDateString('en-CA'),
            examSchedule: row.LichThi
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

    static async addInvoice(invoiceInfo) {
        try {
            const success = await ReceiptRepository.insertInvoice(invoiceInfo.dateNow, invoiceInfo.Total, invoiceInfo.RegistrationID, invoiceInfo.PaymentSlipID, invoiceInfo.StaffCode);
            return success;
        } catch (error) {
            console.log("ERROR WHEN TRYING TO ADD INVOICE!!");
            return null;
        }
    }
}

export default Receipt;