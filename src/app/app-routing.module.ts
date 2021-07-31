import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountModule } from "./pages/account/account.module";
import { LoginComponent } from "./pages/account/login/login.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  {path:"**",loadChildren:()=>import("./pages/notfound/notfound.module").then(m=>m.NotfoundModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
