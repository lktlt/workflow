import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { MenuService } from 'src/app/core/services/menu.service';
import { Menu } from '../model/menu';

@Component({
  selector: 'app-menu-manage',
  templateUrl: './menu-manage.component.html',
  styleUrls: ['./menu-manage.component.less']
})
export class MenuManageComponent implements OnInit {
  nodes!: NzTreeNodeOptions[];
  menuData!: Menu[];
  displayData!: Menu[];
  selectedNode!: NzTreeNode | undefined | null;

  page = 1;
  size = 10;
  total = 0;

  modalTpl!: NzModalRef;

  formGroup!: FormGroup;
  editedMenu!: Menu;

  constructor(
    private menuService: MenuService,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private messageService:NzMessageService
  ) { }

  ngOnInit(): void {
    this.initNodes();
  }
  initNodes() {
    let nodes: NzTreeNodeOptions[] = [{ title: '菜单管理', key: '', icon: 'global', expanded: true, children: [] }];
    this.menuService.get().subscribe((result: any) => {
      this.menuData = result;
      this.makeNodes(null, nodes[0], this.menuData);
      this.nodes = nodes;
      this.displayData = this.menuData.filter(menu => menu.upId == this.selectedNode?.key);
      this.total = this.displayData.length;
    });
  }

  makeNodes(upId:any, node:any, menus: Menu[]) {
    var ms = menus.filter(menu => menu.upId == upId);
    ms.forEach(menu => {
      let data = { title: menu.name, key: menu.id, icon: this.menuIcon(menu.type), children: [], isLeaf: menu.type == 2 || menu.type == 3 };
      this.makeNodes(menu.id, data, menus);
      node.children.push(data);
    });
  }
  menuIcon(type: number | undefined) {
    var result = '';
    switch (type) {
      case 1:
        result = 'menu';
        break;
      case 2:
        result = 'plus-square';
        break;
      case 3:
        result = 'link';
        break;
      default:
        result = 'appstore';
        break;
    }
    return result;
  }
  treeClick(event:NzFormatEmitEvent) {
    this.selectedNode = event.keys && event.keys.length > 0 ? event.node : null;
    this.displayData = this.menuData.filter(menu=>menu.upId==this.selectedNode?.key);
  }
  getUpperMenuById(upid:string|undefined) {
    return this.menuData.find(menu=>menu.id==upid)?.name;
  }
  remove(id:any) {
    this.modalTpl = this.modalService.confirm({
      nzTitle: '是否删除该菜单?',
      nzContent: '删除菜单会导致相关用户的权限无法使用，请谨慎操作！',
      nzOnOk: () =>
        this.menuService.delete(id).subscribe(result => {
          this.initNodes();
          this.messageService.success("删除成功！");
        })
    });
  }
  edit(title: TemplateRef<any>, content: TemplateRef<any>, menu: Menu) {
    if (this.selectedNode) {
      let selectedMenu: Menu | undefined = this.menuData.find(menu => menu.id == this.selectedNode?.key);
      if (selectedMenu&&(selectedMenu.type==2||selectedMenu.type==3)) {
        this.messageService.warning("按钮和链接类型节点无法添加子元素！");
        return;
      }
    }
    this.editedMenu = menu;
    this.formGroup = this.fb.group({
      upMenu: [{ value: Number(menu.upId), disabled: true }],
      //upMenu: [Number(menu.upId)],
      name: [menu.name, [Validators.required, Validators.maxLength(10)]],
      identification: [menu.identification],
      permission: [menu.permission],
      type: [menu.type],
      route: [menu.route],
      sort: [menu.sort, [Validators.required]]
    });
    this.modalTpl = this.modalService.create({
      nzTitle: title,
      nzContent: content,
      nzFooter: null,
      nzMaskClosable: false,
    })
  }
  add(title: TemplateRef<any>, content: TemplateRef<any>) {
    this.editedMenu = new Menu();
    this.formGroup = this.fb.group({
      upMenu: [this.selectedNode?.key],
      name: [null, [Validators.required, Validators.maxLength(10)]],
      identification: [null],
      permission: [null],
      type: [0],
      route: [null],
      sort: [null, [Validators.required]]
    });
    this.modalTpl = this.modalService.create({
      nzTitle: title,
      nzContent: content,
      nzFooter: null,
      nzMaskClosable: false,
    })
  }
  submitForm() {
   for (const key in this.formGroup.controls) {
     this.formGroup.controls[key].markAsDirty();
     this.formGroup.controls[key].updateValueAndValidity();
   }
    if (this.formGroup.valid) {
      let menu = new Menu();
      menu.identification = this.formGroup.value["identification"];
      menu.name = this.formGroup.value["name"];
      menu.permission = this.formGroup.value["permission"];
      menu.route = this.formGroup.value["route"];
      menu.sort = this.formGroup.value["sort"];
      menu.type = this.formGroup.value["type"];
      menu.upId = this.formGroup.value["upMenu"];
      if (this.editedMenu.id) {
        this.menuService.update(menu).subscribe(result => {
          this.messageService.success("更新成功");
          this.initNodes();
          this.modalTpl.close();
        }, error => {
          console.log(error);

        });
      } else {
        this.menuService.add(menu).subscribe(result => {
          this.messageService.success("添加成功");
          this.initNodes();
          this.modalTpl.close();
        }, error => {
          console.log(error);

        }
        )
      }
    }
  }
  cancelEdit() {
    this.modalTpl.close();
  }
}
