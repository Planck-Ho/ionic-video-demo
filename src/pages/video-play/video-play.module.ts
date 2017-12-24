import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoPlayPage } from './video-play';
import { PipesModule } from '../../pipes/pipes.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation';


@NgModule({
  declarations: [
    VideoPlayPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(VideoPlayPage)
  ],
  providers:[
    ScreenOrientation
  ]
})
export class VideoPlayPageModule {}
