import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpEditdrinktypeComponent } from './help-editdrinktype.component';

describe('HelpEditdrinktypeComponent', () => {
  let component: HelpEditdrinktypeComponent;
  let fixture: ComponentFixture<HelpEditdrinktypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpEditdrinktypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpEditdrinktypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
