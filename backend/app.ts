import express from "express";
import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";

//Import route file
//const usersRouter = require("./routes/users");

const app = express();

//apply middlewares
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());

//apply route middleware
//app.use("/api/users", usersRouter);

//start application
async function init() {
  app.listen(3000, () => {
    console.log("server started on PORT 3000");
  });
}

init();
