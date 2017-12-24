import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FormatNumPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'formatNum',
})
export class FormatNumPipe implements PipeTransform {

  transform(value: number): string {

    console.log(value);
    

    if (!value) return `0:00`;

    const s = Math.ceil(value % 60) < 10 ? `0${Math.ceil(value % 60)}`: Math.ceil(value % 60) ;

    return `${Math.floor(value / 60)}:${s}`;

  }
}
