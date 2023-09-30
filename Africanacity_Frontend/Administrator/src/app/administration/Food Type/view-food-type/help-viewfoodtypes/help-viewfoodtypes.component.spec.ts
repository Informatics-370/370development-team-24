import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpViewfoodtypesComponent } from './help-viewfoodtypes.component';

describe('HelpViewfoodtypesComponent', () => {
  let component: HelpViewfoodtypesComponent;
  let fixture: ComponentFixture<HelpViewfoodtypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpViewfoodtypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpViewfoodtypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
