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
  lon: any;
  lat: any;

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
    this.map.on('load', (event) => {
      // add the real time map data
      this.refreshData();
      this.interval = setInterval(() => {
        this.lat = this.refreshData();
        console.log("t", this.lat);
        this.latestlong = this.lat.geometry.coordinates[0];
        this.latestlat = this.lat.geometry.coordinates[1];
        this.map.getSource('drone').setData(this.lat);
        this.map.flyTo({
          center: [
            this.latestlong, this.latestlat
          ],
          zoom: 3,
          essential: true
        })
      }, 5000);

      this.map.addSource('drone', { type: 'geojson', data: this.service.url });
      this.map.addLayer({
        id: 'drone',
        'type': 'symbol',
        'source': 'drone',
        zoom: 10,
        'layout': {
          'icon-image': 'rocket-15',
        }
      });
      // this.map.setLayerZoomRange('drone', 1, 2);

      this.map.addControl(new mapboxgl.NavigationControl());
      this.map.addControl(new mapboxgl.FullscreenControl());
      this.map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        })
      );
    });
  }
  refreshData() {
    this.service.fetch().subscribe(res => {
      this.lon = res;
    });
    return this.lon;
  }
}
