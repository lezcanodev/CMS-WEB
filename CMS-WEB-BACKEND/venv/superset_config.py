SECRET_KEY = 'nvkj9xo4zYhUGjioOu5I2Ru0TsfcASTR1xnlt9ysS5l03cmSfO3ylYMm'
SQLALCHEMY_DATABASE_URI = 'sqlite:///C:/Users/Gaming/Desktop/while/CMS-WEB/CMS-WEB-BACKEND/venv/sqlite.db'
PUBLIC_ROLE_LIKE = "Gamma"

SESSION_COOKIE_SAMESITE = None
ENABLE_PROXY_FIX = True

FEATURE_FLAGS = { "EMBEDDED_SUPERSET": True }

ENABLE_CORS = True
CORS_OPTIONS = {
    "supports_credentials": True,
    "allow_headers": ["*"],
    "resources": ["*"],
    'origins': ['http://localhost:5173'],
}

GUEST_ROLE_NAME= 'Gamma'
GUEST_TOKEN_JWT_EXP_SECONDS = 3600  # 1 hour
PUBLIC_ROLE_LIKE = "Gamma"

# Allow embedding in iframes from any origin (probably want to restrict this for production)

# Flask-WTF flag for CSRF
WTF_CSRF_ENABLED = False
# Add endpoints that need to be exempt from CSRF protection (restrict for production)
WTF_CSRF_EXEMPT_LIST = ['*']
# # A CSRF token that expires in 1 year
# WTF_CSRF_TIME_LIMIT = 60 * 60 * 24 * 365
# Set this API key to enable Mapbox visualizations
# MAPBOX_API_KEY = ''
OVERRIDE_HTTP_HEADERS = {'Content-Security-Policy': 'frame-ancestors http://localhost:5173/'}
TALISMAN_ENABLED = False
HTTP_HEADERS={}