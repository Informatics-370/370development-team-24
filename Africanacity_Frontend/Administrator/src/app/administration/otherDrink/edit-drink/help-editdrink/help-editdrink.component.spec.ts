import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpEditdrinkComponent } from './help-editdrink.component';

describe('HelpEditdrinkComponent', () => {
  let component: HelpEditdrinkComponent;
  let fixture: ComponentFixture<HelpEditdrinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpEditdrinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpEditdrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
