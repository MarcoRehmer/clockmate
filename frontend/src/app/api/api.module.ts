import { NgModule } from '@angular/core';
import { ApiService } from './api.service';
import { ApiMockService } from './api-mock.service';

@NgModule({
  providers: [
    {
      provide: ApiService,
      useClass: ApiMockService,
    },
  ],
})
export class ApiModule {}
