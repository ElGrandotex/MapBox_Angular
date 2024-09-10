import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor{
  color: string;
  marker: Marker;
}

interface PlainMarker{
  color: string;
  lnglat: number[];
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map')
  public divMap?: ElementRef;

  public markers: MarkerAndColor[] = []

  public map?: Map;
  public currentCenter: LngLat = new LngLat(-78.47, -0.26)

  ngAfterViewInit(): void {

    if (!this.divMap) throw 'Elemento no encontrado'

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: 12, // starting zoom
    });

    this.readLocalStorage();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }


  createMarker(){
    if(!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string){
    if(!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat(lngLat)
      .addTo(this.map);

      this.markers.push({
        color: color,
        marker: marker
      })


      marker.on('dragend', () => {
        this.saveLocalStorage();
      })
  }

  deleteMarker( index : number){
    this.markers[index].marker.remove();
    this.markers.splice(index, 1)
    this.saveLocalStorage();
  }

  flyTo(marker: Marker){
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

  saveLocalStorage(){
    const plainMarkers: PlainMarker[]= this.markers.map( ({ color, marker }) => {
      return {
        color: color,
        lnglat: marker.getLngLat().toArray()
      }
    })

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers))
  }

  readLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]'
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString)

    plainMarkers.forEach( ({color, lnglat}) => {
      const [lng, lat] = lnglat;
      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color);
    })
  }

}
