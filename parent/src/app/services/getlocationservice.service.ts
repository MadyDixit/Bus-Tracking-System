import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetlocationserviceService {

  data: any;
  subscription: Subscription;
  constructor(private db: AngularFireDatabase) {
  }
  getlogandlat(name) {
    return this.db.object('/' + name);
  }

}
