import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAddsuppliertypeComponent } from './help-addsuppliertype.component';

describe('HelpAddsuppliertypeComponent', () => {
  let component: HelpAddsuppliertypeComponent;
  let fixture: ComponentFixture<HelpAddsuppliertypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpAddsuppliertypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpAddsuppliertypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
