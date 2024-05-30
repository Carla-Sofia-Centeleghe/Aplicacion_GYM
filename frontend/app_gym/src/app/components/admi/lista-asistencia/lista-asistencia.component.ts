import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Router, Route } from '@angular/router';
import { VerClasesService } from 'src/app/services/clases/ver-clases.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-lista-asistencia',
  templateUrl: './lista-asistencia.component.html',
  styleUrls: ['./lista-asistencia.component.css']
})

export class ListaAsistenciaComponent implements OnChanges {

  @Input() classeditInput!: boolean;
  arrayAsistencia: any;


  constructor(private router: Router,
    private asistencia: VerClasesService,
    private jwtHelper: JwtHelperService
    ) { }


    ngOnInit() {
      console.log("Initial value: "+this.classeditInput)
      this.get_query()
    }

    ngOnChanges(changes: SimpleChanges): void {
      console.log("Refreshed value: "+this.classeditInput)
      this.get_query() 
    }

    get_query(){
      // Traigo las asistencias de las clases
      this.asistencia.getAsistencia().subscribe((data: any) => {
        console.log('JSON data', data);
        console.log('arrayAsistencia:', data.usuarios);
        this.arrayAsistencia = data.usuarios;
      }); 
    }


    borrarIdClase(userId: number): void {
      console.log(userId);
      
      this.asistencia.borrarIdClase(userId).subscribe({
        next: () => {
          console.log(userId);
        },
        error: (error) => {
          alert('Credenciales inválidas');
        },
        complete: () => {
          console.log('Operación de edición completa, id_clase null');
          //cada vez que se borra un item de la lista, refresca la lista
          this.get_query() 
        }
      });
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
