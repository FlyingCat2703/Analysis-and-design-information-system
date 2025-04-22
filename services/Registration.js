class Registration {
    constructor({ id = null, date, quantity, status, customerName, customerType, scheduleID }) {
        this.id = id;
        this.date = date;
        this.quantity = quantity;
        this.status = status;
        this.customerName = customerName;
        this.customerType = customerType;
        this.scheduleID = scheduleID;
    }

    static fromDB(row) {
        return new Registration({
            id: row.MaPhieuDangKi,
            date: row.NgayDangKy,
            quantity: row.SoLuongDangKi,
            status: row.TrangThai,
            customerName: row.TenKhachHang,
            customerType: row.LoaiKhachHang,
            scheduleID: row.LichThi
        });
    }
          
    static createRegistration(data) {
        return new Registration(
            data.id,
            data.date,
            data.quantity,
            data.status,
            data.customerName,
            data.customerType,
            data.scheduleID
        );
    }
}
  
export default Registration;