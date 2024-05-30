import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';



@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent {

  constructor(private jwtHelper: JwtHelperService,
              private router: Router) {}

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
  
  redirectToAlumnos() {
    const buttonId = 1; // Id para buscar alumnos
    this.router.navigate(['/buscar-usuario'] , { queryParams: { id: buttonId } });
  }

  redirectToProfesores() {
    const buttonId = 2; // Id para buscar profesores
    this.router.navigate(['/buscar-usuario'], { queryParams: { id: buttonId } });
  }

  
}
