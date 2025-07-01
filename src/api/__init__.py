from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask import Blueprint
from .models import db

migrate = Migrate()
jwt = JWTManager()
api = Blueprint('api', __name__)

def create_app():
    app = Flask(__name__)
    app.config['JWT_SECRET_KEY'] = "super-secret-key"
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    
    CORS(app)
    from .routes import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api')
    return app