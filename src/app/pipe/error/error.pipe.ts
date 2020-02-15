import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'error'})
export class ErrorPipe implements PipeTransform {
  transform(code: number): string {
    switch (code) {
      case 202:
        return '用户名已存在';
      case 203:
        return '邮箱已经绑定账号';
      case 209:
        return 'InvalidSessionToken';
      case 122:
        return '文件名不合法，只能包含a-zA-Z0-9_. ';
      case 129:
        return '文件太大';
      case 130:
        return '保存文件出错';
      case 131:
        return '删除文件出错';
      default:
        return '';
    }
  }
}
