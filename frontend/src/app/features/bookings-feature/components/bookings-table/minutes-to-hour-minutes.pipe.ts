import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToHourMinutes',
})
export class MinutesToHourMinutesPipe implements PipeTransform {
  transform(value: number): string {
    const calcVal = value < 0 ? value * -1 : value;
    const hours = Math.floor(calcVal / 60);
    const minutes = Math.ceil(calcVal % 60);
    const sign = value < 0 ? '-' : '';

    return `${sign}${(minutes === 60 ? hours + 1 : hours)
      .toString()
      .padStart(2, '0')}:${(minutes === 60 ? 0 : minutes)
      .toString()
      .padStart(2, '0')}`;
  }
}
