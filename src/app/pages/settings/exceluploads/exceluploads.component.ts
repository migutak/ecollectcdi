import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';

import { FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { HttpEventType } from '@angular/common/http';
import * as XLSX from 'xlsx';
import * as introJs from 'intro.js/intro.js';

//const URL = environment.xlsuploadapi;

@Component({
    selector: 'app-exceluploads',
    templateUrl: './exceluploads.component.html',
    styleUrls: ['./exceluploads.component.css'],
})
export class ExceluploadsComponent implements OnInit {


    //public uploader: FileUploader = new FileUploader({ url: URL });
    public hasBaseDropZoneOver = false;
    public hasAnotherDropZoneOver = false;

    constructor(
        private route: ActivatedRoute,
        private ecolService: EcolService,
    ) {
    }


    ngOnInit() {
        
    }

}
