import { Component, OnInit } from "@angular/core";
import { CommunicationService } from "src/app/services/communication.service";
import { Hotel } from "../../../../../common/tables/Hotel";

export interface hotel {
  number: string;
  name: string;
  city: string;
  actions: string;
}

@Component({
  selector: "app-hotel",
  templateUrl: "./hotel.component.html",
  styleUrls: ["./hotel.component.css"],
})
export class HotelComponent implements OnInit {
  displayedColumns: string[] = ["number", "name", "city", "actions"];
  hotels: Hotel[];

  constructor(private communicationService: CommunicationService) {
    this.hotels = [];
  }

  ngOnInit(): void {
    this.communicationService.getAllHotels().subscribe((hotels: Hotel[]) => {
      console.log(hotels);
      this.hotels = hotels;
    });
  }
}
