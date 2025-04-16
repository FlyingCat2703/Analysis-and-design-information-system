import Employee from "../services/employeeService.js";

class AuthController {
    getLogin(req, res, next) {
        try {
            res.render("login");
        } catch (error) {
            const err = new Error("Render authentication site failed!");
            err.statusCode = 404;
            err.desc = "Something went wrong when rendering authentication!";
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const employee = new Employee({ username: username, password: password });
            const result = await employee.login();
            res.status(200).json(result);
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}

export default new AuthController;