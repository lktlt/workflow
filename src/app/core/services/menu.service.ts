import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UrlConfigService } from "../configs/url-config.service";

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

  update(menu:string) {
    return this.http.patch(this.urlConfig.MenuUri, menu);
  }

  add(menu:string) {
    return this.http.post(this.urlConfig.MenuUri, menu);
  }
}
