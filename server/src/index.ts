import * as express from "express";
import * as bodyParser from "body-parser";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "./data-source";
import Routes from "./routes";
import AuthMiddleware from "./middleware/Auth.middleware";
import { upload } from "./middleware/Multer.middleware";
import * as cors from "cors";

require("dotenv").config();

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    const corsOptions: cors.CorsOptions = {
      origin: 'https://fir-react-example-e2b28.web.app',
      credentials: true
    }
    app.use(cors(corsOptions));

    app.get("/", (request: Request, response: Response, next: NextFunction) => {
      response.send("SkillPlane Server is running");
    });

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: NextFunction) =>
          AuthMiddleware(req, res, next, route.role),
        upload.single("image"),
        (req: Request, res: Response, next: NextFunction) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) => {
              if (result instanceof Error) {
                return res.status(500).json({ error: result.message });
              }

              return result !== null && result !== undefined
                ? res.send(result)
                : undefined;
            });
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // start express server
    app.listen(process.env.PORT || 3001);

    console.log(
      `Express server has started on port ${process.env.PORT || 3001}. Open http://localhost:${process.env.PORT || 3001} to see results`
    );
  })
  .catch((error) => console.log(error));
