import ExamSchedule from "../services/examScheduleService.js";
import Registration from "../services/registrationServices.js";
import Candidate from "../services/candidateServices.js";

const LapPhieuDangKy_TuDoController = {
    async HienThi(req, res) {
        try {
            const schedules = await ExamSchedule.getExamSchedule();
            res.render('LapPhieuDangKy_TuDo', { schedules });
        } catch (error) {
            console.error('Lỗi khi lấy danh sách lịch thi:', error);
            res.status(500).send('Lỗi khi lấy danh sách lịch thi');
        }
    },

    async addRegistration(req, res) {
        try {
            const currentEmployeeID = req.user?.id;
            const registration = new Registration(req.body);
            registration.currentEmployee = currentEmployeeID;
            const result = await Registration.addRegistration();
            res.status(201).json({ message: 'Đăng ký thành công', id: result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async addCandidate(req, res) {
        try {
            const candidate = new Candidate(req.body);
            const result = await candidate.addCandidate();
            res.status(201).json({ message: 'Đăng ký thi sinh', id: result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default LapPhieuDangKy_TuDoController