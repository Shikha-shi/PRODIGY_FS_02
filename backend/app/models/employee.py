from datetime import date,datetime

from sqlalchemy import Date,DateTime,Integer, Numeric,String
from sqlalchemy.orm import Mapped,mapped_column
from app.database import Base

class Employee(Base):
    __tablename__="employees"

    id: Mapped[int]=mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    first_name:Mapped[str]=mapped_column(
        String(50),
        nullable=False
    )

    last_name:Mapped[str]=mapped_column(
        String(50),
        nullable=False
    )

    email:Mapped[str]=mapped_column(
        String(100),
        unique=True,
        nullable=False,
        index=True
    )

    phone:Mapped[str |None]=mapped_column(
        String(20),
        nullable=True
    )

    department : Mapped[str]=mapped_column(
        String(100),
        nullable=False
    )

    position:Mapped[str]=mapped_column(
        String(100),
        nullable=False
    )

    salary:Mapped[float]=mapped_column(
        Numeric(12,2),
        nullable=False
    )

    date_of_joining:Mapped[date]=mapped_column(
        Date,
        nullable=False
    )
    created_at:Mapped[datetime]=mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    updated_at:Mapped[datetime]=mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )
    