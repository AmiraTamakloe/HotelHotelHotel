import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyHotelComponent } from './modify-hotel.component';

describe('ModifyHotelComponent', () => {
  let component: ModifyHotelComponent;
  let fixture: ComponentFixture<ModifyHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
