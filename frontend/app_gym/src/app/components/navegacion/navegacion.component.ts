import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent {
  
  verContactanos = true;
  verHome = true;
  verHorario = false;
  verIngresar = true;
  verMiPerfil = true;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    // Me fijo si la ruta es login y oculto funcionalidad

    if(this.router.url === '/contactanos') {
      this.verContactanos = false;
    }

    if(this.router.url === '/home') {
      this.verHome = false;
    }

    if(this.router.url === '/clase-puntual') {
      this.verHorario = true;
    }

    if(this.router.url === '/ingresar') {
      this.verIngresar = false;
    }

    if(this.router.url === '/abm-usuario') {
      this.verMiPerfil = false;
    }

  }
  get isToken(){
    return localStorage.getItem('token');
  }
  cerrarSesion(){
    this.authService.logout();
    this.router.navigateByUrl('home')
  }

  redirectToMiperfil() {
    const buttonId = 3; // Id para buscar alumnos
    this.router.navigate(['/usuario-abm'] , { queryParams: { id: buttonId } });
  }


}


