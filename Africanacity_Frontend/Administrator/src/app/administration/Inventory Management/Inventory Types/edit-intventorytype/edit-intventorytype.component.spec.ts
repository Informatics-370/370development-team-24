import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIntventorytypeComponent } from './edit-intventorytype.component';

describe('EditIntventorytypeComponent', () => {
  let component: EditIntventorytypeComponent;
  let fixture: ComponentFixture<EditIntventorytypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIntventorytypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIntventorytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
