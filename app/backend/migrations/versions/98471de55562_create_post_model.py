"""create_post_model

Revision ID: 98471de55562
Revises: 4384bc4c4454
Create Date: 2025-05-23 14:09:04.956896

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "98471de55562"
down_revision = "4384bc4c4454"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "posts",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("is_pinned", sa.Boolean(), default=False),
        sa.Column("pin_date", sa.DateTime()),
        sa.Column("is_task", sa.Boolean(), default=False),
        sa.Column("task_due_date", sa.DateTime()),
        sa.Column("task_completed", sa.Boolean(), default=False),
        sa.Column("task_completed_at", sa.DateTime()),
        sa.Column("is_deleted", sa.Boolean(), default=False),
        sa.Column("post_type", sa.String(length=20), default="normal"),
        sa.Column("created_at", sa.DateTime()),
        sa.Column("updated_at", sa.DateTime()),
    )


def downgrade():
    op.drop_table("posts")
