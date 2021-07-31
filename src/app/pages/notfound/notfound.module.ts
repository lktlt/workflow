import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from "./notfound.component";
import { RouterModule } from "@angular/router";
import { NzButtonModule} from "ng-zorro-antd/button"
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    NotfoundComponent
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    RouterModule.forChild([
      { path: '', component: NotfoundComponent }
    ]),
  ]
})
export class NotfoundModule { }
