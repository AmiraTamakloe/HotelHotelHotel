import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommunicationService } from 'src/app/services/communication.service';
import { Hotel } from '../../../../../common/tables/Hotel';

@Component({
  selector: 'app-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.css']
})
export class CreateHotelComponent implements OnInit {

  hotelForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private communicationService: CommunicationService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.hotelForm = this.formBuilder.group({
      hotel: this.formBuilder.group({
        numhotel: ['', Validators.required],
        nom: ['', Validators.required],
        ville: ['', Validators.required]
      })
    });
  }

  onSubmit(): void {
    if(this.hotelForm.valid) {
      const hotelInfo = this.hotelForm.value as Hotel;
      this.communicationService.addHotel(hotelInfo).subscribe((hotel: Hotel) => {
        console.log(hotel);
        this.hotelForm.reset();
      });
    }
  }
}
