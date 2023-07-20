import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMenuTypeComponent } from './edit-menu-type.component';

describe('EditMenuTypeComponent', () => {
  let component: EditMenuTypeComponent;
  let fixture: ComponentFixture<EditMenuTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMenuTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMenuTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
