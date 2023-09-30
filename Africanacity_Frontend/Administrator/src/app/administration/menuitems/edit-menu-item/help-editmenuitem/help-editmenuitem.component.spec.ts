import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpEditmenuitemComponent } from './help-editmenuitem.component';

describe('HelpEditmenuitemComponent', () => {
  let component: HelpEditmenuitemComponent;
  let fixture: ComponentFixture<HelpEditmenuitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpEditmenuitemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpEditmenuitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
