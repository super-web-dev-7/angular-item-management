import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHideCheckboxComponent } from './show-hide-checkbox.component';

describe('ShowHideCheckboxComponent', () => {
  let component: ShowHideCheckboxComponent;
  let fixture: ComponentFixture<ShowHideCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowHideCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHideCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
