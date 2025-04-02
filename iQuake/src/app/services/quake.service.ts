import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILocation } from '../interfaces/ilocation';
import moment from 'moment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuakeService {

  private readonly baseUrl: string = 'https://earthquake.usgs.gov/fdsnws/event/1/query'
  constructor(private readonly httpClient: HttpClient) { }

  public getQuakes(location: ILocation): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl, { params: this.buildQueryParams(location) })
  }

  private buildQueryParams(location: ILocation): HttpParams {
    const currentMoment = moment().format('YYYY-MM-DD');
    const previousMoment = moment().subtract(90, 'days').format('YYYY-MM-DD');
    const query = new HttpParams()
      .append('format', 'geojson')
      .append('starttime', previousMoment)
      .append('endtime', currentMoment)
      .append('minmagnitude', location.mag)
      .append('latitude', location.latLng.lat)
      .append('longitude', location.latLng.lng)
      .append('maxradiuskm', location.range)

    return query;
  }
}
