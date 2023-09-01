import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpViewinventorytypeComponent } from './help-viewinventorytype.component';

describe('HelpViewinventorytypeComponent', () => {
  let component: HelpViewinventorytypeComponent;
  let fixture: ComponentFixture<HelpViewinventorytypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpViewinventorytypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpViewinventorytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
