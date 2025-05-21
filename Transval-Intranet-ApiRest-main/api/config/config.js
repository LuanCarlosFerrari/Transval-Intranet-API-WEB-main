// In a real app, you would use dotenv to load these from a .env file
const config = {
    development: {
        port: 3000,
        jwtSecret: 'transval-secret-key-dev',
        cors: {
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        },
        logLevel: 'debug'
    },
    production: {
        port: process.env.PORT || 3000,
        jwtSecret: process.env.JWT_SECRET || 'transval-default-secret-replace-this',
        cors: {
            origin: 'https://intranet.transval.com.br',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        },
        logLevel: 'error'
    }
};

// Use NODE_ENV to determine environment, default to development
const env = process.env.NODE_ENV || 'development';

// Default to development config if the specified environment doesn't exist
module.exports = config[env] || config.development;
