import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridEventsComponent } from './grid-events.component';

describe('GridEventsComponent', () => {
  let component: GridEventsComponent;
  let fixture: ComponentFixture<GridEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
