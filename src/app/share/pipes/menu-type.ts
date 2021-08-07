import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name:"menuType"
})
export class MenuTypePipe implements PipeTransform{
  private _menuTypeMap: { [key: number]: string } = {
    0: '未知',
    1: '菜单',
    2: '按钮',
    3: '链接'
  }
  transform(value: any, ...args: any[]) {
    return this._menuTypeMap[value];
  }

}
