import { Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { QuakesComponent } from './components/quakes/quakes.component';

export const routes: Routes = [
    { path: 'location', component: MapComponent },
    { path: '**', component: QuakesComponent, pathMatch: 'full'}
];
