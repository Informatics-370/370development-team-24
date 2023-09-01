import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpEditinventoryitemComponent } from './help-editinventoryitem.component';

describe('HelpEditinventoryitemComponent', () => {
  let component: HelpEditinventoryitemComponent;
  let fixture: ComponentFixture<HelpEditinventoryitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpEditinventoryitemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpEditinventoryitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
