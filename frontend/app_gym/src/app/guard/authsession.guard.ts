import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authsessionGuard: CanActivateFn = (route, state) => {
  // Injectar el servicio Router, para poder redirigir a otras rutas
  const router : Router = inject(Router);
  const token = localStorage.getItem('token');
  // Verificar si el token existe, si no existe redirigir a la ruta home 
  if(!token){
    router.navigateByUrl('home')
    return false;
    }
  else {
    return true;


  }
  
};
