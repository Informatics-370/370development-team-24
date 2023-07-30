import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEntertainmentTypeComponent } from './edit-entertainment-type.component';

describe('EditEntertainmentTypeComponent', () => {
  let component: EditEntertainmentTypeComponent;
  let fixture: ComponentFixture<EditEntertainmentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEntertainmentTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEntertainmentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
