import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Routes
import { APP_ROUTING } from './app.routes';

// Services
import { DatabaseService } from './services/database.service';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { DailyMeasureComponent } from './components/daily-measure/daily-measure.component';
import { RealTimeMeasureComponent } from './components/real-time-measure/real-time-measure.component';
import { MonthlyMeasureComponent } from './components/monthly-measure/monthly-measure.component';
import { AnnualMeasureComponent } from './components/annual-measure/annual-measure.component';
import { LoadingComponent } from './components/shared/loading/loading.component';

// Pipes
import { CustomDate } from './pipes/customdate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    DailyMeasureComponent,
    RealTimeMeasureComponent,
    MonthlyMeasureComponent,
    AnnualMeasureComponent,
    LoadingComponent,
    CustomDate
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
