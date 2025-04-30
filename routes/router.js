import express from "express";
// import pool from "../config/db.js"
import authController from "../controllers/authController.js";
import examScheduleController from "../controllers/examScheduleController.js";
import PaymentSlipController from "../controllers/PaymentSlipListController.js";
import ReceiptController from "../controllers/ReceiptController.js";
import registrationController from "../controllers/registrationController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import CandidateController from "../controllers/candidateController.js";
import ticketController from "../controllers/TicketController.js";

const router = express.Router();

// homepage
router.get("/", authController.getHomepage);

// mainpage
router.get("/employee-0", authController.getMainPage_0);
router.get("/employee-1", authController.getMainPage_1);
router.get("/employee-2", authController.getMainPage_2);
router.get("/employee-3", authController.getMainPage_3);

// handle authentication 
router.get("/login", authController.getLogin);
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

// payment slip
router.get('/viewPaymentSlip', PaymentSlipController.getViewPaymentSlipList);

// receipt
router.get('/createReceipt/:id', ReceiptController.getViewCreteReceiptInfo);
router.post('/api/createInvoice', AuthMiddleware.verifyToken, AuthMiddleware.authorizeRole(2), ReceiptController.createInvoice);

// grade
router.get("/viewGrade", ticketController.getViewGrade);
router.get("/ticket/result", ticketController.getTicket);

// candidate
router.get("/viewCandidates", CandidateController.getCandidatesByRegistrationID);
router.post('/add-ticket', AuthMiddleware.verifyToken, AuthMiddleware.authorizeRole(1), ticketController.addTicket);


export default router;