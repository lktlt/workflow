import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UrlConfigService } from "../configs/url-config.service";
import { Menu } from "src/app/pages/system-manage/model/menu";

@Injectable
  (
    {providedIn:'root'}
)
export class MenuService{
  constructor(
    private http: HttpClient,
    private urlConfig: UrlConfigService) { }

  get() {
    return this.http.get(this.urlConfig.MenuUri);
  }

  delete(id:string) {
    return this.http.delete(`${this.urlConfig.MenuUri}?id=${id}`);
  }

  update(menu:Menu) {
    return this.http.patch(this.urlConfig.MenuUri, menu);
  }

  add(menu:Menu) {
    return this.http.post(this.urlConfig.MenuUri, menu);
  }
}
