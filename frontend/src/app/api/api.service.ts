import { Injectable } from '@angular/core';
import { RecordDto } from '../../../../lib/models/record.dto';
import { ClockmateApi } from './api';

@Injectable({ providedIn: 'root' })
export class ApiService implements ClockmateApi {
  async fetchBookings(): Promise<ReadonlyArray<RecordDto>> {
    return Promise.resolve([]);
  }
}
