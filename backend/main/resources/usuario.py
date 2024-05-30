from flask_restful import Resource
from flask import request
from flask import jsonify
from .. import db
from main.models import UsuarioModel #UsuariosAlumnosModel
from sqlalchemy import func, desc, or_
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import role_required

#Defino el recurso UsuariO
class Usuario(Resource): 
    
    #obtener recurso
    @role_required(roles = ["admin","profesor","alumno"]) 
    def get(self, id):
        usuario = db.session.query(UsuarioModel).get_or_404(id)
        current_identity = get_jwt_identity()
        # si el rol tiene permiso le devuelve json completo
        if current_identity:
            return usuario.to_json_complete()
        else:
            return usuario.to_json()
        
    @role_required(roles = ["admin","profesor","alumno"])
    def put(self, id):
        usuario = db.session.query(UsuarioModel).get_or_404(id)
        data = request.get_json().items()
        for key,value in data:
            setattr(usuario, key, value)
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201
    
    @role_required(roles = ["admin","profesor"])
    def delete(self, id):
        usuario = db.session.query(UsuarioModel).get_or_404(id)
        db.session.delete(usuario)
        db.session.commit()
        return '',204


#Coleccion de recurso UsuarioS
class Usuarios(Resource):
    # Obtener lista de usuarios
    @role_required(roles = ["admin","profesor"])
    def get(self):
        usuarios = db.session.query(UsuarioModel).all()

        if request.args.get('get_full_name'): # Devuelve solo nombre y apellido
            full_names = [usuario.to_json_full_name() for usuario in usuarios]
            return jsonify(full_names)


        if request.args.get('get_max_id'): # Devuelve el id maximo
            max_id = db.session.query(func.max(UsuarioModel.id_Usuario)).scalar()
            return max_id

        if request.args.get('GetDNI'): # Devuelve si existe el dni
            existe = db.session.query(UsuarioModel).filter(UsuarioModel.dni.like(request.args.get('GetDNI'))).count() > 0
            if existe == True:
                return existe
            return False
        
        if request.args.get('GetEmail'): # Devuelve si existe el email
            existe = db.session.query(UsuarioModel).filter(UsuarioModel.mail.like(request.args.get('GetEmail'))).count() > 0
            if existe == True:
                return existe
            return False

        return jsonify([usuario.to_json_complete() for usuario in usuarios])
    
    #insertar recurso
    @role_required(roles = ["admin","profesor"])
    def post(self):
        usuario = UsuarioModel.from_json(request.get_json())
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201
    
       

        
     