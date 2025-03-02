import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { LatLng, latLng, Layer, LeafletMouseEvent, tileLayer, marker, icon } from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    LeafletModule,
    CommonModule 
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  public markers: Layer[] = [];
  public latLng!: LatLng
  public options: any = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' }),
    ],
    zoom: 5,
    center: latLng(33.67, -101.82)
  };

  public handleClick(event: LeafletMouseEvent): void {
    this.latLng = event?.latlng;
    this.markers.splice(0);
    const newMarker = marker([this.latLng.lat, this.latLng.lng], {icon: icon({iconUrl: 'assets/marker-icon.png'})})
    this.markers.push(newMarker);
  }
}
