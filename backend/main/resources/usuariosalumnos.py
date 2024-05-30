from flask_restful import Resource
from flask import request
from flask import jsonify
from datetime import datetime
from .. import db
from main.models import UsuariosAlumnosModel, UsuarioModel
from main.models import ClaseModel
from sqlalchemy import func, desc, asc, or_
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import role_required
from sqlalchemy.exc import IntegrityError

#Defino el recurso UsuaroiOAlumnO
class UsuarioAlumno(Resource): 
    # Obtener recurso
    @role_required(roles = ["admin","profesor","alumno"])
    def get(self, id):
        usuariosalumnos = db.session.query(UsuariosAlumnosModel).get_or_404(id)
        current_identity = get_jwt_identity()
        if current_identity:
            return usuariosalumnos.to_json_complete()
        else:
            return usuariosalumnos.to_json()

    #eliminar recurso
    @role_required(roles = ["admin","profesor"])
    def delete(self, id):
        usuariosalumnos = db.session.query(UsuariosAlumnosModel).get_or_404(id)
        db.session.delete(usuariosalumnos)
        db.session.commit()
        return '',204

    #Modificar el recurso alumno, para la modificacion de la fecha y otros datos del alumno, con el id del alumno
    @role_required(roles = ["admin","profesor"])
    def put(self, id):
        usuariosalumnos = db.session.query(UsuariosAlumnosModel).get_or_404(id)
        data = request.get_json().items()
        for key,value in data:

        # Si el atributo fecha esta en el json que envio como parametro
        # Convierte el string en formato fecha
            try:
                if key == 'fecha_pago':
                    value = datetime.strptime(value, "%d-%m-%Y")
            except ValueError:
                return {"message": "Formato incorrecto en la fecha [dd-mm-yyyy]."}, 400
                                            
            setattr(usuariosalumnos,key,value)
        db.session.add(usuariosalumnos)
        db.session.commit()


        # Si se modifica un alumno y resulta ser que se le asigna una clase
        # Se realiza dicha asociacion
        jsonalumnos = usuariosalumnos.to_json()
        if 'id_Clase' in jsonalumnos and jsonalumnos['id_Clase'] is not None :

            clase_asociada=db.session.query(ClaseModel).get_or_404(jsonalumnos['id_Clase'])
            clase_asociada.alumnoclases.append(usuariosalumnos)

        db.session.add(usuariosalumnos)
        db.session.commit()

        return usuariosalumnos.to_json(),201

# Coleccion de recurso UsuarIAlumnO         
class UsuariAlumno(Resource): 
# Nuevo put para modificar al alumno con el Id_Usuario
    @role_required(roles=["admin", "profesor"])
    def put(self, id_usuario):
        # Buscar el usuario alumno por su Id_Usuario
        usuariosalumnos = db.session.query(UsuarioModel).filter_by(id_Usuario=id_usuario).first()
        
        if usuariosalumnos:
            # Si se encuentra el usuario, buscar su correspondiente registro de alumno
            usuariosalumnos = db.session.query(UsuariosAlumnosModel).filter_by(id_Usuario=id_usuario).first()
            
            if usuariosalumnos:
                # Si se encuentra el registro de alumno, actualizar sus datos
                data = request.get_json()
                
                for key, value in data.items():
                    setattr(usuariosalumnos, key, value)
                db.session.commit()

                return usuariosalumnos.to_json(), 201
            else:
                return jsonify({'message': 'El usuario no es un alumno'}), 404
          
        else:
            return jsonify({'message': 'Usuario no encontrado'}), 408
        
# Coleccion de recurso UsuarioSAlumnoS        
class UsuariosAlumnos(Resource):

    # Obtener lista de los alumnos
    @role_required(roles = ["admin","profesor"])
    def get(self):
        page = 1
        per_page = 4

        usuariosalumnos = db.session.query(UsuariosAlumnosModel)

        if request.args.get('page'):
            page = int(request.args.get('page'))

        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))

        # Traemos los alumnos ordenados por su estado de cuenta
        if request.args.get('get_by_status'):
            usuariosalumnos = usuariosalumnos.order_by(desc(UsuariosAlumnosModel.estado_de_la_cuenta))

        # Traigo el usuario alumno puntual que deseo dar de alta editar o borrar
        if request.args.get('user_abm'):
            usuariosalumnos= usuariosalumnos.filter(UsuariosAlumnosModel.id_Usuario == request.args.get('user_abm'))

        usuariosalumnos = usuariosalumnos.paginate(page=page, per_page=per_page, error_out=True, max_per_page=2)

        # Barra de busqueda
        if request.args.get('search'):
            search_param = request.args.get('search')
            page = int(request.args.get('page', 1))
            per_page = int(request.args.get('per_page', 4))  

            # Filtro por nombre o por apellido usando paginacion
            usuarios_query_search = (
                db.session.query(UsuarioModel)
                .join(UsuariosAlumnosModel, UsuariosAlumnosModel.id_Usuario == UsuarioModel.id_Usuario)
                .filter(
                    or_(
                        UsuarioModel.nombre.like(f'%{search_param}%'),
                        UsuarioModel.apellido.like(f'%{search_param}%')
                    )
                )
                .paginate(page=page, per_page=per_page)
            )

            search_results = usuarios_query_search.items

            # Paginacion de los resultados de la busqueda
            return jsonify({
                'alumnos': [usuario.to_json_full_name() for usuario in search_results],
                'total': usuarios_query_search.total,  
                'pages': usuarios_query_search.pages,  
                'page': usuarios_query_search.page  
            })

            #consulta original en SQL
            #SELECT usuario.nombre,usuario.apellido FROM usuario 
            #JOIN alumno ON (usuario.id = alumnno=id)
            #AND ( alumno.nombre LIKE '%sdfsd%' OR alumno.apellido LIKE '%sdfsd%'  )
            #search_result = [usuario.to_json_full_name() for usuario in usuarios_query_search]
            #Aplico el filtro de busqueda con paginacion

        # Paginacion de los alumnos general 
        return jsonify ({'alumnos': [usuarioalumno.to_json() for usuarioalumno in usuariosalumnos],
                  'total': usuariosalumnos.total,
                  'pages': usuariosalumnos.pages,
                  'page': page
                })


    @role_required(roles = ["admin","profesor"])
    # Insertar alumno, creo alumno
    def post(self):
        jsonalumnos = request.get_json()
        usuariosalumnos = UsuariosAlumnosModel.from_json(jsonalumnos)

        # En esta parte del codigo compruebo si alumno se le asigna una clase al momento de darlo de alta
        # Como es opcional, si no se ingresa clase simplemente no lo asocia
        if 'id_Clase' in jsonalumnos and jsonalumnos['id_Clase'] is not None :
            print(jsonalumnos['id_Clase'])
            clase_asociada=db.session.query(ClaseModel).get_or_404(jsonalumnos['id_Clase'])
            clase_asociada.alumnoclases.append(usuariosalumnos)

        db.session.add(usuariosalumnos)
        db.session.commit()
        return usuariosalumnos.to_json(),201