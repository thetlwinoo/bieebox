import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'addCommas' })
export class AddCommasPipe implements PipeTransform {
  transform(data: null | string[]) {
    if (!data) {
      return 'Guest';
    }

    switch (data.length) {
      case 0:
        return 'Guest';
      case 1:
        return data[0];
      case 2:
        return data.join(' and ');
      default:
        const last = data[data.length - 1];
        const remaining = data.slice(0, -1);
        return `${remaining.join(', ')}, and ${last}`;
    }
  }
}
