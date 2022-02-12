import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CrudApiSService } from 'src/app/services/crud-api-s.service';
import { ModalApiComponent } from '../modal-api/modal-api.component';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-lista-personal',
  templateUrl: './lista-personal.component.html',
  styleUrls: ['./lista-personal.component.scss']
})
export class ListaPersonalComponent implements OnInit {

  displayedColumns: string[] = ['id', 'canonicalTitle', 'averageRating', 'episodeCount', 'editar', 'eliminar']; 
  dataSource = new MatTableDataSource<any>([]);  
  info:any={};
  limit: any = 10;
  offset: any = 0;
  total: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;  

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  constructor(public crudApiService: CrudApiSService, public dialog: MatDialog) {
    
   }
  myCart$:Observable<any>;
  listaunidad:any ={};
  

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
    console.log(this.myCart$);    
  }

  OnPageActivated(event:any){
    this.limit=event.pageSize;
    this.offset=(Number(event.pageIndex))* Number(event.pageSize);

    console.log('limit',this.limit,'offset',this.offset);

    this.crudApiService.datosApi(this.limit,this.offset).subscribe(resp=>{
      this.dataSource=resp.data;
      this.total=resp.meta.count;
    })    
  }

  openDialog(idel:number) {
    // this.dialog.open(ModalApiComponent);
    this.crudApiService.verlista(idel)
    this.myCart$.subscribe(resp =>{
      this.listaunidad=resp;
      console.log(this.listaunidad);
      const listado:any = {
        canonicalTitle: this.listaunidad[idel].canonicalTitle,
        averageRating: this.listaunidad[idel].averageRating,
        episodeCount: this.listaunidad[idel].episodeCount
      }
      console.log(listado);
    })
  }

  eliminarDeLalista(i:number){
    this.crudApiService.eliminarDeLista(i);
  }

}
