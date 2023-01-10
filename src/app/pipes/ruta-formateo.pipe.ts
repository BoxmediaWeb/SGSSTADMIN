import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rutaFormateo'
})
export class RutaFormateoPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    return value.split('.').join("");
  }

}
