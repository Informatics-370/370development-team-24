import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpViewemployeesComponent } from './help-viewemployees.component';

describe('HelpViewemployeesComponent', () => {
  let component: HelpViewemployeesComponent;
  let fixture: ComponentFixture<HelpViewemployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpViewemployeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpViewemployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
