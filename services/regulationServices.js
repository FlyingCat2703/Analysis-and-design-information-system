import RegulationRepository from "../repository/regulation.js";

class Regulation {
    constructor({id = null, des = null }) {
        this.id = id;
        this.des = des;
    }

    static fromDB(row) {
        return new Regulation({
            id: row.MaQuyDinh,
            des: row.MoTa
        });
    }

    static async getRegulation() {
        try {
            const regulations = RegulationRepository.getRegulation();
            return regulations;
        } catch (error) {
            console.log("ERROR WHEN TRYING TO GET REGULATION!!");
            return null;
        }
    }
}

export default Regulation;