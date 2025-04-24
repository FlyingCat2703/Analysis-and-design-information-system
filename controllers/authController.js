import Employee from "../services/employeeService.js";

const AuthController = {
    getLogin(req, res, next) {
        try {
            res.render("login");
        } catch (error) {
            const err = new Error("Render authentication site failed!");
            err.statusCode = 404;
            err.desc = "Something went wrong when rendering authentication!";
            next(err);
        }
    },

    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const employee = new Employee({ username: username, password: password });
            const result = await employee.login();
            if (result.token) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: result.message });
            }
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    },

    getHomepage(req, res, next) {
        try {
            res.render("homepage");
        } catch (error) {
            const err = new Error("Render homepage failed!");
            err.statusCode = 404;
            err.desc = "Something went wrong when rendering homepage!";
            next(err);
        }
    }
}

export default AuthController;