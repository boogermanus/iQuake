import {CommonModule} from '@angular/common';
import {AfterViewInit, Component, OnInit, output} from '@angular/core';
import {LeafletModule} from '@bluehalo/ngx-leaflet';
import {LatLng, Layer, LeafletMouseEvent, tileLayer, marker, icon, circle, Map} from 'leaflet';
import {MatButtonModule} from '@angular/material/button';
import {DataService} from '../../services/data.service';
import {Router, RouterModule} from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-map',
  imports: [
    LeafletModule,
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  public markers: Layer[] = [];
  public latLng: LatLng = new LatLng(33.67, -101.82);
  public mag: number = 4.5;
  public range: number = 250;
  public options: any = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: 'Open Street Map'}),
    ],
    zoom: 5,
    center: this.latLng
  };
  public saveButtonDisabled: boolean = true;
  public map?: Map;

  constructor(
    private readonly dataService: DataService,
    private readonly router: Router) {

  }

  public ngAfterViewInit(): void {
    const location = this.dataService.getLocation();
    if (location !== undefined) {
      this.latLng = location.latLng;
      this.mag = location.mag;
      this.range = location.range;
      this.addMarker(this.latLng);
      this.map?.setView(this.latLng);
    }

  }

  public handleClick(event: LeafletMouseEvent): void {
    this.latLng = event?.latlng;

    if (this.latLng.lng < -180) {
      this.saveButtonDisabled = true;
    } else {
      this.saveButtonDisabled = false;
      this.markers = [];
      this.addMarker(this.latLng);
    }
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
      });

    this.markers.push(newMarker);
    this.addRangeMarker();
    this.map?.setZoom(5);
  }

  public rangeChange(latLng: LatLng): void {
    // splice the range marker out
    this.markers.splice(1);
    this.addRangeMarker();
  }

  private addRangeMarker(): void {
    const myRadius = circle(this.latLng, {radius: 1000 * this.range})
    this.markers.push(myRadius);
  }

  public saveLocation(): void {
    this.dataService.saveLocation({latLng: this.latLng, mag: this.mag, range: this.range});
    this.router.navigate(['/']);
  }

  public mapReady(map: Map): void {
    this.map = map;
  }
}
