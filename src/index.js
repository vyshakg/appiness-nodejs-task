import bodyParser from "body-parser";
import express from "express";
import logger from "morgan";
import connectMongoDb from "./connectMongodb";
import userRoute from "./routes/userRoute";

const PORT = parseInt(process.env.PORT, 10) || 4000;

(async () => {
  try {
    const app = express();

    app.use(logger("dev"));
    // connection establishment with mongodb
    await connectMongoDb();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(userRoute);

    app.listen(PORT, () => {
      console.log(`server started at  http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
})();
