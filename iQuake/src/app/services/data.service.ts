import { Injectable } from '@angular/core';
import { ILocation } from '../interfaces/ilocation';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly locationKey = 'iQuakeLocation';
  constructor() { }

  public saveLocation(location: ILocation): void {
    let json = JSON.stringify(location);
    localStorage.setItem(this.locationKey, json);
  }

  public getLocation(): ILocation | null {
    const data = localStorage.getItem(this.locationKey);

    if(data === null) {
      return null;
    }

    const json = JSON.parse(data);
    return json;
  }
}
