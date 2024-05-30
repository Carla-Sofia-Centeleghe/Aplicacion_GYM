#Cambiar el nombre en la importación para clarificar y evitar conflictos
from .usuario import Usuario as UsuarioResource
from .usuario import Usuarios as UsuariosResource

from .usuariosalumnos import UsuarioAlumno as UsuarioAlumnoResource
from .usuariosalumnos import UsuariosAlumnos as UsuariosAlumnosResource
from .usuariosalumnos import UsuariAlumno as UsuariAlumnoResource

from .usuarioprofesor import UsuarioProfesor as UsuarioProfesorResource
from .usuarioprofesor import UsuariosProfesores as UsuariosProfesoresResource

from .planificacion import Planificacion as PlanificacionResource
from .planificacion import Planificaciones as PlanificacionesResource

from .clase import ProfesorClases as ProfesorClasesResource
from .clase import ProfesorClase as ProfesorClaseResource

from .pago import Pago as PagoResource
from .login import Login as LoginResource
