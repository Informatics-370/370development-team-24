import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemCategoryComponent } from './menu-item-category.component';

describe('MenuItemCategoryComponent', () => {
  let component: MenuItemCategoryComponent;
  let fixture: ComponentFixture<MenuItemCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuItemCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
