import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getKeys'
})
export class GetKeysPipe implements PipeTransform {

  transform(value:any){
    return Object.keys(value);
  }

}
