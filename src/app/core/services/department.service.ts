import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { UrlConfigService } from "../configs/url-config.service";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private http: HttpClient,
    private urlConfig: UrlConfigService) { }

  get(id:string) {
    return this.http.get(`${this.urlConfig.DepartmentUri}?id=${id}`);
  }
  getAll() {
    return this.http.get(`${this.urlConfig.DepartmentUri}/all`);
  }
  delete(id:string) {
    return this.http.delete(`${this.urlConfig.DepartmentUri}?id=${id}`);
  }

  update(department: any) {
    return this.http.patch(this.urlConfig.DepartmentUri, department);
  }

  add(department: any) {
    return this.http.post(this.urlConfig.DepartmentUri, department);
  }

  getDic(name: any) {
    return this.http.get(`${this.urlConfig.DepartmentUri}/dic?name=${name}`);
  }
}
