from .. import db
from . import UsuarioModel
import json

# UsuarioProfesor Model
class UsuarioProfesor(db.Model):
    #Se define la tabla UsuarioProfesor con sus respectivos campos
    id_Usuario = db.Column(db.Integer,db.ForeignKey("usuario.id_Usuario"), nullable=False)
    id_Profesor = db.Column(db.Integer,primary_key=True)
    id_Clase = db.Column(db.Integer,nullable=True)
    descripcion = db.Column(db.Integer,nullable=True)
    enlace_foto_profesor = db.Column(db.String(50), nullable=True)
    disponibilidad = db.Column(db.String(80),nullable=False)
    titulo = db.Column(db.String(80),nullable=False)
    usuarioprofesor = db.relationship("Usuario", back_populates="profesor", uselist=False, single_parent=True)

    #defino la relacion con la tabla usuario
    def __repr__(self):
        return '<UsuarioProfesor: %r >' % (self.id_Profesor)
    
    def get_id_clase(self):
        return self.id_Clase
    
    #convierto objeto en json
    def to_json(self):
        self.usuarioprofesor = db.session.query(UsuarioModel).get_or_404(self.id_Usuario)
        usuario_json = {
            'id_Usuario' : self.id_Usuario,
            'id_Profesor' : self.id_Profesor,
            'id_Clase' : self.id_Clase,
            'descripcion' : self.descripcion,
            'disponibilidad' : str(self.disponibilidad),
            'titulo' : str(self.titulo),
            'profesor_detalle' : self.usuarioprofesor.to_json()

        }
        return usuario_json
    def to_json_view(self):
        usuario_json = {
            'descripcion' : self.descripcion ,
            'enlace_foto_profe' : self.enlace_foto_profesor,
            'nombre_profe' : self.usuarioprofesor.to_json_view_profe()
        }        
        return usuario_json
    
    def to_json_short(self):
        usuario_json = {
            'id_Usuario' : self.id_Usuario,
            'id_Profesor' : self.id_Profesor,
            'id_Clase' : self.id_Clase,
            'descripcion' : self.descripcion,
            'disponibilidad' : str(self.disponibilidad),
            'titulo' : str(self.titulo),  

        }
        return usuario_json
    

    def to_json_complete(self):
        self.usuarioprofesor = db.session.query(UsuarioModel).get_or_404(self.id_Usuario)
        usuarioprofesor_json = {
            'id_Usuario' : self.id_Usuario,
            'id_Profesor' : self.id_Profesor,
            'id_Clase' : self.id_Clase,
            'descripcion' : self.descripcion,
            'disponibilidad' : self.disponibilidad,
            'titulo' : self.titulo,
            'profesor_detalle' : self.usuarioprofesor.to_json() 
        }
        return usuarioprofesor_json
    

    @staticmethod
    #convertir json a objeto
    def from_json(usuario_json):
        id_Usuario = usuario_json.get('id_Usuario')
        id_Profesor = usuario_json.get('id_Profesor')
        id_Clase = usuario_json.get('id_Clase')
        descripcion = usuario_json.get('descripcion')
        disponibilidad = usuario_json.get('disponibilidad')
        titulo = usuario_json.get('titulo')
    
        return UsuarioProfesor(id_Usuario = id_Usuario,
                       id_Profesor = id_Profesor,
                       id_Clase = id_Clase,
                       descripcion = descripcion,
                       disponibilidad = disponibilidad ,
                       titulo = titulo,
                        )

    
