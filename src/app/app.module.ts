import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './layouts/main/main.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import {CarouselModule} from 'primeng/carousel';
import {DialogModule} from 'primeng/dialog';
import { DetialProductComponent } from './detial-product/detial-product.component';

import { GalleriaModule } from 'primeng/galleria';
import { AccordionModule } from 'primeng/accordion';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { AllApiService } from './core/all-api.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './core/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    DetialProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ButtonModule,
    MegaMenuModule,
    GalleriaModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    CarouselModule,
    DialogModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AllApiService,
    AuthService,
    CookieService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

