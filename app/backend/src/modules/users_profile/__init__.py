from flask import Blueprint

employee_bp = Blueprint('employee', __name__)

from .employee_model import EmployeeDetails

# user_routes.pyはroutesディレクトリに移動したため削除済み
