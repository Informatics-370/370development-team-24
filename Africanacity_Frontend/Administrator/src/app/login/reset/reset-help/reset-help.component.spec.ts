import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetHelpComponent } from './reset-help.component';

describe('ResetHelpComponent', () => {
  let component: ResetHelpComponent;
  let fixture: ComponentFixture<ResetHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
