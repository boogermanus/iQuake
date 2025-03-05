import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuakeService {

  private readonly baseUrl: string = 'https://earthquake.usgs.gov/fdsnws/event/1/query'
  constructor(private readonly httpClient: HttpClient) { }
}
