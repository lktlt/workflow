import { Directive, Input, TemplateRef,  ViewContainerRef } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';



@Directive({
  selector: '[canOperate]'
})
export class CanOperateDirective {

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private storage:StorageService
  ) { }

  // 结构型指令
  @Input() set canOperate(identification:string) {
    let roles = this.storage.UserRoles?.split(',');
    let identifications = this.storage.Identifycation?.split(',');
    // 操作权限：role 1和有identification
    let hasRight = roles?.find(r => r === '1') ? 'true' : identifications?.find(i => i === identification);
    if (hasRight) {
      this.viewContainer.createEmbeddedView(this.templateRef); // 实例化嵌入式视图templateRef并插入这个容器中ng-container
    }
    else {
      this.viewContainer.clear();
    }
  }

}
