import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureCellRendererComponent } from './picture-cell-renderer.component';

describe('PictureCellRendererComponent', () => {
  let component: PictureCellRendererComponent;
  let fixture: ComponentFixture<PictureCellRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureCellRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
