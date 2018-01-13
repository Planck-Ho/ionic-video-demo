import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { SafariViewController } from '@ionic-native/safari-view-controller';
import { ComponentsModule } from '../../components/components.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(HomePage),
  ],
  providers:[
    SafariViewController,
    ScreenOrientation
  ]
})
export class HomePageModule {}
