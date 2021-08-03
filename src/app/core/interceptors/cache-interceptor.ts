import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { CacheService } from "../services/cache.service";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class CacheInterceptor implements HttpInterceptor {
  constructor(private cacheService: CacheService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var userCache = req.params.get('useCache');
    if (userCache === 'use') {
      var cacheResponse = this.cacheService.getObject(req.url);
      if (cacheResponse != null) {
        return of(cacheResponse); // 
      } else {
        return next.handle(req).pipe(
          tap(
            event => {
              if (event instanceof HttpResponse) {
                this.cacheService.setObject(req.url, event);
              }
            }
          )
        );
      }
    }
    return next.handle(req);
  }
}
