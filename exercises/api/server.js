const http = require('http')
const fs = require('fs')
const path = require('path')
const router = require('./router');

/**
 * this function is blocking, fix that
 * @param {String} name full file name of asset in asset folder
 */
const findAsset = async (name) => {
  const assetPath = path.join(__dirname, 'assets', name)
  const promise = new Promise((resolve, reject) => {
    fs.readFile(assetPath, {encoding: 'utf-8'}, (err, data) => {
      if (err) reject(err);
      resolve(data.toString());
    });
  });
  return promise;
}

const hostname = '127.0.0.1'
const port = 3000

const processStaticAsset = async (path, contentType, res) => {
  res.writeHead(200, {'Content-Type': contentType})
  const resource = await findAsset(path);
  res.write(resource);
  res.end();
}

router.addRoute('GET', '/', async (_, res) => processStaticAsset('index.html', 'text/html', res));
router.addRoute('GET', '/index.html', async (_, res) => processStaticAsset('index.html', 'text/html', res));
router.addRoute('GET', '/style.css', async (_, res) => processStaticAsset('style.css', 'text/css', res));

const server = http.createServer(async (req, res) => {
  await router.process(req, res);
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
