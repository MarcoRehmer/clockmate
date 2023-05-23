import { RecordDto } from '../../../../lib/models/record.dto';

export interface ClockmateApi {
  fetchBookings(): Promise<ReadonlyArray<RecordDto>>;
}
