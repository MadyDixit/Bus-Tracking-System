import { environment } from './../environments/environment';
import { Component, OnInit } from '@angular/core';
import { TestService } from './services/test.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  map: mapboxgl.Map;
  interval: any;
  geodata:any;
  data: any;

  latestlong;
  latestlat;
  constructor(public service: TestService) {
  }


  ngOnInit() {

    mapboxgl.accessToken = environment.mapBoxKey;
    this.map = new mapboxgl.Map({
      container: 'map-test',
      style: 'mapbox://styles/mapbox/streets-v11',
      // center: [this.lon.geometry.coordinates[0], this.lon.geometry.coordinates[1]], // [lng, lat]
      zoom: 0
    });
    this.map.on('load', ()=>{
      this.map.addSource('points', {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': this.service.geoJson
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
    })
  }
}
