import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import marked from "marked";
import logger from "morgan";
import path from "path";
import connectMongoDb from "./connectMongodb";
import userRoute from "./routes/userRoute";

dotenv.config();

const PORT = parseInt(process.env.PORT, 10) || 4000;

(async () => {
  try {
    const app = express();
    app.disable("x-powered-by");
    app.use(logger("dev"));
    // connection establishment with mongodb
    await connectMongoDb();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/", function(req, res) {
      const pathdir = path.join(__dirname, "README.md");

      fs.readFile(pathdir, "utf8", function(err, data) {
        if (err) {
          console.log(err);
        }
        res.send(marked(data.toString()));
      });
    });

    app.use(userRoute);

    app.listen(PORT, () => {
      console.log(`server started at  http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
})();
