import { Component, OnInit } from '@angular/core';
declare let L;
import '../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { icon, Marker } from 'leaflet';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'restaurantMaps';
  moreOptions:boolean = false;
  constructor(private http:HttpClient) {

  }
  
  buildOverpassApiUrl(map) {
    var bounds = map.getBounds().getSouth() + ',' + map.getBounds().getWest() + ',' + map.getBounds().getNorth() + ',' + map.getBounds().getEast();
    var nodeQuery = 'node[amenity=restaurant](' + bounds + ');';
    var query = '?data=[out:xml][timeout:100];(' + nodeQuery + ');out body;>;out skel qt;';
    var baseUrl = 'http://overpass-api.de/api/interpreter';
    var resultUrl = baseUrl + query;
    return resultUrl;
  } 
  
  ngOnInit() {
    const iconRetinaUrl = 'assets/leaflet/images/marker-icon-2x.png';
    const iconUrl = 'assets/leaflet/images/marker-icon.png';
    const shadowUrl = 'assets/leaflet/images/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    Marker.prototype.options.icon = iconDefault;
    const map = L.map('map').setView([46.94809, 7.44744], 12);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    //this.http.get('http://localhost:2500/restaurants')
    L.marker([46.94809, 7.44744]).addTo(map);
  }



  changeOptions(){
    this.moreOptions = !this.moreOptions;
  }
}


