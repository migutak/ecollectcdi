import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtpsComponent } from './ptps.component';

describe('PtpsComponent', () => {
  let component: PtpsComponent;
  let fixture: ComponentFixture<PtpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
