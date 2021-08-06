import { ReturnStatement } from '@angular/compiler';
import { Component, ElementRef, forwardRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-avatar-select',
  templateUrl: './avatar-select.component.html',
  styleUrls: ['./avatar-select.component.less'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AvatarSelectComponent),
    multi: true
  }]
})
export class AvatarSelectComponent implements OnInit {
  // static:true: 则在变更检测运行之前解析查询结果,不允许从动态模板中获取(*ngIf标志)中获取元素或指令
  @ViewChild("avatarSelectTpl", {static:true}) avatarSelectTpl!:TemplateRef<any>;
  @ViewChild("avatarFooterTpl", {static:true}) avatarFooterTpl!:TemplateRef<any>;
  @ViewChild("input", {read:ElementRef ,static:true}) inputElementRef!:ElementRef;

  avatarList: string[] = [];
  selectedAvatar!: string;
  modalRef: NzModalRef | undefined;

  onTouched = (_:any) => { };
  onChange = (_:any) => { };

  constructor(
    private modalService: NzModalService,
    private render2:Renderer2
  ) { }

  ngOnInit(): void {
    for (let i = 0; i < 33; i++) {
      this.avatarList.push(i.toString());
    }
  }
  getImgUrl(name:string) {
    return `assets/avatars/${name}.png`;
  }
  selectAvatar(name:string) {
    this.selectedAvatar = name;
  }
  showAvatarModal() {
    this.modalRef= this.modalService.create({
      nzTitle: "请选择头像",
      nzContent: this.avatarSelectTpl,
      nzFooter:this.avatarFooterTpl,
    });
  }
  confirm() {
    this.modalRef?.close();
    this.writeValue(this.selectedAvatar);

  }
  // 任何 FormControl 显式调用 API 的值操作都将调用自定义表单控件的 writeValue() 方法，并将新值作为参数传入
  //  设置原生表单控件的值 数据流向是从 Angular form ➡️ Native form
  writeValue(obj: string) {
    this.selectedAvatar = obj;
    this.render2.setProperty(this.inputElementRef.nativeElement, "value", this.selectedAvatar);
    this.onChange(this.selectedAvatar);
  }
  // 当控件内表单数据存在变化、需要通知控件的调用方所用到的一个 API
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  // 该函数用于通知表单控件已经处于 touched 状态，以更新绑定的 FormContorl 的内部状态
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  // 当表单状态变为 DISABLED 或从 DISABLED 变更时，
  // 表单 API 会调用 setDisabledState() 方法，以启用或禁用对应的 DOM 元素
  setDisabledState?(isDisabled: boolean): void {
    this.render2.setProperty(this.inputElementRef.nativeElement, 'disabled', isDisabled);
  }
}
