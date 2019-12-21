import bodyParser from "body-parser";
import cors from "cors";
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

const host =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_URL
    : "http://localhost:4000";

const apis =
  process.env.NODE_ENV === "production"
    ? ["./routes/*.js", "./model/swagger_def.yaml"]
    : ["src/routes/*.js", "src/model/swagger_def.yaml"];
const PORT = parseInt(process.env.PORT, 10) || 4000;
const swaggerDefinition = {
  info: {
    title: "Appiness Nodejs Task",
    version: "1.0.0",
    description: "Endpoints to test the user registration routes"
  },
  host,
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
  apis
};

const swaggerDocs = swaggerJsDoc(options);

const CORSconfig = {
  origin: "*"
};

(async () => {
  try {
    const app = express();
    app.disable("x-powered-by");
    app.use(logger("dev"));
    // connection establishment with mongodb
    await connectMongoDb();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors(CORSconfig));

    // readme docs
    app.get("/", function(req, res) {
      const pathdir = path.join(__dirname, "../README.md");

      fs.readFile(pathdir, "utf8", function(err, data) {
        if (err) {
          console.log(err);
        }
        res.send(`
        <html>
        <style>
        img {width: 100%;}
        </style>
        <body style = "margin-left:25rem; margin-right: 25rem;">
        ${marked(data.toString())}
        </body>
        </html>`);
      });
    });

    // swaggger docs
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    // register route
    app.use(userRoute);

    app.listen(PORT, () => {
      console.log(`server started at  ${host}`);
    });
  } catch (e) {
    console.log(e);
  }
})();
