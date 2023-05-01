"""empty message

Revision ID: cc9a09893ba1
Revises: 524184b6d372
Create Date: 2023-04-04 11:11:32.064456

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cc9a09893ba1'
down_revision = '524184b6d372'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('report', sa.Column('var_folder', sa.String(length=128), nullable=True))
    op.add_column('report', sa.Column('var_num', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('report', 'var_num')
    op.drop_column('report', 'var_folder')
    # ### end Alembic commands ###