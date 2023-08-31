import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpReceiveorderComponent } from './help-receiveorder.component';

describe('HelpReceiveorderComponent', () => {
  let component: HelpReceiveorderComponent;
  let fixture: ComponentFixture<HelpReceiveorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpReceiveorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpReceiveorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
