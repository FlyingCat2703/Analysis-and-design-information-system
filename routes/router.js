import express from "express";
// import pool from "../config/db.js"
import authController from "../controllers/authController.js";
import examScheduleController from "../controllers/examScheduleController.js";
import registrationController from "../controllers/registrationController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import CandidateController from "../controllers/candidateController.js";

const router = express.Router();

// handle authentication 
router.get("/", authController.getLogin);
router.post("/login", authController.login);

// handle exam schedule
router.get("/viewExamSchedule", examScheduleController.getViewExamSchedule);
router.get("/viewExamSchedule/byDate", examScheduleController.getViewExamScheduleInDate);

// register
router.get("/register/organization", registrationController.getOrganizationRegistration);
router.post("/register/organization", AuthMiddleware.verifyToken, AuthMiddleware.authorizeRole(3), registrationController.organizationRegister);
router.get('/register/customer', registrationController.HienThi_LapPhieuDangKy_TuDo);
router.post('/add-registration', AuthMiddleware.verifyToken, AuthMiddleware.authorizeRole(3), registrationController.addRegistration);
router.post('/add-candidate', AuthMiddleware.verifyToken, AuthMiddleware.authorizeRole(3), CandidateController.addCandidate)

export default router;