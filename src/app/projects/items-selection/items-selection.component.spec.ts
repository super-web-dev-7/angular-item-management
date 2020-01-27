import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsSelectionComponent } from './items-selection.component';

describe('ItemsSelectionComponent', () => {
  let component: ItemsSelectionComponent;
  let fixture: ComponentFixture<ItemsSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
