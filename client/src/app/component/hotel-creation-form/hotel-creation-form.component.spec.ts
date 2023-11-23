import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelCreationFormComponent } from './hotel-creation-form.component';

describe('CreateHotelComponent', () => {
  let component: HotelCreationFormComponent;
  let fixture: ComponentFixture<HotelCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelCreationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
