const { once } = require('events');
const http = require('http');

const router = {
    /**
     * Registered routes
     */
    routes: {},
    /**
     * Register a route
     * @param {object} route - Route object
     * @param {string} route.route - Route path
     * @param {string} route.method - HTTP method
     * @param {function} route.handler - Route handler
     */
    register: ({
        route,
        method = 'get',
        handler
    }) => {
        if (!router.routes[route]) {
            router.routes[route] = {};

            if (router.routes[route][method?.toUpperCase()]) {
                throw new Error(`Method ${method} already registered for route ${route}`);
            }
            router.routes[route][method?.toUpperCase()] = handler;
        }
        console.log(`Registering route: ${route}`);
    }
}

/**
 * Request handler
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const handler = async (req, res) => {
    const { url, method } = req;
    console.log(`Request: ${method} ${url}`);
    if (router.routes[url] && router.routes[url][method.toUpperCase()]) {
        let result = router.routes[url][method](req, res);
        if(result instanceof Promise) {
            return result
                .then(data => {
                    res.end(
                        typeof data === 'string' 
                        ? data : JSON.stringify(data)
                    );
                })
                .catch(err => {
                    res.writeHead(500);
                    res.end(JSON.stringify({ message: err.message }))
                });  
        }

        res.end(
            typeof result === 'string' 
            ? result : JSON.stringify(result)
        );
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
}

router.register({
    route: '/api',
    method: 'get',
    handler: (req, res) => {
        return { message: 'Hello from API' }
    }
});


const DEFAULT_USER = { user: 'admin', pass: 'admin' }
router.register({
    route: '/login',
    method: 'post',
    handler: async (req, res) => {
        const data = await (await once(req, 'data')).toString();
        const { user, pass } = JSON.parse(data);
        if (user && pass) {
            if (user === DEFAULT_USER.user && pass === DEFAULT_USER.pass) {
                return { message: 'Logged in' }
            } else {
                res.writeHead(401);
                res.end(JSON.stringify({ message: 'Login failed!' }));
            }   
        } else {
            res.writeHead(400);
            res.end(JSON.stringify({ message: 'Bad request' }));
        }
    }
});

const app = http.createServer(handler);

module.exports = {
    app
}