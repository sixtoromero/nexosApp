import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CamareroModel } from 'src/app/models/camarero.model';
import { WaiterService } from 'src/app/services/waiter.service';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.page.html',
  styleUrls: ['./waiter.page.scss'],
})
export class WaiterPage implements OnInit {

  

  public regForm: FormGroup  = new FormGroup({});  

  loading: HTMLIonLoadingElement;

  constructor(
    private _service: WaiterService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController, 
    private modalCtrl: ModalController,
    private fb: FormBuilder) { 
    this.regForm = this.fb.group({    
      IdCamarero: ['0', Validators.required],
      Nombre: ['', Validators.required],
      Apellido1: ['', Validators.required],
      Apellido2: ['', Validators.required]
    });
  }

  get f() {
    return this.regForm.controls;
  }

  ngOnInit() {
  }

  async registro() {
    await this.presentLoading('Se está registrando el camarero');
    const model = this.prepareSave();    
    this._service.insert(model)    
    .subscribe(response => {
      if (response["IsSuccess"]){
        this.loading.dismiss();
        this.regForm.reset();
        this.modalCtrl.dismiss({
          ModalProcess: true
        });
      } else {        
        this.presentToastWithOptions(`Ha ocurrido un error inesperado: ${response["Message"]}`);
      }
    }, error => {
      this.loading.dismiss();
      this.presentToastWithOptions('Ha ocurrido un error inesperado.');
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async presentToastWithOptions(message: string) {
    const toast = await this.toastCtrl.create({
      header: 'Camarero',
      message,
      position: 'top',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({      
      message,
    });
    await this.loading.present();
  }

  private prepareSave(): CamareroModel {
    return new CamareroModel().deserialize(this.regForm.value);
  }

}
