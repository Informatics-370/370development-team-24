import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAddscheduleComponent } from './help-addschedule.component';

describe('HelpAddscheduleComponent', () => {
  let component: HelpAddscheduleComponent;
  let fixture: ComponentFixture<HelpAddscheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpAddscheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpAddscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
