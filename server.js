/**
 * Simple HTTP server for NFT Analytics Dashboard
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // Serve index.html for root path
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading index.html');
                return;
            }
            
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
        return;
    }
    
    // Serve CSS if requested
    if (req.url.endsWith('.css')) {
        const cssPath = path.join(__dirname, req.url);
        fs.readFile(cssPath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('CSS file not found');
                return;
            }
            
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
        return;
    }
    
    // Serve JavaScript if requested
    if (req.url.endsWith('.js')) {
        const jsPath = path.join(__dirname, req.url);
        fs.readFile(jsPath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('JavaScript file not found');
                return;
            }
            
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
        });
        return;
    }
    
    // API proxy to backend (for development)
    if (req.url.startsWith('/api/')) {
        const backendUrl = `http://localhost:3001${req.url}`;
        
        const proxyReq = http.request(backendUrl, (proxyRes) => {
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.pipe(res);
        });
        
        req.pipe(proxyReq);
        
        proxyReq.on('error', (err) => {
            console.error('Proxy error:', err);
            res.writeHead(502, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
                error: 'Backend server unavailable',
                message: 'Make sure the NFT API server is running on port 3001'
            }));
        });
        
        return;
    }
    
    // Health check endpoint
    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'healthy',
            service: 'NFT Analytics Dashboard',
            timestamp: new Date().toISOString(),
            endpoints: {
                dashboard: 'GET /',
                api_proxy: 'GET /api/*',
                health: 'GET /health'
            }
        }));
        return;
    }
    
    // API documentation
    if (req.url === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            name: 'NFT Analytics Dashboard',
            version: '1.0.0',
            description: 'Standalone dashboard for MultiversX NFT analytics',
            endpoints: {
                dashboard: 'GET /',
                collection_stats: 'GET /api/nft/collection/:identifier/stats',
                collection_listings: 'GET /api/nft/collection/:identifier/listings',
                collection_holders: 'GET /api/nft/collection/:identifier/holders',
                search: 'GET /api/nft/search?q=query',
                popular: 'GET /api/nft/popular',
                health: 'GET /api/nft/health'
            },
            note: 'API requests are proxied to backend server on port 3001'
        }));
        return;
    }
    
    // 404 for other routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`NFT Analytics Dashboard running on port ${PORT}`);
    console.log(`Dashboard: http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`API docs: http://localhost:${PORT}/api`);
    console.log('\nMake sure the backend API is running on port 3001:');
    console.log('cd /home/ubuntu/.openclaw/workspace/mvx-websocket-dapp/backend');
    console.log('node test-server.js');
    console.log('\nBackend API: http://localhost:3001/api/nft/collection/EMP-897b49/stats');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});