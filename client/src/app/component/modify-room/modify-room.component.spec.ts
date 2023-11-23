import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRoomComponent } from './modify-room.component';

describe('ModifyRoomComponent', () => {
  let component: ModifyRoomComponent;
  let fixture: ComponentFixture<ModifyRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
