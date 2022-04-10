import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../services/ecol.service';
import { DataService } from '../../services/data.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
   

    constructor(
        private route: ActivatedRoute,
        private ecolService: EcolService,
        public dataService: DataService
    ) {
    }

    
    ngOnInit() {
       
    }

    
}
