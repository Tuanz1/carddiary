import {Pipe, PipeTransform} from '@angular/core';
/**
 * 取消签名等参数，读取文件，然后直接访问
 */
@Pipe({name: 'oss'})
export class OssPipe implements PipeTransform {
  transform(name: string, type?: string): string {
    if (type == 'origin') return name;
    if (name == null) {
      // 此处应该返回一个默认链接
      return '';
    }
    let process = '';
    switch (type) {
      case 'rec400':
        process =
            'image/auto-orient,1/interlace,1/resize,m_fill,w_400,h_400/quality,q_90';
        break;
      case 'rec200':
        process =
            'image/auto-orient,1/interlace,1/resize,m_fill,w_200,h_200/quality,q_100';
        break;
      case 'rec100':
        process =
            'image/auto-orient,1/interlace,1/resize,m_fill,w_100,h_100/quality,q_100';
        break;
      case 'calendar':
        process =
            'image/auto-orient,1/interlace,1/resize,m_fill,w_890,h_640/quality,q_90';
        break;
      case 'cover1':
        process =
            'image/auto-orient,1/interlace,1/resize,m_lfit,h_200/quality,q_100';
        break;
      case 'slide':
        process =
            'image/auto-orient,1/interlace,1/resize,m_lfit,w_300/quality,q_100';
        break;
      case 'calendar':
        process =
            'image/auto-orient,1/interlace,1/resize,m_fill,w_540,h_1000/quality,q_100';
        break;
    }
    let url: Array<string> = name.split('?');
    return url[0] + '?x-oss-process=' + process;
  }
}
