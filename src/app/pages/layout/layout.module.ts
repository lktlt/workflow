import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { ShareModule } from 'src/app/share/share.module';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    ReactiveFormsModule
  ],
  exports: [
    LayoutComponent
  ],
  providers:[NzModalService]
})
export class LayoutModule { }
