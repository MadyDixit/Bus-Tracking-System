import { Platform } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { location } from '../schema';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
@Injectable({
  providedIn: 'root'
})
export class DataService {



  maplocation: location;

  add(name,item) {
    this.db.object("/"+name).set(item)
  }
  refer = firebase.database().ref('/');

  constructor(private db: AngularFireDatabase) { }
}
