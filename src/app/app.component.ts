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
  allTags:string[] =  ['Pizza', 'Steak', 'Italian', 'Vegan', 'Vegetarian', 'Rollstuhl'];
  title = 'restaurantMaps';
  moreOptions:boolean = false;
  map;
  layerGroup;
  constructor(private http:HttpClient) {

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

    this.map = L.map('map').setView([46.94809, 7.44744], 12);
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.layerGroup = L.layerGroup().addTo(this.map);
    
  }

  changeOptions(){
    this.moreOptions = !this.moreOptions;
  }

  search(){
    console.log("Search");
    this.layerGroup.clearLayers();
    this.http.get('http://localhost:2500/restaurants')
    .subscribe(
      data => L.geoJSON(data).addTo(this.layerGroup),
      err => console.log(err)
    );
  }
}


