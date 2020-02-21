import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { AlertController } from '@ionic/angular'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  User = ""

  geoLatitude: number;
  geoLongitude: number;
  iswatching: boolean;
  geoHeading: number;
  updateDB: Array<any> = [];
  tempCollection: Array<any> = [];
  subscription: Subscription
  watchLocationUpdates: any;

  constructor(private geolocation: Geolocation, private toFireBase: DataService, public alertController: AlertController) { }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude;
      // tslint:disable-next-line: max-line-length
      this.tempCollection.push(this.geoLongitude, this.geoLatitude)
    }).catch((err) => {
      console.log(err)
    });
  }
  watchingLocation(User) {
    if(User == ""){
      this.Alert()
    } else {
    this.iswatching = true;
    this.watchLocationUpdates = this.geolocation.watchPosition();
    this.subscription = this.watchLocationUpdates.subscribe((resp) => {
      console.log(resp.coords.latitude);
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude;
      this.tempCollection = []
      this.tempCollection.push(this.geoLongitude, this.geoLatitude);
      this.toFireBase.add(User,this.tempCollection);
      console.log(this.tempCollection)
    });
  }
}
  stopLocationWatch() {
    this.iswatching = false;
    this.subscription.unsubscribe();
  }
  upload(user) {
    this.updateDB.push(user, this.tempCollection)
  }

  async Alert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Name is Not Enter.',
      message: 'Please Enter The Name First!',
      buttons: ['OK']
    })
    await alert.present();
  }


}
