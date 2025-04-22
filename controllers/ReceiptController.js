import Receipt_create_info from "../services/ReceiptService.js";
import ReceiptRepository from "../models/Receipt.js";

class ReceiptController {
    async getViewCreteReceiptInfo(req, res, next) {
        try {
            const paymentSlipID = req.params.id;
            const currentReceiptInfo = await Receipt_create_info.getReceiptRepository(paymentSlipID);
            res.render("createReceipt", { data: currentReceiptInfo });
        } catch (error) {
            const err = new Error("Render create receipt site failed!");
            err.statusCode = 404;
            err.desc = "Something went wrong when rendering create receipt!";
            next(err);
        }
    }

    async createInvoice(req, res, next) {
        try {
            console.log(req.body);
            const { PaymentSlipID, RegistrationID, RescheduleFormID, Total, StaffCode } = req.body;
            const dateNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
            const success = await ReceiptRepository.insertInvoice(dateNow, Total, RescheduleFormID, RegistrationID, PaymentSlipID, StaffCode);
    
            if (success) {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        } catch (error) {
            console.error("Error creating invoice:", error);
            res.json({ success: false });
        }
    }
}

export default new ReceiptController;