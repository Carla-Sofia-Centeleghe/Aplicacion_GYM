from flask import Flask
from dotenv import load_dotenv
import os
# Importamos nuevas librerias clase 3
from flask_restful import Api #Agrego la clase API

# Importo SQLAlchemy
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
# Importo Flask JWT
from flask_jwt_extended import JWTManager

# Importar Flask mail
from flask_mail import Mail


# Inicio Restful
api = Api()

# Inicio SQLAlchemy
db = SQLAlchemy()

# Inicio migrate
migrate = Migrate()

# Inicializar JWT
jwt = JWTManager()

# Inicializar
mailsender = Mail()

# Vamos a crear un metodo que inicializara la app y todos los modulos
def create_app():
    # Inicio Flask
    app = Flask(__name__)
    # variables de entono
    load_dotenv()

    if not os.path.exists(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')):
        os.mknod(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME'))

    app.config['SQLALCHEMY_TRACK_NOTIFICATIONS']= False
    # Url de configuracion de bd
    app.config['SQLALCHEMY_DATABASE_URI']= 'sqlite:////'+os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')    
    db.init_app(app)
    migrate.init_app(app,db)

    # Importo dir de recursos
    import main.resources as resources

    api.add_resource(resources.UsuariosResource, '/usuarios')

    api.add_resource(resources.UsuarioResource, '/usuario/<id>')

    api.add_resource(resources.UsuariosAlumnosResource, '/usuariosalumnos')

    api.add_resource(resources.UsuariAlumnoResource, '/usuarialumno/<id_usuario>') #Agrego la nueva ruta de usuarios alumnos

    api.add_resource(resources.UsuarioAlumnoResource, '/usuarioalumno/<id>')

    api.add_resource(resources.UsuarioProfesorResource, '/usuarioprofesor/<id>')

    api.add_resource(resources.UsuariosProfesoresResource, '/profesores')

    api.add_resource(resources.PlanificacionesResource, '/planificaciones')

    api.add_resource(resources.PlanificacionResource, '/planificacion/<id>')

    api.add_resource(resources.ProfesorClasesResource, '/clases')

    api.add_resource(resources.ProfesorClaseResource, '/clase/<id>')
    
    api.add_resource(resources.PagoResource, '/pago/<id>')

    api.add_resource(resources.LoginResource, '/login')

    # Cargar la aplicacion en la API de Flask Restful
    # Es para que la aplicacion de flask funcione como API
    api.init_app(app)

    # Cargar clave secreta
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    # Cargar tiempo de expiración de los tokens
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES'))
    jwt.init_app(app)

    from main.auth import routes
    # Importar blueprint
    app.register_blueprint(routes.auth)
    
    # Configuración de mail
    app.config['MAIL_HOSTNAME'] = os.getenv('MAIL_HOSTNAME')
    app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
    app.config['MAIL_PORT'] = os.getenv('MAIL_PORT')
    app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS')
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
    app.config['FLASKY_MAIL_SENDER'] = os.getenv('FLASKY_MAIL_SENDER')

    # Inicializar en app
    mailsender.init_app(app)

    # Por ultimo retornamos la aplicacion iniializada
    return app