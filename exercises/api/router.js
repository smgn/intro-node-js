const url = require('url');

const logRequest = (method, path) => console.log(method, path);

class Router {
    constructor (){
        this.routes = [];
    }

    addRoute(method, path, cb){
        this.routes.push({method, path, cb})
    }

    async process(req, res){
        const method = req.method
        const path = url.parse(req.url).pathname
        logRequest(method, path);
        const mapping = this.routes.find( (mapping) => mapping.method === method && mapping.path === path);
        if(!mapping){
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write(`route not found: ${method} ${path}`);
            res.end();
            return;
        }
        try{
            await mapping.cb(req, res);
        }catch(e){
            console.error(`${method} ${path} processing failed: ${e}`, e);
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({status: 'Internal Error', message: e.message}));
            res.end();
            return;
        }
    }
}

module.exports = new Router();