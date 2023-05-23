import { Injectable } from '@angular/core';
import { RecordDto } from '../../../../lib/models/record.dto';
import { ClockmateApi } from './api';

@Injectable()
export class ApiMockService implements ClockmateApi {
  async fetchBookings(): Promise<ReadonlyArray<RecordDto>> {
    return Promise.resolve([]);
  }
}
