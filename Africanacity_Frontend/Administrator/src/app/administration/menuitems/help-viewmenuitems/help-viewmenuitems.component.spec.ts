import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpViewmenuitemsComponent } from './help-viewmenuitems.component';

describe('HelpViewmenuitemsComponent', () => {
  let component: HelpViewmenuitemsComponent;
  let fixture: ComponentFixture<HelpViewmenuitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpViewmenuitemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpViewmenuitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
