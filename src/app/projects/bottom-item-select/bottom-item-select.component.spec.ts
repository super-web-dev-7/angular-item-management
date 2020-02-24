import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomItemSelectComponent } from './bottom-item-select.component';

describe('BottomItemSelectComponent', () => {
  let component: BottomItemSelectComponent;
  let fixture: ComponentFixture<BottomItemSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomItemSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomItemSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
