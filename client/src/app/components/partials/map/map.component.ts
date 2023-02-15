import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { icon, LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, map, Map, marker, Marker, tileLayer } from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit  {
  @Input()
  order!:Order;
  private readonly DEFAULT_LATLNG: LatLngTuple = [6.248220,-75.580040];
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });

  @ViewChild('map', { static: true })
  mapRef!:ElementRef;

  map!:Map;

  currentMarker!:Marker;

  constructor( private locationService: LocationService){

  }

  ngOnInit(): void {
    this.initializedMap();
  }

  initializedMap(){
    if(this.map) return;

    this.map = map(this.mapRef.nativeElement, {
      // zoomControl: false,
      attributionControl: false
    }).setView(this.DEFAULT_LATLNG , 8);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

    this.map.on('click',(e:LeafletMouseEvent)=>{
      this.setMarker(e.latlng);
    })
  }

  findMyLocation(){
    this.locationService.getCurrentLocation().subscribe({
      next: (location) => {
        console.log(location);
        this.map.setView(location, 12);
        this.setMarker(location);
      }
    });
  }

  setMarker(latlng: LatLngExpression){
    this.addressLatLng = latlng as LatLng;
    if(this.currentMarker){
      this.currentMarker.setLatLng(latlng);
      return;
    }
    this.currentMarker= marker(latlng,
      {
        icon: this.MARKER_ICON,
        draggable: true,

      }).addTo(this.map)

      this.currentMarker.on('dragend', () => this.addressLatLng = this.currentMarker.getLatLng())
  }

  set addressLatLng(latlng:LatLng){
    latlng.lat= parseFloat(latlng.lat.toFixed(8));
    latlng.lng= parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }

}
