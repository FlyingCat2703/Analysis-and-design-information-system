import TicketRepository from "../repository/Ticket.js";

class Ticket {
    constructor({ candidateName = null, certificateType = null, level = null, grade = null, TicketID = null, CandidateID = null, RegistrationID = null, ExamScheduleID = null }) {
        this.candidateName = candidateName;
        this.certificateType = certificateType;
        this.level = level;
        this.grade = grade;
        this.TicketID = TicketID;
        this.CandidateID = CandidateID;
        this.RegistrationID = RegistrationID;
        this.ExamScheduleID = ExamScheduleID;
    }

    static fromDB(row) {
        return new Ticket({
            candidateName: row.HoTen,
            certificateType: row.LoaiChungChi,
            level: row.CapBac,
            grade: row.Diem,
            TicketID: row["Ma Phieu Du Thi"],
            CandidateID: row["Ma Thi Sinh"],
            RegistrationID: row["Ma Phieu Dang Ki"],
            ExamScheduleID: row["Ma Lich Thi"]
        });
    }

    static async getTicket(candidateNumber) {
        try {
            const ticket = await TicketRepository.getTicket(candidateNumber);
            return ticket;
        } catch (error) {
            console.error("ERROR WHEN GETTING TICKET BY CANDIDATE NUMBER!", error);
            return null;
        }
    }
}

export default Ticket;
