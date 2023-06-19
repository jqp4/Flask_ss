"""empty message

Revision ID: 9451cd9563b3
Revises: f9f09f5f779f
Create Date: 2023-05-17 16:59:00.473856

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9451cd9563b3'
down_revision = 'f9f09f5f779f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('report', sa.Column('teacher_name', sa.String(length=300), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('report', 'teacher_name')
    # ### end Alembic commands ###