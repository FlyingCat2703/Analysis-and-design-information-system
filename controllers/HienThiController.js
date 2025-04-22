import ExamScheduleRepository from "../models/ExamScheduleRepository.js";

const HienThiController = {
    async HienThi_LapPhieuDangKy_TuDo(req, res) {
        try {
            const schedules = await ExamScheduleRepository.getExamSchedule();
            res.render('LapPhieuDangKy_TuDo', { schedules });
        } catch (error) {
            console.error('Lỗi khi lấy danh sách lịch thi:', error);
            res.status(500).send('Lỗi khi lấy danh sách lịch thi');
        }
    }
}

export default HienThiController