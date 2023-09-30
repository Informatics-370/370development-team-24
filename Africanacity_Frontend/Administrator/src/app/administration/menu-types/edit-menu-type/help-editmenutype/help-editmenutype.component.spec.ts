import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpEditmenutypeComponent } from './help-editmenutype.component';

describe('HelpEditmenutypeComponent', () => {
  let component: HelpEditmenutypeComponent;
  let fixture: ComponentFixture<HelpEditmenutypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpEditmenutypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpEditmenutypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
