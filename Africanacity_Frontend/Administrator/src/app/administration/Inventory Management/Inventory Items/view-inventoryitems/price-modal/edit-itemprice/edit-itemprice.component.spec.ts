import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItempriceComponent } from './edit-itemprice.component';

describe('EditItempriceComponent', () => {
  let component: EditItempriceComponent;
  let fixture: ComponentFixture<EditItempriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditItempriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditItempriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
