import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonList, LoadingController, ModalController, ToastController } from '@ionic/angular';

import { CamareroModel } from 'src/app/models/camarero.model';
import { ClienteModel } from 'src/app/models/cliente.model';
import { InformesService } from 'src/app/services/informes.service';
import { WaiterService } from 'src/app/services/waiter.service';
import { WaiterPage } from '../waiter/waiter.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  loading: HTMLIonLoadingElement;
  lstCamarero: CamareroModel[] = [];
  
  @ViewChild(IonList) ionList: IonList;

  constructor(
    private reportService: InformesService, 
    private loadingCtrl: LoadingController, 
    private toastController: ToastController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private waiterService: WaiterService) {}

  ngOnInit() {
    this.getWaiterAll();
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({      
      message,
    });
    await this.loading.present();
  }

  async getWaiterAll() {
    await this.presentLoading('Se está cargando el reporte');
    this.reportService.getWaiterAll()
    .subscribe(resp => {
      this.loading.dismiss();
      if (resp['IsSuccess']) {
        this.lstCamarero = [];
        this.lstCamarero.push(...resp['Data']);
      }
    }, err=>{
      this.loading.dismiss();
    });
  }  

  update(item: CamareroModel) {
    console.log('update', item);
    this.ionList.closeSlidingItems();
  }

  async delete(id: number) {    
    this.ionList.closeSlidingItems();
    await this.presentLoading('Eliminando registro.');
    this.waiterService.delete(id)
    .subscribe(resp => {
      this.loading.dismiss();
      console.log(resp);
      if (resp['IsSuccess']) {
        this.getWaiterAll();
      } else {
        this.presentToast(resp['Message']);
      }
    }, err=>{
      this.loading.dismiss();
      this.presentToast('El Camarero tiene facturas asociadas');
      this.presentToastWithOptions('Camarero', 'El camarero a eliminar tiene asociado facturas.');
    });
  }

  async presentAlert(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'La MC',
      subHeader: 'Eliminar registro',
      message: '¿Desea eliminar el registro seleccionado?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.ionList.closeSlidingItems();
          }
        },
        {
            text: 'Aceptar',
            handler: (blah) => {
              this.delete(id);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async presentToastWithOptions(header: string, message: string) {
    const toast = await this.toastController.create({
      header,
      message,
      position: 'top',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async modalCreate() {
    
    const modal = await this.modalCtrl.create({
      component: WaiterPage,
      componentProps: {
        title: 'Crear Microempresa'
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();    

    if (data) {
      if (data["ModalProcess"]) {
        this.getWaiterAll();
      }
    }
  }

}
