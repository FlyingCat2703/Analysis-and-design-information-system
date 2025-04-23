import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import config from "./config/config.js";
import router from "./routes/router.js"
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);

app.use(session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: false
}));

app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("./public"));

app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const acceptHeader = req.headers.accept || '';

    if (acceptHeader.includes('application/json')) {
        res.status(status).json({
            message: err.message,
            desc: err.desc,
            statusCode: status
        });
    } else {
        res.status(status).render(`error/error${status}`, {
            statusCode: status,
            message: err.message,
            desc: err.desc
        });
    }
});

app.listen(config.port, () => {
    console.log(`App is running on url http://localhost:${config.port}`);
});

process.on("SIGINT", () => {
    console.log("Server is shutting down!");
    process.exit(0);
})