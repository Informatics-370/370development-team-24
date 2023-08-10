import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenuTypeComponent } from './add-menu-type.component';

describe('AddMenuTypeComponent', () => {
  let component: AddMenuTypeComponent;
  let fixture: ComponentFixture<AddMenuTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMenuTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMenuTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
