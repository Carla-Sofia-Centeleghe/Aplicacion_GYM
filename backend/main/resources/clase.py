from flask_restful import Resource
from flask import request
from flask import jsonify
from .. import db
from main.models import ClaseModel, UsuarioModel, UsuariosAlumnosModel
from sqlalchemy import func, desc, asc
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import role_required

#Recurso Profesor
class ProfesorClase(Resource):
    
    def get(self,id):
        clase= db.session.query(ClaseModel).get_or_404(id)
        return clase.to_json()
        
    def get_asistencia(self, id):
        clase = db.session.query(ClaseModel).get_or_404(id)
        
        # Obtener la lista de asistencias para la clase
        asistencias = (
            db.session.query(UsuarioModel.id_Usuario, UsuarioModel.nombre, UsuarioModel.apellido)
            .join(UsuariosAlumnosModel, UsuariosAlumnosModel.id_Usuario == UsuarioModel.id_Usuario)
            .filter(UsuariosAlumnosModel.id_Clase == id)
            .all()
        )

        # Formatear la lista de asistencias como JSON
        asistencias_json = [
            {
                'id_Usuario': id_usuario,
                'nombre': nombre,
                'apellido': apellido
            }
            for id_usuario, nombre, apellido in asistencias
        ]

        return jsonify({'asistencias': asistencias_json})


#Coleccion de recurso Profesores
class ProfesorClases(Resource):
  
    @role_required(roles = ["admin","profesor","alumno"]) 
    def get(self): # Para obtener la paginacion en el recurso get
        page = 1
        per_page = 10
        clases = db.session.query(ClaseModel)

        clases = clases.paginate(page=page, per_page=per_page, error_out=True, max_per_page=10)

        if request.args.get('page'): # Si se pasa el parametro page en la url
            page = int(request.args.get('page'))

        if request.args.get('per_page'): # Si se pasa el parametro per_page en la url
            per_page = int(request.args.get('per_page'))

        # Traemos las 10 clases ordenadas por la que comience mas temprano
        if request.args.get('get_by_start_hour'):
            clases = clases.order_by(asc(ClaseModel.horaInicio))

        if request.args.get('view_preview'): 
            preview = [clase.to_json_preview() for clase in clases]
            return jsonify ({'clases': preview,
                  'total': clases.total,
                  'pages': clases.pages,
                  'page': page
                })
        
        # Traemos las clases en la que estan inscriptos los alumnos
        if request.args.get('view_student_classes'): 
            usuarios_query = (
                db.session.query(UsuarioModel.id_Usuario, UsuarioModel.nombre, UsuarioModel.apellido)
                .join(UsuariosAlumnosModel, UsuariosAlumnosModel.id_Usuario == UsuarioModel.id_Usuario)
                .join(ClaseModel, UsuariosAlumnosModel.id_Clase == ClaseModel.id_Clase)
                .filter(ClaseModel.id_Clase == request.args.get('view_student_classes'))
            )

            usuario_list = [
                {
                    'id_Usuario': id_usuario,
                    'nombre': nombre,
                    'apellido': apellido
                }
                for id_usuario, nombre, apellido in usuarios_query.all()
            ]

            return jsonify({'usuarios': usuario_list})

        #Paginacion
        if request.args.get('view_full'):
            full = [clase.to_json_full_view() for clase in clases]
            return jsonify ({'clases': full,
                  'total': clases.total,
                  'pages': clases.pages,
                  'page': page
                })

        return jsonify ({'clases': [clase.to_json() for clase in clases],
                  'total': clases.total,
                  'pages': clases.pages,
                  'page': page
                })


    #Crear una nueva clase
    def post(self):
        clase = ClaseModel.from_json(request.get_json())
        db.session.add(clase)
        db.session.commit()
        return clase.to_json(), 201
    
    def getAsistencia(self):
        # Obtener el ID de la clase desde los parámetros de la solicitud
        clase_id = request.args.get('clase_id')

        # Validar que se proporcionó el ID de la clase
        if not clase_id:
            return jsonify({'error': 'Se requiere el ID de la clase para obtener la asistencia'}), 400

        # Llamar al método get_asistencia de la clase ProfesorClase
        return ProfesorClase().get_asistencia(clase_id)