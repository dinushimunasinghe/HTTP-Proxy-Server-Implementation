 HTTP-Proxy-Server-Implementation

I've created a proxy server that demonstrates key networking concepts:

Proxy Server (port 3000): Intercepts and forwards requests
Target Server (port 3001): Simulates a backend service

Features:
Request/response logging
Header modification
Error handling
Clean shutdown

To test it:

The proxy is running on port 3000
Run node test.js in another terminal to send a test request
Watch the console for detailed request/response flow
The proxy logs show:

Timestamp of requests
HTTP method and URL
Request headers
Forwarding status
Any errors that occur
This setup helps visualize how proxies handle and modify network traffic in real-time.
