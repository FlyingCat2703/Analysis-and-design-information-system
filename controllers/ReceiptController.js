import Receipt from "../services/ReceiptService.js";

const ReceiptController = {
    async getViewCreteReceiptInfo(req, res, next) {
        try {
            const paymentSlipID = req.params.id;
            const currentReceiptInfo = await Receipt.getReceiptRepository(paymentSlipID);
            res.render("createReceipt", { data: currentReceiptInfo });
        } catch (error) {
            const err = new Error("Render create receipt site failed!");
            err.statusCode = 404;
            err.desc = "Something went wrong when rendering create receipt!";
            next(err);
        }
    },

    async createInvoice(req, res, next) {
        try {
            const StaffCode = req.user?.id;
            const { PaymentSlipID, RegistrationID, Total } = req.body;
            const dateNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const invoiceInfo = {
                dateNow: dateNow,
                Total: Total,
                RegistrationID: RegistrationID,
                PaymentSlipID: PaymentSlipID,
                StaffCode: StaffCode
            }
            const success = await Receipt.addInvoice(invoiceInfo);
            
            if (success) {
                res.status(200).json({ success: true });
            } else {
                res.status(404).json({ success: false });
            }
        } catch (error) {
            console.error("Error creating invoice:", error);
            res.status(404).json({ success: false });
        }
    }
}

export default ReceiptController;