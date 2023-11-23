import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, catchError, of } from "rxjs";
import { Hotel } from "../../../../common/tables/Hotel";
import { Room } from "../../../../common/tables/Room";

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private readonly http: HttpClient) {}

  private _listeners: any = new Subject<any>();

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }

  public getAllHotels(): Observable<Hotel[]> {
    return this.http
      .get<Hotel[]>(this.BASE_URL + `/hotel`)
      .pipe(catchError(this.handleError<Hotel[]>("getHotels")));
  }
  public getAllHotelsName(): Observable<Hotel[]> {
    return this.http
      .get<Hotel[]>(this.BASE_URL + `/hotel/hotelName`)
      .pipe(catchError(this.handleError<Hotel[]>("getHotelsName")));
  }

  public getRooms(numHotel?: string, roomType?: string, price?: number): Observable<Room[]> {
    let params = new HttpParams();
    if (numHotel) {
      params = params.set("numhotel", numHotel);
    }
    if (roomType) {
      params = params.set("roomtype", roomType);
    }
    if (price) {
      params = params.set("price", price.toString());
    }
    return this.http
      .get<Room[]>(this.BASE_URL + "/rooms", { params: params })
      .pipe(catchError(this.handleError<Room[]>("getRooms")));
  }


  public addHotel(hotel: Hotel): Observable<Hotel> {
    return this.http
      .post<Hotel>(this.BASE_URL + `/hotel/insert`, hotel)
      .pipe(catchError(this.handleError<Hotel>("addHotel")));
  }
  public addRoom(room: Room): Observable<Room> {
    console.log('post is called', room);
    return this.http
      .post<Room>(this.BASE_URL + `/room/insert`, room)
      .pipe(catchError(this.handleError<Room>("addRoom")));
  }

  public modifyHotelInfo(hotel: Hotel): Observable<Hotel> {
    return this.http
      .put<Hotel>(this.BASE_URL + `/hotel`, hotel)
      .pipe(catchError(this.handleError<Hotel>("modifyHotelInfo")));
  }
  public modifyRoomInfo(room: Room): Observable<Room> {
    console.log('put is called', room);
    return this.http
      .put<Room>(this.BASE_URL + `/room`, room)
      .pipe(catchError(this.handleError<Room>("modifyRoomInfo")));
  }
  public createSchema(): Observable<any> {
    return this.http
      .post(this.BASE_URL + `/createSchema`, null)
      .pipe(catchError(this.handleError<any>("addHotel")));
  }

  public getTableDataByName(tableName: string): Observable<any> {
    return this.http
      .get(this.BASE_URL + `/tables/${tableName}`)
      .pipe(catchError(this.handleError<any>("getTableDataByName")));
  }

  public deleteHotel(numHotel: string): Observable<Hotel> {
    console.log(numHotel);
    return this.http
      .delete<Hotel>(this.BASE_URL + `/hotel/${numHotel}`)
      .pipe(catchError(this.handleError<Hotel>("deleteHotel")));
  }
  
  public deleteRoom(roomid: number): Observable<Room> {
    console.log(roomid);
    return this.http
      .delete<Room>(this.BASE_URL + `/room/${roomid}`)
      .pipe(catchError(this.handleError<Room>("deleteRoom")));
  }

  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
