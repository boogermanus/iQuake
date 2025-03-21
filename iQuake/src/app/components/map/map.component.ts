import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { LatLng, latLng, Layer, LeafletMouseEvent, tileLayer, marker, icon } from 'leaflet';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    LeafletModule,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
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

  constructor(private readonly dataService: DataService) {

  }

  public handleClick(event: LeafletMouseEvent): void {
    this.latLng = event?.latlng;
    this.markers.splice(0);
    const newMarker = marker(
      [this.latLng.lat, this.latLng.lng],
      {
        icon: icon(
          { 
            iconUrl: 'assets/marker-icon.png',
            iconSize: [25,41],
            iconAnchor: [13,41],
            shadowUrl: 'assets/marker-shadow.png'
          },
        )
      })
    this.markers.push(newMarker);
  }

  public saveLocation(): void {
    this.dataService.saveLocation({ lat: this.latLng.lat, lng: this.latLng.lng });
    this.locationSaved.emit(true);
  }
}
