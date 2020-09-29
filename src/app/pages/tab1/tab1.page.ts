import { Component, OnInit } from '@angular/core';
import { TotalesByCamareroModel } from 'src/app/models/totalesbycamarero.model';
import { InformesService } from 'src/app/services/informes.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  rptTotales: TotalesByCamareroModel[] = [];
  filter: string = '';

  constructor(private reportService: InformesService) {}

  ngOnInit() {
    this.getReportTotalByCamarero();
  }

  getReportTotalByCamarero() {
    this.reportService.getTotalesByCamarero()
    .subscribe(resp => {
      console.log(resp['IsSuccess']);
      if (resp['IsSuccess']) {
        this.rptTotales.push(...resp['Data']);
      }
    });
  }

  onSearchChange(event){
    this.filter = event.detail.value;
    //this.rptTotales.filter(x => x.Nombre = )
  }
}
