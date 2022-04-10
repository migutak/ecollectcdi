import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../services/ecol.service';
import { DataService } from '../../services/data.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-activitylogipf',
    templateUrl: './activitylogipf.component.html',
    styleUrls: ['./activitylogipf.component.css'],
})
export class ActivitylogipfComponent implements OnInit {
    ptp = 0;
    notes: number;
    totalcontacts: number;
    totalcollaterals1: number;
    totalguarantors: number;
    totalfiles: number;
    totalwoffstory: number;
    accnumber: string;
    custnumber: string;
    accountdetails: any;
    guarantors: [];
    model: any = {};
    bodyletter: any = {};
    filepath: string;
    demands: any;
    file: string;
    smsMessage: string;
    username: string;
    date = new Date();
    sys: string;
    collateralmenu = true;
    guarantorsmenu = true;
    demandlettersmenu = true;
    autodial_telnumber: string;
    files: any = [];
    totalTeles: number;
    totalPtps: number;
    teles: any = [];
    plan: string;
    loader = true;
    daysinarrears: any;
    outsbalance: any;
    totalarrears: any;

    tabs = {
        postTab: true,
        aboutTab: false,
        photoTab: false,
        videoTab: false,
        friendTab: false,
    };
    show: boolean;

    constructor(
        private route: ActivatedRoute,
        private ecolService: EcolService,
        public dataService: DataService
    ) {
        // test service
        dataService.getTestData().subscribe((data) => {
            this.ptp = data;
        });

        dataService.getNotesData().subscribe((data) => {
            this.notes = data;
        });

        dataService.getAccountPlanData().subscribe((data) => {
            this.plan = data;
        });

        dataService.getCollateral().subscribe((data) => {
            this.totalcollaterals1 = data;
        });

        dataService.getContacts().subscribe((data) => {
            this.totalcontacts = data;
        });

        dataService.getGuarantors().subscribe((data) => {
            this.totalguarantors = data;
        });

        dataService.getFiles().subscribe((data) => {
            this.totalfiles = data;
        });

        dataService.getPtps().subscribe((data) => {
            this.totalPtps = data;
        });

        dataService.getWoffstoryData().subscribe((data) => {
            this.totalwoffstory = data;
        });
    }

    showTab(e) {
        for (const key in this.tabs) {
            if (key === e) {
                this.tabs[key] = true;
            } else {
                this.tabs[key] = false;
            }
        }
    }

    ngOnInit() {
        // check if logged in
        this.ecolService.ifLogged();
        this.ecolService.ifclosed();
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;

        this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
        this.route.queryParamMap.subscribe((queryParams) => {
            this.accnumber = queryParams.get('accnumber');
        });

        /* this.username = this.route.snapshot.queryParamMap.get('username');
this.route.queryParamMap.subscribe(queryParams => {
  this.username = queryParams.get('username');
});*/

        this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
        this.route.queryParamMap.subscribe((queryParams) => {
            this.custnumber = queryParams.get('custnumber');
        });

        this.sys = this.route.snapshot.queryParamMap.get('sys');
        this.route.queryParamMap.subscribe((queryParams) => {
            this.sys = queryParams.get('sys');
        });

        // daysinarrears
        this.daysinarrears = this.route.snapshot.queryParamMap.get('daysinarr');
        this.route.queryParamMap.subscribe((daysfound) => {
            this.daysinarrears = daysfound.get('daysinarr');
        });

        // outsbalance
        this.outsbalance = this.route.snapshot.queryParamMap.get('outsbalance');
        this.route.queryParamMap.subscribe((outsb) => {
            this.outsbalance = outsb.get('outsbalance');
        });

        //  totalarrears
        this.totalarrears = this.route.snapshot.queryParamMap.get(
            'totalarrears'
        );
        this.route.queryParamMap.subscribe((totalarr) => {
            this.totalarrears = totalarr.get('totalarrears');
        });

        // this.data.currentMessage.subscribe(message => this.message = message)

        // get account details
        if (this.sys === 'cc') {
            this.getcard(this.accnumber);
            this.collateralmenu = false;
            this.guarantorsmenu = false;
        } else if (this.sys === 'watchcc') {
            this.getwatchcard(this.accnumber);
            this.collateralmenu = false;
            this.guarantorsmenu = false;
            this.demandlettersmenu = false;
        } else if (this.sys === 'mcoopcash') {
            this.getmcoopcashaccount(this.accnumber);
            this.collateralmenu = false;
            this.guarantorsmenu = false;
            this.demandlettersmenu = false;
        } else if (this.sys === 'watch') {
            this.getwatch(this.accnumber);
            this.collateralmenu = false;
            this.guarantorsmenu = true;
            this.demandlettersmenu = false;
        } else if (this.sys === 'ews') {
            this.getwatch(this.accnumber);
            this.collateralmenu = false;
            this.guarantorsmenu = false;
            this.demandlettersmenu = false;
        } else {
            this.getaipfccount();
        }

        // get files
        this.getfileshistory(this.custnumber);
        // notes
        this.getNotes(this.custnumber);
        // collateral
        this.getCollateral(this.custnumber);
        // contacts
        this.getContacts(this.custnumber);
        // guarantors
        this.getGuarantors(this.custnumber);
        this.getTeles(this.custnumber);
        this.getptps(this.accnumber);
        this.planexists(this.accnumber);
        this.getwoffstory(this.accnumber);

        // flag for ews
        this.show = this.sys === 'ews';
    }

    getptps(accnumber) {
        this.ecolService.getptps(accnumber).subscribe(
            (data) => {
                this.totalPtps = data.length;
                this.loader = false;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getwoffstory(accnumber) {
        this.ecolService.searchwoffstory(accnumber).subscribe(
            (data) => {
                this.totalwoffstory = data.length;
                this.loader = false;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    planexists(accnumber) {
        this.ecolService.s_check_account_plans(accnumber).subscribe(
            (data) => {
                // check if there if a plan
                if (data && data.length) {
                    this.ecolService
                        .single_s_plans(data[0].planid)
                        .subscribe((data) => {
                            this.plan = data.plantitle;
                        });
                }
                this.loader = false;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getcard(cardacct) {
        this.ecolService.getcardAccount(cardacct).subscribe((data) => {
            this.loader = true;
            this.accountdetails = data[0];
            this.model.accnumber = data[0].cardacct;
            this.model.custnumber = data[0].cardacct;
            this.model.addressline1 = data[0].address;
            this.model.postcode = data[0].rpcode;
            this.model.emailaddress = data[0].emailaddress;
            this.model.celnumber = data[0].celnumber;
            // tslint:disable-next-line:max-line-length
            this.autodial_telnumber =
                this.accountdetails.cellnumber ||
                this.accountdetails.mobile ||
                this.accountdetails.phonenumber ||
                this.accountdetails.telnumber ||
                this.accountdetails.celnumber;
            this.loader = false;
        });
    }

    getwatchcard(cardacct) {
        this.ecolService.getWatchcardAccount(cardacct).subscribe(
            (data) => {
                this.loader = true;
                this.accountdetails = data[0];
                this.model.accnumber = data[0].cardacct;
                this.model.custnumber = data[0].cardacct;
                this.model.addressline1 = data[0].address;
                this.model.postcode = data[0].rpcode;
                this.model.emailaddress = data[0].emailaddress;
                this.model.celnumber = data[0].celnumber;
                // tslint:disable-next-line:max-line-length
                this.autodial_telnumber =
                    this.accountdetails.cellnumber ||
                    this.accountdetails.mobile ||
                    this.accountdetails.phonenumber ||
                    this.accountdetails.telnumber ||
                    this.accountdetails.celnumber;
                this.loader = false;
            },
            (error) => {
                //
            }
        );
    }

    getTeles(custnumber) {
        this.ecolService.allteles(custnumber).subscribe((response) => {
            this.teles = response.data;
            this.totalTeles = response.data.length;
            this.loader = false;
        });
    }

    getNotes(custnumber) {
        this.ecolService.totalnotes(custnumber).subscribe((data) => {
            this.notes = data[0].TOTAL;
            this.loader = false;
        });
    }

    getfileshistory(custnumber) {
        this.ecolService.getfileshistory(custnumber).subscribe((data) => {
            this.files = data;
            this.totalfiles = data.length;
            this.loader = false;
        });
    }

    getGuarantors(custnumber) {
        this.ecolService.totalguarantors(custnumber).subscribe((data) => {
            this.totalguarantors = data[0].TOTAL;
            this.loader = false;
        });
    }

    getContacts(custnumber) {
        this.ecolService.totalcontacts(custnumber).subscribe((data) => {
            this.totalcontacts = data[0].TOTAL;
            this.loader = false;
        });
    }

    getCollateral(custnumber) {
        this.ecolService.totalcollaterals(custnumber).subscribe((data) => {
            this.totalcollaterals1 = data[0].TOTAL;
            this.loader = false;
        });
    }

    getaipfccount() {
        // this.spinner.show();

        this.ecolService.getipf().subscribe((data) => {
            this.loader = true;
            if (data.length > 0) {
                this.accountdetails = data[0];
                this.guarantors = data[0].guarantors;
                this.model.accnumber = data[0].accnumber;
                this.model.custnumber = data[0].custnumber;
                this.model.addressline1 = data[0].addressline1;
                this.model.postcode = data[0].postcode;
                this.model.emailaddress = data[0].emailaddress;
                this.model.celnumber = data[0].celnumber;
                // tslint:disable-next-line:max-line-length
                this.autodial_telnumber =
                    this.accountdetails.cellnumber ||
                    this.accountdetails.mobile ||
                    this.accountdetails.phonenumber ||
                    this.accountdetails.telnumber ||
                    this.accountdetails.celnumber;
                this.loader = false;
            } else {
                this.loader = false;
                // alert('Account Not Found');

                swal.fire({
                    title:
                        'Sorry, This Account Data is Missing or was Not Found',
                    // imageUrl: 'assets/img/user/coop.jpg',
                    icon: 'warning',
                    text: 'Close this page?',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Close!',
                    cancelButtonText: 'Stay on Page?',
                    allowOutsideClick: false,
                }).then((results) => {
                    if (results.value) {
                        // close tab
                        window.close();
                    } else {
                        // reset
                        this.loader = false;
                    }
                    this.loader = false;
                    // this.spinner.hide();
                });
            }
        });
    }

    getmcoopcashaccount(accnumber) {
        this.ecolService.getmcoopcashAccount(accnumber).subscribe((data) => {
            this.loader = true;
            this.accountdetails = data[0];
            this.model.accnumber = data[0].loanaccnumber;
            this.model.custnumber = data[0].loanaccnumber;
            this.model.addressline1 = data[0].address;
            this.model.postcode = data[0].postcode;
            this.model.celnumber = data[0].phonenumber;
            // tslint:disable-next-line:max-line-length
            this.autodial_telnumber =
                this.accountdetails.cellnumber ||
                this.accountdetails.mobile ||
                this.accountdetails.phonenumber ||
                this.accountdetails.telnumber ||
                this.accountdetails.celnumber;
            this.loader = false;
        });
    }

    getwatch(accnumber) {
        this.ecolService.getwatch(accnumber).subscribe((data) => {
            this.loader = true;
            this.accountdetails = data;
            this.guarantors = data.guarantors;
            this.model.accnumber = data.accnumber;
            this.model.custnumber = data.custnumber;
            this.model.addressline1 = data.addressline1;
            this.model.postcode = data.postcode;
            this.model.emailaddress = data.emailaddress;
            this.model.celnumber = data.celnumber;
            this.loader = false;
        });
    }

    changeAutodialNumber(telnumber) {
        this.autodial_telnumber = telnumber;
        this.loader = false;
    }

    // returns phone number
    num() {
        this.loader = false;
        return this.autodial_telnumber;
    }

    refreshTeles() {
        this.getTeles(this.custnumber);
        alert('contacts refreshed!!');
    }

    dialAvaya() {
        alert('avaya integration in progress!!!');
    }

    // Changes colour of Account Plan Background, if None, will be red, if not none, will be Green

    getColor() {
        return this.plan !== 'NONE' ? '#7ac142' : '#bc3d3d';
    }

    copyText(val: string) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }
}
