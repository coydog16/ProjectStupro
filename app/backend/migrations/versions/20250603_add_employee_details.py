"""
Alembic migration script for employee_details table
"""
from alembic import op
import sqlalchemy as sa

revision = '20250603_add_employee_details'
down_revision = '6cc1108a3f83'
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        'employee_details',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id'), unique=True, nullable=False),
        sa.Column('birth_date', sa.Date),
        sa.Column('tel', sa.String(30)),
        sa.Column('job_title', sa.String(100)),
        sa.Column('joined_at', sa.Date),
        sa.Column('employment_type', sa.String(50)),
        sa.Column('paid_leave_remain', sa.Integer),
        sa.Column('join_reason', sa.Text),
        sa.Column('address', sa.Text),
        sa.Column('qualifications', sa.Text),
        sa.Column('work_history', sa.Text),
        sa.Column('marital_status', sa.Boolean),
        sa.Column('skill_sheet_path', sa.String(255)),
        sa.Column('created_at', sa.DateTime, server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime, server_default=sa.func.now(), onupdate=sa.func.now()),
    )

def downgrade():
    op.drop_table('employee_details')
