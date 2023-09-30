import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAddfoodtypeComponent } from './help-addfoodtype.component';

describe('HelpAddfoodtypeComponent', () => {
  let component: HelpAddfoodtypeComponent;
  let fixture: ComponentFixture<HelpAddfoodtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpAddfoodtypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpAddfoodtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
