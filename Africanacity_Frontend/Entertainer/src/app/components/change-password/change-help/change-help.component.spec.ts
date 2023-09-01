import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeHelpComponent } from './change-help.component';

describe('ChangeHelpComponent', () => {
  let component: ChangeHelpComponent;
  let fixture: ComponentFixture<ChangeHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
