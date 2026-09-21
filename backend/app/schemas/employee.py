from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class EmployeeBase(BaseModel):
    first_name: str = Field(min_length=2, max_length=50)
    last_name: str = Field(min_length=2, max_length=50)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=20)
    department: str = Field(min_length=2, max_length=100)
    position: str = Field(min_length=2, max_length=100)
    salary: float = Field(gt=0)
    date_of_joining: date


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeUpdate(BaseModel):
    first_name: str | None = Field(default=None, min_length=2, max_length=50)
    last_name: str | None = Field(default=None, min_length=2, max_length=50)
    email: EmailStr | None = None
    phone: str | None = Field(default=None, max_length=20)
    department: str | None = Field(default=None, min_length=2, max_length=100)
    position: str | None = Field(default=None, min_length=2, max_length=100)
    salary: float | None = Field(default=None, gt=0)
    date_of_joining: date | None = None


class EmployeeResponse(EmployeeBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)