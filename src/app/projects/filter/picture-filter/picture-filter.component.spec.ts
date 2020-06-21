import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureFilterComponent } from './picture-filter.component';

describe('PictureFilterComponent', () => {
  let component: PictureFilterComponent;
  let fixture: ComponentFixture<PictureFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
