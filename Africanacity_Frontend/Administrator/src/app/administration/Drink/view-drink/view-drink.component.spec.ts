import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VewDrinkComponent } from './view-drink.component';

describe('VewDrinkComponent', () => {
  let component: VewDrinkComponent;
  let fixture: ComponentFixture<VewDrinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VewDrinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VewDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
