import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpViewemployeeroleComponent } from './help-viewemployeerole.component';

describe('HelpViewemployeeroleComponent', () => {
  let component: HelpViewemployeeroleComponent;
  let fixture: ComponentFixture<HelpViewemployeeroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpViewemployeeroleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpViewemployeeroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
