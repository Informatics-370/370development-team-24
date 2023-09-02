import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAddentertainmentComponent } from './help-addentertainment.component';

describe('HelpAddentertainmentComponent', () => {
  let component: HelpAddentertainmentComponent;
  let fixture: ComponentFixture<HelpAddentertainmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpAddentertainmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpAddentertainmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
