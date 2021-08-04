import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout/layout.component';

const routes: Routes = [
  { path: "account", loadChildren: () => import("./pages/account/account.module").then(m => m.AccountModule) },
  {
    path: "", component: LayoutComponent,
    children: [
      { path: "", loadChildren: () => import("./pages/information/information.module").then(m => m.InfomationModule) },
      { path: "system", loadChildren: () => import("./pages/system-manage/systerm-manage.module").then(m => m.SystermManageModule) }
    ]
  },
  { path: "**", loadChildren: () => import("./pages/notfound/notfound.module").then(m => m.NotfoundModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
