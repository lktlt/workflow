import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UrlConfigService } from "../configs/url-config.service";

@Injectable(
  { providedIn: "root" }
)
export class DashboardService {
  constructor(
    private http: HttpClient,
    private urlConfig:UrlConfigService
  ) { }

  get() {
    return this.http.get(this.urlConfig.DashboardUri);
  }
}
