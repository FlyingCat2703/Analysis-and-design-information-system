import express from "express";
// import pool from "../config/db.js"
import authController from "../controllers/authController.js";
import examScheduleController from "../controllers/examScheduleController.js";
import PaymentSlipController from "../controllers/PaymentSlipListController.js";
import ReceiptController from "../controllers/ReceiptController.js";
import registrationController from "../controllers/registrationController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import LapPhieuDangKy_TuDoController from "../controllers/LapPhieuDangKy_TuDoController.js";
import XemTTDangKyController from "../controllers/XemTTDangKyController.js";

const router = express.Router();

// homepage
router.get("/", authController.getHomepage);

// handle authentication 
router.get("/login", authController.getLogin);
router.post("/login", authController.login);

// handle exam schedule
router.get("/viewExamSchedule", examScheduleController.getViewExamSchedule);
router.get("/viewExamSchedule/byDate", examScheduleController.getViewExamScheduleInDate);

// register
router.get("/register/organization", registrationController.getOrganizationRegistration);
router.post("/register/organization", AuthMiddleware.verifyToken, AuthMiddleware.authorizeRole(3), registrationController.organizationRegister);
router.get('/register/customer', LapPhieuDangKy_TuDoController.HienThi);
router.post('/add-registration', AuthMiddleware.verifyToken, AuthMiddleware.authorizeRole(3), LapPhieuDangKy_TuDoController.addRegistration);
router.post('/add-candidate', AuthMiddleware.verifyToken, AuthMiddleware.authorizeRole(3), LapPhieuDangKy_TuDoController.addCandidate)

// payment slip
router.get('/viewPaymentSlip', PaymentSlipController.getViewPaymentSlipList);

// receipt
router.get('/createReceipt/:id', ReceiptController.getViewCreteReceiptInfo);
router.post('/api/createInvoice', AuthMiddleware.verifyToken, AuthMiddleware.authorizeRole(2), ReceiptController.createInvoice);

router.get('/xem-tt-dang-ky', XemTTDangKyController.HienThi);

export default router;