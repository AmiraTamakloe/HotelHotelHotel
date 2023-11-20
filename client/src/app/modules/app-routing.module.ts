import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { HotelComponent } from "../component/hotel/hotel.component";
import { CreateHotelComponent } from "../component/create-hotel/create-hotel.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "hotels", component: HotelComponent },
  { path: "ajout", component: CreateHotelComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
