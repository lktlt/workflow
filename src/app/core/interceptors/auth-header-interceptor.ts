import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { StorageService } from "../services/storage.service";

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) { }
  // jwt认证方法，保存在localstorage中，发送请求时，请求头中添加认证项
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // 修改请求头副本
    const token = "Bearer" + this.storageService.userToken;
    const authReq = req.clone({ setHeaders: { "Authorization": token } });
    return next.handle(authReq);
  }
}
