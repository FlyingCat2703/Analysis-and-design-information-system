import CandidateRepository from "../repository/candidate.js";

class Candidate {
    constructor({id = null, name, phoneNumber, home, email, registrationID}) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.home = home;
        this.email = email;
        this.registrationID = registrationID;
    }

    static fromDB(row) {
        return new Candidate({
            id: row.MaThiSinh,
            name: row.HoTen,
            phoneNumber: row.SDT,
            home: row.DiaChi,
            email: row.Email,
            registrationID: row.MaPhieuDangKi
        })
    }

    static createCandidate(data) {
        return new Candidate(
            data.id,
            data.name,
            data.phoneNumber,
            data.home,
            data.email,
            data.registrationID
        )
    }

    static async getCandidatesByRegistrationID(registrationID) {
        try {
            const candidatesData = await CandidateRepository.getCandidatesByRegistrationID(registrationID);
            if (candidatesData.length > 0) {
                return candidatesData.map(row => Candidate.fromDB(row));
            } else {
                return [];
            }
        } catch (error) {
            console.error("ERROR WHEN GETTING CANDIDATES BY REGISTRATION ID!", error);
            return null;
        }
    }  
}

export default Candidate;