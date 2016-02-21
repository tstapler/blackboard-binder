from flask import Blueprint
from flask.ext.autoindex import AutoIndexBlueprint
auto_bp = Blueprint('auto_bp', __name__)
AutoIndexBlueprint(auto_bp, browse_root='Blackboard_Files')
