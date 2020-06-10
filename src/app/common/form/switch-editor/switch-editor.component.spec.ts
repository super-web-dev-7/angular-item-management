import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchEditorComponent } from './switch-editor.component';

describe('SwitchEditorComponent', () => {
  let component: SwitchEditorComponent;
  let fixture: ComponentFixture<SwitchEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
