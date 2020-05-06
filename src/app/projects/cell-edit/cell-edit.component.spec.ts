import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellEditComponent } from './cell-edit.component';

describe('CellEditComponent', () => {
  let component: CellEditComponent;
  let fixture: ComponentFixture<CellEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
