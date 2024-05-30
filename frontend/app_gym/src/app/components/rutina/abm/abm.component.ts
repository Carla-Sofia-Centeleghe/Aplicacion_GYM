import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { AbmRutinaService } from 'src/app/services/rutina/abm-rutina.service';

@Component({
  selector: 'app-abm',
  templateUrl: './abm.component.html',
  styleUrls: ['./abm.component.css']
})
export class AbmComponent {

  hashRutinas: any;

  constructor(private router: Router,
    private jwtHelper: JwtHelperService,
    private abm_rutina: AbmRutinaService ) { }
  
  get isToken(){
    return localStorage.getItem('token');
  }

  ngOnInit() {
    // Traigo las rutinas
    this.abm_rutina.getRutina().subscribe((data:any) =>{
      console.log('JSON data', data);
      console.log(data.planificaciones)
      this.hashRutinas = data.planificaciones;
    })
  }


  handleButtonClick(): void {
    this.router.navigate(['/editar-rutina']); 
    }
  
  confirmDelete(rutinaId: number): void {
    const confirmed = window.confirm('Estás seguro de que deseas borrar esta rutina?');
    if (confirmed) {
      // Si confirma el borrado, invoco al servicio de borrar rutina
      this.abm_rutina.deleteRutina(rutinaId).subscribe({
        next: () => {
          console.log('Rutina eliminada con éxito.');
          this.router.navigate(['/alumnos']); // Redirecciono a buscar rutina
        },
        error: (error) => {
          console.error('Error al eliminar el rutina:', error);
          alert('Error al eliminar el rutina. Por favor, intenta de nuevo más tarde.');
        },
        complete: () => {
          console.info('Operación de eliminación completa.');
        }
      });
    } else {
      // Se cancela la confirmacion de borrar rutina y regresa al formulario
    }
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
