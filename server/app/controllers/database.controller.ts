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

    router.post("/hotel/insert", async (req, res, next) => {
      await this.databaseService
        .addHotel(req.body.hotel)
        .then((result) => {
          res.json(result);
        })
        .catch((error: Error) => {
          console.error(error.stack);
          res.status(400).json(error.message);
        });
    });
    router.post("/room/insert", async (req, res, next) => {
      await this.databaseService
        .addRoom(req.body)
        .then((result) => {
          res.json(result);
        })
        .catch((error: Error) => {
          console.error(error.stack);
          res.status(400).json(error.message);
        });
    });
    router.put("/hotel", async (req, res, next) => {
      await this.databaseService
        .modifyHotelInfo(req.body)
        .then((result: pg.QueryResult) => {
          res.json(result.rows);
        })
        .catch((error: Error) => {
          console.error(error.stack);
        });
    });
    router.put("/room", async (req, res, next) => {
      await this.databaseService
        .modifyRoomInfo(req.body)
        .then((result: pg.QueryResult) => {
          res.json(result.rows);
        })
        .catch((error: Error) => {
          console.error(error.stack);
        });
    });
    router.get("/hotel", async (req, res, next) => {
      await this.databaseService
        .getHotels()
        .then((result: pg.QueryResult) => {
          res.json(result.rows);
        })
        .catch((error: Error) => {
          console.error(error.stack);
        });
    });
    router.delete("/hotel/:numhotel", async (req, res, next) => {
      await this.databaseService
        .deleteHotel(req.params.numhotel)
        .then((result: pg.QueryResult) => {
          res.json(result.rows);
        })
        .catch((error: Error) => {
          console.error(error.stack);
        });
    });
    router.delete("/room/:roomid", async (req, res, next) => {
      await this.databaseService
        .deleteRoom(req.params.roomid)
        .then((result: pg.QueryResult) => {
          res.json(result.rows);
        })
        .catch((error: Error) => {
          console.error(error.stack);
        });
    });
    router.get("/tables/:tableName", async (req, res, next) => {
      await this.databaseService
        .getTableDataByName(req.params.tableName)
        .then((result: pg.QueryResult) => {
          res.json(result.rows);
        })
        .catch((error: Error) => {
          console.error(error.stack);
        });
    });
    router.get("/hotel/hotelNo", async (req, res, next) => {
      await this.databaseService
        .getHotelsNo()
        .then((result: pg.QueryResult) => {
          res.json(result.rows);
        })
        .catch((error: Error) => {
          console.error(error.stack);
        });
    });
    router.get("/hotel/hotelName", async (req, res, next) => {
      await this.databaseService
        .getHotelsNomAndId()
        .then((result: pg.QueryResult) => {
          res.json(result.rows);
        })
        .catch((error: Error) => {
          console.error(error.stack);
        });
    });
    router.get("/rooms", async (req, res, next) => {
      const { numhotel, roomtype, price } = req.query;
      const roomParams = {
        numHotel: numhotel,
        roomType: roomtype,
        price: price,
      };
      await this.databaseService
        .getRooms(roomParams)
        .then((result: pg.QueryResult) => {
          res.json(result.rows);
        })
        .catch((error: Error) => {
          console.error(error.stack);
        });
    });
    router.post("/createSchema", async (req, res, next) => {
      await this.databaseService
        .createSchema()
        .then((result: pg.QueryResult) => {
          res.json(result);
        })
        .catch((error: Error) => {
          console.error(error.stack);
        });
    });

    return router;
  }
}
