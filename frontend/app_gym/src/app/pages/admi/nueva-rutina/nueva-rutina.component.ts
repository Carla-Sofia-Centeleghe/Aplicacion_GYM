import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbmRutinaService } from 'src/app/services/rutina/abm-rutina.service';

@Component({
  selector: 'app-nueva-rutina',
  templateUrl: './nueva-rutina.component.html',
  styleUrls: ['./nueva-rutina.component.css']
})
export class NuevaRutinaComponent implements OnInit {
  rutinaForm!: FormGroup;
  hashRutinas: any;

  constructor(
    private router: Router,
    private abm_rutina: AbmRutinaService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // Inicializa el formulario
    this.rutinaForm = this.formBuilder.group({
      estado: [null, Validators.required],
      fecha: [null, Validators.required],
      detalles: [null, Validators.required]
    });
  }

  submit() {
    this.abm_rutina.getmaxid().subscribe((maxId: any) => {
      // Crear estudiante con el ID obtenido
      const rutinaData = { "id_planificacion": maxId+1 };
      // Asigno rol del alumno a mi abm usuario
      this.createRutina(this.rutinaForm.value);
    });
  }
  // Función para guardar la rutina
  // Boton de guardar cambios
  guardarRutina(): void {
    console.log("formulario:",this.rutinaForm.value)
    if (this.rutinaForm.valid) {
      // Si el formulario es válido, puede proceder con la solicitud POST
      this.createRutina(this.rutinaForm.value);
    } else {
      // El formulario no es válido, muestra un mensaje de error
      alert('Formulario inválido. Asegúrate de completar todos los campos.');
    }
  }

  // Traigo al servicio que invocará el PUT
  createRutina(rutinadata: any): void {
    console.log('Comprobando credenciales');
    console.log(rutinadata);
    this.abm_rutina.createRutina(rutinadata).subscribe({
      next: () => {
        console.log(rutinadata);
        this.router.navigateByUrl('/rutina-abm');
        // Navego a la ruta rutina-abm luego de hacer la modificación
      },
      error: (error) => {
        alert('Credenciales inválidas');
      },
      complete: () => {
        console.log('Operación de edición completa');
      }
    });
  }
}


