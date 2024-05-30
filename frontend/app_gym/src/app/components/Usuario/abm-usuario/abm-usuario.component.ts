import { Component } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AbmAlumnosService } from 'src/app/services/alumnos/abm-alumnos.service';
import { AbmProfesoresService } from 'src/app/services/profesores/abm-profesores.service';
import { AbmAdminService } from 'src/app/services/admin/abm-admin.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-abm-usuario',
  templateUrl: './abm-usuario.component.html',
  styleUrls: ['./abm-usuario.component.css']
})
export class AbmUsuarioComponent {
  abmalumno! : FormGroup;
  abmprofesor!: FormGroup;
  abmadmin!: FormGroup; 
  arrayAlumno:any;
  arrayProfesor:any;
  arrayAdmin:any;
  buttonId: number = 0;

  constructor(private router: Router,
              private jwtHelper: JwtHelperService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private abm_alumnos: AbmAlumnosService,
              private abm_profesores: AbmProfesoresService,
              private abm_admin: AbmAdminService ) {
                this.route.queryParams.subscribe(params => { 
                  this.buttonId = params['id'];
                });
              
                  this.abmalumno = this.formBuilder.group({
                    nombre: ['', Validators.required],
                    apellido: ['', Validators.required],
                    mail: ['', [Validators.required, Validators.email]],
                    documento: ['', Validators.required],
                    telefono: ['', Validators.required],
                    password: ['', Validators.required],
                    edad: ['', Validators.required],
                    sexo: ['', Validators.required],
                  });

                  this.abmprofesor = this.formBuilder.group({
                    nombre: ['', Validators.required],
                    apellido: ['', Validators.required],
                    mail: ['', [Validators.required, Validators.email]],
                    documento: ['', Validators.required],
                    telefono: ['', Validators.required],
                    password: ['', Validators.required],
                    edad: ['', Validators.required],
                    sexo: ['', Validators.required],
                    titulo : ['', Validators.required],
                    disponibilidad : ['', Validators.required],
                  });

                  this.abmadmin = this.formBuilder.group({
                    nombre: ['', Validators.required],
                    apellido: ['', Validators.required],
                    mail: ['', [Validators.required, Validators.email]],
                    documento: ['', Validators.required],
                    telefono: ['', Validators.required],
                    password: ['', Validators.required],
                    edad: ['', Validators.required],
                    sexo: ['', Validators.required],
                  });                  

              }              

  ngOnInit() {
    //Traigo los datos del usuario que deseo editar
    if (this.mybuttonId== 1){
      this.abm_alumnos.getUsers().subscribe((data: any) => {
        console.log('JSON data', data);
        this.arrayAlumno = data.alumnos;
        //Coloco sus atributos en los campos del formulario
        this.abmalumno = this.formBuilder.group({
          nombre: [this.arrayAlumno[0].alumno_detalle.nombre, [Validators.required]],    
          apellido: [this.arrayAlumno[0].alumno_detalle.apellido, [Validators.required]],
          mail : [this.arrayAlumno[0].alumno_detalle.mail, [Validators.required,Validators.email]],        
          telefono : [this.arrayAlumno[0].alumno_detalle.telefono, [Validators.required,Validators.minLength(1), Validators.maxLength(25)]],        
          documento : [this.arrayAlumno[0].alumno_detalle.dni, [Validators.required,Validators.minLength(1), Validators.maxLength(25)]],   
          edad : [this.arrayAlumno[0].alumno_detalle.edad, [Validators.required,Validators.minLength(1), Validators.maxLength(5)]],         
          sexo : [this.arrayAlumno[0].alumno_detalle.sexo, Validators.required],        

        });
      });
    }

    if (this.mybuttonId== 2){
      this.abm_profesores.getUsers().subscribe((data: any) => {
        console.log('JSON data', data);
        this.arrayProfesor = data.profesores;
        //Coloco sus atributos en los campos del formulario
        this.abmprofesor = this.formBuilder.group({
          nombre: [this.arrayProfesor[0].profesor_detalle.nombre, [Validators.required]],     
          apellido: [this.arrayProfesor[0].profesor_detalle.apellido, [Validators.required]],
          mail : [this.arrayProfesor[0].profesor_detalle.mail, [Validators.required,Validators.email]],        
          telefono : [this.arrayProfesor[0].profesor_detalle.telefono, [Validators.required,Validators.minLength(1), Validators.maxLength(25)]],         
          documento : [this.arrayProfesor[0].profesor_detalle.dni, [Validators.required,Validators.minLength(1), Validators.maxLength(25)]],    
          edad : [this.arrayProfesor[0].profesor_detalle.edad, [Validators.required,Validators.minLength(1), Validators.maxLength(5)]],      
          sexo : [this.arrayProfesor[0].profesor_detalle.sexo, Validators.required], 
          titulo : [this.arrayProfesor[0].titulo, Validators.required],
          disponibilidad : [this.arrayProfesor[0].disponibilidad, Validators.required]

        });
      });
    }
      
    if (this.mybuttonId== 3){
      this.abm_admin.getUser(this.decodeToken()).subscribe((data: any) => {
        console.log('JSON data', data);
        this.arrayAdmin = data;
        //Coloco sus atributos en los campos del formulario
        this.abmadmin = this.formBuilder.group({
          nombre: [this.arrayAdmin.nombre, [Validators.required]],   
          apellido: [this.arrayAdmin.apellido, [Validators.required]],
          mail : [this.arrayAdmin.mail, [Validators.required,Validators.email]],      
          telefono : [this.arrayAdmin.telefono, [Validators.required,Validators.minLength(1), Validators.maxLength(25)]],         
          documento : [this.arrayAdmin.dni, [Validators.required,Validators.minLength(1), Validators.maxLength(25)]],   
          edad : [this.arrayAdmin.edad, [Validators.required,Validators.minLength(1), Validators.maxLength(5)]],        
          sexo : [this.arrayAdmin.sexo, Validators.required],        

        });
      });
    }

  }
  
  get mybuttonId(){
    return this.buttonId
  }

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
        const user_id: string = decodedToken?.id_Usuario || '';
        return user_id;
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

  //Boton de confirmacion para borrar usuario
  confirmDelete_User(userId: number): void {
    const confirmed = window.confirm('Estás seguro de que deseas borrar este usuario?');
    if (confirmed) {
      // Si confirma el borrado, invoco al servicio de borrar usuario
      this.abm_alumnos.deleteUser(userId).subscribe({
        next: () => {
          console.log('Usuario eliminado con éxito.');
          this.router.navigate(['/home']); // Redirecciono a buscar usuario
        },
        error: (error) => {
          console.error('Error al eliminar el usuario:', error);
          alert('Error al eliminar el usuario. Por favor, intenta de nuevo más tarde.');
        },
        complete: () => {
          console.info('Operación de eliminación completa.');
        }
      });
    } else {
      // Se cancela la confirmacion de borrar usuario y regresa al formulario
    }
  }

    //Boton de guardar cambios generales
    submit_user(userId: number): void {
      //Me aseguro antes que el formulario tenga valores validos antes de enviar

      if (this.abmadmin.valid) {
        console.log('Form login: ', this.abmadmin.value);
        this.editStudent(this.abmadmin.value, userId);
      } else {
        alert('Formulario inválido');
        console.log('Form login: ', this.abmadmin.value);
      }
    }

    //Boton de guardar cambios para los alumnos
    submit_student(userId: number): void {
      //Me aseguro antes que el formulario tenga valores validos antes de enviar
      if (this.abmalumno.valid) {
        console.log('Form login: ', this.abmalumno.value);
        this.editStudent(this.abmalumno.value, userId);
      } else {
        alert('Formulario inválido');
      }
    }

    //Boton de guardar cambios para los profesores
    submit_teacher(userId: number,teacher_id: number): void {
      //Me aseguro antes que el formulario tenga valores validos antes de enviar
      if (this.abmprofesor.valid) {
        console.log('Form login: ', this.abmprofesor.value);
        this.editTeacher(this.abmprofesor.value, userId);
        this.editTeacherDetails(this.abmprofesor.value, teacher_id);
      } else {
        alert('Formulario inválido');
      }
    }

    //Traigo al servicio que invocara el PUT para editar usuarios
    editAdmin(dataUser: any = {}, userId: number): void {
      console.log('Comprobando credenciales');
      this.abm_admin.editUser(userId, dataUser).subscribe({
        next: () => {
          console.log(dataUser);
          this.router.navigateByUrl('/home');
          //Navego a la ruta abm-usuario luego de hacer la modificacion
        },
        error: (error) => {
          alert('Credenciales inválidas');
        },
        complete: () => {
          console.log('Operación de edición completa');
        }
      });
    }    



    //Traigo al servicio que invocara el PUT para editar alumnos
    editStudent(dataUser: any = {}, userId: number): void {
      console.log('Comprobando credenciales');
      this.abm_alumnos.editUser(userId, dataUser).subscribe({
        next: () => {
          console.log(dataUser);
          this.router.navigateByUrl('/abm-usuario');
          //Navego a la ruta abm-usuario luego de hacer la modificacion
        },
        error: (error) => {
          alert('Credenciales inválidas');
        },
        complete: () => {
          console.log('Operación de edición completa');
        }
      });
    }

    //Traigo al servicio que invocara el PUT para editar profesor
    editTeacher(dataUser: any = {}, userId: number): void {
      console.log('Comprobando credenciales');
      this.abm_profesores.editUser(userId, dataUser).subscribe({
        next: () => {
          console.log(dataUser);
          this.router.navigateByUrl('/abm-usuario');
          //Navego a la ruta abm-profesor luego de hacer la modificacion
        },
        error: (error) => {
          alert('Credenciales inválidas');
        },
        complete: () => {
          console.log('Operación de edición completa');
        }
      });
    } 

    //Servicio PUT para los detalles puntuales del profesor
    editTeacherDetails(dataUser: any = {}, userId: number): void {
      console.log('Comprobando credenciales');
      this.abm_profesores.editTeacher(userId, dataUser).subscribe({
        next: () => {
          console.log(dataUser);
          this.router.navigateByUrl('/abm-usuario');
          //Navego a la ruta abm-profesor luego de hacer la modificacion
        },
        error: (error) => {
          alert('Credenciales inválidas');
        },
        complete: () => {
          console.log('Operación de edición de profesor completa');
        }
      });
    }        
    
}