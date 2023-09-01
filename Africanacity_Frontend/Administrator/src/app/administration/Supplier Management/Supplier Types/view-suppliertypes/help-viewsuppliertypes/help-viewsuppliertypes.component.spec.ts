import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpViewsuppliertypesComponent } from './help-viewsuppliertypes.component';

describe('HelpViewsuppliertypesComponent', () => {
  let component: HelpViewsuppliertypesComponent;
  let fixture: ComponentFixture<HelpViewsuppliertypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpViewsuppliertypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpViewsuppliertypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
