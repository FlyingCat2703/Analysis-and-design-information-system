import Ticket from "../services/TicketService.js";

const TicketController = {
    async getViewGrade(req, res, next) {
        try {
            res.render("viewGrade"); 
        } catch (error) {
            const err = new Error("Xem kết quả thi thất bại!");
            err.statusCode = 404;
            err.desc = "Something went wrong when rendering exam result view!";
            next(err);
        }
    },

    async getTicket(req, res, next) {
        try {
            const candidateNumber = req.query.candidateNumber;
            const grade = await Ticket.getTicket(candidateNumber);

            if (grade) {
                res.json({ success: true, result: grade });
            } else {
                res.status(404).json({ success: false, message: "Không tìm thấy kết quả cho số báo danh này." });
            }
        } catch (error) {
            const err = new Error("Fetch exam result failed!");
            err.statusCode = 404;
            err.desc = "Something went wrong when fetching exam result!";
            next(err);
        }
    }
};

export default TicketController;
