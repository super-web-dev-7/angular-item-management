import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectEditorComponent } from './multiselect-editor.component';

describe('MultiselectEditorComponent', () => {
  let component: MultiselectEditorComponent;
  let fixture: ComponentFixture<MultiselectEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiselectEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
