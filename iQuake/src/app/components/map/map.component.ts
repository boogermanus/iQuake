import { CommonModule } from '@angular/common';
import { Component, OnInit, output } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { LatLng, Layer, LeafletMouseEvent, tileLayer, marker, icon } from 'leaflet';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../../services/data.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    LeafletModule,
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  public markers: Layer[] = [];
  public latLng: LatLng = new LatLng(33.67, -101.82);
  public locationSaved = output<boolean>();
  public options: any = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' }),
    ],
    zoom: 5,
    center: this.latLng
  };

  constructor(
    private readonly dataService: DataService,
    private readonly router: Router) {

  }

  public ngOnInit(): void {
    const location = this.dataService.getLocation();
    if(location !== undefined) {
      this.latLng = location.latLng; 
      this.addMarker(this.latLng);
    }

  }

  public handleClick(event: LeafletMouseEvent): void {
    this.latLng = event?.latlng;
    this.markers.splice(0);
    this.addMarker(this.latLng);
  }

  private addMarker(latLng: LatLng): void {
    const newMarker = marker(
      [this.latLng.lat, this.latLng.lng],
      {
        icon: icon(
          {
            iconUrl: 'assets/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            shadowUrl: 'assets/marker-shadow.png'
          },
        )
      })
    this.markers.push(newMarker);
  }

  public saveLocation(): void {
    this.dataService.saveLocation({ latLng: this.latLng, mag: 4});
    this.locationSaved.emit(true);
    this.router.navigate(['/']);
  }
}
