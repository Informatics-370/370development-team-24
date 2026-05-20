import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHelpListComponent } from './view-help-list.component';

describe('ViewHelpListComponent', () => {
  let component: ViewHelpListComponent;
  let fixture: ComponentFixture<ViewHelpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHelpListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHelpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
