import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpViewsupplierComponent } from './help-viewsupplier.component';

describe('HelpViewsupplierComponent', () => {
  let component: HelpViewsupplierComponent;
  let fixture: ComponentFixture<HelpViewsupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpViewsupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpViewsupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
