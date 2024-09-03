import { Component } from '@angular/core';

interface House {
  title: string;
  description: string;
  lngLat: [number, number];
}

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent {

  public houses: House[] = [
      {
        title: 'Mi Casa',
        description: 'Cerca del parque de la Armenia',
        lngLat: [ -78.472, -0.262]
      },
      {
        title: 'Escuela Politécnica Nacional',
        description: 'Facultad de Sistemas',
        lngLat: [ -78.4888, -0.2102]
      },
      {
        title: 'Próximo destino',
        description: 'Viaje con amigos a Ballenita',
        lngLat: [ -80.8733, -2.2028 ]
      },
    ]
}
