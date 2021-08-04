import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup,ValidationErrors,Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { StorageService } from "../../../core/services/storage.service";
import { NzModalService,NzModalRef,ModalOptions } from "ng-zorro-antd/modal";
import { AccountService } from 'src/app/core/services/account.service';
import { NzMessageService } from "ng-zorro-antd/message";
import { count } from 'rxjs/operators';

export interface MenuTree {
  name: string;
  canOperate: string;
  routerLink: string;
  iconType: string;
  firstBreadcrumb: string;
  lastBreadcrumb: string;
  children?:MenuTree[]
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  menuTree: MenuTree[] = [
    {
      name: '仪表盘', canOperate: 'dashaboard', routerLink: '/dashboard', iconType: 'dot-chart', firstBreadcrumb: '', lastBreadcrumb: '',
    },
    {
      name: '系统管理', canOperate: 'systemmanage', routerLink: '', iconType: 'setting', firstBreadcrumb: '', lastBreadcrumb: '',
      children: [
        { name: '用户管理', canOperate: 'userManage', routerLink: '/system/user', iconType: 'user', firstBreadcrumb: '系统管理', lastBreadcrumb: '用户管理' },
        { name: '角色管理', canOperate: 'roleManage', routerLink: '/system/role', iconType: 'idcard', firstBreadcrumb: '系统管理', lastBreadcrumb: '角色管理' },
        { name: '菜单管理', canOperate: 'menuManage', routerLink: '/system/menu', iconType: 'menu', firstBreadcrumb: '系统管理', lastBreadcrumb: '菜单管理' },
      ]
    },
    {
      name: '组织管理', canOperate: 'groupmanage', routerLink: '', iconType: 'team', firstBreadcrumb: '', lastBreadcrumb: '',
      children: [
        { name: '职位管理', canOperate: 'positionManage', routerLink: '/group/position', iconType: 'credit-card', firstBreadcrumb: '组织管理', lastBreadcrumb: '职位管理' },
        { name: '部门管理', canOperate: 'departmentManage', routerLink: '/group/department', iconType: 'apartment', firstBreadcrumb: '组织管理', lastBreadcrumb: '部门管理' },
      ]
    },
    {
      name: '工作流', canOperate: 'workflow', routerLink: '', iconType: 'fork', firstBreadcrumb: '', lastBreadcrumb: '',
      children: [
        { name: '我创建的', canOperate: 'myWorkflow', routerLink: '/workflow/myFlow', iconType: 'credit-card', firstBreadcrumb: '组织管理', lastBreadcrumb: '我创建的' },
        { name: '我处理的', canOperate: 'handledWorkflow', routerLink: '/workflow/handledFlow', iconType: 'highlight', firstBreadcrumb: '组织管理', lastBreadcrumb: '我处理的' },
        { name: '工作流管理', canOperate: 'workflowManage', routerLink: '/workflow/workflowManage', iconType: 'reconciliation', firstBreadcrumb: '组织管理', lastBreadcrumb: '工作流管理' }
      ]
    },
    {
      name: '内容管理', canOperate: 'contentmanage', routerLink: '', iconType: 'book', firstBreadcrumb: '', lastBreadcrumb: '',
      children: [
        { name: '文章管理', canOperate: 'articleManage', routerLink: '/content/article', iconType: 'align-left', firstBreadcrumb: '内容管理', lastBreadcrumb: '文章管理' },
        { name: '文件管理', canOperate: 'fileManage', routerLink: '/content/file', iconType: 'file', firstBreadcrumb: '内容管理', lastBreadcrumb: '文件管理' },
        { name: '字典管理', canOperate: 'dicManage', routerLink: '/content/dic', iconType: 'book', firstBreadcrumb: '内容管理', lastBreadcrumb: '字典管理' }
      ]
    },
    {
      name: '日志管理', canOperate: 'logmanage', routerLink: '', iconType: 'container', firstBreadcrumb: '', lastBreadcrumb: '',
      children: [
        { name: '操作日志', canOperate: 'operatelog', routerLink: '/log/operate', iconType: 'edit', firstBreadcrumb: '日志管理', lastBreadcrumb: '操作日志' },
        { name: '登录日志', canOperate: 'loginlog', routerLink: '/log/login', iconType: 'login', firstBreadcrumb: '日志管理', lastBreadcrumb: '登录日志' },
      ]
    },
    {
      name: '系统工具', canOperate: 'systemtool', routerLink: '', iconType: 'tool', firstBreadcrumb: '', lastBreadcrumb: '',
      children: [
        { name: '代码生成', canOperate: 'code', routerLink: '/tool/code', iconType: 'fund-view', firstBreadcrumb: '系统工具', lastBreadcrumb: '代码生成' },
        { name: 'swagger', canOperate: 'swagger', routerLink: '/tool/swagger', iconType: 'api', firstBreadcrumb: '系统工具', lastBreadcrumb: 'Swagger' },
      ]
    },
  ];
  @ViewChild('modifyPwdTitleTpl', { static: true }) modifyTitle!: TemplateRef<any>;
  @ViewChild('modifyPwdContentTpl', { static: true }) modifyContent!: TemplateRef<any>;

  isSideMenu = true;
  isCollapsed = false; // 侧边栏收起状态
  userName!: string | null;
  avatar!: string | null;
  modifyFormGroup!: FormGroup;
  isLoading = false;
  modalRef!: NzModalRef;
  breadcrumbInfo_col: string[] = ['仪表盘'];
  tags: MenuTree[] = [this.menuTree[0]];

  constructor(
    private storageService: StorageService,
    private fb: FormBuilder,
    private modalService: NzModalService,
    private accountService: AccountService,
    private messageService: NzMessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userName = this.storageService.Name;
    this.avatar = this.storageService.Avatar
  }

  equalValidator = (control: FormControl): ValidationErrors | null => {
    // ？不能少，为什么
    const newPasswordControl = this.modifyFormGroup?.controls['newPwd'];
    const newPwd = newPasswordControl?.value;
    const confirmPWd = control.value;
    return newPwd === confirmPWd ? null : { 'notEqual': true };
  }

  getImgUrl() {
    return `/assets/avatars/${this.avatar}.png`;
  }
  modifyPwd() {
    this.modifyFormGroup = this.fb.group({
      userName: [{ value: this.storageService.userName, disabled: true }],
      oldPwd: ['', [Validators.required]],
      newPwd: ['', [Validators.required]],
      confirmPwd: ['', [Validators.required,this.equalValidator]],
    });
    this.modalRef = this.modalService.create({
      nzContent: this.modifyContent,
      nzTitle: this.modifyTitle,
      nzFooter: null,
      nzMaskClosable: false,
    });
  }
  logout() {
    this.storageService.removeUserToken();
    this.router.navigate(['/account/login']);
  }
  _submitForm() {
    for (const key in this.modifyFormGroup.controls) {
      console.log(key,this.modifyFormGroup.controls[key].value);
      this.modifyFormGroup.controls[key].markAsDirty();
      this.modifyFormGroup.controls[key].updateValueAndValidity();
    }
    if (this.modifyFormGroup.valid) {
      this.isLoading = true;
      this.accountService.modifySelfPwd(this.modifyFormGroup.controls['oldPwd'].value, this.modifyFormGroup.controls['newPwd'].value).
        subscribe(
          result => {
            this.modifyFormGroup.reset();
            this.messageService.success('密码修改成功', result);
            this.modalRef.close();
          },
          error => {
            this.isLoading = false;
          },
          () => {
            this.isLoading = false;
          }
        );

    }
  }
  tagClose(removeTag: MenuTree) {
    this.tags = this.tags.filter(tag => tag !== removeTag);
  }
  navigateTo(node: MenuTree) {
    // 面包屑
    this.breadcrumbInfo_col = [];
    this.breadcrumbInfo_col.push(node.firstBreadcrumb);
    if (node.lastBreadcrumb) {
      this.breadcrumbInfo_col.push(node.lastBreadcrumb);
    }
    // tags
    this.tagClose(node);
    this.tags.push(node);
  }
  navigateTag(node: MenuTree) {
    console.log(node.routerLink);
    this.router.navigate([node.routerLink]);
  }
  // setBreadcrumb(first: string, ...rest: string[]) {
  //   this.breadcrumbInfo_col = [];
  //   this.breadcrumbInfo_col.push(first);
  //   rest.forEach(e => {
  //     this.breadcrumbInfo_col.push(e);
  //   });
  // }
}
