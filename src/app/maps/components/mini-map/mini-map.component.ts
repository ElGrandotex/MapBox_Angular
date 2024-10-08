import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit, OnDestroy{
  ngOnDestroy(): void {
    this.map?.remove();
  }

  @Input() lnglat?: [number, number];

  public map?: Map;

  @ViewChild('map')
  public divMap?: ElementRef;

  ngAfterViewInit(): void {
    if( !this.divMap ) throw 'No existe mapa'
    if( !this.lnglat ) throw 'No puede ser nulo';

    const map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lnglat, // starting position [lng, lat]
      zoom: 13, // starting zoom
      interactive: false
    });

    new Marker()
      .setLngLat(this.lnglat)
      .addTo(map);
  }


}
