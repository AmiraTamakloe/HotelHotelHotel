import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-confirmation-popup",
  templateUrl: "./confirmation-popup.component.html",
  styleUrls: ["./confirmation-popup.component.css"],
})
export class ConfirmationPopupComponent implements OnInit {

  ngOnInit(): void {}

  constructor(
    public dialogRef: MatDialogRef<ConfirmationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  cancelAction(): void {
    this.dialogRef.close();
  }
}
