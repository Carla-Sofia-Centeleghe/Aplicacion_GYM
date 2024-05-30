import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authsessionGuard } from './guard/authsession.guard';

// Routeo de Usuario no registrado
import { HomeComponent } from './pages/home/home.component';
import { HistoriaComponent } from './pages/historia/historia.component';
import { ProfesoresComponent } from './pages/profesores/profesores.component';
import { ClasesComponent } from './pages/clases/clases.component';
import { ClasePuntualComponent } from './pages/clase-puntual/clase-puntual.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { IngresarComponent } from './pages/ingresar/ingresar.component';


// Routeo  de Usuario registrado
import { HorariosComponent } from './pages/horarios/horarios.component';
import { VerClaseComponent } from './components/clases/ver-clase/ver-clase.component';
import { AbmComponent } from './components/rutina/abm/abm.component';
import { PagosComponent } from './components/admi/pagos/pagos.component';
import { ClasesTodasComponent } from './pages/admi/clases-todas/clases-todas.component';
import { ClasesAsistenciaAdmiComponent } from './pages/admi/clases-asistencia-admi/clases-asistencia-admi.component';
import { AlumnosComponent } from './pages/admi/alumnos/alumnos.component';
import { PagosAdmiComponent } from './pages/admi/pagos-admi/pagos-admi.component';
import { PagosPuntualAdmiComponent } from './pages/admi/pagos-puntual-admi/pagos-puntual-admi.component';
import { RutinaAbmComponent } from './pages/admi/rutina-abm/rutina-abm.component';
import { NuevaRutinaComponent } from './pages/admi/nueva-rutina/nueva-rutina.component';
import { EditarRutinaComponent } from './pages/admi/editar-rutina/editar-rutina.component';
import { BuscarUsuarioComponent } from './pages/admi/buscar-usuario/buscar-usuario.component';
import { NuevoUsuarioComponent } from './pages/admi/nuevo-usuario/nuevo-usuario.component';
import { UsuarioAbmComponent } from './pages/admi/usuario-abm/usuario-abm.component';
import { adminsessionGuard } from './guard/adminsession.guard';
import { profesessionGuard } from './guard/profesession.guard';
import { alumnosessionGuard } from './guard/alumnosession.guard';



const routes: Routes = [
  // Routeo de Usuario no registrado
  {path: 'home', component: HomeComponent },
  {path: 'historia', component: HistoriaComponent},
  {path: 'profesores', component: ProfesoresComponent },
  {path: 'clases', component: ClasesComponent},
  {path: 'clase-puntual', component: ClasePuntualComponent},
  {path: 'contactanos', component: ContactanosComponent },
  {path: 'ingresar', component: IngresarComponent },
  {path: 'horarios', component: HorariosComponent },
  {path: '', redirectTo: '/home' , pathMatch: 'full' }, // Redirecciona al home por defecto
  {path: 'ver-clases', component: VerClaseComponent, canActivate: [profesessionGuard] },
  {path: 'ver-rutinas', component: AbmComponent, canActivate: [profesessionGuard] },
  {path: 'pagos', component: PagosComponent, canActivate:[ adminsessionGuard] },
  

  // Routeo  de Usuario registrado
  {path: 'clases-todas', component: ClasesTodasComponent, canActivate: [profesessionGuard] },
  {path: 'clases-asistencia-admi', component: ClasesAsistenciaAdmiComponent, canActivate: [profesessionGuard]  },
  {path: 'alumnos', component: AlumnosComponent , canActivate: [profesessionGuard]  },
  {path: 'pagos-admi', component: PagosAdmiComponent, canActivate:[ adminsessionGuard] },
  {path: 'pagos-puntual-admi', component: PagosPuntualAdmiComponent, canActivate:[ adminsessionGuard] },
  {path: 'rutina-abm', component: RutinaAbmComponent, canActivate: [alumnosessionGuard] },
  {path: 'nueva-rutina', component: NuevaRutinaComponent,canActivate: [profesessionGuard]  },
  {path: 'editar-rutina', component:  EditarRutinaComponent,canActivate: [profesessionGuard]  },
  {path: 'buscar-usuario', component: BuscarUsuarioComponent, canActivate: [profesessionGuard] }, // Compartidoo
  {path: 'nuevo-usuario', component: NuevoUsuarioComponent, canActivate: [profesessionGuard] },
  {path: 'usuario-abm', component: UsuarioAbmComponent, canActivate: [alumnosessionGuard] },

  {path: '**', redirectTo: 'home'}
  /* Crear una pagina de error 404 por defecto en linea de arriba */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
