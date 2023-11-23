import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Hotel } from "../../../../../common/tables/Hotel";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ConfirmationPopupComponent } from "../confirmation-popup/confirmation-popup.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-modify-hotel",
  templateUrl: "./modify-hotel.component.html",
  styleUrls: ["./modify-hotel.component.css"],
})
export class ModifyHotelComponent implements OnInit {
  hotelForm: FormGroup;
  hotel: Hotel;

  constructor(
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ConfirmationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { hotel: Hotel }
  ) {}

  cancelAction(): void {
    this.dialogRef.close();
  }

  async ngOnInit(): Promise<void> {
    this.initForm();
  }

  initForm(): void {
    this.hotelForm = this.formBuilder.group({
      hotel: this.formBuilder.group({
        numhotel: [this.data.hotel.numhotel, Validators.required],
        nom: [this.data.hotel.nom, Validators.required],
        ville: [this.data.hotel.ville, Validators.required],
      }),
    });
  }

  onSubmit(): void {
    if (
      this.hotelForm.value.hotel.numhotel === this.data.hotel.numhotel &&
      this.hotelForm.value.hotel.nom === this.data.hotel.nom &&
      this.hotelForm.value.hotel.ville === this.data.hotel.ville
    ) {
      this.matSnackBar.open("Aucune modification n'a été effectuée", "x", {
        duration: 3000,
        verticalPosition: "top",
        horizontalPosition: "center",
      });
    }
    else {
      const hotelInfo = this.hotelForm.value.hotel as Hotel;
      this.dialogRef.close(hotelInfo);
    }
  }
}
