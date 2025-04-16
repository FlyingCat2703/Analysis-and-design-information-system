import ExamScheduleRepository from "../models/examSchedule.js";
import { validateDateFormat, isFutureDate } from "../utils/dateUtils.js";

class ExamSchedule {
    constructor({ id = null, date = null, level = null, certificateType = null, startTime = null, endTime = null, currentQuantity = null }) {
        this.id = id;
        this.date = date;
        this.level = level;
        this.certificateType = certificateType;
        this.startTime = startTime;
        this.endTime = endTime;
        this.currentQuantity = currentQuantity;
    }

    static fromDB(row) {
        return new ExamSchedule({
            id: row.MaLichThi,
            date: row.NgayThi,
            level: row.CapBac,
            certificateType: row.LoaiChungChi,
            startTime: row.ThoiGianBatDau,
            endTime: row.ThoiGianKetThuc,
            currentQuantity: row.SoLuongHienTai
        });
    }

    static async getExamSchedule() {
        try {
            const examSchedules = await ExamScheduleRepository.getExamSchedule();
            return examSchedules;
        } catch (error) {
            console.log("ERROR WHEN TRYING TO GET EXAM SCHEDULE!!");
            return null;
        }
    }

    static async getExamScheduleInDate(date) {
        try {
            if (validateDateFormat(date)) {
                if (isFutureDate(date)) {
                    const examSchedules = await ExamScheduleRepository.getExamScheduleInDate(date);
                    return examSchedules;
                } else {
                    throw new Error("Date entered must be in the future");
                }
            } else {
                throw new Error("Invalid date format");
            }
        } catch (error) {
            console.log("ERROR WHEN TRYING TO GET EXAM SCHEDULE IN A SPECIFIC DATE!!");
            return null;
        }
    }
}

export default ExamSchedule;