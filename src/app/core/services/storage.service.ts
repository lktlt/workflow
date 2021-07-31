import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable(
  { providedIn: 'root' }
)
export class StorageService {
  jwtService = new JwtHelperService();

  set userToken(value:string) {
    let expirationDate = this.jwtService.getTokenExpirationDate(value);
    let decodeToken = this.jwtService.decodeToken(value);

    localStorage.setItem('userToken', value);
    localStorage.setItem("userroles", decodeToken['userroleids']);
    localStorage.setItem("username", decodeToken['username']);
    localStorage.setItem('userTokenExpiration', expirationDate?.toString()||'');
  }
  get Name() {
    return localStorage.getItem("name");
  }
  set Name(value) {
    localStorage.setItem("name", value||'');
  }
  get userToken() {
    return localStorage.getItem('userToken')||'';
  }
  get Avatar() {
    return localStorage.getItem("avatar");
  }
  set Avatar(value) {
    localStorage.setItem("avatar", value||'');
  }

  get Identifycation() {
    return localStorage.getItem("identifycation");
  }
  set Identifycation(value) {
    localStorage.setItem("identifycation", value||'');
  }
  get Route() {
    return localStorage.getItem("route");
  }
  set Route(value) {
    localStorage.setItem("route", value||'');
  }

}
