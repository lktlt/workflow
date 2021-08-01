import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SafeUrl,DomSanitizer } from "@angular/platform-browser";
import { AccountService } from "../../../core/services/account.service";
import { Router } from "@angular/router";
import { StorageService } from "../../../core/services/storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  myGroup!: FormGroup;
  captch: SafeUrl | undefined;
  captchaKey = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private sanitizer: DomSanitizer,// dom上下文消毒之后可以安全的使用，防跨站脚本攻击
    private router: Router,
    private storageService:StorageService) { }

  ngOnInit(): void {
    this.myGroup = this.fb.group({
      username: [null, [Validators.required]],
      pwd: [null, [Validators.required]],
      captchaValue: [null, [Validators.required]],
      remember:[true]
    });
    this.refreshCaptcha();
  }
  refreshCaptcha() {
    this.accountService.getCaptcha().subscribe(data => {
      this.captchaKey = data.captchaKey;
      this.captch = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,${data.captchaData}`);
    },
      error => console.log(error)
    );
  }
  submitForm() {
    console.log(this.myGroup);
    for (const key in this.myGroup.controls) {
      this.myGroup.controls[key].markAsDirty();
     this.myGroup.controls[key].updateValueAndValidity();
    }
    if (this.myGroup.valid) {
      this.isLoading = true;
      this.accountService.login(
        this.myGroup.controls['username'].value,
        this.myGroup.controls['pwd'].value,
        this.captchaKey,
        this.myGroup.controls['captchaValue'].value,
      ).subscribe(
        result => {
          console.log("登录成功",result);
          this.storageService.userToken = result.token;
          this.storageService.Name = result.name;
          this.storageService.Avatar = result.avatar;
          this.storageService.Identifycation = result.identification;
          this.storageService.Route = result.routes;
          this.router.navigate(['notfound']);
          // console.log(this.storageService);
        },
        error => {
          console.log("登录失败",error);
          this.myGroup.controls["pwd"].reset();
          this.myGroup.controls["captchaValue"].reset();
          this.refreshCaptcha();
          this.isLoading = false;
        }
      )
     }
  }
}
