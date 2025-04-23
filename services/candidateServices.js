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
}

export default Candidate;