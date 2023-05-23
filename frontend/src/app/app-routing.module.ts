import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookingsOverviewView} from "./features/bookings-feature/bookings-overview.view";


const routes: Routes = [
  {
    path: '',
    component: BookingsOverviewView,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
