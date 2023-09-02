import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAddemployeeroleComponent } from './help-addemployeerole.component';

describe('HelpAddemployeeroleComponent', () => {
  let component: HelpAddemployeeroleComponent;
  let fixture: ComponentFixture<HelpAddemployeeroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpAddemployeeroleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpAddemployeeroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
