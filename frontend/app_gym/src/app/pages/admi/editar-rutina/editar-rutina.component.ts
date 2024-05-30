import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AbmRutinaService } from 'src/app/services/rutina/abm-rutina.service';

@Component({
  selector: 'app-editar-rutina',
  templateUrl: './editar-rutina.component.html',
  styleUrls: ['./editar-rutina.component.css']
})
export class EditarRutinaComponent implements OnInit {
  hashRutinas: any;
  rutinaForm!: FormGroup;
  buttonId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private abm_rutina: AbmRutinaService,
    private formBuilder : FormBuilder )
  {  
      this.rutinaForm = this.formBuilder.group({
        estado: ['', [Validators.required]],
        fecha: ['', [Validators.required]],
        detalles: ['', [Validators.required]]
      })
  }

  // Metodo que construye el formulario y invoca al servicio que trae las rutinas
  ngOnInit() {
    // Traigo las rutinas
    this.rutinaForm = this.formBuilder.group({
      estado: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      detalles: ['', [Validators.required]]
    })
    this.abm_rutina.getRutina().subscribe((data: any) => {
      console.log('JSON data', data);
      console.log(data.planificaciones[0]);
      this.hashRutinas = data.planificaciones[0];
      // Actualiza los valores del formulario con los datos obtenidos
      this.rutinaForm.setValue({
        estado: this.hashRutinas.estado,
        fecha: this.hashRutinas.fecha,
        detalles: this.hashRutinas.detalles
      });
     
    });
  }

  // Boton de guardar cambios
  guardado(): void {
    console.log("formulario:",this.rutinaForm.value)
    if (this.rutinaForm.valid) {
      // El formulario es válido, puedes proceder con la solicitud PUT
      this.putRutina(this.rutinaForm.value, this.hashRutinas.id_planificacion);
    } else {
      console.log("formulario:",this.rutinaForm.value)
      // El formulario no es válido, muestra un mensaje de error 
      alert('Formulario inválido. Asegúrate de completar todos los campos.');
    }
  }

  // Traigo al servicio que invocará el PUT
  putRutina(rutinadata: any = {}, rutinaId: number): void {
    console.log('Comprobando credenciales');
    console.log(rutinadata)
    
    this.abm_rutina.putRutina(rutinaId, rutinadata).subscribe({
      next: () => {
        console.log(rutinadata);
        this.router.navigateByUrl('/rutina-abm');
        console.log(rutinadata);
        // Navego a la ruta rutina-abm luego de hacer la modificación
      },
      error: (error) => {
        alert('Credenciales inválidas');
        console.log(rutinadata);
      },
      complete: () => {
        console.log('Operación de edición completa');
      }
    });
  }
}

