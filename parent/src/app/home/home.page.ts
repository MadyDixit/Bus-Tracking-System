import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { GetlocationserviceService } from '../services/getlocationservice.service'
import { getLocaleDayNames } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  map: mapboxgl.Map;
  interval;
  ngOnInit() {
  }
  isdisplay: boolean;
  ontheMap(locatorName) {
    this.isdisplay = true
    mapboxgl.accessToken = environment.mapBoxKey;
    this.map = new mapboxgl.Map({
      container: 'map-test',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [78.9629, 20.5937], // [lng, lat]
      zoom: 3
    });
    this.map.on('load', (event) => {
      this.interval = setInterval(() => {

      })

    })
  }
}
