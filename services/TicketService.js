import TicketRepository from "../repository/Ticket.js";

class Ticket {
    constructor({ candidateName = null, certificateType = null, level = null, grade = null, TicketID = null, CandidateID = null, RegistrationID = null, ExamScheduleID = null, candidateNumber = null }) {
        this.candidateName = candidateName;
        this.certificateType = certificateType;
        this.level = level;
        this.grade = grade;
        this.TicketID = TicketID;
        this.CandidateID = CandidateID;
        this.RegistrationID = RegistrationID;
        this.ExamScheduleID = ExamScheduleID;
        this.candidateNumber = candidateNumber;
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
            ExamScheduleID: row["Ma Lich Thi"],
            candidateNumber: row.candidateNumber
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

    static async addTicket(ticketInfo) {
        try {
            const ticket = new Ticket({
                CandidateID: ticketInfo.candidateID
            });
            const insertedID = await TicketRepository.addTicket(ticket);
            return insertedID;
        } catch (error) {
            console.error("ERROR WHEN ADDING TICKET IN SERVICE LAYER!", error);
            return null;
        }
    }   

    static createTicket(data) {
        return new Ticket(
            data.TicketID,
            data.candidateNumber,
            data.grade,
            data.RegistrationID
        );
    }
}

export default Ticket;
