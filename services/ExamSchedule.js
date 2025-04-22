class ExamSchedule {
    constructor({id, date, startTime, endTime, certificateType, level, type, roomID, currentQuantity}) {
        this.id = id;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.certificateType = certificateType;
        this.level = level;
        this.type = type;
        this.roomID = roomID;
        this.currentQuantity = currentQuantity;
    }

    static fromDB(row) {
        return new ExamSchedule({
            id: row.MaLichThi,
            date: row.NgayThi,
            startTime: row.ThoiGianBatDau,
            endTime: row.ThoiGianKetThuc,
            certificateType: row.LoaiChungChi,
            level: row.CapBac,
            type: row.LoaiToChuc,
            roomID: row.MaPhongThi,
            currentQuantity: row.SoLuongHienTai
        });
    }

    static createSchedule(data) {
        return new ExamSchedule(
            data.id,
            data.date,
            data.startTime,
            data.endTime,
            data.certificateType,
            data.level,
            data.type,
            data.roomID,
            data.currentQuantity
        );
    }
}

export default ExamSchedule;