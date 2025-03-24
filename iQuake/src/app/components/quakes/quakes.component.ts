import { Component, OnInit } from '@angular/core';
import { QuakeService } from '../../services/quake.service';
import { DataService } from '../../services/data.service';
import { ILocation } from '../../interfaces/ilocation';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LatLng } from 'leaflet';

@Component({
  selector: 'app-quakes',
  standalone: true,
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
  constructor(
    private readonly quakeService: QuakeService,
    private readonly dataService: DataService
  ) {

  }

  public ngOnInit(): void {

    if (this.location === undefined) {
      this.location = this.dataService.getLocation();
    }

    if (this.location !== undefined) {
      this.loadQuakes();
    }

  }

  public loadQuakes() {
    this.quakeService.getQuakes(this.location ?? { latLng: new LatLng(0, 0), mag: 0 })
      .subscribe({
        next: (data) => {
          this.features = data.features
          if(this.features.length === 0) {
            this.noQuakes = true;
          }
        }
      })
  }

}
