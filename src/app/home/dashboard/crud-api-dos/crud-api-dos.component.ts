import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrudApiSService } from 'src/app/services/crud-api-s.service';
@Component({
  selector: 'app-crud-api-dos',
  templateUrl: './crud-api-dos.component.html',
  styleUrls: ['./crud-api-dos.component.scss']
})

export class CrudApiDosComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'canonicalTitle', 'averageRating', 'episodeCount']; 
  dataSource = new MatTableDataSource<any>([]);   
  limit: any = 20;
  offset: any = 0;
  total: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public crudApiService: CrudApiSService) {
     
   }
  ngOnInit(): void {
     this.crudApiService.datosApi(this.limit, this.offset).subscribe(resp =>{      
       console.log(resp);
       this.dataSource=resp.data;
       console.log(this.dataSource);
       this.total=resp.meta.count;
       console.log(this.total);
      //  if (resp.pagination.last_visible_page>0){
      //    
      //    this.sort.active,
      //    this.sort.direction,
      //    this.paginator.pageIndex;
      //    this.resultsLength = resp.pagination.last_visible_page;      
      //  }      
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
}
