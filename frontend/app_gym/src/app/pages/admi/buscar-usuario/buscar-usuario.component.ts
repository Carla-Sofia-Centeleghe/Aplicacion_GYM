import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuscarAlumnoService } from 'src/app/services/alumnos/buscar-alumno.service';
import { BuscarProfesorService } from 'src/app/services/profesores/buscar-profesor.service';

@Component({
  selector: 'app-buscar-usuario',
  templateUrl: './buscar-usuario.component.html',
  styleUrls: ['./buscar-usuario.component.css']
})
export class BuscarUsuarioComponent {
  //variable que utiliza el servicio para traer los resultados del query de busqueda
  search_value: string = "";
  //variables para mostrar profesor o alumno segun sea el caso de lo seleccionado
  showVerProfesor: boolean = false;
  showVerAlumnos: boolean = false;
  //variable que comparte el componente padre e hijo para saber si tuvo cambios el campo de busqueda
  changingValue: string="";


  buttonId: number = 0;
  
    constructor(
      private route: ActivatedRoute,
      private buscarProfesorService: BuscarProfesorService,
      private buscarAlumnoService: BuscarAlumnoService,
      private router: Router) 
      {   //Este constructor me da el parametro del boton, 1 para buscar alumnos y 2 para profesor 
      this.route.queryParams.subscribe(params => { 
        this.buttonId = params['id'];
      });
      }


    //Obtengo el id del boton para saber que debo mostrar, si alumnos o si profesor
    get mybuttonId(){
      return this.buttonId
    }

    //Al apretar el boton de buscar capturo el input ingresado y lo envio al servicio de buscar alumnos
    capture_search_value(search_value: string) {
      //muestro la tabla de alumnos encontrados
      this.showVerAlumnos = true
      console.log('Response from service:', search_value);
      this.buscarAlumnoService.retrieve_search_value(search_value);
      this.changingValue= search_value;

    }

     //Al apretar el boton de buscar capturo el input ingresado y lo envio al servicio de buscar profesor
    captura_search_value(search_value: string) {
      //muestro la tabla de profesores encontrados
      this.showVerProfesor = true
      console.log('Response from service:', search_value);
      this.buscarProfesorService.retrieve_search_value(search_value);
      this.changingValue = search_value;
    }

    //Boton para dar de alta un alumno
    redirectToNuevoAlumno() {
      const buttonId = 1; // Id para buscar alumnos
      this.router.navigate(['/nuevo-usuario'] , { queryParams: { id: buttonId } });
    }

    //Boton para dar de alta un profesor
    redirectToNuevoProfesor() {
      const buttonId = 2; // Id para buscar alumnos
      this.router.navigate(['/nuevo-usuario'] , { queryParams: { id: buttonId } });
    }


  }