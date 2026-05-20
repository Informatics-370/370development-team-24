import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMenuItemCategoryComponent } from './create-menu-item-category.component';

describe('CreateMenuItemCategoryComponent', () => {
  let component: CreateMenuItemCategoryComponent;
  let fixture: ComponentFixture<CreateMenuItemCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMenuItemCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMenuItemCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
