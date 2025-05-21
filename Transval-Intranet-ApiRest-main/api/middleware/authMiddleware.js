const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Using JWT_SECRET from config or a default if config not available yet
const JWT_SECRET = config?.jwtSecret || 'transval-secret-key-dev';

exports.generateToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '8h' }
    );
};

// For middleware usage with standard Express
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Não autorizado' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};

// For direct token verification (not middleware)
exports.verifyTokenDirect = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.error('Token verification error:', error);
        throw error;
    }
};

// For simple admin-only routes
exports.adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ error: 'Acesso negado' });
    }
};
