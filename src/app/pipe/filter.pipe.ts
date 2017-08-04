import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], filterField?: string, keyword?: string): any {
    if(!filterField || !keyword){
      return list;
    }
    return list.filter(item => {
      let fieldValue = item[filterField].toLowerCase();
      return fieldValue.indexOf(keyword.toLowerCase()) >= 0;// 判断fieldValue中是否包含keyword，包含就返回true，这个item就可以取出来
    });
  }

}
