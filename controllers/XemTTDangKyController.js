import Registration from "../services/registrationServices.js";

const XemTTDangKyController = {
    async HienThi(req, res) {
        try {
            const registrations = await Registration.getRegistration();
            res.render('XemTTDangKy', { registrations });
        } catch (error) {
            console.error('Lỗi khi lấy danh sách đăng ký:', error);
            res.status(500).send('Lỗi khi lấy danh sách đăng ký');
        }
    }
}

export default XemTTDangKyController;