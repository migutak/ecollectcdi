import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

export class HttpErrorInterceptor implements HttpInterceptor {
    user: any = {};
    constructor(public http: HttpClient) {
        this.user = localStorage.getItem('currentUser'); // USERNAME
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();
        const started_datetime = moment().format();
        let ok: string;
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    console.log(error);
                    if (error.error instanceof ErrorEvent) {
                        console.log('this is client side error');
                        errorMsg = `Error: ${error.error.message}`;
                    }
                    else {
                        console.log('this is server side error');
                        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                    }
                    console.log(errorMsg);
                    return throwError(errorMsg);
                }),
                //catchError(this.handleError),
                // Log when response observable either completes or errors
                finalize(() => {
                    const now = Date.now();
                    const end_datetime = moment().format();
                    const elapsed = now - started;
                   /* const esmsg = {
                        endpoint_url: req.urlWithParams,
                        method: req.method,
                        request_body: req,
                        response_body: this.response_body,
                        starttime: started_datetime,
                        endtime: end_datetime,
                        elapsed: elapsed,
                        status: this.response_body.status,
                        statusText: this.response_body.statusText,
                        message: this.response_body.message,
                        ok: this.response_body.ok,
                    };*/
                    // console.log(msg);
                   // this.eslogging(esmsg);
                })
            )
    }

    eslogging(entry: any) {
        const headers = new HttpHeaders();
        const date = moment().format();

        const body = {
            datetime: date,
            // "index": "clientapplication",
            endpoint_url: entry.endpoint_url,
            method: entry.method,
            request_body: entry.request_body,
            response_body: entry.response_body,
            start_time: entry.starttime,
            end_time: entry.endtime,
            'time_elapsed(ms)': entry.elapsed,
            status_code: entry.status,
            status_text: entry.statusText,
            //user: this.currentUser.USERNAME,
            client_ip: 'xx.xx.xx.xx',
            message: entry.message,
            ok: entry.ok,
        };

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        if (!body.endpoint_url.includes('ecollectclientapp')) {
            this.http
                .post(
                    `${environment.elasticsearch}/ecollectclientapp/_doc`,
                    body
                )
                .subscribe((resp) => { });
        }
        //
    }
}
