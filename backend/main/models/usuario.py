from .. import db
import json
#Importamos de python 2 funciones
from werkzeug.security import generate_password_hash, check_password_hash


#Modelo de la tabla Usuario
class Usuario(db.Model):
    #Se define la tabla Usuario con sus respectivos campos
    id_Usuario = db.Column(db.Integer,primary_key=True)
    rol = db.Column(db.String(15),nullable=False,server_default="alumno")
    nombre = db.Column(db.String(15),nullable=False)
    apellido = db.Column(db.String(15),nullable=False)
    mail = db.Column(db.String(30),nullable=False, unique=True, index=True)
    dni = db.Column(db.Integer,nullable=False)
    telefono = db.Column(db.Integer,nullable=False)
    password = db.Column(db.String(30),nullable=False)
    edad = db.Column(db.Integer,nullable=False)
    sexo = db.Column(db.String(15),nullable=True)
    alumno = db.relationship("UsuariosAlumnos", back_populates= "usuarios",cascade="all, delete-orphan")
    profesor = db.relationship("UsuarioProfesor", back_populates= "usuarioprofesor",cascade="all, delete-orphan")
    


    #Getter de la contraseña plana no permite leerla
    @property
    def plain_password(self):
        raise AttributeError('Pass no se puede leer')
    #Setter de la contraseña toma un valor en texto plano
    #Calcula el hash y lo guarda en el atributo password
    @plain_password.setter
    def plain_password(self, password):
        self.password = generate_password_hash(password)

    #Método que compara una contraseña en texto plano con el hash guardado en la db
    def validate_pass(self,password):
        return check_password_hash(self.password, password)
    
    def __repr__(self):
        return '<Usuario: %r >' % (self.nombre)
    
    #convierto objeto en json
    def to_json(self):
        usuario_json = {
            'id_Usuario' : self.id_Usuario,
            'nombre' : str(self.nombre),
            'apellido' : str(self.apellido),
            'mail' : str(self.mail),
            'dni' : self.dni,
            'telefono' : self.telefono,
            'edad' : self.edad,
            'sexo' : str(self.sexo),
        }
        return usuario_json
    
    def to_json_view_profe(self):
        usuario_json = {
            'nombre' : str(self.nombre)
        }
        return usuario_json

    def to_json_complete(self,full_name=False):
        usuario_json = {
            'id_Usuario' : self.id_Usuario,
            'rol' : str(self.rol),           
            'nombre' : str(self.nombre),
            'apellido' : str(self.apellido),
            'mail' : str(self.mail),
            'dni' : self.dni,
            'telefono' : self.telefono,
            'password' : str(self.password),
            'edad' : self.edad,
            'sexo' : str(self.sexo),
        }
        return usuario_json
    
    def to_json_full_name(self):
        usuario_json = {
            'id_Usuario' : self.id_Usuario,
            'nombre' : str(self.nombre),
            'apellido' : str(self.apellido),   
        }
        return usuario_json
    
    def to_json_short(self):
        usuario_json = {
            'id_Usuario' : self.id_Usuario,
            'rol' : str(self.rol),
            'nombre' : str(self.nombre),

        }
        return usuario_json
    
    
    @staticmethod
    #convertir json a objeto
    def from_json(usuario_json):
        id_Usuario = usuario_json.get('id_Usuario')
        rol = usuario_json.get('rol')
        nombre = usuario_json.get('nombre')
        apellido = usuario_json.get('apellido')
        mail = usuario_json.get('mail')
        dni = usuario_json.get('dni')
        telefono = usuario_json.get('telefono')
        password = usuario_json.get('password')
        edad = usuario_json.get('edad')
        sexo = usuario_json.get('sexo')
        
        return Usuario(id_Usuario = id_Usuario,
                       rol = rol,
                       nombre = nombre,
                       apellido = apellido,
                       mail = mail,
                       dni = dni,
                       telefono = telefono,
                       plain_password = password,
                       edad =  edad,
                       sexo = sexo
                        )
    
