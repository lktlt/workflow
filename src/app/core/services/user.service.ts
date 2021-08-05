import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UrlConfigService } from "../configs/url-config.service";
import { User } from "../../pages/system-manage/model/user";

export interface UserPassword {
  id?: number;
  password?: string;
}

@Injectable
  ({
    providedIn: 'root'
  })
export class UserService {
  constructor(
    private urlService: UrlConfigService,
    private http:HttpClient
  ) { }

  getUser(id:string|undefined) {
    return this.http.get(`${this.urlService.UserUri}?id=${id}`);
  }

  getUsers(page: any, size: any, department: any, userName: any, phoneNumber: any, name: any, roleid: any, position: any) {
    let uri = `${this.urlService.UserUri}/list?page=${page}&&size=${size}`;
    uri += department ? `&&department=${department}` : '';
    uri += userName ? `&&userName=${userName}` : '';
    uri += phoneNumber ? `&&phoneNumber=${phoneNumber}` : '';
    uri += name ? `&&name=${name}` : '';
    uri += roleid ? `&&roleid=${roleid}` : '';
    uri += position ? `&&position=${position}` : '';
    return this.http.get(uri);
  }

  getUserDic(name:string) {
    let uri = `${this.urlService.UserUri}/dic?name=${name}`;
    return this.http.get(uri);
  }

  delete(id: String) {
    return this.http.delete(`${this.urlService.UserUri}?id=${id}`);
  }

  update(user:User) {
    return this.http.patch(this.urlService.UserUri, user);
  }

  add(user:User) {
    return this.http.post(this.urlService.UserUri, user);
  }

  setPwd(model: UserPassword) {
    return this.http.post<UserPassword>(`${this.urlService.UserUri}/password`, model);
  }
}
