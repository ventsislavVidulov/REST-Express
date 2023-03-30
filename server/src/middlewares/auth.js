import api from '../services/user.js'

export function authMiddleware() {
    return function (req, res, next) {
        const token = req.headers['x-authorization']

        if (token) {
            try {
                const payload = api.validateToken(token);
            
                req.user = {
                    email: payload.email,
                    _id: payload._id,
                    token
                }
            } catch (error) {
                return res.status(401).json({ message: 'Invalid access token' })
            }
        }

        next();
    }
}