import jwt from "jsonwebtoken";
import config from "../config/config.js";

class AuthMiddleware {
    verifyToken(req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            const err = new Error("Don't have access token!!");
            err.statusCode = 404;
            err.desc = "You have to login first!!";
            next(err);
            return;
        }

        const token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, config.jwt_secret);
            req.user = decoded;
            next();
        } catch (error) {
            const err = new Error("Invalid access token");
            err.statusCode = 404;
            err.desc = "You have to login first!!";
            next(err);
        }
    }

    authorizeRole(...allowedRoles) {
        return (req, res, next) => {
            const userRole = req.user?.type;
            if (!userRole || !allowedRoles.includes(userRole)) {
                res.status(404).render('../views/error/404', {
                    message: "You don't have permission to access this page.",
                    desc: "You have to login with a specific role to use this feature!"
                });
                return;
            }
            next();
        }
    }
}

export default new AuthMiddleware;