import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallComponent } from './viewall.component';

describe('ActivityactionComponent', () => {
    let component: ViewallComponent;
    let fixture: ComponentFixture<ViewallComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ViewallComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewallComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
