import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import * as dotenv from 'dotenv';
dotenv.config();

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: 5433,
    host: "127.0.0.1",
    keepAlive: true,
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  public async getHotels(): Promise<pg.QueryResult> {
    const client: pg.PoolClient = await this.pool.connect();
    const result: pg.QueryResult = await this.pool.query(
      "Select * from HotelBD.Hotel"
    );
    client.release();
    return result;
  }
  public async getHotelById(numhotel: string): Promise<pg.QueryResult> {
    const client: pg.PoolClient = await this.pool.connect();
    const result: pg.QueryResult = await this.pool.query(
      `Select * from HotelBD.Hotel where numhotel = ${numhotel}}`
    );
    client.release();
    return result;
  }

  public async getTableDataByName(tableName: string): Promise<pg.QueryResult> {
    const client: pg.PoolClient = await this.pool.connect();
    const result: pg.QueryResult = await this.pool.query(
      `Select * from HotelBD.${tableName}`
    );
    client.release();
    return result;
  }
  public async getRooms(room : any): Promise<pg.QueryResult> {
    const client: pg.PoolClient = await this.pool.connect();
    const { numHotel, roomType, price } = room;
    let query = `SELECT * FROM HotelBD.Room WHERE 1=1`;
    if (numHotel) {
      query += ` AND numHotel = '${numHotel}'`;
    }
    if (roomType) {
      query += ` AND roomType = '${roomType}'`;
    }
    if (price) {
      query += ` AND price = ${price}`;
    }
    const result: pg.QueryResult = await this.pool.query(query);
    client.release();
    return result;
  }

  public async getHotelsNo(): Promise<pg.QueryResult> {
    const client: pg.PoolClient = await this.pool.connect();
    const result: pg.QueryResult = await this.pool.query(
      "Select numHotel from HotelBD.Hotel"
    );
    client.release();
    return result;
  }

  public async getHotelsNomAndId(): Promise<pg.QueryResult> {
    const client: pg.PoolClient = await this.pool.connect();
    const result: pg.QueryResult = await this.pool.query(
      "Select numHotel, nom from HotelBD.Hotel"
    );
    client.release();
    return result;
  }

  public async addHotel(hotel: any): Promise<pg.QueryResult> {
    const client: pg.PoolClient = await this.pool.connect();
    const values: any[] = [hotel.numhotel, hotel.nom, hotel.ville];
    const query: string = `INSERT INTO HotelBD.Hotel (numhotel, nom, ville) VALUES ($1, $2, $3)`;
    const result: pg.QueryResult = await this.pool.query(query, values);
    client.release();
    return result;
  }
  public async addRoom(room: any): Promise<pg.QueryResult> {
    const client: pg.PoolClient = await this.pool.connect();
    const values: any[] = [
      room.numroom,
      room.roomtype,
      room.price,
      room.numhotel,
    ];
    const query: string = `INSERT INTO HotelBD.Room (numroom, roomtype, price, numhotel) VALUES ($1, $2, $3, $4)`;
    const result: pg.QueryResult = await this.pool.query(query, values);
    client.release();
    return result;
  }

  public async modifyHotelInfo(hotel: any): Promise<pg.QueryResult> {
    const client: pg.PoolClient = await this.pool.connect();
    const query: string = `
    UPDATE HotelBD.Hotel
    SET nom = '${hotel.nom}', ville = '${hotel.ville}'
    WHERE numhotel = '${hotel.numhotel}'`;
    const result: pg.QueryResult = await this.pool.query(query);
    client.release();
    return result;
  }
  public async modifyRoomInfo(room: any): Promise<pg.QueryResult> {
    const client: pg.PoolClient = await this.pool.connect();
    const query: string = `
    UPDATE HotelBD.Room
    SET numroom = '${room.numroom}', roomtype = '${room.roomtype}', price = '${room.price}', numhotel = '${room.numhotel}'
    WHERE roomid = '${room.roomid}'`;
    const result: pg.QueryResult = await this.pool.query(query);
    client.release();
    return result;
  }

  public async deleteHotel(numHotel: string): Promise<pg.QueryResult> {
    const client: pg.PoolClient = await this.pool.connect();
    const query: string = `DELETE FROM HotelBD.Hotel WHERE numhotel = '${numHotel}'`;
    const result: pg.QueryResult = await this.pool.query(query);
    client.release();
    return result;
  }
  public async deleteRoom(roomid: string): Promise<pg.QueryResult> {
    const client: pg.PoolClient = await this.pool.connect();
    const id = +roomid;
    const query: string = `DELETE FROM HotelBD.Room WHERE roomid = ${id}`;
    const result: pg.QueryResult = await this.pool.query(query);
    client.release();
    return result;
  }

  public async createSchema(): Promise<pg.QueryResult> {
    const client: pg.PoolClient = await this.pool.connect();
    const sqlQuery = `DROP SCHEMA IF EXISTS HotelDB CASCADE;
    CREATE SCHEMA IF NOT EXISTS HotelBD;
    SET search_path=HotelBD;
    
    CREATE TABLE HotelBD.Hotel (
        numHotel VARCHAR(30) NOT NULL PRIMARY KEY,
        nom VARCHAR(30) NOT NULL,
        ville VARCHAR(30) NOT NULL
    );
    `;
    const result: pg.QueryResult = await client.query(sqlQuery);
    client.release();
    return result;
  }
}
