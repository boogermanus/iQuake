import { Component } from '@angular/core';
import { MapComponent } from "./components/map/map.component";
import { DataService } from './services/data.service';
import { ILocation } from './interfaces/ilocation';
import { QuakesComponent } from './components/quakes/quakes.component';
import { NavMenuComponent } from "./components/nav-menu/nav-menu.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [
        NavMenuComponent,
        RouterModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'iQuake';
  location?: ILocation = undefined;
  showLocation: boolean = false;
  constructor(private readonly dataService: DataService) {
    this.location = this.dataService.getLocation();
    if(this.location === undefined) {
      this.showLocation = true;
    }
  }

  public locationSaved(value: boolean): void {
    this.showLocation = !value;
  }
}
