from .. import db

import json
from datetime import datetime


#Se define la tabla intermedia entre profesor y clases
ProfesorClases = db.Table("profesorclases",
                          
    db.Column("id_Clase",db.Integer,db.ForeignKey("clase.id_Clase"),primary_key=True),
    db.Column("id_Profesor",db.Integer,db.ForeignKey("usuario_profesor.id_Profesor"),primary_key=True)
    )

#Se define la tabla intermedia entre alumno y clases
AlumnoClases = db.Table("alumnoclases",
                          
    db.Column("id_Clase",db.Integer,db.ForeignKey("clase.id_Clase"),primary_key=True),
    db.Column("id_Alumno",db.Integer,db.ForeignKey("usuarios_alumnos.id_Alumno"),primary_key=True)
    )


#Se define la tabla intermedia entre planificacion y clases
PlanificacionClases = db.Table("planificacionclases",
                          
    db.Column("id_Clase",db.Integer,db.ForeignKey("clase.id_Clase"),primary_key=True),
    db.Column("id_planificacion",db.Integer,db.ForeignKey("planificacion.id_planificacion"),primary_key=True)
    )



class Clase(db.Model):
    #Se define la tabla Clase con sus respectivos campos
    id_Clase = db.Column(db.Integer, primary_key=True)
    nombre_clase = db.Column(db.String(20), nullable=False)
    detalles = db.Column(db.String(300), nullable=False)
    detallesgenerales = db.Column(db.String(300), nullable=False)
    enlace_foto = db.Column(db.String(50), nullable=False)
    dia = db.Column(db.String(15), nullable=False)
    horaFin = db.Column(db.DateTime, nullable=False)
    horaInicio = db.Column(db.DateTime, nullable=False)
    profesorclases = db.relationship('UsuarioProfesor', secondary=ProfesorClases, backref=db.backref('clasesprofesor', lazy='dynamic'))
    alumnoclases = db.relationship('UsuariosAlumnos', secondary=AlumnoClases, backref=db.backref('clasesalumno', lazy='dynamic')) # Nombre de la clase en la relacion
    planificacionclases = db.relationship('Planificacion', secondary=PlanificacionClases, backref=db.backref('claseplanificacion', lazy='dynamic')) # Nombre de la clase en la relacion

    def __repr__(self):
        return '<Clase: %r >' % (self.detallesgenerales)
    
    
    def to_json(self):
        clase_json = {
            'id_Clase' : self.id_Clase,
            'nombre_clase' : str(self.nombre_clase),
            'detalles' : str(self.detalles),
            'detalles_generales' : str(self.detallesgenerales),
            'enlace_foto' : str(self.enlace_foto),
            'dia' : str(self.dia),
            'horaFin' : str(self.horaFin.strftime("%H:%M")),
            'horaInicio' : str(self.horaInicio.strftime("%H:%M")),

        }
        return clase_json
    

    def to_json_preview(self):
        clase_json = {
            'nombre_clase' : str(self.nombre_clase),
            'detalles_generales' : str(self.detallesgenerales),
            'enlace_foto' : str(self.enlace_foto),
        }
        return clase_json      
    

    def to_json_full_view(self):
        clase_json = {
            'nombre_clase' : str(self.nombre_clase),
            'detalles' : str(self.detalles),
            'enlace_foto' : str(self.enlace_foto),
        }
        return clase_json     


    def to_json_short(self):
        clase_json = {
            'id_Clase' : self.id_Clase,
            'nombre_clase' : str(self.nombre_clase),
            'detalles' : str(self.detalles),
            'detalles_generales' : str(self.detallesgenerales),
            'enlace_foto' : str(self.enlace_foto),
            'dia' : str(self.dia),
            'horaFin' : str(self.horaFin.strftime("%H:%M")),
            'horaInicio' : str(self.horaInicio.strftime("%H:%M")),
        }
        return clase_json
    

    def to_json_complete(self):
        clase_json = {
            'id_Clase' : self.id_Clase,
            'nombre_clase' : str(self.nombre_clase),
            'detalles' : str(self.detalles),
            'detalles_generales' : str(self.detallesgenerales),
            'enlace_foto' : str(self.enlace_foto),
            'dia' : str(self.dia),
            'horaFin' : str(self.horaFin.strftime("%H:%M")),
            'horaInicio' : str(self.horaInicio.strftime("%H:%M")),
        }
        return clase_json
    
    @staticmethod
    
    def from_json(clase_json):
        id_Clase = clase_json.get('id_Clase')
        nombre_clase = clase_json.get('nombre_clase')
        detalles = clase_json.get('detalles')
        detallesgenerales = clase_json.get('detalles_generales')
        enlace_foto = clase_json.get('enlace_foto')
        dia = clase_json.get('dia')
        horaFin = datetime.strptime(clase_json.get('horaFin'), "%H:%M")
        horaInicio = datetime.strptime(clase_json.get('horaInicio'), "%H:%M")
        

        return Clase(id_Clase = id_Clase,
                     nombre_clase = nombre_clase,
                     detalles = detalles,
                     detallesgenerales = detallesgenerales,
                     enlace_foto = enlace_foto,
                     dia = dia,
                     horaFin = horaFin,
                     horaInicio = horaInicio)
        
        

        
    


