import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanOperateDirective } from './diretives/can-operate.directive';



@NgModule({
  declarations: [
    CanOperateDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CanOperateDirective
  ]

})
export class ShareModule { }
