import express from "express";
// import pool from "../config/db.js"
import authController from "../controllers/authController.js";
import RegistrationController from "../controllers/RegistrationController.js";
import CandidateController from "../controllers/CandidateController.js";
import ExamScheduleController from "../controllers/ExamScheduleController.js";
import HienThiController from "../controllers/HienThiController.js";

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
router.get('/', authController.getLogin);
router.post('/login', authController.login);

router.get('/lap-phieu-dang-ky-tu-do', HienThiController.HienThi_LapPhieuDangKy_TuDo);
router.post('/add-registration', RegistrationController.addRegistration);
router.post('/add-candidate', CandidateController.addCandidate);

router.get('/xem-tt-dang-ky', HienThiController.HienThi_XemTTDangKy);
export default router;