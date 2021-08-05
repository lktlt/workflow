import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "gender"
})
export class GenderPipe implements PipeTransform {
  private genderMap: { [key: number]: string } = {
    0: '未知',
    1: '男',
    2: '女',
  };
  transform(value: any, ...args: any[]) {
    return this.genderMap[value];
  }

}
