import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CrudApiSService } from 'src/app/services/crud-api-s.service';
import { ModalApiComponent } from '../modal-api/modal-api.component';
import { map} from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'app-lista-personal',
  templateUrl: './lista-personal.component.html',
  styleUrls: ['./lista-personal.component.scss']
})
export class ListaPersonalComponent implements OnInit {

  displayedColumns: string[] = ['id', 'canonicalTitle', 'averageRating', 'episodeCount', 'editar', 'eliminar']; 
  dataSource = new MatTableDataSource<any>([]);  
  limit: any = 5;
  offset: any = 0;
  final: any = 5;
  total: any;
  myCart$:Observable<any>;
  myLP$:Observable<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;  

  ngAfterViewInit() {    
    this.dataSource.paginator = this.paginator;     
  }

  constructor(public crudApiService: CrudApiSService, public dialog: MatDialog) {} 

  ngOnInit(): void {    
    this.obtenerPersonaje();
  }

  obtenerPersonaje(){    
    this.myCart$= this.crudApiService.myCart$.pipe(map( (resp:any)=>{                                     
      this.total=resp.length;
      this.dataSource= resp.slice(this.offset, this.final);
      resp = this.dataSource;      
      const res: any= [];
      Object.keys(resp).forEach( key=>{
        const person: any= resp[key];
        person.idel = key;
        res.push(person);
      })                                          
      return res;
    }));        
  }

  OnPageActivated(event:PageEvent){
    this.crudApiService.paginarLista()        
    this.offset=(Number(event.pageIndex))* Number(event.pageSize);
    this.final= ((Number(event.pageIndex)+1)* Number(event.pageSize));      
    this.obtenerPersonaje();         
   }

  openDialog(idel:number) {
    this.dialog.open(ModalApiComponent); 
    this.crudApiService.verPersonaje(idel)      
  }

  eliminarDeLalista(i:number){        
    this.crudApiService.eliminarDeLista(i);
    this.obtenerPersonaje();    
  }

}
