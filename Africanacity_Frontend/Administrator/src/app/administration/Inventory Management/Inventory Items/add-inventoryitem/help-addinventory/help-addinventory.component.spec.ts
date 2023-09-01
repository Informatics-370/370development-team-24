import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAddinventoryComponent } from './help-addinventory.component';

describe('HelpAddinventoryComponent', () => {
  let component: HelpAddinventoryComponent;
  let fixture: ComponentFixture<HelpAddinventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpAddinventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpAddinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
