import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
  pure: false,
})
export class PricePipe implements PipeTransform {
  transform(price: string | number): number {
    return Number(price) / 100;
  }
}
