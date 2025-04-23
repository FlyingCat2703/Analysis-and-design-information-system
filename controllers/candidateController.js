import Candidate from "../services/candidateServices.js";
import CandidateRepository from "../models/candidate.js";

const CandidateController = {
    async addCandidate(req, res) {
        try {
            const candidate = new Candidate(req.body);
            const result = await CandidateRepository.addCandidate(candidate);
            res.status(201).json({ message: 'Đăng ký thi sinh', id: result });
        } catch (error) {

            res.status(500).json({ error: error.message });
        }
    }
}

export default CandidateController;