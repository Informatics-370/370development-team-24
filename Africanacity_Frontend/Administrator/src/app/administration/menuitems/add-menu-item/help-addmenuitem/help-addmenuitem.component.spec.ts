import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAddmenuitemComponent } from './help-addmenuitem.component';

describe('HelpAddmenuitemComponent', () => {
  let component: HelpAddmenuitemComponent;
  let fixture: ComponentFixture<HelpAddmenuitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpAddmenuitemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpAddmenuitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
