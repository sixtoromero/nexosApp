import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { WaiterPageRoutingModule } from './waiter-routing.module';

import { WaiterPage } from './waiter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WaiterPageRoutingModule
  ],
  declarations: [WaiterPage]
})
export class WaiterPageModule {}
