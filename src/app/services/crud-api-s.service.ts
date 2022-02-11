import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CrudApiSService {

  myList: any[] = [];
  myCart = new BehaviorSubject<any[]>([]);
  myCart$ = this.myCart.asObservable();
  @Output() disparador = new EventEmitter<any>();  
  url = 'https://kitsu.io/api/edge/anime';  

  constructor(private http: HttpClient) { }

  datosApi (limit:any, offset:any){
    return this.http.get<any>(`${this.url}?page%5Blimit%5D=${limit}&page%5Boffset%5D=${offset}`)
  }
  datosApiUni (ide:number){
    return this.http.get(`${this.url}/${ide}`)
  }

  agregarALista(personaje:any){
    this.myList.push(personaje);
    this.myCart.next(this.myList);
  }


}
