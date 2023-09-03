import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAdddrinkComponent } from './help-adddrink.component';

describe('HelpAdddrinkComponent', () => {
  let component: HelpAdddrinkComponent;
  let fixture: ComponentFixture<HelpAdddrinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpAdddrinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpAdddrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
