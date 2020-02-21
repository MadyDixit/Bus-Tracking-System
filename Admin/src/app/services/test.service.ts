import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { templateJitUrl } from '@angular/compiler';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TestService {
  public point: Array<any>=[]
  url: string;
  Observable: any;
  data: any;
  geoJsonTemp: Object;
  flag: number = 1;
  Checker: boolean;
  geoJson: Array<Object> = [];
  oldName: Array<string> = [];
  subscription: Subscription;
  constructor(private db: AngularFireDatabase) {  }
  fetch() {
    this.subscription = this.db.object('/').valueChanges().subscribe(res => {
      this.data = res
      console.log(this.data)
      this.makeGeoJson()
    });

  }
  makeGeoJson(){
    this.point = []
    for(let i = 0; i < Object.keys(this.data).length; i++){
      this.point.push(Object.values(this.data)[i])
      this.geoJson.push({
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': Object.values(this.data)[i]
            },
            'properties': {
           'title': Object.keys(this.data)[i],
          'icon': 'rocket'
            }
          })
    }
  }

  
  /* Test Purpose */


  /*
  getMarkers() {
      const geoJson = [{
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': ['80.20929129999999', '13.0569951']
        },
        'properties': {
       'title': 'Mapbox SF',
      'icon': 'rocket'
        }
      }, {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': ['77.350048', '12.953847' ]
        },
        'properties': {
          'title': 'Mapbox DC',
          'icon': 'monument'
        }
      }];
      return geoJson;
    }
    */
    
}
