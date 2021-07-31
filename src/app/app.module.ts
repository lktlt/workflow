import { NgModule,APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountModule } from "./pages/account/account.module";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule ,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UrlConfigService } from "./core/configs/url-config.service";
import { NotfoundComponent } from './pages/notfound/notfound.component';

registerLocaleData(zh);

export function initializeApp(uriConfig:UrlConfigService) {
  return ()=> uriConfig.init(); // 返回方法
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    UrlConfigService,
    // 执行指定的promise，程序会阻塞直到promise resolve
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [UrlConfigService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
