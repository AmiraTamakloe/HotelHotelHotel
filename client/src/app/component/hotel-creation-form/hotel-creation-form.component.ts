import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CommunicationService } from "src/app/services/communication.service";
import { Hotel } from "../../../../../common/tables/Hotel";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-hotel-creation-form",
  templateUrl: "./hotel-creation-form.component.html",
  styleUrls: ["./hotel-creation-form.component.css"],
})
export class HotelCreationFormComponent implements OnInit {
  hotelForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private communicationService: CommunicationService,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.hotelForm = this.formBuilder.group({
      hotel: this.formBuilder.group({
        numhotel: ["", Validators.required],
        nom: ["", Validators.required],
        ville: ["", Validators.required],
      }),
    });
  }

  onSubmit(): void {
    if (this.hotelForm.valid) {
      const hotelInfo = this.hotelForm.value as Hotel;
      this.communicationService
        .addHotel(hotelInfo)
        .subscribe((hotel: Hotel) => {
          if (hotel) {
            this.matSnackBar.open("The hotel was added successfully", "x", {
              duration: 3000,
              verticalPosition: "top",
              horizontalPosition: "center",
            });
            this.router.navigate(["/hotels"]);
          } else {
            this.matSnackBar.open(
              "The hotel id inserted is invalid. Please use another one.",
              "x",
              {
                duration: 4000,
                verticalPosition: "top",
                horizontalPosition: "center",
              }
            );
            this.hotelForm.reset();
          }
        });
    }
  }
}
