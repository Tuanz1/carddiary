import {Pipe, PipeTransform} from '@angular/core';

/**
 * 采用阿里云重新获取处理后的图片链接得到背景
 */
@Pipe({name: 'background'})
export class BackgroundPipe implements PipeTransform {
  transform(url: string): object {
    return {
      background: 'url(\"' + url + '\") center/100%  no-repeat'
    }
  }
}
