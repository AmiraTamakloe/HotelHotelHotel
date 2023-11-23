import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "../app.component";
import { HotelComponent } from "../component/hotel/hotel.component";
import { HotelCreationFormComponent } from "../component/hotel-creation-form/hotel-creation-form.component";
import { RoomComponent } from "../component/room/room.component";
import { RoomCreationFormComponent } from "../component/room-creation-form/room-creation-form.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "hotels", component: HotelComponent },
  { path: "ajout", component: HotelCreationFormComponent },
  { path: "rooms", component: RoomComponent },
  { path: "rooms/create", component: RoomCreationFormComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
