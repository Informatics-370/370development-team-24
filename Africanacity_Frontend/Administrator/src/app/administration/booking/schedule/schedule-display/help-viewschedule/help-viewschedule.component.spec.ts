import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpViewscheduleComponent } from './help-viewschedule.component';

describe('HelpViewscheduleComponent', () => {
  let component: HelpViewscheduleComponent;
  let fixture: ComponentFixture<HelpViewscheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpViewscheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpViewscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
