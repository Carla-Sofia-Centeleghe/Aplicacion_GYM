import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuscarAlumnoService } from 'src/app/services/alumnos/buscar-alumno.service';


@Component({
  selector: 'app-pagos-admi',
  templateUrl: './pagos-admi.component.html',
  styleUrls: ['./pagos-admi.component.css']
})

export class PagosAdmiComponent {
  search_value: string = "";
  alumno_id!: string;
  nombre!: string;
  apellido!: string;
  changingValue: string="";
  showVerAlumnos: boolean = false;
  
  constructor(
    private route:ActivatedRoute,
    private buscarAlumnoService: BuscarAlumnoService

  ) { }
    // Al apretar el boton de buscar capturo el input ingresado y lo envio al servicio de buscar alumnos
    capture_search_value(search_value: string) {
      // Muestro la tabla de alumnos encontrados
      this.showVerAlumnos = true
      console.log('Response from service:', search_value);
      this.buscarAlumnoService.retrieve_search_value(search_value);
      this.changingValue= search_value;

    }



}