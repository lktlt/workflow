import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ShowErrorService } from "../services/show-error.service";
import { NzMessageService } from "ng-zorro-antd/message";

@Injectable()
export class ErrorHandlerInceptor implements HttpInterceptor{
  constructor(
    private showErrorService: ShowErrorService,
    // messageService: NzMessageService
  ) {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (event:HttpEvent<any>) => {
          // console.log(event);
         },
        (errorRes:HttpErrorResponse) => {
          console.log("错误信息",errorRes);
          let msg = '';
          console.log(errorRes['error']);
          for (var key in errorRes['error']) {
            msg += errorRes.error[key];
          }
          this.showErrorService.PublishError(msg);
        }
      )
    );
  }

}


