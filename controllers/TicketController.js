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
                res.status(200).json({ success: true, result: grade });
            } else {
                res.status(404).json({ success: false, message: "Không tìm thấy kết quả cho số báo danh này." });
            }
        } catch (error) {
            const err = new Error("Fetch exam result failed!");
            err.statusCode = 404;
            err.desc = "Something went wrong when fetching exam result!";
            next(err);
        }
    },

    async addTicket(req, res) {
        try {
            const ticket = req.query.registrationID;
            console.log(ticket);
            const result = await Ticket.createTicket(ticket);
            res.status(201).json({ message: 'Thêm phiếu dự thi thành công', id: result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default TicketController;
