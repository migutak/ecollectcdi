import { TestBed } from '@angular/core/testing';

import { EcolService } from './ecol.service';

describe('EcolService', () => {
    let service: EcolService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(EcolService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
