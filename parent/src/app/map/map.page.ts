import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { GetlocationserviceService } from '../services/getlocationservice.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {  map: mapboxgl.Map;
  data;
  geoJson;
  interval;
  subscriber;
  subscription: Subscription
  constructor(public liveService: GetlocationserviceService ) { }

  ngOnInit() {
    mapboxgl.accessToken = environment.mapBoxKey;
    this.map = new mapboxgl.Map({
      container: 'map-test',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 0
      });
  }
  ontheMap(locatorName) {
    this.subscriber = this.liveService.getlogandlat(locatorName)
    this.data = this.getPoint()
    this.geoJson = {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': this.data
          },
          'properties': {
         'title': locatorName,
        'icon': 'rocket'
          }
        }

    this.map.on('load',()=>{
      this.map.getSource('points').setData(this.geoJson)
      this.map.update(true)
    })
    this.map.addSource('points', {
          'type': 'geojson',
          'data': {
          'type': 'FeatureCollection',
          'features': []
          }
          });
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
  }
  value
  getPoint(){
    console.log(this.subscriber)
  this.subscription = this.subscriber.subscribe(res => {
      this.value = res
    });
    return this.value
  }
}
