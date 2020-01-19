import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shopDetail'
})
export class ShopDetailPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
