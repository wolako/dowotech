import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DeveloppementComponent } from './servicesIT/developpement/developpement.component';
import { InfrastructureITComponent } from './servicesIT/infrastructure-it/infrastructure-it.component';
import { DevopsComponent } from './servicesIT/devops/devops.component';
import { GestionCloudComponent } from './servicesIT/gestion-cloud/gestion-cloud.component';
import { NosServicesComponent } from './nos-services/nos-services.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'nos-services', component: NosServicesComponent },
  { path: 'developpement', component: DeveloppementComponent},
  { path: 'infrastructure-it', component: InfrastructureITComponent},
  { path: 'devops', component: DevopsComponent},
  { path: 'gestion-cloud', component: GestionCloudComponent},
  { path: '', redirectTo: '/accueil', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
