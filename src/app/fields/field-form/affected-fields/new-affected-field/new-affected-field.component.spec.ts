import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAffectedFieldComponent } from './new-affected-field.component';

describe('NewAffectedFieldComponent', () => {
  let component: NewAffectedFieldComponent;
  let fixture: ComponentFixture<NewAffectedFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAffectedFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAffectedFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
