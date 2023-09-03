import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAddmenuitemcategoryComponent } from './help-addmenuitemcategory.component';

describe('HelpAddmenuitemcategoryComponent', () => {
  let component: HelpAddmenuitemcategoryComponent;
  let fixture: ComponentFixture<HelpAddmenuitemcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpAddmenuitemcategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpAddmenuitemcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
