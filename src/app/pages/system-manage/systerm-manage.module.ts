import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManageComponent } from './user-manage/user-manage.component';
import { RolesManageComponent } from './roles-manage/roles-manage.component';
import { MenuManageComponent } from './menu-manage/menu-manage.component';
import { AvatarSelectComponent } from './avatar-select/avatar-select.component';
import { RouterModule } from "@angular/router";
import { LoginGuard } from 'src/app/core/guards/login.guard';
import { ShareModule } from "../../share/share.module";



@NgModule({
  declarations: [
    UserManageComponent,
    RolesManageComponent,
    MenuManageComponent,
    AvatarSelectComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(
      [
        { path: 'user', component: UserManageComponent, canActivate: [LoginGuard] },
        { path: 'role', component: RolesManageComponent, canActivate: [LoginGuard] },
        { path: 'menu', component: MenuManageComponent, canActivate: [LoginGuard] }
      ]
    )
  ]
})
export class SystermManageModule { }
