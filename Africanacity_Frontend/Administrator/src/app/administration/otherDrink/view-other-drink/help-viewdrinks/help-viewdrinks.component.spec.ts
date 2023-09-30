import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpViewdrinksComponent } from './help-viewdrinks.component';

describe('HelpViewdrinksComponent', () => {
  let component: HelpViewdrinksComponent;
  let fixture: ComponentFixture<HelpViewdrinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpViewdrinksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpViewdrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
