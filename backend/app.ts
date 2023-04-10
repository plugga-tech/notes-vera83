import express from "express";
import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";

import loginRouter from "./src/routes/login";
import notesRouter from "./src/routes/notes";

const app = express();

//apply middlewares
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());

//apply route middleware
app.use("/api/notes", notesRouter);
app.use("/api/login", loginRouter);
//
async function init() {
  app.listen(3000, () => {
    console.log("server started on PORT 3000");
  });
}

init();
