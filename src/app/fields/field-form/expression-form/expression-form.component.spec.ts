import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionFormComponent } from './expression-form.component';

describe('ExpressionFormComponent', () => {
  let component: ExpressionFormComponent;
  let fixture: ComponentFixture<ExpressionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
