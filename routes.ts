// An array of routes that are accessible to the public
export const publicRoutes = [
    '/'
]

// An array of routes that are accessible to the authentication
export const authRoutes = [
    '/auth/signup',
    '/auth/login',
    '/auth/error'
]

// Routes that start with this prefix are used for API authentication purposes
export const apiAuthPrefix = '/api/auth';

// the default login path after logging in
export const DEFAULT_LOGIN_REDIRECT = "/settings";