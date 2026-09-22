from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DB_CONNECTION: str
    JWT_SECRET_KEY: str
    JWT_EXPIRE_MINUTES: int = 60

    model_config = SettingsConfigDict(
        env_file="../.env",
        extra="ignore"
    )


settings = Settings()