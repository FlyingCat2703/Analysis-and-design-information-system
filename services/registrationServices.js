import RegistrationRepository from "../repository/registration.js";
import ExamScheduleRepository from "../repository/examSchedule.js";
import RoomRepository from "../repository/room.js";
import ExamSchedule from "./examScheduleService.js";

class Registration {
    constructor({ id = null, date, quantity, status, customerName, customerType, scheduleID, currentEmployee = null }) {
        this.id = id;
        this.date = date;
        this.quantity = quantity;
        this.status = status;
        this.customerName = customerName;
        this.customerType = customerType;
        this.scheduleID = scheduleID;
        this.currentEmployee = currentEmployee;
    }

    static fromDB(row) {
        return new Registration({
            id: row.MaPhieuDangKi,
            date: row.NgayDangKy,
            quantity: row.SoLuongDangKi,
            status: row.TrangThai,
            customerName: row.TenKhachHang,
            customerType: row.LoaiKhachHang,
            scheduleID: row.LichThi,
            currentEmployee: row.NVTNPhuTrach
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
            data.scheduleID,
            data.currentEmployee
        );
    }

    static async addRegistration() {
        try {
            const result = await RegistrationRepository.addRegistration(this);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async getRegistration() {
        try {
            const registrations = await RegistrationRepository.getRegistration();
            // Change date format
            for (const re of registrations) {
                const dateObj = new Date(re.date);
                re.date = dateObj.toLocaleDateString('en-CA');
            }
            return registrations;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async getRegistrationByCustomerName(name) {
        try {
            const registrations = await RegistrationRepository.getRegistrationByCustomerName(name);
            // Change date format
            for (const re of registrations) {
                const dateObj = new Date(re.date);
                re.date = dateObj.toLocaleDateString('en-CA');
            }
            return registrations;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async createOrganizationRegistration(registrationInfo) {
        try {
            const date = registrationInfo.date;
            const roomID = await RoomRepository.getEmptyRoom(date)
            if (!roomID) {
                return null;
            }

            const scheduleInfo = {
                date: registrationInfo.date,
                startTime: registrationInfo.startTime,
                endTime: registrationInfo.endTime,
                certificateType: registrationInfo.certificateType,
                certificateLevel: registrationInfo.certificateLevel,
                roomID: roomID,
                currentQuantity: registrationInfo.candidateInfo.length
            }

            const createdSchedule = await ExamSchedule.newSchedule(scheduleInfo);

            const registrationInfoSliced = {
                currentQuantity: registrationInfo.candidateInfo.length,
                name: registrationInfo.name,
                scheduleID: createdSchedule,
                currentEmployee: registrationInfo.currentEmployee
            };
    
            const createdRegistration = await RegistrationRepository.createOrganizationRegistration(registrationInfoSliced, registrationInfo.candidateInfo);
            return createdRegistration;
        } catch (error) {
            console.log("ERROR WHEN TRYING TO CREATE REGISTRATION!!");
            return null;
        }
    }
}

export default Registration;