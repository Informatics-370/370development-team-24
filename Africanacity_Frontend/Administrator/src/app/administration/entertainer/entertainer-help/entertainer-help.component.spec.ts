import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntertainerHelpComponent } from './entertainer-help.component';

describe('EntertainerHelpComponent', () => {
  let component: EntertainerHelpComponent;
  let fixture: ComponentFixture<EntertainerHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntertainerHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntertainerHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
