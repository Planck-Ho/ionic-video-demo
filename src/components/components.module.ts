import { NgModule } from '@angular/core';
import { GoodVideoComponent } from './good-video/good-video';
import { IonicModule } from 'ionic-angular';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
	declarations: [
		GoodVideoComponent
	],
	imports: [
		PipesModule,
		IonicModule
	],
	exports: [
		PipesModule,
		GoodVideoComponent
	]
})
export class ComponentsModule { }
