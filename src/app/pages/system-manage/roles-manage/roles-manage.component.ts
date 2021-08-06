import { keyframes } from '@angular/animations';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { title } from 'process';
import { MenuService } from 'src/app/core/services/menu.service';
import { RoleService } from 'src/app/core/services/role.service';
import { unzipSync } from 'zlib';
import { Menu } from '../model/menu';
import { Role } from '../model/role';

@Component({
  selector: 'app-roles-manage',
  templateUrl: './roles-manage.component.html',
  styleUrls: ['./roles-manage.component.less']
})
export class RolesManageComponent implements OnInit {
  @ViewChild('addRoleTitleTpl')
  addRoleTitleTpl!: TemplateRef<any>;
  @ViewChild('editRoleitleTpl')
  editRoleitleTpl!: TemplateRef<any>;
  @ViewChild('roleContentTpl')
  roleContentTpl!: TemplateRef<any>;

  searchGroup!: FormGroup;
  addGroup!: FormGroup;
  roleList!: Role[];
  editedRole: Role = new Role();
  page = 1;
  pageSize = 10;
  searchString: string = '';
  total = 0;
  modal!: NzModalRef;
  nodes!: NzTreeNodeOptions[];

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private modalService: NzModalService,
    private messageService: NzMessageService,
    private menuService: MenuService,
  ) { }

  ngOnInit(): void {
    this.searchGroup = this.fb.group({
      roleName: ['']
    });
    let nodes: NzTreeNodeOptions[] = [];
    this.menuService.get().subscribe((result: any) => {
      console.log(result, "nodes");
      this.makenodes(nodes, result, null);
      this.nodes = nodes;
      console.log(nodes);

    });
    this.refresh();
  }
  makenodes(nodes: any, menus: Menu[], upid?: string | null) {
    let ms = menus.filter(menu => menu.upId == upid);
    ms.forEach((menu: Menu) => {
      let data = { title: menu.name, key: menu.id?.toString(), children: [], isLeaf: menu.type == 2 || menu.type == 3 };
      this.makenodes(data.children, menus, menu.id?.toString());
      nodes.push(data);
    });
  }
  refresh() {
    this.roleService.getRoles(this.searchString, this.page, this.pageSize).subscribe(
      (result: any) => {
        this.roleList = result['data'];
        console.log(this.roleList, "roledata");
        this.total = result['count'];
      }
    );
  }
  submitSearch() {
    this.searchString = this.searchGroup.value['roleName'];
    this.refresh();
  }
  submitAdd() {
    for (const key in this.addGroup.controls) {
      this.addGroup.controls[key].markAsDirty();
      this.addGroup.controls[key].updateValueAndValidity();
    }
    if (this.addGroup.valid) {
      this.editedRole.name = this.addGroup.value['roleName'];
      this.editedRole.remark = this.addGroup.value['roleRemark'];
      this.editedRole.menus = this.addGroup.value['menu'].join(',');
      if (this.editedRole.id) {
        this.roleService.updataRole(this.editedRole).subscribe(result => {
          this.refresh();
          this.modal.close();
          this.messageService.success("更新成功！");
        });
      } else {
        this.roleService.addRole(this.editedRole).subscribe(result => {
          this.refresh();
          this.modal.close();
          this.messageService.success("添加成功！");
        });
      }
    }
  }
  addRole(title: TemplateRef<any>, content: TemplateRef<any>) {
    this.addGroup = this.fb.group({
      roleName: [null, [Validators.required, Validators.maxLength(15)]],
      roleRemark: [null, [Validators.maxLength(30)]],
      menu: [null]
    });
    this.modal = this.modalService.create({
      nzTitle: title,
      nzContent: content,
      nzFooter: null,
      // nzClosable: true;
    });
  }
  editRole(title: TemplateRef<any>, content: TemplateRef<any>, role: Role) {
    this.addGroup = this.fb.group({
      roleName: [role.name, [Validators.required, Validators.maxLength(15)]],
      roleRemark: [role.remark, [Validators.maxLength(30)]],
      menu: [role.menus]
    });
    this.modal = this.modalService.create({
      nzTitle: title,
      nzContent: content,
      nzFooter: null,
      // nzClosable: true;
    });
  }
  remooveRole(name: string) {
    this.modal = this.modalService.create({
      nzTitle: '删除',
      nzContent: '确认删除该角色？',
      nzOnOk: () => {
        this.roleService.deleteRole(name).subscribe(result => {
          this.refresh();
          this.messageService.success("删除成功 ！");
        })
      }

    });
  }
}
