import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { GetlocationserviceService } from '../services/getlocationservice.service'
import { Subscription } from 'rxjs';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  map: mapboxgl.Map;
  data;
  geoJson;
  interval;
  subscriber;
  iswatching: boolean;
  subscription: Subscription
  constructor(public liveService: GetlocationserviceService, public loadingController: LoadingController, public alertController: AlertController ) { }

  ngOnInit() {
    mapboxgl.accessToken = environment.mapBoxKey;
    this.map = new mapboxgl.Map({
      container: 'map-test',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 0
    });
    this.map.on('load',()=>{
      this.map.addSource('points', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
     });
    })
    
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 7000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  async ontheMap(locatorName) {
    // this.presentLoading()
    this.iswatching = true;
     
    this.subscriber =  this.liveService.getlogandlat(locatorName)
        this.subscriber.subscribe((res: any) => {
          this.data = res  
          console.log(this.data)
          if (this.data == null || locatorName == ""){
            this.iswatching = false;
            this.Alert()
          }    
      this.geoJson = {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': res,
    },
    'properties': {
      'title': locatorName,
      'icon': 'rocket'
          }
    }
    this.map.flyTo({
      center: res,
      zoom: 18
    })
      setTimeout(() => {
        this.map.getSource('points').setData(this.geoJson)
      }, 5000);
      this.map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'points',
        'layout': {
        // get the icon name from the source's "icon" property
        // concatenate the name to get an icon from the style's sprite sheet
        'icon-image': ['concat', ['get', 'icon'], '-15'],
        // get the title name from the source's "title" property
        'text-field': ['get', 'title'],
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.6],
        'text-anchor': 'top'
      }
    });
  })
}
  stop(){
    this.iswatching = false;
  }
  async Alert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Invalid.',
      message: 'Please Enter The Correct Name!',
      buttons: ['OK']
    })
    await alert.present();
  }
}