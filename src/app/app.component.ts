import { Component, OnInit } from '@angular/core';
declare let L;
import '../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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
  
  ngOnInit() {
    const map = L.map('map').setView([46.94809, 7.44744], 12);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    let data = this.http.get('http://localhost:2500/restaurants');
  }

  changeOptions(){
    this.moreOptions = !this.moreOptions;
  }
}


