import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMenuItemCategoryComponent } from './edit-menu-item-category.component';

describe('EditMenuItemCategoryComponent', () => {
  let component: EditMenuItemCategoryComponent;
  let fixture: ComponentFixture<EditMenuItemCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMenuItemCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMenuItemCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
