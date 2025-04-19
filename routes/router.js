import express from "express";
// import pool from "../config/db.js"
import authController from "../controllers/authController.js";

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

router.get('/lap-phieu-dang-ky-tu-do', authController.getLapPhieuDangKy_TuDo);
export default router;