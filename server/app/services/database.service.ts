import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "tp5",
    database: "postgres",
    password: "tp5",
    port: 5432, // Attention ! Peut aussi être 5433 pour certains utilisateurs
    host: "127.0.0.1",
    keepAlive: true,
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  public async getHotels(): Promise<pg.QueryResult> {
    const client: pg.PoolClient = await this.pool.connect();
    const result: pg.QueryResult = await this.pool.query("Select * from HotelDB.Hotel");
    client.release();
    return result;
  }
}
