export const isAuth = () => (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(401).json({ message: 'Please log in' });
    }
}

export const isAuthor = () => (req, res, next) => {
    // console.log(req.user._id);
    // console.log(res.locals.item._ownerId);
    if (!req.user) {
        res.status(401).json({ message: 'Please log in' });
    } else if (req.user._id == res.locals.item._ownerId) {
        next();
    } else {
        res.status(403).json({ message: 'You are no author of this content' })
    }
}