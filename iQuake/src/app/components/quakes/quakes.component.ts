import {Component, inject, OnInit} from '@angular/core';
import {QuakeService} from '../../services/quake.service';
import {DataService} from '../../services/data.service';
import {ILocation} from '../../interfaces/ilocation';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {LatLng} from 'leaflet';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quakes',
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './quakes.component.html',
  styleUrl: './quakes.component.scss'
})
export class QuakesComponent implements OnInit {

  public location?: ILocation = undefined;
  public features: any[] = [];
  public noQuakes: boolean = false;
  private readonly quakeService: QuakeService = inject(QuakeService);
  private readonly dataService: DataService = inject(DataService);
  private readonly router: Router = inject(Router);

  constructor() {
  }

  public ngOnInit(): void {

    if (this.location === undefined) {
      this.location = this.dataService.getLocation();
    }

    if (this.location !== undefined) {
      this.loadQuakes();
    } else {
      this.router.navigate(['/location']);
    }

  }

  public loadQuakes() {
    this.quakeService.getQuakes(this.location ?? {latLng: new LatLng(0, 0), mag: 0, range: 250})
      .subscribe({
        next: (data) => {
          this.features = data.features
          if (this.features.length === 0) {
            this.noQuakes = true;
          }
        }
      })
  }

  public getMagnitudeStyle(magnitude: number): string {
    let result = '';

    if (magnitude <= 2.5) {
      result = 'color: green;'
    } else if (magnitude <= 4.5) {
      result = 'color: blue;';
    }
    else if (magnitude <= 5) {
      result = 'color: orange;';
    }
    else {
      result = 'color: red;';
    }

    return result;
  }
}
