import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { SafariViewController } from '@ionic-native/safari-view-controller';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
  providers:[
    SafariViewController
  ]
})
export class HomePageModule {}
