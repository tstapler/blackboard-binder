from flask import Flask
from flask_bootstrap import Bootstrap
from flask.ext.autoindex import AutoIndex
from blueprint import auto_bp

app = Flask(__name__)
app.config.from_object('config')
Bootstrap(app)
app.register_blueprint(auto_bp, url_prefix='/files')
