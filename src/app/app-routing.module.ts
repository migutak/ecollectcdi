import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Home
import { HomePage } from './pages/home/home';
import {WorkModule} from './pages/work/work.module';
import {ConfigurationsModule} from './pages/configurations/configurations.module';




export const routes: Routes = [
  // {path: '', redirectTo: '/home', pathMatch: 'full'},
  // start of common layout
    // component: LayoutComponent,
    // canActivate: [AuthGuard],
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'home', component: HomePage, data: {title: 'Home'}},
      {
        path: 'work',
        loadChildren: () => WorkModule,
        // loadChildren: './pages/home/home.module#HomeModule',
        data: {title: 'Work'},
  },
    {
        path: 'config',
        loadChildren: () => ConfigurationsModule,
        // loadChildren: './pages/home/home.module#HomeModule',
        data: {title: 'Configurations'},
    }];



@NgModule({
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})


export class AppRoutingModule { }
