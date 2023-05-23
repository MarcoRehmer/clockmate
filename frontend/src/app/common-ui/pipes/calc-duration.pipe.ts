import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'calcDuration',
})
export class CalcDurationPipe implements PipeTransform {
  transform(
    startTime: string,
    endTime: string | undefined,
    withSeconds = false
  ): string {
    return DateTime.fromISO(endTime || new Date().toISOString())
      .diff(DateTime.fromISO(startTime))
      .toFormat(withSeconds ? 'hh:mm:ss' : 'hh:mm');
  }
}
