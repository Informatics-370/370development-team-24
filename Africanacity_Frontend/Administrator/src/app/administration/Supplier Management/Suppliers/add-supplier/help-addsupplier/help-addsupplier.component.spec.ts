import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAddsupplierComponent } from './help-addsupplier.component';

describe('HelpAddsupplierComponent', () => {
  let component: HelpAddsupplierComponent;
  let fixture: ComponentFixture<HelpAddsupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpAddsupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpAddsupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
