import dotenv from "dotenv";
import assert from "assert";

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    SESSION_SECRET,
    JWT_SECRET,
    USER,
    PASSWORD,
    DATABASE
} = process.env;

assert(PORT, "PORT is required!");
assert(HOST, "HOST is required!");

const config = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    mysqlConnection: {
        user: USER,
        password: PASSWORD,
        host: HOST,
        database: DATABASE,
    },
    jwt_secret: JWT_SECRET,
    session_secret: SESSION_SECRET
};

export default config;