import { Component } from '@angular/core';

@Component({
  selector: 'app-ver-clase',
  templateUrl: './ver-clase.component.html',
  styleUrls: ['./ver-clase.component.css']
})
export class VerClaseComponent {
  arrayClases = [
    {
      clase_id: "1",
      detalles:"Yoga",
      detallesgenerales:"Es una disciplina que fusiona cuerpo y mente con posturas, respiración y meditación para ganar equilibrio, flexibilidad y bienestar integral.",
      imagen: "assets/YOGA_2.jpg"
    },
    {
      clase_id: "2",
      detalles:"Crossfit",
      detallesgenerales:"Entrenamiento funcional de alta intesidad que combina ejercicios variados para mejorar la fuerza, resistencia y agilidad.",
      imagen: "assets/CROTFITS.jpeg"
    },
    {
      clase_id: "3",
      detalles:"Funcional",
      detallesgenerales:"Sesion de entrenamieno que combina movimientos naturales y practicos para mejorar la fuerza y funcionalidad.",
      imagen: "assets/FUNCIONAL.jpeg"
    },
    {
      clase_id: "4",
      detalles:"Zumba",
      detallesgenerales:"Baile fitness energetico que combina ritmos latinos y ejercicios aerobicos para divertirse mientras se hace ejercicio",
      imagen: "assets/ZUMBA.jpeg"
    },
    {
      clase_id: "5",
      detalles:"Pesas",
      detallesgenerales:"Espacio equipado con pesas y maquinas para entrenar y fortalecer los musculos mediante ejercicios especifico",
      imagen: "assets/MUSCULACION.jpeg"
    },
    {
      clase_id: "6",
      detalles:"Ciclismo",
      detallesgenerales:"Entrenamiento cardiovascular en bicicleta estatica al ritmo de la musica, guiada por instructores motivadores.",
      imagen: "assets/BICICLETAS.jpeg"
    }
  ];
}
