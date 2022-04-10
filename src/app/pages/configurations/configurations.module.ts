import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExceluploadsComponent } from './exceluploads/exceluploads.component';
import { CommissionComponent } from './commission/commission.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'commission' },
  {path: 'commission', component: CommissionComponent},
  {path: 'exceluploads', component: ExceluploadsComponent}
];


@NgModule({
  declarations: [
    ExceluploadsComponent,
    CommissionComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ConfigurationsModule { }
