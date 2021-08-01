import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class UrlConfigService {
  _apiUri = '';
  _baseUri = '';

  constructor(private http: HttpClient) { }

  init() {
    const envFile = `assets/config/env.json`;
    return new Promise<void>((resolve, reject) => {
      this.http.get(envFile).subscribe(
        (result: any) => {
          const configFile = `assets/config/config.${result["env"]}.json`;
          this.http.get(configFile).subscribe((urlObj: any) => {
            this._baseUri = urlObj["baseUrl"];
            this._apiUri = `${this._baseUri}/api`;
            resolve();
          },
          error => {
            console.error("无法读取配置文件！")
            reject();
          });
        },
        error => {
          console.log("无法读取环境配置文件",error);
          reject();
        }
      );
    });
  }

  get LoginUri(): string { return `${this._apiUri}/login` }

  get captchaUri(): string { return `${this._apiUri}/captcha`}

}
