import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { CommunicationService } from "src/app/services/communication.service";
import { Hotel } from "../../../../../common/tables/Hotel";
import { Room } from "../../../../../common/tables/Room";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationPopupComponent } from "../confirmation-popup/confirmation-popup.component";
import { ModifyRoomComponent } from "../modify-room/modify-room.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.css"],
})
export class RoomComponent implements OnInit {
  displayedColumns: string[] = [
    "numhotel",
    "RoomNumber",
    "roomType",
    "price",
    "actions",
  ];
  hotelNames: Hotel[];
  rooms: MatTableDataSource<Room>;
  hotel: FormControl;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private communicationService: CommunicationService,
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {
    this.hotel = new FormControl();
  }

  async ngOnInit(): Promise<void> {
    await this.fetchData();
    this.hotel.valueChanges.subscribe((selectedHotel) => {
      this.fetchRoomByHotel(selectedHotel.numhotel);
    });
  }

  async fetchData() {
    this.communicationService.getAllHotelsName().subscribe((names: Hotel[]) => {
      this.hotelNames = names;
    });
    this.communicationService.getRooms().subscribe((rooms: Room[]) => {
      this.rooms = new MatTableDataSource<Room>(rooms);
      this.rooms.paginator = this.paginator;
    });
  }

  fetchRoomByHotel(numhotel: string) {
    this.communicationService.getRooms(numhotel).subscribe((rooms: Room[]) => {
      this.rooms = new MatTableDataSource<Room>(rooms);
      this.rooms.paginator = this.paginator;
      console.log(this.rooms);
    });
  }

  deleteRoom(roomid: number): void {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      width: "250px",
      data: {
        message:
          "Deleting this room is permanent! click confirm if you want to pursue this action ",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(roomid);
        this.communicationService
          .deleteRoom(roomid)
          .subscribe(async (room: Room) => {
            if (room) {
              await this.fetchData();
            }
          });
      }
    });
  }

  editRoom(room: Room): void {
    const dialogRef = this.dialog.open(ModifyRoomComponent, {
      width: "250px",
      data: { room: room },
    });
    dialogRef.afterClosed().subscribe((result: Room) => {
      if (result) {
        console.log(result);
        this.communicationService
          .modifyRoomInfo(result)
          .subscribe(async (room: Room) => {
            if (room) {
              await this.fetchData();
              this.matSnackBar.open("The values were correctly updated", "x", {
                duration: 3000,
                verticalPosition: "top",
                horizontalPosition: "center",
              });
            } else {
              this.matSnackBar.open("An error occurred while modifying. The action was therefore canceled", "x", {
                duration: 3000,
                verticalPosition: "top",
                horizontalPosition: "center",
              });
            }
          });
      }
    });
  }
}
