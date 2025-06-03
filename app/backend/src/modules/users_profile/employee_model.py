from datetime import datetime
from sqlalchemy import Column, Integer, String, Date, Text, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from src.core.database import db
from src.core.models.user_model import get_jst_now

class EmployeeDetails(db.Model):
    __tablename__ = 'employee_details'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), unique=True, nullable=False)
    birth_date = Column(Date)
    tel = Column(String(30))
    job_title = Column(String(100))
    joined_at = Column(Date)
    employment_type = Column(String(50))
    paid_leave_remain = Column(Integer)
    join_reason = Column(Text)
    address = Column(Text)
    qualifications = Column(Text)
    work_history = Column(Text)
    marital_status = Column(Boolean)
    skill_sheet_path = Column(String(255))
    created_at = Column(DateTime, default=get_jst_now)
    updated_at = Column(DateTime, default=get_jst_now, onupdate=get_jst_now)

    user = relationship('User', backref='employee_details', uselist=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'birth_date': self.birth_date.isoformat() if self.birth_date is not None else None,
            'tel': self.tel,
            'job_title': self.job_title,
            'joined_at': self.joined_at.isoformat() if self.joined_at is not None else None,
            'employment_type': self.employment_type,
            'paid_leave_remain': self.paid_leave_remain,
            'join_reason': self.join_reason,
            'address': self.address,
            'qualifications': self.qualifications,
            'work_history': self.work_history,
            'marital_status': self.marital_status,
            'skill_sheet_path': self.skill_sheet_path,
            'created_at': self.created_at.isoformat() if self.created_at is not None else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at is not None else None,
        }
