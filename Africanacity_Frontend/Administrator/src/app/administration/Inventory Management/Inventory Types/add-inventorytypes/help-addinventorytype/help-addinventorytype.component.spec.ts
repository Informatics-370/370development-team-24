import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAddinventorytypeComponent } from './help-addinventorytype.component';

describe('HelpAddinventorytypeComponent', () => {
  let component: HelpAddinventorytypeComponent;
  let fixture: ComponentFixture<HelpAddinventorytypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpAddinventorytypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpAddinventorytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
