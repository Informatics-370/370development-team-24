import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAdddrinktypeComponent } from './help-adddrinktype.component';

describe('HelpAdddrinktypeComponent', () => {
  let component: HelpAdddrinktypeComponent;
  let fixture: ComponentFixture<HelpAdddrinktypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpAdddrinktypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpAdddrinktypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
