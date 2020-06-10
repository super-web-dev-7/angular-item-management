import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldTypeChooserComponent } from './field-type-chooser.component';

describe('FieldTypeChooserComponent', () => {
  let component: FieldTypeChooserComponent;
  let fixture: ComponentFixture<FieldTypeChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldTypeChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldTypeChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
