import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ClienteModel } from 'src/app/models/cliente.model';
import { TotalesByCamareroModel } from 'src/app/models/totalesbycamarero.model';
import { InformesService } from 'src/app/services/informes.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  loading: HTMLIonLoadingElement;
  rptCustomer: ClienteModel[] = [];
  filter: string = '';

  constructor(private reportService: InformesService, public loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.getClientesMayorCompra();
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({      
      message,
    });
    await this.loading.present();
  }

  async getClientesMayorCompra() {    
    await this.presentLoading('Se está cargando el reporte');
    this.reportService.getClientesMayorCompra()
    .subscribe(resp => {      
      this.loading.dismiss();
      if (resp['IsSuccess']) {
        this.rptCustomer = [];
        this.rptCustomer.push(...resp['Data']);
      }
    }, err=>{
      this.loading.dismiss();
    });
  }

  onSearchChange(event){
    this.filter = event.detail.value;
  }

}
