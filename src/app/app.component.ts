import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import 'leaflet';
import 'leaflet.markercluster';
import { icon, Marker } from 'leaflet';
import { Star } from './doubleslider/doubleslider.component.js';
declare let L;
declare var HeatmapOverlay;




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  allTags:string[] =  [];
  title = 'Visualization of swiss restaurants';
  moreOptions:boolean = false;
  map;
  markerLayer;
  heatmap:boolean = false;
  stars:Star[];
  baseurl;

  heatmapLayer = new HeatmapOverlay({
    radius: 0.025,
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
    this.baseurl = window.location.href;
    this.baseurl =  this.baseurl.slice(0, this.baseurl.indexOf(":", 8));
    this.http.get(this.baseurl+':2500/tags')
    .subscribe(
      data => this.allTags = data as Array<string>,
      err => console.log(err)
    );
    const iconRetinaUrl = 'leaflet/marker-icon-2x.png';
    const iconUrl = 'leaflet/marker-icon.png';
    const shadowUrl = 'leaflet/marker-shadow.png';
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
			attribution: 'open street map'
    }).addTo(this.map);
    this.markerLayer =  L.markerClusterGroup().addTo(this.map);
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
    let url = this.baseurl+':2500/restaurants';
    if(tags.length !== 0){
      url += '?tags='+tags;
    }
    this.http.get(url)
    .subscribe(
      data => {
        var geojsonLayer =  L.geoJSON(data,{
          onEachFeature: function (feature, layer) {
            layer.bindPopup('<p>Name: '+feature.properties.name+'</p><p>Tags: '+feature.properties.tags+'</p><p>Website: '+feature.properties.website+'</p>');
            coordinates.data.push({
              lat: feature.geometry.coordinates[1],
              lng: feature.geometry.coordinates[0],
              count: 1
            });
         }});
        if(this.heatmap){
          this.heatmapLayer.setData(coordinates);
        }else{
          this.markerLayer.addLayer(geojsonLayer);
        }
        
      },
      err => console.log(err)
    );
  }

  
}


