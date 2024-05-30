from flask_restful import Resource
from flask import request, jsonify
from main.models import PlanificacionModel, ClaseModel
from datetime import datetime
from sqlalchemy import desc
from .. import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import role_required

# Defino el recurso planificacioN
class Planificacion(Resource):
    @role_required(roles=["admin", "profesor", "alumno"])
    def get(self, id):
        planificacion = db.session.query(PlanificacionModel).get_or_404(id)
        current_identity = get_jwt_identity()
        if current_identity:
            return planificacion.to_json()
        else:
            return planificacion.to_json_short()

    @role_required(roles=["admin", "profesor"])
    def delete(self, id):
        planificacion = db.session.query(PlanificacionModel).get_or_404(id)
        db.session.delete(planificacion)
        db.session.commit()
        return '', 204

    @role_required(roles=["admin", "profesor"])
    def put(self, id):
        planificacion = db.session.query(PlanificacionModel).get_or_404(id)
        data = request.get_json()

        for key, value in data.items():
            #si el atributo fecha esta en el json que envio como parametro
            #convierte el string en formato fecha
            try:
                if key == 'fecha':
                    value = datetime.strptime(value, "%Y-%m-%d")
            except ValueError:
                return {"message": "Formato incorrecto en la fecha [yyyy-dd-mm]."}, 400
                                
            setattr(planificacion, key, value)

        db.session.add(planificacion)
        db.session.commit()

        # Verificar si se asocia una clase
        jsonplanificacion = planificacion.to_json()
        if 'id_Clase' in jsonplanificacion and jsonplanificacion['id_Clase'] is not None:
            clase_id = jsonplanificacion['id_Clase']
            clase_asociada = db.session.query(ClaseModel).get_or_404(clase_id)

            # Verificar si la clase no está ya asociada
            if planificacion not in clase_asociada.planificacionclases:
                clase_asociada.planificacionclases.append(planificacion)

            db.session.add(planificacion)
            db.session.commit()

        return planificacion.to_json(), 201

# Defino el recurso planificacioneS
class Planificaciones(Resource):
    
    #Obtenemos la coleccion de planificaciones
    @role_required(roles = ["admin","profesor","alumno"])
    def get(self):
        page = 1
        per_page = 4
        planificaciones = db.session.query(PlanificacionModel)

        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))

        #solo traemos la planificacion mas reciente a la pagina
        if request.args.get('get_by_date'):
            planificaciones = planificaciones.order_by(desc(PlanificacionModel.fecha))

        planificaciones = planificaciones.paginate(page=page, per_page=per_page, error_out=True, max_per_page=4)

        #Filtro las planificaciones segun el id del usuario
        #Consul en SQL
        #SELECT p*
        #FROM UsuarioAlumno ua
        #JOIN AlumnosClase ac ON ua.id_usuario = ac.id_alumnos
        #JOIN Clase c ON ac.id_clases = c.id_clases
        #JOIN Planificaciones_Clase pc ON c.id_clases = pc.id_clases
        #JOIN Planificaciones p ON pc.id_planificaciones = p.id_planificaciones
        #WHERE ua.id_usuario = <ID_DEL_ALUMNO>;

        # Luego, puedes devolver el resultado como JSON
        return jsonify({'planificaciones': [planificacion.to_json() for planificacion in planificaciones],
                        'total': planificaciones.total,
                        'pages': planificaciones.pages,
                        'page': page
        })

    # Insertamos una nueva planificacion
    @role_required(roles = ["admin","profesor"])
    def post(self):
        jsonplanificaciones = request.get_json()
        planificaciones = PlanificacionModel.from_json(jsonplanificaciones)
        db.session.add(planificaciones)

        # Verificar si se asocia una clase
        if 'id_Clase' in jsonplanificaciones and jsonplanificaciones['id_Clase'] is not None:
            clase_asociada = db.session.query(ClaseModel).get_or_404(jsonplanificaciones['id_Clase'])
            clase_asociada.planificacionclases.append(planificaciones)

        db.session.commit()
        return planificaciones.to_json(), 201
