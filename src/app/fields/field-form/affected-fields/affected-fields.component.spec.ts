import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectedFieldsComponent } from './affected-fields.component';

describe('AffectedFieldsComponent', () => {
  let component: AffectedFieldsComponent;
  let fixture: ComponentFixture<AffectedFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectedFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectedFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
