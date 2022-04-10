import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceluploadsComponent } from './exceluploads.component';

describe('ExceluploadsComponent', () => {
  let component: ExceluploadsComponent;
  let fixture: ComponentFixture<ExceluploadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExceluploadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceluploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
