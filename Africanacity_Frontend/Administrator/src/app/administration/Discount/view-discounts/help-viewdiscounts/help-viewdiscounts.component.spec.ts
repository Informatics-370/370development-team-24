import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpViewdiscountsComponent } from './help-viewdiscounts.component';

describe('HelpViewdiscountsComponent', () => {
  let component: HelpViewdiscountsComponent;
  let fixture: ComponentFixture<HelpViewdiscountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpViewdiscountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpViewdiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
