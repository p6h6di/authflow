// An array of routes that are accessible to the public
export const publicRoutes = [
    '/',
    '/auth/new-verification'
]

// An array of routes that are accessible to the authentication
export const authRoutes = [
    '/auth/signup',
    '/auth/login',
    '/auth/error',
    '/auth/reset',
    '/auth/new-password'
]

// Routes that start with this prefix are used for API authentication purposes
export const apiAuthPrefix = '/api/auth';

// the default login path after logging in
export const DEFAULT_LOGIN_REDIRECT = "/settings";