const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const apiRouter = require('./api/router');
const fileController = require('./api/controllers/fileController');
const fileUtils = require('./api/utils/fileUtils');
const config = require('./api/config/config');

const PORT = config.port;

// Criar servidor HTTP básico
const server = http.createServer((req, res) => {
  // Configurar CORS para permitir acesso de acordo com a configuração
  res.setHeader('Access-Control-Allow-Origin', config.cors.origin);
  res.setHeader('Access-Control-Allow-Methods', config.cors.methods);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  // Tratar requisições OPTIONS (pre-flight) para CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  console.log(`${req.method} ${pathname}`);

  // API requests - delegate to the API router
  if (pathname.startsWith('/api/')) {
    apiRouter.handleRequest(req, res);
    return;
  }

  // Servir página inicial
  if (req.method === 'GET' && pathname === '/') {
    fileController.serveFile(res, 'index.html', 'text/html');
  }
  // Servir arquivos estáticos
  else if (req.method === 'GET' && (pathname.startsWith('/src/') || pathname === '/favicon.ico')) {
    fileController.serveFile(res, pathname.substring(1), fileUtils.getContentType(pathname));
  }
  // Verificar se arquivo existe (HEAD request)
  else if (req.method === 'HEAD' && pathname.startsWith('/src/downloads/')) {
    fileController.checkFileExists(res, pathname.substring(1));
  }
  else {
    // Página não encontrada
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint não encontrado' }));
  }
});

// Security headers for all responses
server.on('response', (res) => {
  // Add security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
});

// Iniciar o servidor
server.listen(PORT, () => {
  console.log(`\n=======================================`);
  console.log(`Servidor rodando na porta ${PORT} em modo ${process.env.NODE_ENV || 'development'}`);
  console.log(`Acesse: http://localhost:${PORT}`);
  console.log(`Diretório de trabalho: ${__dirname}`);
  console.log(`=======================================\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});
