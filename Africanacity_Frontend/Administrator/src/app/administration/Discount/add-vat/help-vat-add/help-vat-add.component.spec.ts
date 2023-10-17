import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpVatAddComponent } from './help-vat-add.component';

describe('HelpVatAddComponent', () => {
  let component: HelpVatAddComponent;
  let fixture: ComponentFixture<HelpVatAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpVatAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpVatAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
