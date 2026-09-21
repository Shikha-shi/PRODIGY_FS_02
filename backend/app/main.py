from fastapi import FastAPI

from app.database import Base, engine
from app.routers.employees import router as employee_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Employee Management System",
    description="PRODIGY Infotech Internship Task 02",
    version="1.0.0"
)

app.include_router(employee_router)


@app.get("/")
def root():
    return {
        "message": "Employee Management System API is running"
    }