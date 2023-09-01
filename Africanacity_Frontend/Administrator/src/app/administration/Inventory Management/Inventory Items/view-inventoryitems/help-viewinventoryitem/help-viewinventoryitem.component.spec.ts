import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpViewinventoryitemComponent } from './help-viewinventoryitem.component';

describe('HelpViewinventoryitemComponent', () => {
  let component: HelpViewinventoryitemComponent;
  let fixture: ComponentFixture<HelpViewinventoryitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpViewinventoryitemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpViewinventoryitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
