import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberEditorComponent } from './number-editor.component';

describe('NumberEditorComponent', () => {
  let component: NumberEditorComponent;
  let fixture: ComponentFixture<NumberEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
