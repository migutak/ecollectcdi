import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../services/ecol.service';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import { NgOption } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import {
    NgbDateAdapter,
    NgbDateNativeAdapter,
    NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartModalService } from 'ngx-smart-modal';


@Component({
    selector: 'app-ptps',
    templateUrl: './ptps.component.html',
    styleUrls: ['./ptps.component.css'],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class PtpsComponent implements OnInit {
   

    constructor(
       
    ) {
        
    }

   
    ngOnInit() {
       
        };

    }

