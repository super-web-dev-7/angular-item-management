import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetColumnItemsComponent } from './set-column-items.component';

describe('SetColumnItemsComponent', () => {
  let component: SetColumnItemsComponent;
  let fixture: ComponentFixture<SetColumnItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetColumnItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetColumnItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
