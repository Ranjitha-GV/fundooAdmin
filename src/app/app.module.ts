import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { RouterModule, Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { QuestionAdminComponent } from './components/question-admin/question-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    QuestionAdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,   
    AppRoutingModule

  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]    
})

export class AppModule { }
