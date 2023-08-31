import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpEditemployeeComponent } from './help-editemployee.component';

describe('HelpEditemployeeComponent', () => {
  let component: HelpEditemployeeComponent;
  let fixture: ComponentFixture<HelpEditemployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpEditemployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpEditemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
