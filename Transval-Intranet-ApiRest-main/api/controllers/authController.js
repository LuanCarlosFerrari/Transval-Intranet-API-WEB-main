const authMiddleware = require('../middleware/authMiddleware');

// In a real app, this would be in a database
const users = [
    {
        id: 1,
        username: 'admin',
        // In a real app, this would be hashed
        password: 'admin123',
        role: 'admin'
    }
];

exports.login = (req, res) => {
    try {
        console.log('Login attempt received:', req.body);

        // Parse the request body if it's not already parsed
        let credentials = { username: '', password: '' };

        if (typeof req.body === 'string') {
            try {
                // Try to parse as JSON first
                try {
                    credentials = JSON.parse(req.body);
                    console.log('Parsed JSON credentials:', credentials);
                } catch (jsonError) {
                    // If not JSON, try to parse as form data
                    console.log('Not JSON, trying form data parsing');
                    const bodyStr = req.body;
                    const usernameMatch = bodyStr.match(/name="username"[\s\S]*?\r\n\r\n([\s\S]*?)\r\n/);
                    const passwordMatch = bodyStr.match(/name="password"[\s\S]*?\r\n\r\n([\s\S]*?)\r\n/);

                    if (usernameMatch && usernameMatch[1] && passwordMatch && passwordMatch[1]) {
                        credentials = {
                            username: usernameMatch[1].trim(),
                            password: passwordMatch[1].trim()
                        };
                        console.log('Parsed form credentials:', credentials);
                    } else {
                        console.error('Failed to parse credentials from form data');
                    }
                }
            } catch (error) {
                console.error('Erro ao analisar corpo da requisição:', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Formato de requisição inválido' }));
                return;
            }
        } else if (req.body && typeof req.body === 'object') {
            // Body is already parsed
            credentials = req.body;
            console.log('Using provided object credentials:', credentials);
        }

        console.log('Looking for user with credentials:', credentials);

        const user = users.find(
            u => u.username === credentials.username && u.password === credentials.password
        );

        if (!user) {
            console.log('User not found or invalid credentials');
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Credenciais inválidas' }));
            return;
        }

        // Generate JWT token
        const token = authMiddleware.generateToken(user);
        console.log('Login successful, token generated');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        }));
    } catch (error) {
        console.error('Erro no login:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Erro interno do servidor' }));
    }
};

exports.verifySession = (req, res) => {
    // The user is already verified by the middleware
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        authenticated: true,
        user: req.user
    }));
};
