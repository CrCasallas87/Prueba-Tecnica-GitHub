import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudApiSService {

  
  url = 'https://kitsu.io/api/edge/anime';  

  constructor(private http: HttpClient) { }

  datosApi (limit:any, offset:any){
    return this.http.get<any>(`${this.url}?page%5Blimit%5D=${limit}&page%5Boffset%5D=${offset}`);
  //  return this.http.get<any>(`${this.url}`);
  }
}
