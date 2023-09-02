import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpEditentertainmentComponent } from './help-editentertainment.component';

describe('HelpEditentertainmentComponent', () => {
  let component: HelpEditentertainmentComponent;
  let fixture: ComponentFixture<HelpEditentertainmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpEditentertainmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpEditentertainmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
