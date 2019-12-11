import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {

  public pageIs: Observable<string>;

  constructor() { }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
