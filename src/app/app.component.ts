import { Component, OnInit } from '@angular/core';
declare let L;
import '../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { icon, Marker } from 'leaflet';
declare var HeatmapOverlay;




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  allTags:string[] =  ['Pizza','Pizzeria','Italien'];
  title = 'restaurantMaps';
  moreOptions:boolean = false;
  map;
  markerLayer;
  heatmap:boolean = false;

  heatmapLayer = new HeatmapOverlay({
    radius: 0.01,
    maxOpacity: 0.8,
    scaleRadius: true,
    useLocalExtrema: true,
    latField: 'lat',
    lngField: 'lng',
    valueField: 'count'
  });

  constructor(private http:HttpClient) {

  }
   
  ngOnInit() {
    this.http.get('http://localhost:2500/tags')
    .subscribe(
      data => this.allTags = data as Array<string>,
      err => console.log(err)
    );
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

    this.markerLayer = L.layerGroup().addTo(this.map);
    this.heatmapLayer.addTo(this.map);
    
  }

  changeOptions(){
    this.moreOptions = !this.moreOptions;
  }

  search(event){
    let tags = event;
    //clear both layers
    this.markerLayer.clearLayers();
    let coordinates = {
      data: []
    };
    this.heatmapLayer.setData(coordinates);

    this.http.get('http://localhost:2500/restaurants')
    .subscribe(
      data => {
        L.geoJSON(data,{
          onEachFeature: function (feature) {
            coordinates.data.push({
              lat: feature.geometry.coordinates[1],
              lng: feature.geometry.coordinates[0],
              count: 1
            });
         }}).addTo(this.markerLayer);
        if(this.heatmap){
          this.heatmapLayer.setData(coordinates);
          this.markerLayer.clearLayers();
        }
        
      },
      err => console.log(err)
    );
  }

  
}


