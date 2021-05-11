from .common import *

DEBUG = os.environ.get('DEBUG') in ['1', 't', 'true', 'True', 'T']

ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "").split(",")
CORS_ORIGIN_WHITELIST = os.environ.get("CORS_ORIGIN_WHITELIST", "").split(",")

STATICFILES_STORAGE = "backend.storages.StaticAzureStorage"
DEFAULT_FILE_STORAGE = "backend.storages.MediaAzureStorage"

AZURE_ACCOUNT_NAME = os.environ["AZURE_ACCOUNT_NAME"]
AZURE_ACCOUNT_KEY = os.environ["AZURE_ACCOUNT_KEY"]

# TODO: DataBase
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': os.environ["DB_HOST"],
        'USER': os.environ["DB_USER"],
        'PASSWORD': os.environ["DB_PASSWORD"],
        'NAME': os.environ["DB_NAME"],
    }
}

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "level": "ERROR",
            "class": "logging.StreamHandler",
        }
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": "ERROR"
        }
    }
}
