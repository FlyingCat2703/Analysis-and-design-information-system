import ExamSchedule from "../services/examScheduleService.js";

class ExamScheduleController {
    async getViewExamSchedule(req, res, next) {
        try {
            const currentExamSchedules = await ExamSchedule.getExamSchedule();
            res.render("viewExamSchedule", { schedules: currentExamSchedules });
        } catch (error) {
            const err = new Error("Render view exam schedule site failed!");
            err.statusCode = 404;
            err.desc = "Something went wrong when rendering view exam schedule!";
            next(err);
        }
    }

    async getViewExamScheduleInDate(req, res, next) {
        try {
            const date = req.query.date;
            const examSchedules = await ExamSchedule.getExamScheduleInDate(date);
            res.json({ schedules: examSchedules });
        } catch (error) {
            const err = new Error("Render view exam schedule site failed!");
            err.statusCode = 404;
            err.desc = "Something went wrong when rendering view exam schedule!";
            next(err);
        }
    }
}

export default new ExamScheduleController;