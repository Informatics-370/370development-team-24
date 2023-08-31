import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAddemployeesComponent } from './help-addemployees.component';

describe('HelpAddemployeesComponent', () => {
  let component: HelpAddemployeesComponent;
  let fixture: ComponentFixture<HelpAddemployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpAddemployeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpAddemployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
