import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTimeComponent } from './app-time.component';

describe('AppTimeComponent', () => {
  let component: AppTimeComponent;
  let fixture: ComponentFixture<AppTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
