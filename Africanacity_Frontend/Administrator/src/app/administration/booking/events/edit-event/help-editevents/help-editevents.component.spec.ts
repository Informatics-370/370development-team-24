import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpEditeventsComponent } from './help-editevents.component';

describe('HelpEditeventsComponent', () => {
  let component: HelpEditeventsComponent;
  let fixture: ComponentFixture<HelpEditeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpEditeventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpEditeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
