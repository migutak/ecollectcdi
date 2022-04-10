import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-commissions',
    templateUrl: './commissions.component.html',
    styleUrls: ['./commissions.component.css'],
})
export class CommissionsComponent implements OnInit {
  
    constructor(
        private route: ActivatedRoute,
        private modalService: NgbModal,
        private ecolService: EcolService
    ) {}


    ngOnInit() {
       
    }

   
}
