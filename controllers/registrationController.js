import Registration from "../services/registrationServices.js";
import RegistrationRepository from "../repository/registration.js";
import ExamScheduleRepository from "../repository/examSchedule.js";

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
    }
}

export default RegistrationController;