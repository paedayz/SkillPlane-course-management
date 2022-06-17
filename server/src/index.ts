import * as express from "express";
import * as bodyParser from "body-parser";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "./data-source";
import Routes from "./routes";
import AuthMiddleware from "./middleware/Auth.middleware";
import { upload } from "./middleware/Multer.middleware";
import * as cors from 'cors'

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cors())

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
          try {
            if (result instanceof Promise) {
              result.then((result) =>
                result !== null && result !== undefined
                  ? res.send(result)
                  : undefined
              );
            } else if (result !== null && result !== undefined) {
              res.json(result);
            }
          } catch (error) {
            res.status(500).json(error.message)
          }
        }
      );
    });

    // start express server
    app.listen(process.env.PORT || 3001);

    console.log(
      "Express server has started on port 3001. Open http://localhost:3001 to see results"
    );
  })
  .catch((error) => console.log(error));
