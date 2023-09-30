import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpVatComponent } from './help-vat.component';

describe('HelpVatComponent', () => {
  let component: HelpVatComponent;
  let fixture: ComponentFixture<HelpVatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpVatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpVatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
