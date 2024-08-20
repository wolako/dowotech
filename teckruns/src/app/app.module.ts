import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { DevopsComponent } from './servicesIT/devops/devops.component';
import { InfrastructureReseauComponent } from './servicesIT/infrastructure-reseau/infrastructure-reseau.component';
import { GestionCloudComponent } from './servicesIT/gestion-cloud/gestion-cloud.component';
import { DeveloppementComponent } from './servicesIT/developpement/developpement.component';
import { NosServicesComponent } from './nos-services/nos-services.component';
import { InfrastructureITComponent } from './servicesIT/infrastructure-it/infrastructure-it.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AtoutComponent } from './atout/atout.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    ContactComponent,
    ServicesComponent,
    HomeComponent,
    FooterComponent,
    DevopsComponent,
    InfrastructureReseauComponent,
    GestionCloudComponent,
    DeveloppementComponent,
    NosServicesComponent,
    InfrastructureITComponent,
    AtoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
