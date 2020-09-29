import { Component, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/models/cliente.model';
import { TotalesByCamareroModel } from 'src/app/models/totalesbycamarero.model';
import { InformesService } from 'src/app/services/informes.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  rptCustomer: ClienteModel[] = [];
  filter: string = '';

  constructor(private reportService: InformesService) {}

  ngOnInit() {
    this.getClientesMayorCompra();
  }

  getClientesMayorCompra() {    
    this.reportService.getClientesMayorCompra()
    .subscribe(resp => {      
      if (resp['IsSuccess']) {
        this.rptCustomer.push(...resp['Data']);
      }
    });
  }

  onSearchChange(event){
    this.filter = event.detail.value;
  }

}
