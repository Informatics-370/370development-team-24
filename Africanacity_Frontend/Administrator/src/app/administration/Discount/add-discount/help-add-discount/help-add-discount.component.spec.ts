import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAddDiscountComponent } from './help-add-discount.component';

describe('HelpAddDiscountComponent', () => {
  let component: HelpAddDiscountComponent;
  let fixture: ComponentFixture<HelpAddDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpAddDiscountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpAddDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
