import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../services/ecol.service';
import * as moment from 'moment';
import { NgOption } from '@ng-select/ng-select';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Grid} from 'ag-grid-community';
import { environment } from '../../../environments/environment';
import { AllModules } from '@ag-grid-enterprise/all-modules';

import {
    NgbDateAdapter,
    NgbDateNativeAdapter,
    NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import {
    ColDef,
    GridReadyEvent,
    IServerSideDatasource,
    IServerSideGetRowsRequest,
  } from '@ag-grid-community/core';


@Component({
    selector: 'app-viewall',
    templateUrl: './viewall.component.html',
    styleUrls: ['./viewall.component.css'],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class ViewallComponent implements OnInit {
    public columnDefs: ColDef[] = [
        { field: 'athlete', minWidth: 220 },
        { field: 'country', minWidth: 200 },
        { field: 'year' },
        { field: 'sport', minWidth: 200 },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
      ];
      public defaultColDef: ColDef = {
        flex: 1,
        minWidth: 100,
      };
      public rowModelType = 'serverSide';
      public rowData!: any[];
      currentUser = JSON.parse(localStorage.getItem('currentUser'));
      username: string;
      searchText: string;
      model: any = {};

    constructor(private router: Router,
        private ecolService: EcolService,
        private http: HttpClient) {
        
    }

    onGridReady(params: GridReadyEvent) {
        this.http
          .get<any[]>('http://127.0.0.1:6002/nodeapi/tqall')
          .subscribe((data) => {
            // create datasource with a reference to the fake server
            var datasource = this.createServerSideDatasource(data);
            // register the datasource with the grid
            params.api!.setServerSideDatasource(datasource);
          });
      }

    

    currencyFormatter(params) {
        if (params.value !== undefined) {
            return (Math.floor(params.value * 100) / 100)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        } else {
            return '';
        }
    }



    onRowDoubleClicked(event: any) {
        this.model = event.node.data;
        // tslint:disable-next-line:max-line-length
        window.open(
            environment.applink +
                '/activitylog?accnumber=' +
                this.model.ACCNUMBER +
                '&custnumber=' +
                this.model.CUSTNUMBER +
                '&username=' +
                this.currentUser.USERNAME +
                '&sys=collections&outsbalance=' +
                this.model.OUSTBALANCE +
                '&totalarrears=' +
                this.model.TOTALARREARS +
                '&daysinarr=' +
                this.model.DAYSINARR,
            '_blank'
        );
    }

    createServerSideDatasource(server: any): IServerSideDatasource {
        return {
          getRows: function (params) {
            console.log('[Datasource] - rows requested by grid: ', params.request);
            // get data for request from our fake server
            var response = server.getData(params.request);
            // simulating real server call with a 500ms delay
            setTimeout(function () {
              if (response.success) {
                // supply rows for requested block to grid
                params.success({ rowData: response.rows });
              } else {
                params.fail();
              }
            }, 500);
          },
        };
      }

    public ngOnInit(): void {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        
    }

}
