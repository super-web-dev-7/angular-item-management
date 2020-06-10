import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectedFieldBoxComponent } from './affected-field-box.component';

describe('AffectedFieldBoxComponent', () => {
  let component: AffectedFieldBoxComponent;
  let fixture: ComponentFixture<AffectedFieldBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectedFieldBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectedFieldBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
