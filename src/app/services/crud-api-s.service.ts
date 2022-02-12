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
  url = 'https://kitsu.io/api/edge/anime';
  listaUnidadS:any={}  

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

  eliminarDeLista(i:number){
    delete this.myList[i];
    this.myList.splice(i,1);    
    this.myCart.next(this.myList);    
    console.log(i);    
  }

  verlista(i:number){            
    const listaUnidad: any ={
      canonicalTitle: this.myList[i].canonicalTitle,
      averageRating: this.myList[i].averageRating,
      episodeCount: this.myList[i].episodeCount
    }
    this.myCart.next(this.myList);
  }


}
