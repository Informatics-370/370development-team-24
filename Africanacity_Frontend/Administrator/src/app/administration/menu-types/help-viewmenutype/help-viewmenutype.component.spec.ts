import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpViewmenutypeComponent } from './help-viewmenutype.component';

describe('HelpViewmenutypeComponent', () => {
  let component: HelpViewmenutypeComponent;
  let fixture: ComponentFixture<HelpViewmenutypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpViewmenutypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpViewmenutypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
