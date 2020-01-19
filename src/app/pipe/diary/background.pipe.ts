import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'background'})
export class BackgroundPipe implements PipeTransform {
  transform(url: string): object {
    return {background: 'url(\"' + url + '\") center/100%  no-repeat'};
  }
}
