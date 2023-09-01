import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHelpComponent } from './update-help.component';

describe('UpdateHelpComponent', () => {
  let component: UpdateHelpComponent;
  let fixture: ComponentFixture<UpdateHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
