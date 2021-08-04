import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from "@angular/router";
import { LoginGuard } from 'src/app/core/guards/login.guard';
import { ShareModule } from "../../share/share.module";



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild([
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: 'dashboard', component: DashboardComponent,canActivate:[LoginGuard] }
    ])
  ]
})
export class InfomationModule {
  
}
