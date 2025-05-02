import Registration from "../services/registrationServices.js";
import RegistrationRepository from "../repository/registration.js";
import ExamScheduleRepository from "../repository/examSchedule.js";
import Regulation from "../services/regulationServices.js";

const RegistrationController = {
    async getOrganizationRegistration(req, res, next) {
        try {
            res.render("organizationRegister")
        } catch (error) {
            const err = new Error("Render organization registration site failed!");
            err.statusCode = 404;
            err.desc = "Something went wrong when rendering organization registration!";
            next(err);
        }
    },

    async organizationRegister(req, res, next) {
        try {
            const formData = req.body;
            const currentEmployeeID = req.user?.id;
            formData.currentEmployee = currentEmployeeID;
            const createdRegistration = await Registration.createOrganizationRegistration(formData);
            if (!createdRegistration) {
                res.status(404).json({ message: "Không còn phòng trống vào ngày bạn chọn!" });
                return;
            }
            res.status(200).json({ message: "Lập phiếu đăng ký cho đơn vị thành công!" });
        } catch (error) {
            const err = new Error("Organization registration failed!!");
            err.statusCode = 404;
            err.desc = "Something went wrong when registering as a organization!";
            next(err);
        }
    },

    async HienThi_LapPhieuDangKy_TuDo(req, res) {
        try {
            const schedules = await ExamScheduleRepository.getExamSchedule();
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
            const result = await RegistrationRepository.addRegistration(registration);
            res.status(201).json({ message: 'Đăng ký thành công', id: result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getViewRules(req, res, next) {
        try {
            const regulations = await Regulation.getRegulation();
            res.render("viewRules", { regulations: regulations });
        } catch (error) {
            const err = new Error("Render view regulation site failed!");
            err.statusCode = 404;
            err.desc = "Something went wrong when rendering view regulation!";
            next(err);
        }
    },

    async HienThi(req, res) {
        try {
            const registrations = await Registration.getRegistration();
            res.render('XemTTDangKy', { registrations, searchQuery: '' });
        } catch (error) {
            console.error('Lỗi khi lấy danh sách đăng ký:', error);
            res.status(500).send('Lỗi khi lấy danh sách đăng ký');
        }
    },

    async TimKiem(req, res) {
        const name = req.query.name;
        try {
            const registrations = name && name.trim() !== ''
            ? await Registration.getRegistrationByCustomerName(name)
            : await Registration.getRegistration();
            res.render('XemTTDangKy', { registrations, searchQuery: name || '' });
        } catch (error) {
            console.error('Lỗi khi lấy danh sách đăng ký:', error);
            res.status(500).send('Lỗi khi lấy danh sách đăng ký');
        }
    }
}

export default RegistrationController;