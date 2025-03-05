import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILocation } from '../interfaces/ilocation';

@Injectable({
  providedIn: 'root'
})
export class QuakeService {

  private readonly baseUrl: string = 'https://earthquake.usgs.gov/fdsnws/event/1/query'
  constructor(private readonly httpClient: HttpClient) { }

  private buildQueryParams(location: ILocation): HttpParams {
    const currentDate = new Date();
    let pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 90);
    const query = new HttpParams()
      .append('format','geojson')
      .append('starttime',pastDate.toISOString().split('T')[0])
      .append('endtime', currentDate.toISOString().split('T')[0])

    return query;
  }
}
