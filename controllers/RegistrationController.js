import Registration from "../services/Registration.js";
import RegistrationRepository from "../models/RegistrationRepository.js";

const RegistrationController = {
    async addRegistration(req, res) {
        try {
            const registration = new Registration(req.body);
            const result = await RegistrationRepository.addRegistration(registration);
            res.status(201).json({ message: 'Đăng ký thành công', id: result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default RegistrationController