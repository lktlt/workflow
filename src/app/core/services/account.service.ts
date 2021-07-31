import { Injectable } from '@angular/core';
import { UrlConfigService } from "../configs/url-config.service";
import { HttpClient } from "@angular/common/http";

export interface CptchaResult {
  captchaKey: string;
  captchaData: string;
}
export interface LoginResult {
  name: string;
  avatar: string;
  token: string;
  identification: string;
  routes: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private urlConfig: UrlConfigService, private http: HttpClient) { }
  // headers = {
  //   headers: new HttpHeaders({
  //     'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8"
  //   })
  // }
  getCaptcha() {
    console.log(this.urlConfig.captchaUri);
    return this.http.get<CptchaResult>(this.urlConfig.captchaUri);
  }

  login(userName: string, pwd: string, captchaKey: string, captchaValue: string) {
    console.log("--------------");
    console.log(this.urlConfig.LoginUri);
    console.log({
      "name": userName, "PassWord": pwd, "CaptchaKey": captchaKey, "CaptchaValue": captchaValue
    });

    return this.http.post<LoginResult>(this.urlConfig.LoginUri,
      {
        "name": userName, "PassWord": pwd, "CaptchaKey": captchaKey, "CaptchaValue": captchaValue
      })
  }
}
