import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpEditmenucategoryComponent } from './help-editmenucategory.component';

describe('HelpEditmenucategoryComponent', () => {
  let component: HelpEditmenucategoryComponent;
  let fixture: ComponentFixture<HelpEditmenucategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpEditmenucategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpEditmenucategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
