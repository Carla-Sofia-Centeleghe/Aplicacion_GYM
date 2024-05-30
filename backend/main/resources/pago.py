from flask_restful import Resource
from flask import request

#Clase que no se usa
class Pago(Resource): 
    def get(self, id):

        if int(id) in PAGO:
            return PAGO[int(id)]
 
        return '', 404
    
    def put(self, id):

        if int(id) in PAGO:
            pago = PAGO[int(id)]
            data = request.get_json()
            pago.update(data)
            return '', 201
        return '', 404    