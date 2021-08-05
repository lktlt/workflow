import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UrlConfigService } from "../configs/url-config.service";
import { Position} from "../../pages/group-manage/model/position";

@Injectable
  ({
    providedIn: 'root'
  })
export class PositionService {
  constructor(private httpClient: HttpClient,
    private uriService: UrlConfigService) { }

  get(page:number, size:number) {
    var uri = `${this.uriService.PositiondUri}/list?page=${page}&&size=${size}`;
    return this.httpClient.get(uri);
  }
  getAll() {
    return this.httpClient.get(`${this.uriService.PositiondUri}/all`);
  }
  getPosition(id: any) {
    return this.httpClient.get(`${this.uriService.PositiondUri}?id=${id}`);
  }
  delete(id: any) {
    return this.httpClient.delete(`${this.uriService.PositiondUri}?id=${id}`);
  }
  update(position:Position) {
    return this.httpClient.patch(this.uriService.PositiondUri, position);
  }
  add(position:Position) {
    return this.httpClient.post(this.uriService.PositiondUri, position);
  }
  getDic(name:string) {
    let uri = `${this.uriService.PositiondUri}/dic?name=${name}`;
    return this.httpClient.get(uri);
  }
}
