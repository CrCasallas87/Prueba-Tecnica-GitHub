import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CrudApiSService } from 'src/app/services/crud-api-s.service';
@Component({
  selector: 'app-crud-api-dos',
  templateUrl: './crud-api-dos.component.html',
  styleUrls: ['./crud-api-dos.component.scss']
})

export class CrudApiDosComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'canonicalTitle', 'averageRating', 'episodeCount', 'agregar']; 
  dataSource = new MatTableDataSource<any>([]);
  info:any={};
  infoAlmacenada:any={}
  InfoListaPersonalTotal:any[]=[]
  limit: any = 10;
  offset: any = 0;
  total: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public crudApiService: CrudApiSService, public dialog: MatDialog) {}

  ngOnInit(): void {
     this.crudApiService.datosApi(this.limit, this.offset).subscribe(resp =>{      
       console.log(resp);
       this.dataSource=resp.data;
       this.dataSource                 
       console.log(this.dataSource);
       this.total=resp.meta.count;
       console.log(this.total);          
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

  seleccionar(ide:number){
    this.crudApiService.datosApiUni(ide)
    .subscribe((resp:any)=>{
      this.info= resp;      
      if (typeof(Storage)!=='undefined'){      
        localStorage.setItem("infou", JSON.stringify(this.info));
        this.infoAlmacenada=JSON.parse(localStorage.getItem("infou"));        
        const infoListaPersonal:any ={
          id:this.infoAlmacenada.data.id,
          canonicalTitle:this.infoAlmacenada.data.attributes.canonicalTitle,
          averageRating:this.infoAlmacenada.data.attributes.averageRating,
          episodeCount:this.infoAlmacenada.data.attributes.episodeCount
        }
        this.crudApiService.agregarALista(infoListaPersonal);
        // console.log(infoListaPersonal);
        this.InfoListaPersonalTotal.push(infoListaPersonal);
        // console.log(this.InfoListaPersonalTotal);
        this.crudApiService.disparador.emit({
          data:this.InfoListaPersonalTotal
        })   
      }else{
        alert("storage no es compatible en este navegador")
      }    
    })     
  }
}
