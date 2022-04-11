import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityhomeComponent } from './activityhome.component';

describe('ActivityhomeComponent', () => {
    let component: ActivityhomeComponent;
    let fixture: ComponentFixture<ActivityhomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActivityhomeComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivityhomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
