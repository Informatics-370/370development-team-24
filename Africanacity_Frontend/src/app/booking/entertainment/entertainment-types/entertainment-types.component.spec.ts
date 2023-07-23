import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntertainmentTypesComponent } from './entertainment-types.component';

describe('EntertainmentTypesComponent', () => {
  let component: EntertainmentTypesComponent;
  let fixture: ComponentFixture<EntertainmentTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntertainmentTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntertainmentTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
