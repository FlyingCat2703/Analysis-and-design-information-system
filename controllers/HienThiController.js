import ExamScheduleRepository from "../models/ExamScheduleRepository.js";
import RegistrationRepository from "../models/RegistrationRepository.js";

const HienThiController = {
    async HienThi_LapPhieuDangKy_TuDo(req, res) {
        try {
            const schedules = await ExamScheduleRepository.getExamSchedule();
            res.render('LapPhieuDangKy_TuDo', { schedules });
        } catch (error) {
            console.error('Lỗi khi lấy danh sách lịch thi:', error);
            res.status(500).send('Lỗi khi lấy danh sách lịch thi');
        }
    },

    async HienThi_XemTTDangKy(req, res) {
        try {
            const registrations = await RegistrationRepository.getRegistration();
            res.render('XemTTDangKy', { registrations });
        } catch (error) {
            console.error('Lỗi khi xem thông tin đăng ký:', error);
            res.status(500).send('Lỗi khi xem thông tin đăng ký');
        }
    }
}

export default HienThiController