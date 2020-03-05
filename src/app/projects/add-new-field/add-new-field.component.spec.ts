import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewFieldComponent } from './add-new-field.component';

describe('AddNewFieldComponent', () => {
  let component: AddNewFieldComponent;
  let fixture: ComponentFixture<AddNewFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
