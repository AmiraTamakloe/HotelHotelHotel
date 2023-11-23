import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./modules/app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./services/communication.service";
import { AppMaterialModule } from './modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotelComponent } from './component/hotel/hotel.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { HotelCreationFormComponent } from './component/hotel-creation-form/hotel-creation-form.component';
import { ConfirmationPopupComponent } from './component/confirmation-popup/confirmation-popup.component';
import { ModifyHotelComponent } from './component/modify-hotel/modify-hotel.component';
import { RoomComponent } from "./component/room/room.component";
import { RoomCreationFormComponent } from './component/room-creation-form/room-creation-form.component';
import { ModifyRoomComponent } from './component/modify-room/modify-room.component';

@NgModule({
  declarations: [
    AppComponent,
    HotelComponent,
    HotelCreationFormComponent,
    ConfirmationPopupComponent,
    ModifyHotelComponent,
    RoomComponent,
    RoomCreationFormComponent,
    ModifyRoomComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    MatPaginatorModule,
  ],
  providers: [CommunicationService],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
