import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform( arryOfObject:any[] , term:string ): any {
    return arryOfObject.filter( (item)=>item.title.toLowerCase().includes(term.toLowerCase()) );
  }

}
