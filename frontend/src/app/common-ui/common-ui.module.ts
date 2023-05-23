import { NgModule } from '@angular/core';
import { CalcDurationPipe } from './pipes/calc-duration.pipe';

@NgModule({
  imports: [],
  exports: [CalcDurationPipe],
  declarations: [CalcDurationPipe],
})
export class CommonUiModule {}
