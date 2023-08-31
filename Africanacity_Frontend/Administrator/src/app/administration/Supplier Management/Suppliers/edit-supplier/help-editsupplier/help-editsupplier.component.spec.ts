import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpEditsupplierComponent } from './help-editsupplier.component';

describe('HelpEditsupplierComponent', () => {
  let component: HelpEditsupplierComponent;
  let fixture: ComponentFixture<HelpEditsupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpEditsupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpEditsupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
