from flask_restful import Resource
from main.models import UsuarioModel
from .. import db
from flask import request

#Recurso Login
class Login(Resource):
    def post(self):
        usuario = UsuarioModel.from_json(request.get_json())
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201
