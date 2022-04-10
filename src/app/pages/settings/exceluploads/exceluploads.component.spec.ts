import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulknotesComponent } from './bulknotes.component';

describe('BulknotesComponent', () => {
    let component: BulknotesComponent;
    let fixture: ComponentFixture<BulknotesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BulknotesComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BulknotesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
