import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { templateJitUrl } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class TestService {
  url: string;
  Observable: any;
  data: any;
  geoJsonTemp: Object;
  flag: number = 1;
  geoJson: Array<Object> = [];
  forUpdate: Array<any>=[];
  constructor(private db: AngularFireDatabase) {
    this.db.object('/').valueChanges().subscribe(res => {
      this.data = res
      this.makeGeoJson()
    });

  }
  fetch() {
    this.db.object('/').valueChanges().subscribe(res => {
      this.data = res
      return this.makeGeoJson()
    });
  }
  makeGeoJson(){

   for(let i = 0; i < Object.keys(this.data).length; i++){
    console.log("-->",this.forUpdate)
    if(this.forUpdate.indexOf(Object.keys(this.data)[i][0])){
      this.geoJsonTemp = {
        'type': 'Feature',
        geometry: {
          type: 'Point',
          coordinates: Object.values(this.data)[i][1][0].slice(0,2)
        },
        'properties':{
          'title': Object.values(this.data)[i][0],
          'icon': 'rocket'
        }
      }
      this.geoJson.push(this.geoJsonTemp)
      this.forUpdate.push(Object.values(this.data)[i][0])
    console.log("--->GeoJson",this.geoJson)
    console.log("===>",this.forUpdate);
    } else {
      var index = this.geoJson.findIndex(x => x['properties']['title'] === (this.data)[i][0])
      this.geoJson[index] = this.data
    }
  }
    return this.geoJson;
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
