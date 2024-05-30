import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { inject } from '@angular/core';

export const profesessionGuard: CanActivateFn = (route, state) => {
  // Injectar el servicio Router, para poder redirigir a otras rutas
  const router : Router = inject(Router);
  const token = localStorage.getItem('token');
  const jwtHelper: JwtHelperService = inject (JwtHelperService);

  // Verificar si el token existe para profesor o admin, si no existe redirigir a la ruta home
  if(token){
    const decodedToken: any = jwtHelper.decodeToken(token);
    const role: string = decodedToken?.rol || '';
    if (role === "profesor" || role === "admin" ){

      return true;
      }

    router.navigateByUrl('home') // Redirigir a la ruta home adecuada segun el rol
    return false;
  }
  else{
    router.navigateByUrl('home')
    return false;
  }
  

};

