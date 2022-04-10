import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpEvent,
    HttpHeaders,
    HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { forkJoin, Observable } from 'rxjs';
import swal from 'sweetalert2';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
    providedIn: 'root',
})
export class EcolService {
    private endpoint = environment.fileupload;
    constructor(private httpClient: HttpClient, private router: Router) {}

    loading() {
        swal.fire({
            title: '',
            text: 'Please wait...',
            imageUrl: 'assets/img/Eclipse.gif',
            imageAlt: 'Loading ...',
            showConfirmButton: false,
            allowOutsideClick: false,
            // timer: 3000,
            // icon: "success"
        });
    }

    loader() {
        swal.fire({
            title: '',
            text: 'Please wait...',
            imageUrl: 'assets/img/Eclipse.gif',
            imageAlt: 'Loading ...',
            showConfirmButton: false,
            allowOutsideClick: false,
        });
    }

    success(msg) {
        swal.fire('All Good!', msg, 'success');
    }

    error() {
        swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        });
    }

    warning(msg) {
        swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
        });
    }

    ifLogged() {
        if (!localStorage.getItem('currentUser')) {
            this.router.navigate(['/login']);
            return false;
        }
    }

    ifclosed() {
        if (!sessionStorage.getItem('currentUser')) {
            this.router.navigate(['/login']);
            return false;
        }
    }

    uploadFile(file: File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();

        formData.append('file', file);

        const request = new HttpRequest(
            'POST',
            `${this.endpoint}/upload-file`,
            formData,
            {
                reportProgress: true,
                responseType: 'json',
            }
        );

        return this.httpClient.request(request);
    }

    post_tbl_allocations_memogroups(body) {
        return this.httpClient.post(
            environment.nodeapi + '/tbl_allocations_memogroups',
            body
        );
    }

    postinvite(body) {
        return this.httpClient.post(
            environment.invite + '/callscheduler',
            body
        );
    }

    cancelinvite(body) {
        return this.httpClient.post(
            environment.invite + '/cancel-callscheduler',
            body
        );
    }

    patch_tbl_allocations_memogroups(body) {
        return this.httpClient.patch(
            environment.nodeapi +
                '/tbl_allocations_memogroups/' +
                body.memogroup,
            body
        );
    }

    add_schedules(body) {
        return this.httpClient.post(
            environment.nodeapi + '/tbl-callschedules',
            body
        );
    }

    complete_schedules(body) {
        return this.httpClient.patch(
            environment.nodeapi + '/tbl-callschedules/' + body.uuid,
            body
        );
    }

    getptps(accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api +
                '/api/ptps?filter[where][accnumber]=' +
                accnumber +
                '&filter[order]=actiondate DESC'
        );
    }

    checkifptpexists(accnumber, ptpamount, ptpdate) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api +
                '/api/ptps?filter[where][accnumber]=' +
                accnumber +
                '&filter[where][ptpamount]=' +
                ptpamount +
                '&filter[where][ptpdate]=' +
                ptpdate +
                '&filter[where][met]=NOT MET'
        );
    }

    getschedules(username) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.nodeapi +
                '/tbl-callschedules?filter[where][owner]=' +
                username +
                '&filter[where][status][inq]=open&filter[where][status][inq]=transfer' +
                '&filter[order]=stampdate DESC'
        );
    }

    searchwoffstory(accnumber) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/writeoffstory?filter[where][accnumber]=' +
                accnumber
        );
    }

    s_check_account_plans(accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api +
                '/api/tbl_s_accounts?filter[where][accnumber]=' +
                accnumber
        );
    }

    single_s_plans(planid) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api + '/api/tbl_s_plans/' + planid
        );
    }

    getpermissions(role_id: string) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/permissionsettings?filter[where][role_id]=' +
                role_id
        );
    }

    getcardAccount(cardacct) {
        // tslint:disable-next-line:max-line-length/qall
        return this.httpClient.get<any>(
            environment.api + '/api/tcards?filter[where][cardacct]=' + cardacct
        );
    }

    getWatchcardAccount(cardacct) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api +
                '/api/cards_watch_stage?filter[where][cardacct]=' +
                cardacct
        );
    }

    totalnotes(custnumber) {
        return this.httpClient.get<any>(
            environment.api + '/api/notehis/total?custnumber=' + custnumber
        );
    }

    totalcollectornotes(custnumber) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/notehis/commenttotal?custnumber=' +
                custnumber
        );
    }

    retrieveGuarantors(accnumber) {
        return this.httpClient.get(
            environment.api +
                '/api/guarantordetails?filter[where][accnumber]=' +
                accnumber
        );
    }

    getplanactions(planid) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api +
                '/api/tbl_s_plan_actions?filter[where][planid]=' +
                planid
        );
    }

    s_actions() {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(environment.api + '/api/tbl_s_actions');
    }

    getanaction(actionid) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api + '/api/tbl_s_actions/' + actionid
        );
    }

    delete_s_plan_actions(id) {
        return this.httpClient.delete<any>(
            environment.api + '/api/tbl_s_plan_actions/' + id
        );
    }

    delete_s_planmemos(id) {
        return this.httpClient.delete<any>(
            environment.api + '/api/tbl_s_planmemos/' + id
        );
    }

    getplanmemos() {
        const url = environment.api + '/api/tbl_s_planmemos';
        return this.httpClient.get(url);
    }

    gettotalentries() {
        const url = environment.nodeapi + '/tqall/count';
        return this.httpClient.get(url);
    }

    // putsptype(body) {
    //     const url = environment.api + '/api/sptypes';
    //     return this.httpClient.put(url, body);
    // }

    putsptype(body) {
        return this.httpClient.patch(
            environment.api + '/api/sptypes/' + body.ID,
            body
        );
    }

    puttblsmsconfigurations(body, ID) {
        const url = environment.nodeapi + '/tbl-sms-configurations/' + ID;
        return this.httpClient.patch(url, body);
    }

    postplanmemo(data) {
        return this.httpClient.post<any>(
            environment.api + '/api/tbl_s_planmemos',
            data
        );
    }

    planmemo(planid) {
        return this.httpClient.get<any>(
            environment.api + '/api/tbl_s_plans/' + planid
        );
    }

    getallplans() {
        // return this.httpClient.get<any>(environment.api + '/api/teles/alltele?custnumber=' + custnumber);
        return this.httpClient.get<any>(environment.api + '/api/tbl_s_plans');
    }

    put_s_actions(data) {
        return this.httpClient.put<any>(
            environment.api + '/api/tbl_s_actions/' + data.actionid,
            data
        );
    }

    post_s_actions(action) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<any>(
            environment.api + '/api/tbl_s_actions',
            action
        );
    }

    post_s_plan_actions(body) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<any>(
            environment.api + '/api/tbl_s_plan_actions',
            body
        );
    }

    post_new_excuse(body) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<any>(environment.api + '/api/excuse', body);
    }

    post_s_plan(body) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<any>(
            environment.api + '/api/tbl_s_plans',
            body
        );
    }

    all_s_plans() {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api + '/api/tbl_s_plans?filter[order]=plantitle asc'
        );
        // + '&filter[order]=stagedate desc'
    }

    retrieve_a_Guarantor(id) {
        return this.httpClient.get(
            environment.api + '/api/guarantordetails?filter[where][id]=' + id
        );
    }

    totalcardsdue() {
        return this.httpClient.get<any>(
            environment.api + '/api/demandsduecc/total'
        );
    }

    totaldemandsdue() {
        return this.httpClient.get<any>(
            environment.api + '/api/demandsdue/total'
        );
    }

    updateGuarantor(id, body) {
        return this.httpClient.put(
            environment.api + '/api/guarantordetails/' + id,
            body
        );
    }

    retrievetotalCollateral(custnumber) {
        return this.httpClient.get<any>(
            environment.api + '/api/notehis/total?custnumber=' + custnumber
        );
    }

    getfileshistory(custnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api +
                '/api/uploads?filter[where][custnumber]=' +
                custnumber +
                '&filter[order]=stagedate desc'
        );
    }

    allteles(custnumber) {
        return this.httpClient.get<any>(
            environment.nodeapi + '/teles/all?custnumber=' + custnumber
        );
    }

    totalguarantors(custnumber) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/guarantordetails/total?custnumber=' +
                custnumber
        );
    }

    totalcontacts(custnumber) {
        return this.httpClient.get<any>(
            environment.api + '/api/teles/total?custnumber=' + custnumber
        );
    }

    totalcollaterals(custnumber) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/deptcollateral/total?custnumber=' +
                custnumber
        );
    }

    getAccount(accnumber) {
        // tslint:disable-next-line:max-line-length
        // return this.httpClient.get<any>(environment.api + '/api/tbl_q_all?filter[include]=guarantors&filter[include]=demandsdues&filter[where][accnumber]=' + accnumber);
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.cacheapi +
                '/api/tqall?filter[include]=guarantors&filter[include]=demandsdues&filter[where][accnumber]=' +
                accnumber
        );
    }

    getmcoopcashAccount(accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api +
                '/api/mcoopcash_stage?filter[include]=mcoopcash_static&filter[where][loanaccnumber]=' +
                accnumber
        );
    }

    getwatch(accnumber) {
        return this.httpClient.get<any>(
            environment.cacheapi + '/api/watch_stage/' + accnumber
        );
    }

    getews(accnumber) {
        return this.httpClient.get<any>(
            environment.nodeapi +
                '/tblearlywarningsigns?filter[where][CD_ACCOUNT]=' +
                accnumber
        );
    }

    getews_withcustnumber(custnumber) {
        return this.httpClient.get<any>(
            environment.nodeapi +
                '/tblearlywarningsigns?filter[where][CUSTOMER_ID]=' +
                custnumber
        );
    }

    getipf() {
        return this.httpClient.get<any>(environment.api + '/api/tbl_ipf');
    }

    getipfdata(accnumber) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/tbl_ipf?filter[where][accnumber]=' +
                accnumber
        );
    }

    getipfdatajoined(accnumber) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/tbl_ipfdatajoined/total?accnumber=' +
                accnumber
        );
    }

    login(username: string) {
        return this.httpClient.get<any>(
            environment.nodeapi + '/tblusers/search?username=' + username
        );
    }

    getallusers() {
        return this.httpClient.get<any>(environment.nodeapi + '/tblusers');
    }

    logout() {
        //  remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accountInfo');
        localStorage.removeItem('userpermission');
        localStorage.removeItem('profile');

        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('accountInfo');
        sessionStorage.removeItem('userpermission');
        sessionStorage.removeItem('profile');
    }

    auth(body: object) {
        return this.httpClient.post<any>(environment.auth, body);
    }

    getbulknotes(cust) {
        // tslint:disable-next-line:max-line-length
        const response = this.httpClient.get<any>(
            environment.api +
                '/api/notehis?filter[where][custnumber]=' +
                cust +
                '&filter[where][notesrc]=uploaded a note' +
                '&filter[order]=notedate DESC'
        );
        return forkJoin([response]);
    }

    getflaggednotes(cust) {
        return this.httpClient.get<any>(
            environment.nodeapi +
                '/vallnotes?filter[where][custnumber]=' +
                cust +
                '&filter[where][noteimp]=Y' +
                '&filter[order]=notedate DESC'
        );
    }

    getactivitylogreason(accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.nodeapi +
                '/activitylogs?filter[where][accountnumber]=' +
                accnumber +
                '&filter[order]=actiondate DESC'
        );
    }

    getipfcancelleddetails(accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api +
                '/api/tbl_ipf_cancellations?filter[where][accnumber]=' +
                accnumber +
                '&filter[order]=stagedate DESC'
        );
    }

    getallnotes(cust) {
        return this.httpClient.get<any>(
            environment.nodeapi +
                '/vallnotes?filter[where][custnumber]=' +
                cust +
                '&filter[order]=notedate DESC'
        );
    }

    /*getallnotes(cust) {
        return this.httpClient.get<any>(
            environment.api + '/api/notehis/custnotes?custnumber=' + cust
        );
    }

    getallnotes(filter, cust) {
        //
        let url = environment.nodeapi + '/notehis/custnotes?custnumber=' + cust

        if (filter !== '') {
            url =
                url +
                '&offset=' +
                filter.skip +
                '&next= ' +
                filter.limit;
        }
        return this.httpClient.get<any>(url);
    }*/

    emailtqall(accnumber) {
        return this.httpClient.get<any>(
            environment.nodeapi + '/tqall?filter[where][accnumber]=' + accnumber
        );
    }

    // track changes per custnumber
    changestracker(cust) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/notehis_changes_tracker?filter[where][custnumber]=' +
                cust +
                '&filter[order]=datechanged desc'
        );
    }

    otheraccs(custnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.nodeapi + '/otheraccs/all?custnumber=' + custnumber
        );
    }

    collaterals(accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api +
                '/api/collaterals?filter[where][accnumber]=' +
                accnumber
        );
    }

    getfilesProducts(custnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api +
                '/api/uploads?filter[where][custnumber]=' +
                custnumber +
                '&filter[where][docdesc]=Product approval&filter[order]=stagedate desc'
        );
    }

    getremedialusers() {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api +
                '/api/tblusers?filter[where][remedialunit][inq]=CORPORATE&filter[where][remedialunit][inq]=RETAIL&filter[where][remedialunit][inq]=MSME&filter[order]=username asc'
        );
    }

    getproductofferings(accnumber) {
        return this.httpClient.get<any>(
            environment.nodeapi +
                '/tbl-productofferings?filter[where][accnumber]=' +
                accnumber
        );
    }

    productofferings(data) {
        return this.httpClient.put<any>(
            environment.api + '/api/tbl_productofferings',
            data
        );
    }

    gettblipfmv(accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.nodeapi + '/tbl_ipf_mv' + accnumber
        );
    }

    directors(accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api +
                '/api/directors?filter[where][accnumber]=' +
                accnumber
        );
    }

    accwithid(nationid) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api +
                '/api/tbl_q_all?filter[where][nationid]=' +
                nationid
        );
    }

    ptps(accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api + '/api/ptps?filter[where][accnumber]=' + accnumber
        );
    }

    getcardwithid(nationid) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api +
                '/api/cards_stage?filter[where][nationid]=' +
                nationid
        );
    }

    // get all parties both disabled and enabled disableReason
    getallparties() {
        const url = environment.api + '/api/party';
        return this.httpClient.get(url);
    }

    // get all Collector Actions both disabled and enabled disableReason
    getallCA() {
        const url = environment.api + '/api/collectoraction';
        return this.httpClient.get(url);
    }

    // get all excuses both disabled and enabled disableReason
    getallexcuse() {
        const url = environment.api + '/api/excuse';
        return this.httpClient.get(url);
    }

    // get excuses that are not disabled
    getexcuse() {
        const url =
            environment.api +
            '/api/excuse?filter[where][disabled]=false&filter[order]=EXCUSE ASC';
        return this.httpClient.get(url);
    }

    // disables a reason in the table
    disableReason(body) {
        const url = environment.api + '/api/excuse';
        return this.httpClient.put(url, body);
    }

    // disables a party in the table
    disableParty(body) {
        const url = environment.api + '/api/party';
        return this.httpClient.put(url, body);
    }

    // disables a Collectoraction in the table
    disableCollectoraction(body) {
        const url = environment.api + '/api/collectoraction';
        return this.httpClient.put(url, body);
    }

    // enables a reason in the table
    enableReason(body) {
        const url = environment.api + '/api/excuse';
        return this.httpClient.put(url, body);
    }

    // enables a party in the table
    enableParty(body) {
        const url = environment.api + '/api/party';
        return this.httpClient.put(url, body);
    }

    // enables a CollectorAction in the table
    enableCollectorAction(body) {
        const url = environment.api + '/api/collectoraction';
        return this.httpClient.put(url, body);
    }
    // Add New reason in the table
    addNewReason(body) {
        const url = environment.api + '/api/excuse';
        return this.httpClient.post(url, body);
    }
    // Add New Party in the table
    addNewParty(body) {
        const url = environment.api + '/api/party';
        return this.httpClient.post(url, body);
    }
    // Add New Collector action in the table
    addNewCollectorAction(body) {
        const url = environment.api + '/api/collectoraction';
        return this.httpClient.post(url, body);
    }
    // Add New Email to DB
    addNewDB(body) {
        const url = environment.api + '/api/tbl_emailsent';
        return this.httpClient.post(url, body);
    }
    // Add New reason in the table
    addNewReasonDetailed(body) {
        const url = environment.api + '/api/excusedetailed';
        return this.httpClient.post(url, body);
    }

    // get excuses that are disabled
    getexcusedisabled() {
        const url =
            environment.api + '/api/excuse?filter[where][disabled]=true';
        return this.httpClient.get(url);
    }

    // get parties that are disabled
    getpartydisabled() {
        const url = environment.api + '/api/party?filter[where][active]=false';
        return this.httpClient.get(url);
    }
    // get Collector Action that are disabled
    getCAdisabled() {
        const url =
            environment.api +
            '/api/collectoraction?filter[where][active]=false';
        return this.httpClient.get(url);
    }

    // get All Emails sent by user
    getemails(username) {
        const url =
            environment.api +
            '/api/tbl_emailsent?filter[where][sentby]=' +
            username +
            '&filter[where][trash]=no';
        return this.httpClient.get(url);
    }

    // get All Important Emails sent by user
    getimpemails(username) {
        const url =
            environment.api +
            '/api/tbl_emailsent?filter[where][sentby]=' +
            username +
            '&filter[where][important]=Yes';
        return this.httpClient.get(url);
    }

    // get All Trash Emails sent by user
    gettrashemails(username) {
        const url =
            environment.api +
            '/api/tbl_emailsent?filter[where][sentby]=' +
            username +
            '&filter[where][trash]=Yes';
        return this.httpClient.get(url);
    }

    // get parties that are enabled
    getpartyenabled() {
        const url = environment.api + '/api/party?filter[where][active]=true';
        return this.httpClient.get(url);
    }

    // get parties that are enabled
    getCAenabled() {
        const url =
            environment.api + '/api/collectoraction?filter[where][active]=true';
        return this.httpClient.get(url);
    }

    // get all excuse details for activitypage.. does not display disabled excusedetails
    getExcuseDetails(EXCUSEID: any) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/excusedetailed?filter[where][excuseid]=' +
                EXCUSEID +
                '&filter[where][disabled]=false'
        );
    }
    // get all excuse details for activitypage.. does not display disabled excusedetails
    getExcuseDetailsDisabled(EXCUSEID: any) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/excusedetailed?filter[where][excuseid]=' +
                EXCUSEID +
                '&filter[where][disabled]=true'
        );
    }

    // get all excuse details for admin page..has all excuse details including those disabled
    getAllExcuseDetails(EXCUSEID: any) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/excusedetailed?filter[where][excuseid]=' +
                EXCUSEID
        );
    }

    disableExcuseDetails(body) {
        const url = environment.api + '/api/excusedetailed';
        return this.httpClient.put(url, body);
    }
    enableExcuseDetails(body) {
        const url = environment.api + '/api/excusedetailed';
        return this.httpClient.put(url, body);
    }

    getStaticLoans(accnumber) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/tbl_portfolio_static?filter[where][accnumber]=' +
                accnumber
        );
    }

    getWatchcardStatic(cardacct) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api +
                '/api/cards_watch_static?filter[where][cardacct]=' +
                cardacct
        );
    }

    getcmdstatus() {
        const url = environment.api + '/api/cmdstatus';
        return this.httpClient.get(url);
    }

    getreviewers() {
        const url =
            environment.api + '/api/tblusers?filter[where][role]=teamleader';
        return this.httpClient.get(url);
    }

    getparty() {
        const url =
            environment.api +
            '/api/party?filter[where][active]=true&filter[order]=PARTY ASC';
        return this.httpClient.get(url);
    }

    getcollectoraction() {
        const url =
            environment.api +
            '/api/collectoraction?filter[where][active]=true&filter[order][0]=id ASC';
        return this.httpClient.get(url);
    }

    getcure() {
        const url = environment.api + '/api/cure';
        return this.httpClient.get(url);
    }

    getnotifications() {
        const url = environment.nodeapi + '/notifications';
        return this.httpClient.get(url);
    }

    getchecks() {
        const url = environment.nodeapi + '/checks';
        return this.httpClient.get(url);
    }

    putcardwatch(data) {
        return this.httpClient.put<any>(
            environment.api + '/api/cards_watch_static/' + data.cardacct,
            data
        );
    }

    postactivitylogs(body) {
        const url = environment.api + '/api/activitylogs';
        return this.httpClient.post<any>(url, body);
    }

    putwatch(data) {
        return this.httpClient.put<any>(
            environment.api + '/api/watch_static',
            data
        );
    }

    putews(data) {
        return this.httpClient.put<any>(
            environment.api + '/api/TBL_EARLYWARNINGSIGN_STATICs',
            data
        );
    }

    get_earlywarningsign_static(accnumber) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/TBL_EARLYWARNINGSIGN_STATICs?filter[where][accnumber]=' +
                accnumber
        );
    }

    get_tbl_earlywarningsign_static_audit(accnumber) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/tbl_earlywarningsign_static_audit?filter[where][accnumber]=' +
                accnumber +
                '&filter[order]=lastactiondate desc'
        );
    }

    reviewptp(data) {
        return this.httpClient.post<any>(
            environment.nodeapi + '/brokenptps/review',
            data
        );
    }

    activeptps(accnumber) {
        return this.httpClient.get<any>(
            environment.nodeapi + '/activeptps/active?accnumber=' + accnumber
        );
    }

    checkews(accnumber) {
        return this.httpClient.get<any>(
            environment.api +
                '/tbl_earlywarningsign?filter[where][cd_account]=' +
                accnumber
        );
    }

    // postptps(ptps) {
    //     // tslint:disable-next-line:max-line-length
    //     return this.httpClient.post<any>(environment.nodeapi + '/ptps', ptps);
    // }

    postptps(body) {
        const url = environment.api + '/api/ptps';
        return this.httpClient.post(url, body);
    }

    updatenote(body) {
        const url = environment.api + '/api/notehis/updatenote';
        return this.httpClient.post(url, body);
    }

    // update trash to yes
    updatetrash(body) {
        const url = environment.api + '/api/tbl_emailsent/updatedeltrash';
        return this.httpClient.post(url, body);
    }

    // restore trash
    restoretrash(body) {
        const url = environment.api + '/api/tbl_emailsent/restoretrash';
        return this.httpClient.post(url, body);
    }

    updateipfcancellations(body) {
        const url = environment.api + '/api/tbl_ipf_cancellations/updateipf';
        return this.httpClient.post(url, body);
    }

    getanote(id) {
        const url = environment.api + '/api/notehis/' + id;
        return this.httpClient.get(url);
    }

    getarepo(id) {
        return this.httpClient.get<any>(
            environment.nodeapi + '/tblrepossessions/' + id
        );
    }

    gettblclient_clusters(accnumber) {
        const url = environment.nodeapi + '/tblclient-clusters/' + accnumber;
        return this.httpClient.get<any>(url);
    }

    getpdscrore(pdscrore) {
        const url =
            environment.nodeapi +
            '/tblclient-clusters/getpdscrore?pdscrore=' +
            pdscrore;
        return this.httpClient.get<any>(url);
    }

    getclientresilience(clientresiliencescore) {
        const url =
            environment.nodeapi +
            '/tblclient-clusters/getclientresilience?clientresiliencescore=' +
            clientresiliencescore;
        return this.httpClient.get<any>(url);
    }

    getclientcluster(subsectoroutlook, clientresilientlevels) {
        const url =
            environment.nodeapi +
            '/tblclient-clusters/getclientcluster?subsectoroutlook=' +
            subsectoroutlook +
            '&clientresilientlevels=' +
            clientresilientlevels;
        return this.httpClient.get<any>(url);
    }

    // get email based on id
    getanemail(id) {
        const url = environment.api + '/api/tbl_emailsent/' + id;
        return this.httpClient.get(url);
    }

    puttblclient_clusters(data) {
        return this.httpClient.put<any>(
            environment.nodeapi + '/tblclient-clusters/' + data.accnumber,
            data
        );
    }

    postblclient_clusters(data) {
        return this.httpClient.post<any>(
            environment.nodeapi + '/tblclient-clusters',
            data
        );
    }

    demandshistory(data) {
        return this.httpClient.post<any>(
            environment.api + '/api/demandshistory',
            data
        );
    }

    ipfcancellationhistory(data) {
        return this.httpClient.post<any>(
            environment.api + '/api/tbl_ipf_cancellations',
            data
        );
    }

    getteles(custnumber) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/teles?filter[where][custnumber]=' +
                custnumber
        );
    }

    getdemandshistory(accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api +
                '/api/demandshistory?filter[where][accnumber]=' +
                accnumber +
                '&filter[order]=stagedate desc'
        );
    }

    getcustwithAccount(custnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api +
                '/api/tqall?filter[where][custnumber]=' +
                custnumber
        );
    }

    demand1history(accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api +
                '/api/demandshistory?filter[where][accnumber]=' +
                accnumber +
                '&filter[where][demand]=Demand1&filter[order]=stagedate desc'
        );
    }

    generateLetter(data) {
        return this.httpClient.post<any>(
            environment.letters_api + data.demand + '/download',
            data
        );
    }

    getsmsmessage(demand) {
        return this.httpClient.get<any>(
            environment.api + '/api/demandsettings/' + demand.toLowerCase()
        );
    }

    demandstatus(body) {
        return this.httpClient.post<any>(environment.nodeapi + '/', body);
    }

    newmarketer(body) {
        return this.httpClient.post(
            environment.api + '/api/tblmarketors',
            body
        );
    }

    submittorepos(body) {
        return this.httpClient.post(
            environment.nodeapi + '/tblrepossessions',
            body
        );
    }

    repocheck(accnumber) {
        return this.httpClient.get<any>(
            environment.nodeapi +
                '/tblrepossessions?filter[where][accnumber]=' +
                accnumber +
                '&&filter[where][iscaseactive]=N'
        );
    }

    // check if order exists in tblrepossessions table
    repoexistcheck(accnumber) {
        return this.httpClient.get<any>(
            environment.nodeapi +
                '/tblrepossessions?filter[where][accnumber]=' +
                accnumber +
                '&&filter[where][iscaseactive]=Y'
        );
    }

    newvaluation(body) {
        return this.httpClient.post(environment.api + '/api/tblvaluers', body);
    }

    patchvaluation(body) {
        return this.httpClient.patch(
            environment.api + '/api/tblvaluers/' + body.id,
            body
        );
    }

    patchmarketer(body) {
        return this.httpClient.patch(
            environment.api + '/api/tblmarketors/' + body.id,
            body
        );
    }

    patchtblrepossessions(body) {
        return this.httpClient.patch(
            environment.nodeapi + '/tblrepossessions/' + body.id,
            body
        );
    }

    patchdebtcollectors(body) {
        return this.httpClient.patch(
            environment.api + '/api/tbldebtcollectors/' + body.id,
            body
        );
    }

    patchinvoices(body) {
        return this.httpClient.patch(
            environment.api + '/api/tblinvoices/' + body.id,
            body
        );
    }

    sendDemandEmail(data) {
        return this.httpClient.post<any>(environment.emailapi, data);
    }

    sendShareEmail(data) {
        return this.httpClient.post<any>(environment.shareemail, data);
    }

    sendDemandsms(data) {
        return this.httpClient.post<any>(environment.demandsmsapi, data);
    }

    sendipfsms(body) {
        const url = environment.api + '/api/sms';
        return this.httpClient.post(url, body);
    }

    getallsptype() {
        const url = environment.api + '/api/sptypes';
        return this.httpClient.get<any>(url);
    }

    getsptype(type) {
        const url =
            environment.api +
            '/api/sptypes?filter[where][SPCODE]=' +
            type +
            '&filter[where][ACTIVE]=Y';
        return this.httpClient.get<any>(url);
    }

    sptype(body) {
        const url = environment.api + '/api/sptypes';
        return this.httpClient.post(url, body);
    }

    generateLettercc(data) {
        return this.httpClient.post<any>(
            environment.letters_api + data.demand + '/download',
            data
        );
    }

    sendsms(data) {
        return this.httpClient.post<any>(environment.api + '/api/sms', data);
    }

    guarantorletters(data) {
        return this.httpClient.post<any>(
            environment.api + '/api/guarantorletters',
            data
        );
    }

    demanddownload(file: string) {
        const body = { filename: file };

        return this.httpClient.post(
            environment.demanddownload + '/filesapi/download',
            body,
            {
                responseType: 'blob',
                headers: new HttpHeaders().append(
                    'Content-Type',
                    'application/json'
                ),
            }
        );
    }

    existsteles(custnumber, tel, email) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api +
                '/api/teles?filter[where][custnumber]=' +
                custnumber +
                '&filter[where][telephone]=' +
                tel +
                '&filter[where][email]=' +
                email
        );
    }

    postteles(data) {
        return this.httpClient.post<any>(environment.api + '/api/teles', data);
    }

    getallteles(custnumber) {
        // return this.httpClient.get<any>(environment.api + '/api/teles/alltele?custnumber=' + custnumber);
        return this.httpClient.get<any>(
            environment.nodeapi + '/teles/all?custnumber=' + custnumber
        );
    }

    getsms(cust) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/sms?filter[where][custnumber]=' +
                cust +
                '&filter[order]=stagedate desc'
        );
    }

    getaccount(accnumber) {
        // return this.httpClient.get<any>(environment.api + '/api/tbl_q_all/' + accnumber);
        return this.httpClient.get<any>(
            environment.api + '/api/tqall/' + accnumber
        );
    }

    getsmsdetails(accnumber) {
        // return this.httpClient.get<any>(environment.api + '/api/tbl_q_all/' + accnumber);
        return this.httpClient.get<any>(
            environment.api + '/api/tqall/' + accnumber
        );
    }

    getipfaccount(accnumber) {
        return this.httpClient.get<any>(
            environment.api + '/api/tbl_ipf/' + accnumber
        );
    }

    account(accnumber) {
        return this.httpClient.get<any>(
            environment.api + '/api/watch_stage/' + accnumber
        );
    }

    accounts(custnumber) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/watch_stage?filter[where][custnumber]=' +
                custnumber
        );
    }

    custview_stage(custnumber) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/custview_stage?filter[where][custnumber]=' +
                custnumber
        );
    }

    customer_stage(custnumber) {
        return this.httpClient.get<any>(
            environment.api + '/api/customer_stage/' + custnumber
        );
    }

    customers_stage(custnumber) {
        return this.httpClient.get<any>(
            environment.api + '/api/customers_stage/' + custnumber
        );
    }

    approverelegate(body) {
        return this.httpClient.patch(
            environment.nodeapi + '/tbl-relegations/' + body.casenumber,
            body
        );
    }

    relegation(body) {
        return this.httpClient.post(
            environment.nodeapi + '/tbl-relegations',
            body
        );
    }

    newauctioneer(body) {
        return this.httpClient.post(
            environment.nodeapi + '/tblauctioneer',
            body
        );
    }

    newinvoice(body) {
        return this.httpClient.post(environment.api + '/api/tblinvoices', body);
    }

    newdebtcollector(body) {
        return this.httpClient.post(
            environment.api + '/api/tbldebtcollectors',
            body
        );
    }

    newvaluer(body) {
        return this.httpClient.post(environment.api + '/api/valuers', body);
    }

    newrepo(body) {
        return this.httpClient.post(
            environment.api + '/api/repossessions',
            body
        );
    }

    newinvestigators(body) {
        return this.httpClient.post(
            environment.api + '/api/investigators',
            body
        );
    }

    checkinmarketer(accnumber) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/tblmarketors?filter[where][accnumber]=' +
                accnumber +
                '&filter[where][newstatus][nin]=unassigned&filter[where][newstatus][nin]=Completed'
        );
    }

    checkindebtcollector(accnumber) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/tbldebtcollectors?filter[where][accnumber]=' +
                accnumber +
                '&filter[where][newstatus][nin]=Cancelled&filter[where][newstatus][nin]=Completed'
        );
    }

    checkinvaluation(accnumber) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/tblvaluers?filter[where][accnumber]=' +
                accnumber +
                '&filter[where][newstatus][nin]=Cancelled&filter[where][newstatus][nin]=Completed'
        );
    }

    checkintblauctioneers(accnumber) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/tblauctioneers?filter[where][accnumber]=' +
                accnumber +
                '&filter[where][newstatus][nin]=Cancelled&filter[where][newstatus][nin]=Completed'
        );
    }

    tqall() {
        return this.httpClient.get<any>(environment.api + '/api/tqall');
    }

    postsms(body) {
        return this.httpClient.post<any>(environment.api + '/api/sms/', body);
    }

    tbl_s_plans() {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(environment.api + '/api/tbl_s_plans');
    }

    s_plan_actions(planid) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/tbl_s_plan_actions?filter[where][planid]=' +
                planid
        );
    }

    s_account_plans(accnumber, planid) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api +
                '/api/tbl_s_account_plans?filter[where][accnumber]=' +
                accnumber +
                '&filter[where][planid]=' +
                planid
        );
    }

    putaccountplan(body) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.put<any>(
            environment.api + '/api/tbl_s_account_plans/' + body.id,
            body
        );
    }

    saveaccountplan(body) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<any>(
            environment.api + '/api/tbl_s_account_plans',
            body
        );
    }

    put_s_accounts(body) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.put<any>(
            environment.api + '/api/tbl_s_accounts',
            body
        );
    }

    putteles(data) {
        return this.httpClient.post<any>(
            environment.nodeapi + '/teles/update',
            data
        );
    }

    submitCollateral(body) {
        return this.httpClient.post(
            environment.api + '/api/deptcollateral',
            body
        );
    }

    retrieveCollateral(custnumber) {
        return this.httpClient.get(
            environment.api +
                '/api/deptcollateral?filter[where][custnumber]=' +
                custnumber
        );
    }

    updateCollateral(id, body) {
        return this.httpClient.put(
            environment.api + '/api/deptcollateral/' + id,
            body
        );
    }

    submitGuarantor(body) {
        return this.httpClient.post(
            environment.api + '/api/guarantordetails',
            body
        );
    }

    guarantordetails(accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<any>(
            environment.api +
                '/api/guarantordetails?filter[where][accnumber]=' +
                accnumber
        );
    }

    uploads(data) {
        return this.httpClient.post<any>(
            environment.api + '/api/uploads',
            data
        );
    }

    getLetter(letter) {
        return this.httpClient.get<any>(
            environment.api + '/api/demandsettings/' + letter
        );
    }

    putautoLetter(letter) {
        return this.httpClient.put<any>(
            environment.api + '/api/autoletters',
            letter
        );
    }

    put_tbl_demand_ageing_settings(letter) {
        return this.httpClient.put<any>(
            environment.api + '/api/tbl_demand_ageing_settings',
            letter
        );
    }

    putcustomersuspensions(data) {
        return this.httpClient.put<any>(
            environment.api + '/api/customersuspensions',
            data
        );
    }

    getcustomersuspensions() {
        return this.httpClient.get<any>(
            environment.api + '/api/customersuspensions'
        );
    }

    getautoLetter() {
        return this.httpClient.get<any>(environment.api + '/api/autoletters');
    }

    getsmsconfigs() {
        return this.httpClient.get<any>(
            environment.nodeapi + '/tbl-sms-configurations'
        );
    }

    postautoLetter(letter) {
        return this.httpClient.post<any>(
            environment.api + '/api/autoletters',
            letter
        );
    }

    demandageingsettings(letter) {
        return this.httpClient.post<any>(
            environment.api + '/api/tbl_demand_ageing_settings',
            letter
        );
    }

    getdemandageingsettings() {
        return this.httpClient.get<any>(
            environment.api + '/api/tbl_demand_ageing_settings'
        );
    }

    postuser(user: any) {
        return this.httpClient.post<any>(
            environment.nodeapi + '/tblusers',
            user
        );
    }

    setpermissions(perm: object) {
        return this.httpClient.post<any>(
            environment.api + '/api/permissionsettings/setpermission',
            perm
        );
    }

    getperm(role: string) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/permissionsettings?filter[where][role_id]=' +
                role
        );
    }

    postperm(perm: object) {
        return this.httpClient.put<any>(
            environment.api + '/api/permissionsettings',
            perm
        );
    }

    putbranch(branch: object) {
        return this.httpClient.put<any>(
            environment.api + '/api/branches',
            branch
        );
    }

    getbranches() {
        return this.httpClient.get<any>(
            environment.api + '/api/branches?filter[order]=branchname asc'
        );
    }

    // get arrears accounts above o days and below 360 days
    getarraccs(region) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/utilizationbranch/regiontotal?region=' +
                region
        );
    }

    getregions() {
        return this.httpClient.get<any>(
            environment.api + '/api/branches?filter[order]=region asc'
        );
    }

    getselectedbranches(region) {
        return this.httpClient.get<any>(
            environment.api + '/api/branches?filter[where][region]=' + region
        );
    }

    getuser(username: string) {
        return this.httpClient.get<any>(
            environment.nodeapi + '/tblusers/search?username=' + username
        );
    }

    putuser(user: any) {
        return this.httpClient.put<any>(
            environment.nodeapi + '/tblusers/' + user.username,
            user
        );
    }

    searchbranch(searchtext) {
        return this.httpClient.get<any>(
            environment.api + '/api/branches/search?searchtext=' + searchtext
        );
    }

    post_insurance(data) {
        return this.httpClient.post<any>(
            environment.api + '/api/pmt_insurance',
            data
        );
    }

    patch_pmt_insurance(data) {
        return this.httpClient.patch<any>(
            environment.api + '/api/pmt_insurance/' + data.id,
            data
        );
    }

    post_pmt_insurance(data) {
        return this.httpClient.post<any>(
            environment.api + '/api/pmt_insurance',
            data
        );
    }

    getmemo() {
        return this.httpClient.get<any>(environment.nodeapi + '/loans/memos');
    }

    postcheckautoLetter(data) {
        return this.httpClient.post<any>(
            environment.api + '/api/autoletters/checkduplicate',
            data
        );
    }

    checkduplicatesindemandexpiry(data) {
        return this.httpClient.post<any>(
            environment.api + '/api/tbl_demand_ageing_settings/checkduplicate',
            data
        );
    }

    getdemandexpiry(demand, memo) {
        return this.httpClient.get<any>(
            environment.api +
                '/api/tbl_demand_ageing_settings?filter[where][memogroup]=' +
                memo +
                '&filter[where][letterid]=' +
                demand
        );
    }

    global(body) {
        return this.httpClient.put(
            environment.api + '/api/global_letter_settings',
            body
        );
    }

    getglobal() {
        return this.httpClient.get(
            environment.api + '/api/global_letter_settings'
        );
    }

    putLetter(letter) {
        return this.httpClient.put<any>(
            environment.api + '/api/demandsettings',
            letter
        );
    }

    downloadFile(file: string) {
        const body = { filename: file };
        return this.httpClient.post(environment.uploadurl + '/download', body, {
            responseType: 'blob',
            headers: new HttpHeaders().append(
                'Content-Type',
                'application/json'
            ),
        });
    }

    /*bulknotes(body) {
        const url = environment.nodeapi + '/xlsuploads/uploadbulk-test';
        return this.httpClient.post<any>(url, body, {
            reportProgress: true,
            observe: 'events',
        });
    }*/

    bulknotes(body) {
        // const url = environment.nodeapi + '/xlsuploads/uploadbulk-test';
        const url = environment.api + '/api/notehis';
        return this.httpClient.post<any>(url, body, {
            reportProgress: true,
            observe: 'events',
        });
    }

    insertbulknotes(body) {
        const url = environment.nodeapi + '/notes/bulknotes';
        return this.httpClient.post(url, body);
    }

    putnote(body) {
        const url = environment.api + '/api/notehis';
        return this.httpClient.put(url, body);
    }

    bulktotblcardsstatic(body) {
        const url = environment.api + '/api/tblcard_static/actiondate';
        return this.httpClient.post(url, body);
    }

    bulktotblportfolio(body) {
        const url = environment.api + '/api/tbl_portfolio_static/actiondate';
        return this.httpClient.post(url, body);
    }

    getthisptp(id) {
        return this.httpClient.get<any>(environment.api + '/api/ptps/' + id);
    }

    ammendptp(data) {
        return this.httpClient.post<any>(
            environment.nodeapi + '/ptpsammend/ammendptp',
            data
        );
    }

    woffstory(data) {
        return this.httpClient.put<any>(
            environment.api + '/api/writeoffstory',
            data
        );
    }

    upload(file: File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();

        formData.append('file', file);

        const request = new HttpRequest('POST', `${this.endpoint}`, formData, {
            reportProgress: true,
            responseType: 'json',
        });

        return this.httpClient.request(request);
    }

    uploadtominio(
        file: File,
        bucket: String,
        accnumber: String
    ): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();

        formData.append('file', file);

        const request = new HttpRequest(
            'POST',
            environment.miniofiles +
                '/uploadfile?bucket=' +
                bucket +
                '&accnumber=' +
                accnumber,
            formData,
            {
                reportProgress: true,
                responseType: 'json',
            }
        );

        return this.httpClient.request(request);
    }

    getFiles(): Observable<any> {
        return this.httpClient.get(`${this.endpoint}/files`);
    }

    rabbitmq(queue, data) {
        return this.httpClient.post<any>(
            environment.rabbitmq + '/newactivity?queue=' + queue,
            data
        );
    }

    clientactionplantomq(queue, data) {
        return this.httpClient.post<any>(
            environment.clientactionplantomq + '/newactivity?queue=' + queue,
            data
        );
    }

    clientactionplan_to_logstash_http(data) {
        return this.httpClient.post<any>(
            environment.clientactionplan_to_logstash_http,data
        );
    }

    generateics(data) {
        return this.httpClient.post<any>(
            environment.invite + '/callscheduler/fordownload',
            data
        );
    }

    ews_on_elasticsearch(data) {
        return this.httpClient.post<any>(
            environment.ews_on_elasticsearch + '/ews_on_elasticsearch/update',
            data
        );
    }

    clientactionplan_on_elasticsearch(data) {
        return this.httpClient.post<any>(
            environment.ews_on_elasticsearch +
                '/clientactionplan_on_elasticsearch',
            data
        );
    }

    putaccountactionplan(data) {
        return this.httpClient.put<any>(
            environment.mongorest + '/clientactionplan/' + data.custnumber,
            data
        );
    }

    postaccountactionplan(data) {
        return this.httpClient.post<any>(
            environment.mongorest + '/actionplan',
            data
        );
    }

    getclientaction(custnumber) {
        return this.httpClient.get<any>(
            environment.mongorest + '/actionplan/' + custnumber
        );
    }

    getclientactionbydate(custnumber, createdate) {
        return this.httpClient.get<any>(
            environment.mongorest +
                '/actionplan/bycreatedate/' +
                custnumber +
                '/' +
                createdate
        );
    }

    getclientaction_account(custnumber) {
        return this.httpClient.get<any>(
            environment.nodeapi +
                '/clientactionplan/accounts?custnumber=' +
                custnumber
        );
    }

    getrepodata(id) {
        return this.httpClient.get<any>(
            environment.nodeapi + '/tblrepossessions/' + id
        );
    }

    public exportAsExcelFile(json: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        console.log('worksheet', worksheet);
        const workbook: XLSX.WorkBook = {
            Sheets: { data: worksheet },
            SheetNames: ['data'],
        };
        const excelBuffer: any = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });
        // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE,
        });
        FileSaver.saveAs(
            data,
            fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
        );
    }
}
