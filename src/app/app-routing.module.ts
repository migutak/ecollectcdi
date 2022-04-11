import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Home
import { HomePage } from './pages/home/home';
import { SettingshomeComponent } from './pages/settings/settingshome/settingshome.component';
import { CommissionsComponent } from './pages/settings/commissions/commissions.component';
import { ExceluploadsComponent } from './pages/settings/exceluploads/exceluploads.component';
import { ViewallComponent } from './pages/viewall/viewall.component';
import { MyworklistComponent } from './pages/myworklist/myworklist.component';
import { MyallocationsComponent } from './pages/myallocations/myallocations.component';
import { PtpsComponent } from './pages/ptps/ptps.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePage, data: { title: 'Home' } },
  {
    path: 'settings/home',
    component: SettingshomeComponent,
    data: { title: 'Settings' }
  },
  {
    path: 'settings/exceluploads',
    component: ExceluploadsComponent,
    data: { title: 'Excel' }
  },
  {
    path: 'settings/commissions',
    component: CommissionsComponent,
    data: { title: 'Commissions' }
  },
  {
    path: 'work/viewall',
    component: ViewallComponent,
    data: { title: 'Viewall' }
  },
  {
    path: 'work/myallocations',
    component: MyallocationsComponent,
    data: { title: 'My Allocations' }
  },
  {
    path: 'work/myworklist',
    component: MyworklistComponent,
    data: { title: 'My Worklist' }
  },
  {
    path: 'work/ptp',
    component: PtpsComponent,
    data: { title: 'PTPs' }
  }
];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})


export class AppRoutingModule { }
