import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitylogipfComponent } from './activitylogipf.component';

describe('ActivitylogipfComponent', () => {
    let component: ActivitylogipfComponent;
    let fixture: ComponentFixture<ActivitylogipfComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ActivitylogipfComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivitylogipfComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
