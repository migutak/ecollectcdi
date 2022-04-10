import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewallComponent } from './viewall/viewall.component';
import { PtpsComponent } from './ptps/ptps.component';
import { AllloansComponent } from './allloans/allloans.component';
import { MyworklistComponent } from './myworklist/myworklist.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'viewall' },
  { path: 'viewall', component: ViewallComponent },
  {path: 'ptps', component: PtpsComponent },
  {path: 'myworklist', component: MyworklistComponent },
  {path: 'allloans', component: AllloansComponent}
    ];

@NgModule({
  declarations: [
    ViewallComponent,
    PtpsComponent,
    AllloansComponent,
    MyworklistComponent
  ],
  imports: [
    CommonModule,  RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class WorkModule { }
