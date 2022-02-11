import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CrudApiSService } from 'src/app/services/crud-api-s.service';
import { ModalApiComponent } from '../modal-api/modal-api.component';

@Component({
  selector: 'app-lista-personal',
  templateUrl: './lista-personal.component.html',
  styleUrls: ['./lista-personal.component.scss']
})
export class ListaPersonalComponent implements OnInit {

  displayedColumns: string[] = ['id', 'canonicalTitle', 'averageRating', 'episodeCount', 'editar', 'eliminar']; 
  dataSource = new MatTableDataSource<any>([]);
  datalink:any[]=[];
  info:any={};
  limit: any = 10;
  offset: any = 0;
  total: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;  

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  constructor(public crudApiService: CrudApiSService, public dialog: MatDialog) {
    this.obtenerPersonaje()
  }
  myCart$= this.crudApiService.myCart$; 

  ngOnInit(): void {

     this.crudApiService.datosApi(this.limit, this.offset).subscribe(resp =>{             
       this.dataSource=resp.data;
       this.dataSource                        
       this.total=resp.meta.count;         
     })
  }

  obtenerPersonaje(){
    this.crudApiService.disparador.subscribe(data => {
      console.log('recibiendo data',data);
      this.datalink.push(data);
      console.log(this.datalink);
    })
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

  openDialog() {
    this.dialog.open(ModalApiComponent);
  } 

}
