import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingHelpComponent } from './booking-help.component';

describe('BookingHelpComponent', () => {
  let component: BookingHelpComponent;
  let fixture: ComponentFixture<BookingHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
