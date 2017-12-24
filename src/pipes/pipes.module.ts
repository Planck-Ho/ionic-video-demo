import { NgModule } from '@angular/core';
import { FormatNumPipe } from './format-num/format-num';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [FormatNumPipe],
	imports: [
		CommonModule
	],
	exports: [FormatNumPipe]
})
export class PipesModule {}
