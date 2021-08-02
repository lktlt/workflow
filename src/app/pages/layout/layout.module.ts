import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from "@angular/router";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzBadgeModule } from "ng-zorro-antd/badge";
import { NzAvatarModule } from "ng-zorro-antd/avatar";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { ShareModule } from 'src/app/share/share.module';


@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ShareModule,

    NzLayoutModule,
    NzCardModule,
    NzDropDownModule,
    NzIconModule,
    NzBadgeModule,
    NzAvatarModule,
    NzCollapseModule,
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
