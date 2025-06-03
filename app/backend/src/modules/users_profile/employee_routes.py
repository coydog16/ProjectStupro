from flask import Blueprint, jsonify, request, send_file
from src.modules.users_profile.employee_model import EmployeeDetails
from src.core.models.user_model import User
from src.core.database import db
from src.core.schemas.user_schema import EmployeeDetailsSchema
from flask_jwt_extended import jwt_required
import os

employee_bp = Blueprint('employee', __name__, url_prefix='/api/employee_details')

@employee_bp.route('/<int:user_id>', methods=['GET'])
@jwt_required()
def get_employee_details(user_id):
    details = EmployeeDetails.query.filter_by(user_id=user_id).first()
    if not details:
        return jsonify({'error': 'not found'}), 404
    return jsonify(EmployeeDetailsSchema.model_validate(details).model_dump())

@employee_bp.route('/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_employee_details(user_id):
    details = EmployeeDetails.query.filter_by(user_id=user_id).first()
    if not details:
        return jsonify({'error': 'not found'}), 404
    data = request.json or {}
    for field in [
        'birth_date','tel','job_title','joined_at','employment_type','paid_leave_remain',
        'join_reason','address','qualifications','work_history','marital_status']:
        if field in data:
            setattr(details, field, data[field])
    db.session.commit()
    return jsonify(EmployeeDetailsSchema.model_validate(details).model_dump())

@employee_bp.route('/<int:user_id>/skill_sheet', methods=['POST'])
@jwt_required()
def upload_skill_sheet(user_id):
    details = EmployeeDetails.query.filter_by(user_id=user_id).first()
    if not details:
        return jsonify({'error': 'not found'}), 404
    file = request.files.get('file')
    if not file:
        return jsonify({'error': 'no file'}), 400
    save_path = f'static/skill_sheets/user_{user_id}_{file.filename}'
    os.makedirs(os.path.dirname(save_path), exist_ok=True)
    file.save(save_path)
    details.skill_sheet_path = save_path
    db.session.commit()
    return jsonify({'skill_sheet_path': save_path})

@employee_bp.route('/<int:user_id>/skill_sheet', methods=['GET'])
@jwt_required()
def download_skill_sheet(user_id):
    details = EmployeeDetails.query.filter_by(user_id=user_id).first()
    if not details or not details.skill_sheet_path:
        return jsonify({'error': 'not found'}), 404
    return send_file(details.skill_sheet_path, as_attachment=True)
