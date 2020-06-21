import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionFilterComponent } from './expression-filter.component';

describe('ExpressionFilterComponent', () => {
  let component: ExpressionFilterComponent;
  let fixture: ComponentFixture<ExpressionFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressionFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
