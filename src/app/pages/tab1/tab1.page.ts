import { Component, OnInit } from '@angular/core';

import { LoadingController } from '@ionic/angular';

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
  loading: HTMLIonLoadingElement;

  constructor(private reportService: InformesService, public loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.getReportTotalByCamarero();
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({      
      message,
    });
    await this.loading.present();
  }

  async getReportTotalByCamarero() {
    await this.presentLoading('Se está cargando el reporte');
    this.reportService.getTotalesByCamarero()
    .subscribe(resp => {
      this.loading.dismiss();
      if (resp['IsSuccess']) {
        this.rptTotales.push(...resp['Data']);
      }
    }, err=>{
      this.loading.dismiss();
    });
  }

  onSearchChange(event){
    this.filter = event.detail.value;
    //this.rptTotales.filter(x => x.Nombre = )
  }
}
