const http = require('http');
const httpProxy = require('http-proxy');
const chalk = require('chalk');

// Create a proxy server instance
const proxy = httpProxy.createProxyServer({});

// Create target server (simulated backend)
const targetServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Hello from target server!' }));
}).listen(3001);

// Create proxy server
const proxyServer = http.createServer((req, res) => {
  console.log(chalk.blue(`[${new Date().toISOString()}] Incoming request: ${req.method} ${req.url}`));
  
  // Log request headers
  console.log(chalk.yellow('Request Headers:'));
  console.log(chalk.yellow(JSON.stringify(req.headers, null, 2)));

  // Add custom header to demonstrate modification
  req.headers['x-proxied-by'] = 'node-proxy';

  // Handle proxy errors
  proxy.on('error', (err, req, res) => {
    console.error(chalk.red('Proxy Error:', err));
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Proxy Error');
  });

  // Log before forwarding
  console.log(chalk.green(`Forwarding request to target server...`));

  // Forward request to target server
  proxy.web(req, res, {
    target: 'http://localhost:3001'
  });
}).listen(3000);

console.log(chalk.cyan(`Proxy server running on http://localhost:3000`));
console.log(chalk.cyan(`Target server running on http://localhost:3001`));

// Cleanup on exit
process.on('SIGINT', () => {
  console.log(chalk.yellow('\nShutting down servers...'));
  proxyServer.close();
  targetServer.close();
  process.exit();
});