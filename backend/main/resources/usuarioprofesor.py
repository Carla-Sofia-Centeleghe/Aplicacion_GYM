from flask_restful import Resource
from flask import request
from flask import jsonify
from .. import db
from main.models import UsuarioProfesorModel, UsuarioModel
from main.models import UsuariosAlumnosModel
from main.models import ClaseModel
from sqlalchemy import func, desc, asc, or_
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import role_required

# Defino el recurso UsuariOProfesoR
class UsuarioProfesor(Resource):
    
    #Obtenemos el Recurso
    @role_required(roles = ["admin"])
    def get(self, id):
        usuarioprofesor = db.session.query(UsuarioProfesorModel).get_or_404(id)
        current_identity = get_jwt_identity()

        if current_identity:
            return usuarioprofesor.to_json_complete()
        else:
            return usuarioprofesor.to_json()
    
    # Modificamos el Recurso PROFESOR
    @role_required(roles = ["admin"])
    # Modificar recurso
    def put(self, id):
        usuarioprofesor = db.session.query(UsuarioProfesorModel).get_or_404(id)
        data = request.get_json().items()
        for key,value in data:
            setattr(usuarioprofesor,key,value)

        db.session.add(usuarioprofesor)
        db.session.commit()

        # Se modifica un profesor y se le asocia una clase , si es que se le asigna una clase (id_Clase)
        jsonprofesores=usuarioprofesor.to_json()
        if 'id_Clase' in jsonprofesores and jsonprofesores['id_Clase'] is not None :
            # Se realiza dicha asociacion
            clase_asociada=db.session.query(ClaseModel).get_or_404(jsonprofesores['id_Clase'])
            clase_asociada.profesorclases.append(usuarioprofesor)

        db.session.add(usuarioprofesor)
        db.session.commit()

        return usuarioprofesor.to_json(),201
    
    # Eliminar recurso
    @role_required(roles = ["admin"])
    def delete(self, id):
        usuariosprofesores = db.session.query(UsuarioProfesorModel).get_or_404(id)
        db.session.delete(usuariosprofesores)
        db.session.commit()
        return '',204

# Coleccion de recurso UsuarioSProfesoreS
class UsuariosProfesores(Resource):
    #obtener lista de los alumnos
    @role_required(roles = ["admin","profesor","alumno"])
    def get(self):
        page = 1
        per_page = 10
        usuariosprofesores = db.session.query(UsuarioProfesorModel)

        # Paginacion
        if request.args.get('page'):
            page = int(request.args.get('page'))

        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))

        # Traemos profesores ordenados por id
        if request.args.get('get_by_id'):
            usuariosprofesores = usuariosprofesores.order_by(asc(UsuarioProfesorModel.id_Profesor))

        if request.args.get('view_profe'):
            view_profes = [usuarioprofesor.to_json_view() for usuarioprofesor in usuariosprofesores]
            return jsonify(view_profes)
        
        # Traigo el usuario profesor puntual que deseo dar de alta editar o borrar
        if request.args.get('user_abm'):
            usuariosprofesores= usuariosprofesores.filter(UsuarioProfesorModel.id_Usuario == request.args.get('user_abm'))

        # Aqui traemos las clases que dicta el profesor logueado
        if request.args.get('view_clases_dictadas'):
            view_clases_dictadas = db.session.query(ClaseModel).join(UsuarioProfesorModel, UsuarioProfesorModel.id_Clase == ClaseModel.id_Clase ).filter(UsuarioProfesorModel.id_Profesor == int(request.args.get('view_clases_dictadas')))
            view_catedra_impartida = [clase.to_json() for clase in view_clases_dictadas]
            
            return jsonify(view_catedra_impartida)

        # Aqui traemos los alumnos de la clase seleccionada por el profe que esta logueado
        if request.args.get('view_alumnos_clases'):     
            view_alumnos_clases = db.session.query(UsuariosAlumnosModel).join(UsuarioProfesorModel, UsuarioProfesorModel.id_Clase == ClaseModel.id_Clase ).join(ClaseModel, ClaseModel.id_Clase == UsuariosAlumnosModel.id_Clase ).filter(UsuarioProfesorModel.id_Clase == int(request.args.get('view_alumnos_clases')))
            view_alumno_clase = [usuarioalumno.to_json() for usuarioalumno in view_alumnos_clases]
            
            return jsonify(view_alumno_clase)

        usuariosprofesores = usuariosprofesores.paginate(page=page, per_page=per_page, error_out=True, max_per_page=10)

        # Consulta par la lupita de busqueda
        if request.args.get('search'):
            
            # Defino la variable de busqueda, utilizo el metodo like para buscar coincidencias
            search_param = request.args.get('search')
            usuarios_query_search = (
                db.session.query(UsuarioModel)
                .join(UsuarioProfesorModel , UsuarioProfesorModel.id_Usuario == UsuarioModel.id_Usuario)
                .filter(
                or_(
                    UsuarioModel.nombre.like(f'%{search_param}%'),
                    UsuarioModel.apellido.like(f'%{search_param}%')  )
                           
                )
            )
            # Paginacion del filtro de busqueda
            return jsonify ({'profesores': [usuarioprofesor.to_json_full_name() for usuarioprofesor in usuarios_query_search],
                  'total': usuariosprofesores.total,
                  'pages': usuariosprofesores.pages,
                  'page': page
                })
       
        # Paginacion de la consulta general
        return jsonify ({'profesores': [usuarioprofesor.to_json() for usuarioprofesor in usuariosprofesores],
                  'total': usuariosprofesores.total,
                  'pages': usuariosprofesores.pages,
                  'page': page
                })

    # Insertar profesor, es decir creo al profesor
    @role_required(roles = ["admin"])
    def post(self):
        jsonprofesores=request.get_json()
        usuariosprofesores = UsuarioProfesorModel.from_json(jsonprofesores)

        # En esta parte del codigo compruebo si profesor se le asigna una clase al momento de darlo de alta
        # como es opcional, si no se ingresa clase simplemente no lo asocia
        if 'id_Clase' in jsonprofesores and jsonprofesores['id_Clase'] is not None :
            print(jsonprofesores['id_Clase'])
            clase_asociada=db.session.query(ClaseModel).get_or_404(jsonprofesores['id_Clase'])
            clase_asociada.profesorclases.append(usuariosprofesores)

        db.session.add(usuariosprofesores)
        db.session.commit()
        return usuariosprofesores.to_json(),201    

