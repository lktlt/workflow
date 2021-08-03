import { Injectable } from "@angular/core";

@Injectable(
  {providedIn:"root"}
)
export class CacheService{
  constructor() {
    if (localStorage.getItem('cacheMaxCount')) {
      localStorage.setItem('cacheMaxCount','100') ;
    }
  }
  setObject(key:string,value:any) {
    key = 'cache' + key;
    this.setKeyList(key);
    localStorage[key] = JSON.stringify(value);
  }
  getObject(key: string) {
    key = 'cache:' + key;
    return JSON.parse(localStorage[key] || '{}');
  }
  private setKeyList(key: string) {
    var keys = localStorage.getItem('cacheKeys');
    var keyArray = keys?keys.split(','):[];
    keyArray.push(key);

    var maxcount = Number(localStorage.getItem('cacheMaxCount'));
    while (keyArray.length > maxcount) {
      keyArray.pop();
    }
    var newKeys = keyArray.join(',');
    localStorage.setItem('cacheKeys', newKeys);
  }
 }
