import { Component, Inject, OnInit } from '@angular/core';
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Room } from '../../../../../common/tables/Room';
import { Hotel } from '../../../../../common/tables/Hotel';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-modify-room',
  templateUrl: './modify-room.component.html',
  styleUrls: ['./modify-room.component.css']
})
export class ModifyRoomComponent implements OnInit {
  roomForm: FormGroup;
  room: Room;
  hotelNames: Hotel[];

  constructor(
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ConfirmationPopupComponent>,
    private communicationService: CommunicationService,
    @Inject(MAT_DIALOG_DATA) public data: { room: Room }
  ) {}

  
  async ngOnInit(): Promise<void> {
    console.log('aaaaa');
    console.log(this.data.room);
    console.log('1111111')
    await this.fetchHotelNames();
    this.initForm();
    console.log('end init')
  }

  async fetchHotelNames() {
    this.communicationService.getAllHotelsName().subscribe((names: Hotel[]) => {
      this.hotelNames = names;
      console.log('names', names);
    });
  }

  cancelAction(): void {
    this.dialogRef.close();
  }

  initForm(): void {
    this.roomForm = this.formBuilder.group({
      numhotel: [this.data.room.numhotel, Validators.required],
      numroom: [this.data.room.numroom, Validators.required],
      roomtype: [this.data.room.roomtype.toLowerCase(), Validators.required],
      price: [+(this.data.room.price), Validators.required],
    });
    console.log('roomForm', this.roomForm);
  }
  

  onSubmit(): void {
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
    console.log('roomForm', this.roomForm.value);
    console.log('data', this.data.room);
    if (
      this.roomForm.value.numhotel === this.data.room.numhotel &&
      this.roomForm.value.numroom === this.data.room.numroom &&
      this.roomForm.value.price === +this.data.room.price &&
      this.roomForm.value.roomtype.toLowerCase() === this.data.room.roomtype.toLowerCase()
    ) {
      this.matSnackBar.open("No field was modified", "x", {
        duration: 3000,
        verticalPosition: "top",
        horizontalPosition: "center",
      });
    }
    else {
      const roomInfo = this.roomForm.value as Room;
      roomInfo.roomid = this.data.room.roomid;
      this.dialogRef.close(roomInfo);
    }
  }
}
