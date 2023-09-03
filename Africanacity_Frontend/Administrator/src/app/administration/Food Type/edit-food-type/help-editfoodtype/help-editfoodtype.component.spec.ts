import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpEditfoodtypeComponent } from './help-editfoodtype.component';

describe('HelpEditfoodtypeComponent', () => {
  let component: HelpEditfoodtypeComponent;
  let fixture: ComponentFixture<HelpEditfoodtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpEditfoodtypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpEditfoodtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
