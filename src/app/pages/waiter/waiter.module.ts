import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaiterPageRoutingModule } from './waiter-routing.module';

import { WaiterPage } from './waiter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaiterPageRoutingModule
  ],
  declarations: [WaiterPage]
})
export class WaiterPageModule {}
