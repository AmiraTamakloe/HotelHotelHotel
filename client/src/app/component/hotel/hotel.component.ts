import { Component, OnInit, ViewChild } from "@angular/core";
import { CommunicationService } from "src/app/services/communication.service";
import { Hotel } from "../../../../../common/tables/Hotel";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationPopupComponent } from "../confirmation-popup/confirmation-popup.component";
import { ModifyHotelComponent } from "../modify-hotel/modify-hotel.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-hotel",
  templateUrl: "./hotel.component.html",
  styleUrls: ["./hotel.component.css"],
})
export class HotelComponent implements OnInit {
  displayedColumns: string[] = ["number", "name", "city", "actions"];
  hotels: MatTableDataSource<Hotel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private communicationService: CommunicationService,
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    this.hotels.paginator = this.paginator;
  }

  async ngOnInit(): Promise<void> {
    await this.fetchData();
  }

  deleteHotel(numHotel: string): void {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      width: "250px",
      data: { message: "Deleting the hotel is permanent! click confirm if you want to pursue this action " },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.communicationService
          .deleteHotel(numHotel)
          .subscribe(async (hotel: Hotel) => {
            if (hotel) {
              await this.fetchData();
            }
          });
      }
    });
  }

  editHotel(hotel: Hotel): void {
    const dialogRef = this.dialog.open(ModifyHotelComponent, {
      width: "250px",
      data: { hotel: hotel },
    });
    dialogRef.afterClosed().subscribe((result: Hotel) => {
      if (result) {
        this.communicationService
          .modifyHotelInfo(result)
          .subscribe(async (hotel: Hotel) => {
            if (hotel) {
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

  async fetchData() {
    this.communicationService.getAllHotels().subscribe((hotels: Hotel[]) => {
      this.hotels = new MatTableDataSource<Hotel>(hotels);
      this.hotels.paginator = this.paginator;
      this.paginator.pageSizeOptions = [5, 10, 20];
      this.paginator.showFirstLastButtons = true;
    });
  }
}
