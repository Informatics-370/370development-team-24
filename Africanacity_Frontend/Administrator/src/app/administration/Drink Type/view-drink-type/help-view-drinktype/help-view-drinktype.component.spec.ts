import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpViewDrinktypeComponent } from './help-view-drinktype.component';

describe('HelpViewDrinktypeComponent', () => {
  let component: HelpViewDrinktypeComponent;
  let fixture: ComponentFixture<HelpViewDrinktypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpViewDrinktypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpViewDrinktypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
