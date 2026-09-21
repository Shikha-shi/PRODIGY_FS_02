from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate, EmployeeUpdate


def create_employee(
    db: Session,
    employee_data: EmployeeCreate
):
    employee = Employee(
        first_name=employee_data.first_name,
        last_name=employee_data.last_name,
        email=employee_data.email,
        phone=employee_data.phone,
        department=employee_data.department,
        position=employee_data.position,
        salary=employee_data.salary,
        date_of_joining=employee_data.date_of_joining,
    )

    db.add(employee)
    db.commit()
    db.refresh(employee)

    return employee


def get_all_employees(db: Session):
    return db.query(Employee).all()


def get_employee_by_id(
    db: Session,
    employee_id: int
):
    return db.query(Employee).filter(
        Employee.id == employee_id
    ).first()


def update_employee(
    db: Session,
    employee_id: int,
    employee_data: EmployeeUpdate
):
    employee = get_employee_by_id(db, employee_id)

    if not employee:
        return None

    update_data = employee_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(employee, field, value)

    db.commit()
    db.refresh(employee)

    return employee


def delete_employee(
    db: Session,
    employee_id: int
):
    employee = get_employee_by_id(db, employee_id)

    if not employee:
        return None

    db.delete(employee)
    db.commit()

    return employee