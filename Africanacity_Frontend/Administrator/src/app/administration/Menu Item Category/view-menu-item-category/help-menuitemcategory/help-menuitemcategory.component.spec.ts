import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpMenuitemcategoryComponent } from './help-menuitemcategory.component';

describe('HelpMenuitemcategoryComponent', () => {
  let component: HelpMenuitemcategoryComponent;
  let fixture: ComponentFixture<HelpMenuitemcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpMenuitemcategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpMenuitemcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
