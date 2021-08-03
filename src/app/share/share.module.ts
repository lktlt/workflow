import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanOperateDirective } from './diretives/can-operate.directive';
import { NzFormModule } from "ng-zorro-antd/form"
import { FormsModule,ReactiveFormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzBadgeModule } from "ng-zorro-antd/badge";
import { NzAvatarModule } from "ng-zorro-antd/avatar";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzMessageServiceModule } from "ng-zorro-antd/message";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { NzTagModule } from "ng-zorro-antd/tag";

const ZORRO_MODULES = [
  NzLayoutModule,
  NzCardModule,
  NzDropDownModule,
  NzIconModule,
  NzBadgeModule,
  NzAvatarModule,
  NzCollapseModule,
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzMessageServiceModule,
  NzDividerModule,
  NzBreadCrumbModule,
  NzTagModule
]
@NgModule({
  declarations: [
    CanOperateDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...
    ZORRO_MODULES
  ],
  exports: [
    CanOperateDirective,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...
    ZORRO_MODULES
  ]

})
export class ShareModule { }
