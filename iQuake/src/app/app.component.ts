import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from "./components/map/map.component";
import { DataService } from './services/data.service';
import { ILocation } from './interfaces/ilocation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MapComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'iQuake';
  location!: ILocation | null;
  showLocation: boolean = true;
  constructor(private readonly dataService: DataService) {
    this.location = this.dataService.getLocation();
    if(this.location === null) {
      this.showLocation = true;
    }
  }
}
