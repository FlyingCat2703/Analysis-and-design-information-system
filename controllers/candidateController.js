import Candidate from "../services/candidateServices.js";
import CandidateRepository from "../repository/candidate.js";

const CandidateController = {
    async addCandidate(req, res) {
        try {
            const candidate = new Candidate(req.body);
            const result = await CandidateRepository.addCandidate(candidate);
            res.status(201).json({ message: 'Đăng ký thi sinh', id: result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getCandidatesByRegistrationID(req, res, next) {
        try {
            const registrationID = req.query.registrationID;
            const candidates = await Candidate.getCandidatesByRegistrationID(registrationID);
    
            res.render("viewCandidates", { candidates: candidates });
        } catch (error) {
            const err = new Error("Lấy danh sách thí sinh theo Mã Phiếu Đăng Ký thất bại!");
            err.statusCode = 404;
            err.desc = "Something went wrong when fetching candidates by registration ID!";
            next(err);
        }
    }
}

export default CandidateController;