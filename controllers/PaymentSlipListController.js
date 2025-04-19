import PaymentSlip from "../services/PaymentSlipService.js";

class PaymentSlipController {
    async getViewPaymentSlipList(req, res, next) {
        try {
            const currentPaymentSlips = await PaymentSlip.getPaymentSlipList();
            res.render("viewPaymentSlipList", { PaymentSlips: currentPaymentSlips });
        } catch (error) {
            const err = new Error("Render view payment slip list site failed!");
            err.statusCode = 404;
            err.desc = "Something went wrong when rendering view payment slip list!";
            next(err);
        }
    }

    // async getViewExamScheduleInDate(req, res, next) {
    //     try {
    //         const date = req.query.date;
    //         const examSchedules = await ExamSchedule.getExamScheduleInDate(date);
    //         res.json({ schedules: examSchedules });
    //     } catch (error) {
    //         const err = new Error("Render view exam schedule site failed!");
    //         err.statusCode = 404;
    //         err.desc = "Something went wrong when rendering view exam schedule!";
    //         next(err);
    //     }
    // }
}

export default new PaymentSlipController;