const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'secretKey'); // Remplacez 'secretKey' par votre clé secrète
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};