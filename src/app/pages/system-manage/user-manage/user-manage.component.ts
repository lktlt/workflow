import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzTreeNodeOptions } from "ng-zorro-antd/tree";
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { serializeNodes } from '@angular/compiler/src/i18n/digest';
import { User } from '../model/user';
import { Role } from '../model/role';
import { Position } from '../../group-manage/model/position';
import { RoleService } from 'src/app/core/services/role.service';
import { PositionService } from 'src/app/core/services/position.service';
import { UserService } from 'src/app/core/services/user.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { refCount } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.less']
})
export class UserManageComponent implements OnInit {
  searchFormGroup!: FormGroup
  editGroup!: FormGroup;
  pwdGroup!: FormGroup;


  userDatas!: User[];
  roles!: Role[];
  positions!: Position[];

  page = 1;
  pageSize = 10;
  total = 0;

  _searchObject: any = {};
  selectedDepartmentKey: string = '';
  departmentNodes: NzTreeNodeOptions[] = [];

  tplModal!: NzModalRef;

  isNewUser = false;
  editedUser!: User;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private positionService: PositionService,
    private userService: UserService,
    private modalService: NzModalService,
    private messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.initRoleList();
    this.initPositionList();
    this.refresh();
    this.resetSerchFormGroup();
  }
  initRoleList() {
    this.roleService.getRoleList().subscribe((result: any) => {
      this.roles = result
    });
  }
  initPositionList() {
    this.positionService.getAll().subscribe((result: any) => {
      this.positions = result;
    });
  }
  refresh() {
    this.userService.getUsers(
      this.page,
      this.pageSize,
      this.selectedDepartmentKey,
      this._searchObject.userName,
      this._searchObject.phoneNumber,
      this._searchObject.name,
      this._searchObject.roleId,
      this._searchObject.position,
    ).subscribe((result: any) => {
      // console.log(result);
      this.userDatas = result["data"];
      this.total = result["count"];
    });
  }
  resetSerchFormGroup() {
    this.searchFormGroup = this.fb.group({
      userName: [null],
      phoneNumber: [null],
      name: [null],
      roleId: [null],
      position: [null]
    });
  }
  searchSubmit() {
    this.page = 1;
    this._searchObject.userName = this.searchFormGroup.value['userName'];
    this._searchObject.phoneNumber = this.searchFormGroup.value['phoneNumber'];
    this._searchObject.name = this.searchFormGroup.value['name'];
    this._searchObject.roleid = this.searchFormGroup.value['roleid'];
    this._searchObject.position = this.searchFormGroup.value['position'];
    this.refresh();
  }
  getImgUrl(avatar: string) {
    return `/assets/avatars/${avatar}.png`;
  }
  loadData(nodes: NzTreeNodeOptions[]) {
    this.departmentNodes = nodes;
  }
  nodeChecked(key: string) {
    this.selectedDepartmentKey = key;
    this.refresh();
  }
  cancelEdit() {
    this.tplModal.close();
  }
  addUser(title: TemplateRef<any>, content: TemplateRef<any>) {
    console.log("add");

    this.isNewUser = true;
    this.editedUser = new User();
    this.editGroup = this.fb.group({
      avatar: [''],
      userName: ['', [Validators.required, Validators.maxLength(15)]],
      name: ['', [Validators.required, Validators.maxLength(10)]],
      phoneNumber: ['', [Validators.pattern('^1(3|4|5|7|8)[0-9]{9}$')]],
      roleIds: [[]],
      department: [],
      positions: [[]],
      gender: [0],
      isActive: [false],
    });
    this.tplModal = this.modalService.create({
      nzTitle: title,
      nzContent: content,
      nzFooter: null,
      nzClosable: true,
      nzMaskClosable: false
    });
  }
  editUser(title: TemplateRef<{}>, content: TemplateRef<{}>, user: User) {
    this.userService.getUser(user.id).subscribe((result: any) => {
      this.isNewUser = false;
      this.editedUser = result;
      this.editGroup = this.fb.group({
        avatar: [result['avatar']],
        userName: [result['userName'], [Validators.required, Validators.maxLength(15)]],
        name: [result['name'], [Validators.required, Validators.maxLength(10)]],
        phoneNumber: [result['phoneNumber'], [Validators.pattern('^1(3|4|5|7|8)[0-9]{9}$')]],
        roleIds: [result['roleIds'].split(',')],
        department: [Number(result['departmentId'])],
        positions: [result['positionIds']?.split(',')],
        gender: [result['sex']],
        isActive: [user['isActive']],
      })
      this.modalService.create({
        nzTitle: title,
        nzContent: content,
        nzFooter: null,
        nzClosable: true,
        nzMaskClosable: false
      });
    });
  }

  setPwd(content:TemplateRef<any>,data:User) {
    this.pwdGroup = this.fb.group({
      id: [data['id']],
      password: [null, [Validators.maxLength(30), Validators.minLength(4), Validators.required]]
    });
    this.tplModal = this.modalService.create({
      nzTitle: "修改密码",
      nzContent: content,
      nzFooter: null,
      nzClosable: true,
      nzMaskClosable: false
    });
  }

  removeUser(id:string) {
    this.tplModal = this.modalService.create({
      nzTitle: "确认删除该用户？",
      nzContent: "",
      nzOnOk: () => {
        this.userService.delete(id).subscribe(() => {
          this.messageService.success("删除成功！");
        });
      }
    });
  }

  editSubmit() {
    for (const key in this.editGroup.controls) {
      this.editGroup.controls[key].markAsDirty();
      this.editGroup.controls[key].updateValueAndValidity();
    }
    if (this.editGroup.valid) {
      let user = new User();
      user.avatar = this.editGroup.value['avatar'];
      user.userName = this.editGroup.value['userName'];
      user.name = this.editGroup.value['name'];
      user.phoneNumber = this.editGroup.value['phoneNumber'].toString();
      user.roleIds = (this.editGroup.value['roleIds']).filter((item: string) => item !== '').join(',');
      user.departmentId = this.editGroup.value['department'];
      user.positionIds = (this.editGroup.value['positions']).filter((item: string) => item !== '').join(',');
      user.sex = this.editGroup.value['sex'];
      user.isActive = this.editGroup.value['isActive'];
      if (this.editedUser.id && !this.isNewUser) {
        this.userService.update(user).subscribe(
          result => {
            this.messageService.success("更新用户成功");
            this.tplModal?.close();
            this.refresh();
          });
      }
      else {
        this.userService.add(user).subscribe(result => {
          this.messageService.success("修改用户成功");
          this.tplModal?.close();
          this.refresh();
        })
      }
    }
  }
  pwdSubmit() {
    for (const key in this.pwdGroup) {
      this.pwdGroup.controls[key].markAsDirty();
      this.pwdGroup.controls[key].updateValueAndValidity();
    }
    if (this.pwdGroup.valid) {
      this.userService.setPwd({
        id: this.pwdGroup.value["id"],
        password: this.pwdGroup.value["password"],
      }).subscribe(result => {
        this.tplModal?.close();
        this.messageService.success("修改成功");
      });
    }
  }
}
