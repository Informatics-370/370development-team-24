import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpEditsuppliertypeComponent } from './help-editsuppliertype.component';

describe('HelpEditsuppliertypeComponent', () => {
  let component: HelpEditsuppliertypeComponent;
  let fixture: ComponentFixture<HelpEditsuppliertypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpEditsuppliertypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpEditsuppliertypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
