import jwt from "jsonwebtoken";
import EmployeeRepository from "../models/employee.js";
import config from "../config/config.js";

class Employee {
    constructor({id = null, username = null, password = null, name = null, type = null}) {
        this.username = username;
        this.password = password;
        this.id = id;
        this.name = name;
        this.type = type;
    }

    static fromDB(row) {
        return new Employee({
            id: row.MaNhanVien,
            username: row.TaiKhoan,
            password: row.MatKhau,
            name: row.TenNhanVien,
            type: row.LoaiNV
        });
    }

    async login() {
        try {
            if (!this.username || !this.password) {
                throw new Error("Please provide username and password!!");
            }
    
            const user = await EmployeeRepository.findByUsername(this.username);
            if (!user) {
                throw new Error("Username does not exist!!");
            }
    
            const isMatch = this.password === user.password;
            if (!isMatch) {
                throw new Error("Incorrect password!!");
            }
    
            const payload = {
                id: user.id,
                name: user.name,
                type: user.type
            };
    
            const token = jwt.sign(payload, config.jwt_secret, { expiresIn: "2h" });
            return {
                message: "Login successfully!!",
                token,
                info: {
                    id: user.id,
                    name: user.name,
                    type: user.type
                }
            };
        } catch (error) {
            console.log("ERROR WHEN TRYING TO LOGIN!!");
            return {
                message: "Login unsucessfully!!",
                token: null,
                info: null
            }
        }
    }
}

export default Employee;