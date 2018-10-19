import { NgModule } from '@angular/core';
import { AdminLoginComponent } from '../components/admin-login/admin-login.component';
import { RouterModule, Routes} from '@angular/router';
import { AdminDashboardComponent } from '../components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from '../auth.guard';


const appRoutes: Routes = [
{ path: 'admin-login', component: AdminLoginComponent }, 
{ path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },  
{ path: '', component: AdminLoginComponent, pathMatch:'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes) 
  ],
    exports: [RouterModule]

})
export class AppRoutingModule { 

}
