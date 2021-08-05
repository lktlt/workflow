import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UrlConfigService } from "../configs/url-config.service";
import {  Role} from "../../pages/system-manage/model/role";

@Injectable
  ({
    providedIn: 'root'
  })
export class RoleService {
  constructor(
    private urlService: UrlConfigService,
    private http:HttpClient
  ) { }

  getRoleList() {
    return this.http.get(`${this.urlService.RoleUri}/nameList`);
  }
  getRole(id:string) {
    return this.http.get(`${this.urlService.RoleUri}?id=${id}`);
  }
  getRoles(name: string, page: number, size: number) {
    let url = `${this.urlService.RoleUri}/list`;
    if (name) {
      url += `?name=${name}&&page=${page}&&size=${size}`;
    } else {
      url += `?page=${page}&&size=${size}`;
    }
    return this.http.get(url);
  }
  deleteRole(name:string) {
    return this.http.delete(`${this.urlService.RoleUri}?name=${name}`);
  }
  addRole(role:Role) {
    return this.http.post(this.urlService.RoleUri,role);
  }
  updataRole(role:Role) {
    return this.http.patch(this.urlService.RoleUri,role);
  }
}
