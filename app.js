require("dotenv").config();

const express = require("express");
const sequelize = require("./db-settings");
const models = require("./database/models/index.js");
const router = require("./src/routes/index");
const cors = require("cors");
const ErrorMidlware = require("./src/midlware/ErrorMidlware");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 8080;
const app = express();

const bodyParser = require("body-parser");
router.use(bodyParser.json());
app.use(cookieParser());
// "http://localhost:3000"
const corsOptions = {
   origin: "https://vladomira-book-app.netlify.app",
   credentials: true,
   maxAge: 10 * 24 * 60 * 60 * 1000,
   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
   optionSuccessStatus: 200,
   exposedHeaders: ["set-cookie"],
   allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));
app.options("*", cors());

app.use(express.json());
app.use("/api", router);
app.get("/", (req, res) => {
   res.send("Welcome");
});
app.get("/favicon.ico", (req, res) => {
   return res.status(204);
});

app.use(ErrorMidlware);

const start = async () => {
   try {
      await sequelize.sync();

      app.listen(PORT, () => console.log(`Hello, I'm an app on port ${PORT}`));
   } catch (error) {
      console.log("my error:", error);
   }
};
start();
