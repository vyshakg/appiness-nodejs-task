import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import marked from "marked";
import logger from "morgan";
import path from "path";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import connectMongoDb from "./connectMongodb";
import userRoute from "./routes/userRoute";

dotenv.config();

const PORT = parseInt(process.env.PORT, 10) || 4000;
const swaggerDefinition = {
  info: {
    title: "Appiness Nodejs Task",
    version: "1.0.0",
    description: "Endpoints to test the user registration routes"
  },
  host: "localhost:4000",
  basePath: "/",
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      in: "header"
    }
  }
};
const options = {
  swaggerDefinition,
  apis: ["src/routes/*.js", "src/model/swagger_def.yaml"]
};

const swaggerDocs = swaggerJsDoc(options);

(async () => {
  try {
    const app = express();
    app.disable("x-powered-by");
    app.use(logger("dev"));
    // connection establishment with mongodb
    await connectMongoDb();
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

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
