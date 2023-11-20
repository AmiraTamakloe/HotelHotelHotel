import { Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import Types from "../types";
import * as pg from "pg";

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService)
    private readonly databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    router.get("/hotels", async (req, res, next) => {
      await this.databaseService
        .getHotels()
        .then((result: pg.QueryResult) => {
          res.json(result.rows);
        })
        .catch((error: Error) => {
          res.json(error);
        });
    });
    return router;
  }
}
