import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CrudApiSService } from 'src/app/services/crud-api-s.service';

@Component({
  selector: 'app-modal-api',
  templateUrl: './modal-api.component.html',
  styleUrls: ['./modal-api.component.scss']
})
export class ModalApiComponent implements OnInit {

  formulario:FormGroup = this.fb.group({
    canonicalTitle: ['', [Validators.required]],
    averageRating: ['', [Validators.required]],
    episodeCount: ['', [Validators.required]],
  })

  constructor(private fb: FormBuilder, public crudApiService: CrudApiSService) { }

  myCart$:Observable<any>;
  lista:any=[]
  idel:any={};

  

  ngOnInit(): void {    
    this.obtenerPersonaje();
  }

  obtenerPersonaje(){
    this.myCart$= this.crudApiService.myCart$.pipe(map( (resp:any)=>{      
      const res: any= [];
      Object.keys(resp).forEach( key=>{
        const person: any= resp[key];
        person.idel = key;
        res.push(person);
      })
      return res;                  
    }));    
  }

  aceptar(){
    
  }
}
