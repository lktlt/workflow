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
          console.log("无法读取环境配置文件", error);
          reject();
        }
      );
    });
  }

  get LoginUri(): string { return `${this._apiUri}/login` }

  get captchaUri(): string { return `${this._apiUri}/captcha` }

  get ModifySelfPasswordUri(): string { return `${this._apiUri}/password` };
  
  get RoleUri(): string { return `${this._apiUri}/role` };

  get UserUri(): string { return `${this._apiUri}/user` };

  get MenuUri(): string { return `${this._apiUri}/menu` };

  get TenantUri(): string { return `${this._apiUri}/tenant` };

  get DashboardUri(): string { return `${this._apiUri}/dashboard` };

  get PositiondUri(): string { return `${this._apiUri}/position` };

  get DepartmentUri(): string { return `${this._apiUri}/department` };

  get EmployeeUri(): string { return `${this._apiUri}/employee` };

  get FileUri(): string { return `${this._apiUri}/file` };

  get FolderUri(): string { return `${this._apiUri}/folder` };

  get ColumnUri(): string { return `${this._apiUri}/column` };

  get ArticleUri(): string { return `${this._apiUri}/article` };

  get DicDataUri(): string { return `${this._apiUri}/dicData` };

  get DicTypeUri(): string { return `${this._apiUri}/dicType` };

  get WorkFlowGroupUri(): string { return `${this._apiUri}/workflowGroup` };

  get WorkFlowUri(): string { return `${this._apiUri}/workflow` };

  get WorkFlowFlowUri(): string { return `${this._apiUri}/workflowFlow` };

  get WorkFlowFormUri(): string { return `${this._apiUri}/workflowForm` };

  get WorkFlowInstanceUri(): string { return `${this._apiUri}/workflowInstance` };

  get OperateLogSettingUri(): string { return `${this._apiUri}/operateLogSetting` };

  get OperateLogDetailUri(): string { return `${this._apiUri}/operateLogDetail` };

  get LoginLogUri(): string { return `${this._apiUri}/loginLog` };
}
