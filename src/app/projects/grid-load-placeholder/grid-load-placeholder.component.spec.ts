import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridLoadPlaceholderComponent } from './grid-load-placeholder.component';

describe('GridLoadPlaceholderComponent', () => {
  let component: GridLoadPlaceholderComponent;
  let fixture: ComponentFixture<GridLoadPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridLoadPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridLoadPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
