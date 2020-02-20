import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  User = ""

  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy: number;
  iswatching: boolean;
  geoHeading: number;
  geoAltitude: number;
  geoAltitudeAccuracy: number;
  geoSpeed: number;
  updateDB: Array<any> = [];
  tempCollection: Array<any> = [];
  watchLocationUpdates: any;

  constructor(private geolocation: Geolocation, private toFireBase: DataService) { }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude;
      this.geoHeading = resp.coords.heading;
      this.geoAltitude = resp.coords.altitude;
      this.geoAltitudeAccuracy = resp.coords.altitudeAccuracy;
      this.geoSpeed = resp.coords.speed;
      this.geoAccuracy = resp.coords.accuracy;
      // tslint:disable-next-line: max-line-length
      this.tempCollection.push([this.geoLongitude, this.geoLatitude, this.geoHeading, this.geoAltitude, this.geoAltitudeAccuracy, this.geoSpeed])
    }).catch((err) => {
      console.log(err)
    });
  }
  x
  watchingLocation() {
    this.iswatching = true;
    this.watchLocationUpdates = this.geolocation.watchPosition();
    this.watchLocationUpdates.subscribe((resp) => {
      console.log(resp.coords.latitude);
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude;
      this.geoHeading = resp.coords.heading;
      this.geoAltitude = resp.coords.altitude;
      this.geoAltitudeAccuracy = resp.coords.altitudeAccuracy;
      this.geoSpeed = resp.coords.speed;
      this.geoAccuracy = resp.coords.accuracy;
      // tslint:disable-next-line: max-line-length
      this.x = setInterval(() => {
        // tslint:disable-next-line: max-line-length
        this.tempCollection.push([this.geoLongitude, this.geoLatitude, this.geoHeading, this.geoAltitude, this.geoAltitudeAccuracy, this.geoSpeed]);
        this.updateDB[1].push(this.tempCollection);
        console.log(this.updateDB);
        this.toFireBase.add(this.updateDB);
      }, 5000);
    });
  }
  stopLocationWatch() {
    this.iswatching = false;
    let killit = this.watchLocationUpdates.subscribe();
    killit.unsubscribe();
  }
  upload(user) {
    this.updateDB.push(user, this.tempCollection)
  }

}
