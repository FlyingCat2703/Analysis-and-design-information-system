import ExamScheduleRepository from "../repository/examSchedule.js";
import { validateDateFormat, isFutureDate } from "../utils/dateUtils.js";

class ExamSchedule {
    constructor({ id = null, date = null, level = null, certificateType = null, startTime = null, endTime = null, currentQuantity = null, roomID = null, type = null }) {
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

    static async getExamSchedule() {
        try {
            const examSchedules = await ExamScheduleRepository.getExamSchedule();
            examSchedules.forEach(schedule => {
                schedule.certificateType = (schedule.certificateType === 0) ? "Tiếng Anh" : "Tin học";
            });
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

    static async newSchedule(scheduleInfo) {
        try {
            const createdSchedule = await ExamScheduleRepository.createExamSchedule(scheduleInfo);
            return createdSchedule;
        } catch (error) {
            console.log("ERROR WHEN TRYING TO CREATE NEW SCHEDULE");
            return null;
        }
    }
}

export default ExamSchedule;