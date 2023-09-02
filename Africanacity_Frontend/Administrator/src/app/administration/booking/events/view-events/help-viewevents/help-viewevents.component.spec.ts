import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpVieweventsComponent } from './help-viewevents.component';

describe('HelpVieweventsComponent', () => {
  let component: HelpVieweventsComponent;
  let fixture: ComponentFixture<HelpVieweventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpVieweventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpVieweventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
