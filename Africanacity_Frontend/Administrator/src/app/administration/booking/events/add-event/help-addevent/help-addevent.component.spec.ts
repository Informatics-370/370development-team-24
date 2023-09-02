import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAddeventComponent } from './help-addevent.component';

describe('HelpAddeventComponent', () => {
  let component: HelpAddeventComponent;
  let fixture: ComponentFixture<HelpAddeventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpAddeventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpAddeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
