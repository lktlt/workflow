import { Injectable } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Injectable
  ({ providedIn: 'root' })
export class ShowErrorService {
  
  private errorMessageSource = new Subject<string>();
  private missionAnnounced$ = this.errorMessageSource.asObservable();

  constructor(private messageService: NzMessageService) {
    this.missionAnnounced$.pipe(debounceTime(800)).subscribe(msg=>this.messageService.error(msg));
  }
  PublishError(msg:string) {
    this.errorMessageSource.next(msg); // subject对象作为observer，发送消息
  }
}
