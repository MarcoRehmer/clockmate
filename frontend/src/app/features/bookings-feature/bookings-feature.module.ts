import { NgModule } from '@angular/core';

import { MinutesToHourMinutesPipe } from './components/bookings-table/minutes-to-hour-minutes.pipe';

import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from '../../material-components.module';
import { CommonUiModule } from '../../common-ui/common-ui.module';
import { HttpClientModule } from '@angular/common/http';
import { FilterSelectorComponent } from './components/filter-selector/filter-selector.component';
import { BookingsOverviewView } from './bookings-overview.view';
import { BookingsTableComponent } from './components/bookings-table/bookings-table.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { bookingsFeatureReducer } from './store/reducer';

@NgModule({
  imports: [
    CommonModule,
    MaterialComponentsModule,
    CommonUiModule,
    HttpClientModule,
    StoreModule.forFeature('bookings', bookingsFeatureReducer),
    EffectsModule.forFeature([]),
  ],
  exports: [],
  declarations: [
    BookingsOverviewView,
    MinutesToHourMinutesPipe,
    BookingsTableComponent,
    FilterSelectorComponent,
  ],
  providers: [],
})
export class BookingsFeatureModule {}
