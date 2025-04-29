import pool from "../config/db.js";
import Regulation from "../services/regulationServices.js"

class RegulationRepository {
    static async getRegulation() {
        try {
            const rows = await pool.query("SELECT * FROM QUYDINH");
            if (rows[0]) {
                let regulationList = [];
                rows[0].forEach(row => {
                    const regulation = Regulation.fromDB(row);
                    regulationList.push(regulation);
                });
                return regulationList;
            }
            return null;
        } catch (error) {
            console.log("ERROR IN GETTING REGULATION: ", error);
            return null;
        }
    }
};

export default RegulationRepository;