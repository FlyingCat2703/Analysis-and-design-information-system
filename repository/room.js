import pool from "../config/db.js";

class RoomRepository {
    static async getEmptyRoom(date) {
        try {
            const [numOfRoom] = await pool.query("SELECT * FROM PHONGTHI WHERE MAPHONGTHI NOT IN (SELECT MAPHONGTHI FROM LICHTHI WHERE NGAYTHI = ?)", [date]);
            if (numOfRoom.length === 0) {
                return null;
            } else {
                return numOfRoom[0].MaPhongThi;
            }
        } catch (error) {
            console.log("ERROR IN GETTING EMPTY ROOM IN A SPECIFIC DATE!");
            return null;
        }
    }
}

export default RoomRepository;