import { NgModule } from '@angular/core';
import { SettingshomeComponent } from './settingshome/settingshome.component';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule, DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from '@ag-grid-community/angular';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ExceluploadsComponent } from './exceluploads/exceluploads.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { HighlightJsModule } from 'ngx-highlight-js';
import { NgxPaginationModule } from 'ngx-pagination';
import { FileUploadModule } from 'ng2-file-upload';

import { CommissionsComponent } from './commissions/commissions.component';
import { MomentModule } from 'ngx-moment';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { ToastrModule } from 'ngx-toastr';
import { NgProgressModule } from 'ngx-progressbar';
import { NgxDropzoneModule } from 'ngx-dropzone';

const routes: Routes = [{ path: '', component: SettingshomeComponent }];

@NgModule({
    declarations: [
       SettingshomeComponent,
       CommissionsComponent,
       ExceluploadsComponent,
    ],
    imports: [
        
        NgbModule,
        RouterModule.forRoot(routes),
        AgGridModule,
        NgxSkeletonLoaderModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
        NgSelectModule,
        NgxSpinnerModule,
        NgxSmartModalModule.forRoot(),
        CommonModule,
        NgxPaginationModule,
        HighlightJsModule,
        FileUploadModule,
        MomentModule,
        TooltipModule,
        PerfectScrollbarModule,
        ToastrModule.forRoot(), // ToastrModule added
		NgProgressModule.withConfig({
            spinnerPosition: 'left',
            color: '#f71cff'
        }),
        NgxDropzoneModule,
    ],
    exports: [RouterModule],
    providers: [],
})
export class SettingsModule {}
