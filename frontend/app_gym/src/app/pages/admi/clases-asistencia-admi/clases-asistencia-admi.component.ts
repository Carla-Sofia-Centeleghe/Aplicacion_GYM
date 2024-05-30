import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerClasesService } from 'src/app/services/clases/ver-clases.service';
import { BuscarAlumnoService } from 'src/app/services/alumnos/buscar-alumno.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-clases-asistencia-admi',
  templateUrl: './clases-asistencia-admi.component.html',
  styleUrls: ['./clases-asistencia-admi.component.css'],
  
})

export class ClasesAsistenciaAdmiComponent{
  arrayAsistencia: any;
  //variable que utiliza el servicio para traer los resultados del query de busqueda
  search_value: string = "";
  //variables para mostrar profesor o alumno segun sea el caso de lo seleccionado
  showVerAlumnos: boolean = false;
  //variable que comparte el componente padre e hijo para saber si tuvo cambios el campo de busqueda
  changingValue: string="";
  //variable de bandera que comparte el padre con sus componentes hijos para saber si se agrego un nuevo alumno
  editflag: boolean = false;
  
  constructor(private router: Router,
    private route: ActivatedRoute,
    private asistencia: VerClasesService,
    private buscarAlumnoService: BuscarAlumnoService,
    private jwtHelper: JwtHelperService,
  ) { }
  

    //Al apretar el boton de buscar capturo el input ingresado y lo envio al servicio de buscar alumnos
    capture_search_value(search_value: string) {
      //muestro la tabla de alumnos encontrados
      this.showVerAlumnos = true
      console.log('Response from service:', search_value);
      this.buscarAlumnoService.retrieve_search_value(search_value);
      this.changingValue= search_value;
    }
    
  ngOnInit() {
    // Traigo las asistencias de las clases
      this.asistencia.getAsistencia().subscribe((data: any) => {
        console.log('JSON data', data);
        console.log('arrayAsistencia:', data.usuarios); 
        this.arrayAsistencia = data.usuarios;
      }); 
  }

  seleccionarclase(clase_id:any): void {
    this.asistencia.retrieve_clase_id(clase_id); //guardo el id de la clase para posteriormente saber que traer
    console.log(clase_id)
    this.router.navigate(['/clases-todas'] ); 
  
  }

  //Uso metodo para quitar de la vista buscar alumno y boton de eliminar 

  get isToken(){
    return localStorage.getItem('token');
  }

  decodeToken(): string {
    const token = this.isToken;

    //typescript al ser tipado fuerte no soporta parametros que puedan ser nulos
    if (token) {
      try {
        const decodedToken: any = this.jwtHelper.decodeToken(token);
        //decodifico token y me quedo solo con el rol
        const role: string = decodedToken?.rol || '';
        return role;
      } catch (error) {
        //atrapo posible error en la decodificacion del token
        console.error('Error decoding token:', error);
        return '';
      }

    } else {
      console.error('No token found.');
      return '';
    }
  }


}