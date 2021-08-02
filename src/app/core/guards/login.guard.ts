import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from "../services/storage.service"
import {Router } from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.storageService.hasUserToken() || this.storageService.isExpiration) {
      this.storageService.removeUserToken();
      this.router.navigate(['/account/login']);
      return false;
    }
    return true;
  }
}
