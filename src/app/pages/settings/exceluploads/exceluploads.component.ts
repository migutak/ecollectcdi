import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpEventType } from '@angular/common/http';
import * as XLSX from 'xlsx';

//const URL = environment.xlsuploadapi;

@Component({
    selector: 'app-exceluploads',
    templateUrl: './exceluploads.component.html',
    styleUrls: ['./exceluploads.component.css'],
})
export class ExceluploadsComponent implements OnInit {
    @ViewChild('myInput')
    myInputVariable: ElementRef;
    outdata = [];
    username: string;
    sys: string;
    willDownload = false;
    fileUploadProgress = 0;
    convertedJson!: String;

    //public uploader: FileUploader = new FileUploader({ url: URL });
    public hasBaseDropZoneOver = false;
    public hasAnotherDropZoneOver = false;

    constructor(
        private route: ActivatedRoute,
        private ecolService: EcolService,
        private httpClient: HttpClient
    ) {
    }


    ngOnInit() {

    }

    // xls to json
    onFileChange(ev) {
        const xfile = ev.target.files[0];
        // console.log('size', xfile.size);
        // console.log('type', xfile.type);

        if (xfile.size > 9000000) {
            swal.fire({
                icon: 'error',
                title: 'Empty Values',
                text: 'File too large. max is 9Mb',
            });
            this.myInputVariable.nativeElement.value = '';
            document.getElementById('output').innerHTML = '';
            return;
        }

        if (
            xfile.type !==
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ) {
            swal.fire({
                icon: 'error',
                title: 'Empty Values',
                text: 'Wrong file format',
            });
            this.myInputVariable.nativeElement.value = '';
            document.getElementById('output').innerHTML = '';
            return;
        }

        let workBook = null;
        let jsonData = null;
        const reader = new FileReader();
        const file = ev.target.files[0];
        reader.onload = (event) => {
            const data = reader.result;
            workBook = XLSX.read(data, { type: 'binary' });
            jsonData = workBook.SheetNames.reduce((initial, name) => {
                const sheet = workBook.Sheets[name];
                initial[name] = XLSX.utils.sheet_to_json(sheet);
                return initial;
            }, {});
            // console.log('data-total', jsonData.Sheet1.length);

            if (!jsonData.Sheet1) {
                swal.fire({
                    icon: 'error',
                    title: 'Empty Values',
                    text: 'Wrong sheet name',
                });
                this.myInputVariable.nativeElement.value = '';
                document.getElementById('output').innerHTML = '';
                return;
            }
            this.outdata = jsonData.Sheet1;

            if (this.outdata.length < 1 || !this.outdata[0].accnumber || !this.outdata[0].custname) {
                swal.fire({
                    icon: 'error',
                    title: 'Empty Values',
                    text: 'No data or Wrong field name',
                });
                this.myInputVariable.nativeElement.value = '';
                document.getElementById('output').innerHTML = '';
                return;
            }

            const dataString = JSON.stringify(jsonData);
            document.getElementById('output').innerHTML = dataString
                .slice(0, 500)
                .concat('...');
            // this.setDownload(dataString);

            // post

            swal.fire({
                title: 'Confirmation',
                text:
                    'Do you want to proceed with the upload of the ' +
                    this.outdata.length +
                    ' rows?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Upload',
            }).then((result) => {
                if (result.value) {
                    // proceeed to post
                    this.ecolService.loader();
                    const url = environment.nodeapi + '/tqall';

                    //loop
                    for (let i = 0; i < this.outdata.length; i++) {
                        console.log("Block statement execution no." + i);

                        this.httpClient.post<any>(url, this.outdata[i], {
                            reportProgress: true,
                            observe: 'events',
                        }).subscribe(
                            (events) => {
                                //console.log(events);
                                if (events.type === HttpEventType.UploadProgress) {
                                    this.fileUploadProgress = Math.round(
                                        (events.loaded / events.total) * 100
                                    );
                                    // console.log(this.fileUploadProgress);
                                } else if (events.type === HttpEventType.Response) {

                                }
                            },
                            (error) => {
                                console.log(error);
                                swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Something went wrong with xlxs upload!',
                                });
                            }
                        );
                    }
                    this.ecolService.success('Successfully uploaded');
                } else {
                    this.myInputVariable.nativeElement.value = '';
                    document.getElementById('output').innerHTML = '';
                    swal.close();
                    return;
                }
            });
        };
        reader.readAsBinaryString(file);
    }

}
