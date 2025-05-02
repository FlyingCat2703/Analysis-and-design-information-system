import Registration from "../services/registrationServices.js";

const XemTTDangKyController = {
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

export default XemTTDangKyController;