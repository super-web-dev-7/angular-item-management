import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowColumnDragComponent } from './row-column-drag.component';

describe('RowColumnDragComponent', () => {
  let component: RowColumnDragComponent;
  let fixture: ComponentFixture<RowColumnDragComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowColumnDragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowColumnDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
