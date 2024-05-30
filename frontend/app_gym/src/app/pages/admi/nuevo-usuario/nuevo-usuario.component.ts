import { Component } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { AbstractControl, AsyncValidatorFn , FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AbmAlumnosService } from 'src/app/services/alumnos/abm-alumnos.service';
import { AbmProfesoresService } from 'src/app/services/profesores/abm-profesores.service';
import { DocumentoServise } from 'src/app/services/DocumentoServise/documento-servise.service';
import { Observable, catchError, map, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})

@Injectable({ providedIn: 'root' })

export class NuevoUsuarioComponent {
  abmusuario! : FormGroup;
  abmprofesor! : FormGroup;
  arrayAlumno:any;
  arrayProfesor:any;
  buttonId: number = 0;

  constructor (
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private abm_alumnos: AbmAlumnosService,
    private documentoService: DocumentoServise,
    private abm_profesores: AbmProfesoresService)
     // Este constructor me da el parametro del boton, 1 para buscar alumnos y 2 para profesor 
     {
      this.route.queryParams.subscribe(params => { 
        this.buttonId = params['id'];
      });    
        this.abmusuario = this.formBuilder.group({ //Creo el formulario de usuario y sus validaciones
          nombre: ['', Validators.required],
          apellido: ['', Validators.required],
          mail: ['', [Validators.required, Validators.email], this.validateMailExistence()],
          telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
          dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)], this.validateDniExistence()],
          edad: ['', [Validators.required, Validators.min(13), Validators.max(99)]],
          sexo: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]],
        });

        this.abmprofesor = this.formBuilder.group({ //Creo el formulario de profesor y sus validaciones, esto solo e muetra si quiero crear un profesor
          titulo : ['', Validators.required],
          disponibilidad : ['', Validators.required],
        });
    }
    //Obtengo el id del boton para saber que debo mostrar, si alumnos o si profesor

  ngOnInit() {
    //Traigo los datos del usuario que deseo editar
        this.abmusuario= this.formBuilder.group({
          nombre: ['', Validators.required],
          apellido: ['', Validators.required],
          mail: ['', [Validators.required, Validators.email], this.validateMailExistence()],
          telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
          dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)], this.validateDniExistence()],
          edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
          sexo: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]],
      
        });
 
    if (this.mybuttonId== 2){ //Si el boton es 2, muestro el formulario de profesor
      this.abmprofesor= this.formBuilder.group({   
        titulo : [''],
        disponibilidad : ['',Validators.required]
      });

    }
  }

  get mybuttonId(){
    return this.buttonId
  }

  // Metodo para obtener los errores de los campos del formulario
  getErrorMessage(controlName: string): string {
    const control = this.abmusuario.get(controlName);
    const controlprofesor = this.abmprofesor.get(controlName);
    
    if (control?.hasError('required')) { 
      return 'Este campo es requerido';
    }
    if (controlprofesor?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('email')) {
      return 'Ingrese un correo electrónico válido';
    }
    if (control?.hasError('pattern')) {
      return 'Ingrese un formato válido';
    }
    if (control?.hasError('minlength')) {
      return 'La longitud mínima es de ' + control.errors?.['minlength'].requiredLength + ' caracteres';
    }
    if (control?.hasError('maxlength')) {
      return 'La longitud máxima es de ' + control.errors?.['maxlength'].requiredLength + ' caracteres';
    }
    if (control?.hasError('min')) {
      return 'El valor mínimo permitido es ' + control.errors?.['min'].min;
    }
    if (control?.hasError('max')) {
      return 'El valor máximo permitido es ' + control.errors?.['max'].max;
    }
    if (control?.hasError('dniExists')) {
      return 'Este DNI ya existe, ingrese otro';
    }
    if (control?.hasError('mailExists')) {
      return 'Este mail ya existe, ingrese otro';
    }
    return '';
  }

  submit() {
    if (this.mybuttonId== 1){
    // Me aseguro antes que el formulario tenga valores válidos antes de enviar
      if (this.abmusuario.valid) {
        console.log('Form nuevo usuario: ', this.abmusuario.value);
        // Obtengo la ID máxima de forma sincrónica
        this.abm_alumnos.getmaxid().subscribe((maxId: any) => {
          // Creao estudiante con el ID obtenido
          const currentDate = new Date(); // Obtengo la fecha actual
          const formattedDate = this.formatDate(currentDate); // Formateo la fecha
          const studentData = { "id_Usuario": maxId + 1, "estado_de_la_cuenta": "Al dia", "fecha_pago": formattedDate };
          // Asigno rol del alumno a mi abm usuario
          this.abmusuario.value["rol"] = "alumno";
          // Creo el usuario
          this.createUser(this.abmusuario.value, studentData);
        });
      } else {
        alert('Formulario inválido Alumno');
      }
    }
    // Si el boton es 2, muestro el formulario de profesor y valido que este completo
    if (this.mybuttonId == 2){         
      if (this.abmprofesor.valid) {
        console.log('Form nuevo profesor: ', this.abmprofesor.value);
        // Obtengo la ID máxima de forma sincrónica
        this.abm_profesores.getmaxid().subscribe((maxId: any) => {
        // Asigno rol del profesor a mi abm usuario
        this.abmusuario.value["rol"] = "profesor";
        // Asigno el ID del usuario
        this.abmprofesor.value.id_Usuario = maxId+1;
        // Creo el usuario
        this.createUser(this.abmusuario.value,this.abmprofesor.value)

        });
      } else { // Si el formulario no es válido, muestra un mensaje de alerta
        alert('Formulario inválido Profesor');
        }
  
      }
  }
  formatDate(date: Date): string {
    // Formateo la fecha a como la necesitamos (por ejemplo, 'dia-mes-año')
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  // Metodo para crear un usuario
  createUser(dataUser: any = {}, ownData: any = {}): void {
      console.log('Comprobando credenciales');
      this.abm_alumnos.createUser(dataUser).subscribe({
        next: () => {
          if (this.mybuttonId == 1){
            console.log(dataUser);
            // Crea el estudiante,luego de que se crea el usuario
            this.createStudent(ownData);
          }
          if (this.mybuttonId == 2){
            console.log(dataUser);
            // Crea el profesor, luego de que se crea el usuario
            this.createTeacher(ownData);  
          }
        },
        error: (error) => { // Si hay un error, muestra un mensaje de alerta
          alert('Error al crear usuario');
        },
        complete: () => {
          console.log('Operación de alta completa');
        }
      });
  }
  
  // Metodo para crear un estudiante
  createStudent(dataUser: any = {}): void {
    console.log('Comprobando credenciales');
    this.abm_alumnos.createStudent(dataUser).subscribe({
      next: () => {
        console.log(dataUser);
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        alert('Error al crear datos propios del alumno');
      },
      complete: () => {
        console.log('Operación de alta completa, se ha creado un nuevo alumno');
      }
    });
  }
 
  // Metodo para crear un profesor
  createTeacher(dataUser: any = {}): void {
    console.log('Comprobando credenciales');
    this.abm_profesores.createTeacher(dataUser).subscribe
    ({
      next: () => {
        console.log(dataUser);
        this.router.navigateByUrl('/home');
      },
      error: (error) => { // Si hay un error, muestra un mensaje de alerta
        alert('Error al crear datos propios del profesor');
      },
      complete: () => {
        console.log('Operación de alta completa, se ha creado un nuevo profesor');
      }
    });
  }

  // En este metodo se valida que el dni sea unico y no se repita con otro dni previamente cargado en la base de datos
  validateDniExistence(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const dni = control.value;
      return this.documentoService.checkDNI(dni).pipe(
        map(exists => (exists ? { dniExists: true } : null)),
        catchError(() => of(null)) // Captura el error, si es necesario
      );
    };
  }
   
  // En este metodo se valida que el mail sea unico y no se repita con otro mail previamente cargado en la base de datos
  validateMailExistence(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const mail = control.value;
      return this.documentoService.checkEMAIL(mail).pipe(
        map(exists => (exists ? { mailExists: true } : null)),
        catchError(() => of(null)) // Captura el error, si es necesario
      );
    };
  }
  
}