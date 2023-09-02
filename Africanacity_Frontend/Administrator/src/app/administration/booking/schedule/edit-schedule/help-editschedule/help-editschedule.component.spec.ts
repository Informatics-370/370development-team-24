import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpEditscheduleComponent } from './help-editschedule.component';

describe('HelpEditscheduleComponent', () => {
  let component: HelpEditscheduleComponent;
  let fixture: ComponentFixture<HelpEditscheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpEditscheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpEditscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
