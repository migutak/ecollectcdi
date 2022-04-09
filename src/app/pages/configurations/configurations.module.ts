import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommissionComponent } from './commission/commission.component';
import { ExceluploadsComponent } from './exceluploads/exceluploads.component';
import {RouterModule, Routes} from '@angular/router';
const routes: Routes = [
  { path: '', redirectTo: 'commission' },
  {path: 'commission', component: CommissionComponent},
  {path: 'exceluploads', component: ExceluploadsComponent}
    ];


@NgModule({
  declarations: [
    CommissionComponent,
    ExceluploadsComponent
  ],
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class ConfigurationsModule { }
