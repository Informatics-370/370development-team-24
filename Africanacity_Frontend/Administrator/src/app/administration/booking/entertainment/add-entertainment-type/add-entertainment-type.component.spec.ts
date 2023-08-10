import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntertainmentTypeComponent } from './add-entertainment-type.component';

describe('AddEntertainmentTypeComponent', () => {
  let component: AddEntertainmentTypeComponent;
  let fixture: ComponentFixture<AddEntertainmentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEntertainmentTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEntertainmentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
