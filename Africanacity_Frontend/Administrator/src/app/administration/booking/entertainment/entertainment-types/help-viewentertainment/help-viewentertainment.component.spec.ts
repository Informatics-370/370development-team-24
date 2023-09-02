import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpViewentertainmentComponent } from './help-viewentertainment.component';

describe('HelpViewentertainmentComponent', () => {
  let component: HelpViewentertainmentComponent;
  let fixture: ComponentFixture<HelpViewentertainmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpViewentertainmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpViewentertainmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
