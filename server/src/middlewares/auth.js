export function authMiddleware() {
    return function (req, res, next) {
        console.log(req.headers['x-authorization']);

        next();
    }
}