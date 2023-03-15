import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {}

  getRandomNumber(): Observable<number> {
    return this.httpClient.get<number>(Constants.randomNumberAPI);
  }
}
