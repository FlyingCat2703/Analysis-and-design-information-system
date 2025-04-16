import express from "express";
// import pool from "../config/db.js"
import authController from "../controllers/authController.js";
import examScheduleController from "../controllers/examScheduleController.js";

const router = express.Router();

// auth
// router.get('/', async (req, res, next) => {
//     // const err = new Error("Something went wrong!");
//     // err.statusCode = 404;
//     // err.desc = "test";
//     // next(err);
//     // const rows = await pool.query('SELECT * FROM QuyDinh');
//     // console.log(rows);
// })
// handle authentication 
router.get('/', authController.getLogin);
router.post('/login', authController.login);

// handle exam schedule
router.get('/viewExamSchedule', examScheduleController.getViewExamSchedule);
router.get('/viewExamSchedule/byDate', examScheduleController.getViewExamScheduleInDate);

export default router;