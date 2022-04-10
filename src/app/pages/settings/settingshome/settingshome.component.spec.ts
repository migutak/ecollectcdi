import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityactionComponent } from './activityaction.component';

describe('ActivityactionComponent', () => {
    let component: ActivityactionComponent;
    let fixture: ComponentFixture<ActivityactionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ActivityactionComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivityactionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
