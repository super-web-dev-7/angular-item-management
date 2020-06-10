import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingFieldSelectComponent } from './existing-field-select.component';

describe('ExistingFieldSelectComponent', () => {
  let component: ExistingFieldSelectComponent;
  let fixture: ComponentFixture<ExistingFieldSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingFieldSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingFieldSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
