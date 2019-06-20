import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Rfilter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(Ref1: any [], fullname: string): any[] {
    if (fullname === undefined) {return Ref1; }

    return Ref1.filter(x => {
      return x.fullname.toLowerCase().indexOf(fullname.toString().toLowerCase()) !== -1
    });
  }

}
