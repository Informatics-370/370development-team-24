import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsDailogComponent } from './event-details-dailog.component';

describe('EventDetailsDailogComponent', () => {
  let component: EventDetailsDailogComponent;
  let fixture: ComponentFixture<EventDetailsDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventDetailsDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDetailsDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
