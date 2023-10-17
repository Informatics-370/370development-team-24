import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpEditdiscountComponent } from './help-editdiscount.component';

describe('HelpEditdiscountComponent', () => {
  let component: HelpEditdiscountComponent;
  let fixture: ComponentFixture<HelpEditdiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpEditdiscountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpEditdiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
