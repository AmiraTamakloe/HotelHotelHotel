import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { CommunicationService } from "src/app/services/communication.service";
import { Room } from "../../../../../common/tables/Room";
import { Hotel } from "../../../../../common/tables/Hotel";

@Component({
  selector: "app-room-creation-form",
  templateUrl: "./room-creation-form.component.html",
  styleUrls: ["./room-creation-form.component.css"],
})
export class RoomCreationFormComponent implements OnInit {
  hotelNames: Hotel[];
  roomForm = this.formBuilder.group({
    numhotel: ["", Validators.required],
    numroom: ["", Validators.required],
    roomtype: ["", Validators.required],
    price: ["", Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private communicationService: CommunicationService,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.fetchData();
  }

  async fetchData() {
    this.communicationService.getAllHotelsName().subscribe((names: Hotel[]) => {
      this.hotelNames = names;
      this.roomForm.controls.numhotel.setValue(this.hotelNames[0].numhotel);
    });
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      if (this.roomForm.controls["price"].value <= 0) {
        this.matSnackBar.open("Price must be a number higher than 0", "x", {
          duration: 4000,
          verticalPosition: "top",
          horizontalPosition: "center",
        });
        return;
      }
      if (this.roomForm.controls["numroom"].invalid || this.roomForm.controls["numroom"].value <= 0) {
        this.matSnackBar.open("Room number must be a valid number", "x", {
          duration: 4000,
          verticalPosition: "top",
          horizontalPosition: "center",
        });
        return;
      }
      const roomInfo = this.roomForm.value as Room;
      this.communicationService.addRoom(roomInfo).subscribe((room: Room) => {
        if (room) {
          this.matSnackBar.open("The Room was added successfully", "x", {
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "center",
          });
          this.router.navigate(["/rooms"]);
        } else {
          this.matSnackBar.open("An error occurred please try again.", "x", {
            duration: 4000,
            verticalPosition: "top",
            horizontalPosition: "center",
          });
          this.roomForm.reset();
        }
      });
    }
  }
}
