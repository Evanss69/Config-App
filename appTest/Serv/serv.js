var http = require('http');
var fs = require('fs');
var URL = require('url');
const Infosconfig = require('./infosconfig');
const Network = require('./network');
const Screen = require('./screen');
/*
const routes = [
	{ path: '/get_network_config', method: 'GET', fn: Infosconfig.getConfigNetwork },
	{ path: '/get_screen_config', method: 'GET', fn: Infosconfig.getResolution },
];

Object.keys(routes).forEach((route) => {
	if(route.path == parsed.pathname && route.method == req.method ) {
		if(route.method == 'POST') {
			let body = "";
			req.on('data', (chunk) => { body += chunk.toString(); });
			req.on('end', () => {
				const data = JSON.parse(body);
				route.fn(data);
			});
		}
		else {	
			route.fn();
		}
	}
});*/

function handle_request(req, res) {
	var parsed = URL.parse(req.url);
	//console.log(parsed.pathname);

	var appmatch = parsed.pathname.match(/app\..*\.js/);
	var appname = appmatch && appmatch.input;

	switch (parsed.pathname) {
		case '/get_network_config':
			//=== test
			const get_network_config = Infosconfig.getNetworkConfig();
			get_network_config.then((config) => { 
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify(config));
				console.log(config); 
			});
			get_network_config.catch((err) => { 
				res.writeHead(500, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify(err));
				console.log(err); 
			});
			//=== test
			
			/*
			var get_info_configNet = Infosconfig.getConfigNetwork();
			get_info_configNet.then((info) => {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify(info));
			});
			get_info_configNet.catch((err) => {
				res.writeHead(500, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify(err));
			});
			*/
			break;

		case '/get_screen_config':
			var get_ResolutionList = Infosconfig.getResolutionList();
			get_ResolutionList.then((resolutionList) => {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify(resolutionList));
			});
			get_ResolutionList.catch((err) => {
				res.writeHead(500, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify(err));
			});
			break;

		case '/get_wifiList_ssids':
			var get_wifiList = Infosconfig.getWifiList();
			get_wifiList.then((wifiList) => {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify(wifiList));
			});
			get_wifiList.catch((err) => {
				res.writeHead(500, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify(err));
			});
			break;

		case '/update_network_config':
			if (req.method == 'POST') {
				var body = "";
				req.on('data', (chunk) => { body += chunk.toString(); });
				req.on('end', () => {
					const network_config_params = JSON.parse(body);
					var get_connectionList = Network.getConnectionList();
					get_connectionList.then((connectionList) => {
						try {
							Network.updateConfig(network_config_params, connectionList);
						} catch (e) {
							//console.log(e.message);
							res.writeHead(500, { 'Content-Type': 'application/json' });
							res.end(JSON.stringify(e.message));
						}
						res.writeHead(200, { 'ContentType': 'application/json' });
						res.end(JSON.stringify({ result: 'ok' }));
					})
					get_connectionList.catch((err) => {
						res.writeHead(500, { 'Content-Type': 'application/json' });
						res.end(JSON.stringify(err));
					});

				});
			} else {
				res.end();
			}
			break;

		case '/update_screen_config':
			if (req.method == 'POST') {
				var body = "";
				req.on('data', (chunk) => { body += chunk.toString(); });
				req.on('end', () => {
					const screen_config_params = JSON.parse(body);
					try {
						Screen.updateConfig(screen_config_params);
					} catch (e) {
						err = e.message;
						//console.log(e.message);
						res.writeHead(500, { 'Content-Type': 'application/json' });
						res.end(JSON.stringify(err));
					}
					res.writeHead(200, { 'ContentType': 'text/plain' });
					res.end(JSON.stringify({ result: 'ok' }));
				});
			} else {
				res.end();
			}
			break;

		case '/index.html':
		case '/':
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(fs.readFileSync('./dist/index.html'));
			break;

		// serve assets
		case String(parsed.pathname.match(/^\/assets\/.*/)):
			fs.readFile('./' + parsed.pathname, function (err, data) {
				if (err) {
					res.writeHead(404, { 'ContentType': 'text/plain' });
					res.end(JSON.stringify(':('));
				}
				else {
					res.writeHead(200, { 'ContentType': 'text/plain' });
					res.end(data);
				}
			});
			break;

		// serve app.js
		case appname:
			// case String(parsed.pathname.match(/app\..*\.js/)):
			// 	var appmatch = parsed.pathname.match(/app\..*\.js/);
			// 	var appname = appmatch && appmatch.input;
			// 	console.log(appname);
			res.writeHead(200, { 'Content-Type': 'application/javascript' });
			res.end(fs.readFileSync('./dist/' + appname));
			break;

		default:
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.end(JSON.stringify(':('));
			break;
	}

}


var server = http.createServer(handle_request);

server.listen(8080, '127.0.0.1');



