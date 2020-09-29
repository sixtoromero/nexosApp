import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(
    value: any[], 
    text: string,
    column: string): any[] {
    
    if (text === ''){
      return value;
    }

    if (!value) {
      return value;
    }

    text = text.toLocaleLowerCase();
    
    return value.filter(
      item => item[column].toLowerCase().includes(text)
    );
  }

}
