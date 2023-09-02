import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpEditemployeeroleComponent } from './help-editemployeerole.component';

describe('HelpEditemployeeroleComponent', () => {
  let component: HelpEditemployeeroleComponent;
  let fixture: ComponentFixture<HelpEditemployeeroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpEditemployeeroleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpEditemployeeroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
