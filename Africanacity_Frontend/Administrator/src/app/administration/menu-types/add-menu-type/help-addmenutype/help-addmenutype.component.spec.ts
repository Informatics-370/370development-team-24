import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAddmenutypeComponent } from './help-addmenutype.component';

describe('HelpAddmenutypeComponent', () => {
  let component: HelpAddmenutypeComponent;
  let fixture: ComponentFixture<HelpAddmenutypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpAddmenutypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpAddmenutypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
