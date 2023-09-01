import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpEditinvetorytypeComponent } from './help-editinvetorytype.component';

describe('HelpEditinvetorytypeComponent', () => {
  let component: HelpEditinvetorytypeComponent;
  let fixture: ComponentFixture<HelpEditinvetorytypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpEditinvetorytypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpEditinvetorytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
