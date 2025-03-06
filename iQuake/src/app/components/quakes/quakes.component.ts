import { Component, OnInit } from '@angular/core';
import { QuakeService } from '../../services/quake.service';
import { DataService } from '../../services/data.service';
import { ILocation } from '../../interfaces/ilocation';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quakes',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './quakes.component.html',
  styleUrl: './quakes.component.scss'
})
export class QuakesComponent implements OnInit {

  public location?: ILocation = undefined;
  public features: any[] = [];
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
    this.quakeService.getQuakes(this.location ?? { lat: 0, lng: 0 })
      .subscribe({
        next: (data) => {
          this.features = data.features
        }
      })
  }

}
