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
    showFlag = false;
    selectedImageIndex = -1;
    currentIndex: number;
    public gridApi;
    rowClassRules;
    public gridColumnApi;
    public href = '';
    public statusBar;
    public columnDefs;
    public defaultColDef;
    public rowModelType;
    public serverSideStoreType;
    public cacheBlockSize;
    public maxBlocksInCache;
    public rowData: any[];
    public overlayNoRowsTemplate;
    daysinarrears: any;
    outsbalance: any;
    totalarrears: any;
    countnumber: any = {};

    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    username: string;
    searchText: string;
    model: any = {};
    pivotPanelShow = true;

    modules = AllModules;
    public pagination;
    public paginationPageSize;
    public animateRows;
    gridOptions: any;

    constructor(private router: Router, private ecolService: EcolService) {
        this.columnDefs = [
            {
                field: 'ACCNUMBER',
                width: 120,
                cellRenderer: (params) => {
                    const acc = params.data.ACCNUMBER;
                    const ews = params.data.EWS;
                    // const acc_red = acc.replace(/^.{2}/g, '*');
                    const acc_red = acc.replace(
                        acc.substring(5, 12),
                        '*******'
                    );
                    if (params.value !== undefined) {
                        if (ews === 'Y') {
                            return (
                                acc_red +
                                `<sup style='background-color: rgba(255,0,0,0.27)'>EWS</sup>`
                            );
                        } else {
                            return acc_red;
                        }
                    } else {
                        return 'Record Not Found';
                        // <img src="assets/img/user/loading.gif">
                    }
                },

                cellStyle: function (params) {
                    if (params.data.ACCNUMBER) {
                        return {
                            color: '#0645AD', // for hyperlink color
                            cursor: 'pointer', // for showing cursor as a hand
                        };
                    }
                },

                filter: 'agTextColumnFilter',
                filterParams: {newRowsAction: 'keep'},
                resizable: true,
                suppressCellSelection: true,
            },
            {
                field: 'CLIENT_NAME',
                filter: 'agTextColumnFilter',
                width: 200,
                filterParams: {newRowsAction: 'keep'},
                resizable: true,
            },
            {
                field: 'CUSTNUMBER',
                filter: 'agTextColumnFilter',
                filterParams: {newRowsAction: 'keep'},
                resizable: true,
            },
            {
                field: 'BUCKET',
                filter: 'agTextColumnFilter',
                filterParams: {newRowsAction: 'keep'},
                resizable: true,
            },
            {
                field: 'PRODUCTCODE',
                filter: 'agTextColumnFilter',
                filterParams: {newRowsAction: 'keep'},
                resizable: true,
            },
            {
                field: 'EWS',
                filter: 'agTextColumnFilter',
                filterParams: {newRowsAction: 'keep'},
                resizable: true,
            },
            {
                field: 'DAYSINARR',
                filter: 'agNumberColumnFilter',
                filterParams: {newRowsAction: 'keep'},
                resizable: true,
            },
            {
                field: 'SECTION',
                filter: 'agNumberColumnFilter',
                filterParams: {newRowsAction: 'keep'},
                resizable: true,
            },
            {
                field: 'OUSTBALANCE',
                cellRenderer: function (params) {
                    if (params.value !== undefined) {
                        return (Math.floor(params.value * 100) / 100)
                            .toString()
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    } else {
                        return '';
                    }
                },
                filter: 'agNumberColumnFilter',
                filterParams: {newRowsAction: 'keep'},
                aggFunc: 'sum',
                resizable: true,
            },
            {
                field: 'PRINCARREARS',
                cellRenderer: function (params) {
                    if (params.value !== undefined) {
                        return (Math.floor(params.value * 100) / 100)
                            .toString()
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    } else {
                        return '';
                    }
                },
                filter: 'agNumberColumnFilter',
                filterParams: {newRowsAction: 'keep'},
                resizable: true,
            },
            {
                field: 'INSTAMOUNT',
                cellRenderer: function (params) {
                    if (params.value !== undefined) {
                        return (Math.floor(params.value * 100) / 100)
                            .toString()
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    } else {
                        return '';
                    }
                },
                filter: 'agNumberColumnFilter',
                filterParams: {newRowsAction: 'keep'},
                resizable: true,
            },
            {
                field: 'LIMITAMOUNT',
                filter: 'agNumberColumnFilter',
                filterParams: {newRowsAction: 'keep'},
                resizable: true,
            },
            {
                field: 'TOTALARREARS',
                cellRenderer: function (params) {
                    if (params.value !== undefined) {
                        return (Math.floor(params.value * 100) / 100)
                            .toString()
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    } else {
                        return '';
                    }
                },
                filter: 'agNumberColumnFilter',
                filterParams: {newRowsAction: 'keep'},
            },
            {
                field: 'RROCODE',
                filter: 'agTextColumnFilter',
                filterParams: {newRowsAction: 'keep'},
                resizable: true,
            },
            {
                field: 'AROCODE',
                filter: 'agTextColumnFilter',
                filterParams: {newRowsAction: 'keep'},
                resizable: true,
            },
            {
                field: 'BRANCHCODE',
                filter: 'agTextColumnFilter',
                filterParams: {newRowsAction: 'keep'},
                resizable: true,
            },
            {
                field: 'BRANCHNAME',
                filter: 'agTextColumnFilter',
                filterParams: {newRowsAction: 'keep'},
                resizable: true,
            },
            {
                field: 'COLOFFICER',
                filter: 'agTextColumnFilter',
                filterParams: {newRowsAction: 'keep'},
                resizable: true,
            },
        ];
        // this.rowClassRules = {
        //     'ews-alert': "data.EWS =' Y'",
        // };
        this.defaultColDef = {
            width: 120,
            resizable: true,
            sortable: true,
            floatingFilter: true,
            unSortIcon: true,
            suppressResize: false,
            enableRowGroup: true,
            enablePivot: true,
            pivot: true,
        };
        this.rowModelType = 'serverSide';
        this.serverSideStoreType = 'partial';
        this.rowData = [];
        this.overlayNoRowsTemplate =
            '<span style="padding: 10px; border: 2px solid #00554c; ' +
            ' background: #00554c;"><em style="color: white;">Sorry, No Records Found</em></span>';
        this.cacheBlockSize = 50;
        this.maxBlocksInCache = 0;
        // enable pagination
        this.pagination = true;
        this.animateRows = true;
        this.statusBar = {
            statusPanels: [
                {
                    statusPanel: 'agTotalAndFilteredRowCountComponent',
                    align: 'left',
                },
                {
                    statusPanel: 'agTotalRowCountComponent',
                    align: 'center',
                },
                {statusPanel: 'agFilteredRowCountComponent'},
                {statusPanel: 'agSelectedRowCountComponent'},
                {statusPanel: 'agAggregationComponent'},
            ],
        };
    }

    gridObject: Array<object> = [
        {
            video: environment.miniovideos + '/videos/basics.mp4',
        },
        {
            video: environment.miniovideos + '/videos/actioning.mp4',
        },
    ];

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.ecolService.gettotalentries().subscribe((data) => {
            // this.countnumber = data;

            this.countnumber = data;

            const datasource = {
                // tslint:disable-next-line:no-shadowed-variable
                getRows(params) {
                    // console.log(JSON.stringify(params.request, null, 1));

                    fetch(environment.nodeapi + '/tqall/gridviewall', {
                        method: 'post',
                        body: JSON.stringify({...params.request}),
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                        },
                    })
                        .then((httpResponse) => httpResponse.json())
                        .then((response) => {
                            if (response.rows.length === 0) {
                                params.api.showNoRowsOverlay();
                            } else {
                                params.api.hideOverlay();
                                params.success({
                                    rowData: response.rows,
                                    rowCount: response.lastRow,
                                });
                            }
                            // start of checking if no record return zero
                            if (response.lastRow === null) {
                                params.success({
                                    rowData: 0,
                                    rowCount: 0,
                                });
                            }
                            // end of checking if no record return zero

                            // start of returning row count
                            // if (response.rows.length > 0) {
                            //     params.success({
                            //         rowData: response.rows,
                            //         rowCount: this.countnumber.count,
                            //     });
                            //     console.log(this.countnumber.count);
                            // }
                            // end of returning row count
                        })
                        .catch((error) => {
                            console.error(error);
                            params.fail();
                        });
                },
            };

            params.api.setServerSideDatasource(datasource);
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

    totalentries() {
        this.ecolService.gettotalentries().subscribe((data) => {
            this.countnumber.count = data;
        });
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

    public ngOnInit(): void {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        this.href = this.router.url;
        this.totalentries();
        console.log(this.router.url);
    }
}
