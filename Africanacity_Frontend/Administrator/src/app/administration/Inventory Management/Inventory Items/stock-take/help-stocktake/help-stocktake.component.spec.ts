import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpStocktakeComponent } from './help-stocktake.component';

describe('HelpStocktakeComponent', () => {
  let component: HelpStocktakeComponent;
  let fixture: ComponentFixture<HelpStocktakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpStocktakeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpStocktakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
