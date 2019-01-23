import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {RealTimeMeasureComponent} from './components/real-time-measure/real-time-measure.component';
import { DailyMeasureComponent } from './components/daily-measure/daily-measure.component';
import { MonthlyMeasureComponent } from './components/monthly-measure/monthly-measure.component';
import { AnnualMeasureComponent } from './components/annual-measure/annual-measure.component';
import { SearchComponent } from './components/search/search.component';
import { RatesComponent } from './components/rates/rates.component';
import { AboutComponent } from './components/about/about.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'realTimeMeasure', component: RealTimeMeasureComponent },
  { path: 'dailyMeasure', component: DailyMeasureComponent },
  { path: 'monthlyMeasure', component: MonthlyMeasureComponent },
  { path: 'annualMeasure', component: AnnualMeasureComponent },
  { path: 'search', component: SearchComponent },
  { path: 'rates', component: RatesComponent },
  { path: 'about', component: AboutComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
