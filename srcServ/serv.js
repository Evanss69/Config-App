var http = require('http');
var fs = require('fs');
var URL = require('url');
//const Infosconfig = require('./infosconfig');
const Network = require('./network');
//const WifiNetwork = require ('./wifi_network');
//const EthernetNetwork = require ('./ethernet_network'); 
const Screen = require('./screen');
/*
const routes = [
	{ path: '/get_network_config', method: 'GET', fn: Network.getConfigNetwork },
	{ path: '/get_screen_config', method: 'GET', fn: Screen.getResolution },
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
			const get_network_config = Network.getNetworkConfig();
			get_network_config.then((config) => {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify(config));
				//console.log(config); 
			});
			get_network_config.catch((err) => {
				res.writeHead(500, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify(err));
				//console.log(err); 
			});
			//=== test

			/*
			var get_info_configNet = Network.getConfigNetwork();
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
			var get_ResolutionList = Screen.getResolutionList();
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
			var get_wifiList = Network.getWifiList();
			get_wifiList.then((wifiList) => {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify(wifiList));
			});
			get_wifiList.catch((err) => {
				res.writeHead(500, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify(err));
			});
			break;

		case '/activate_network':
			if (req.method == 'POST') {
				//console.log(req);
				var body = "";
				req.on('data', (chunk) => { body += chunk.toString(); });
				req.on('end', () => {
					//console.log(JSON.parse(body));
					const network_config_params = JSON.parse(body);
					const get_result = Network.activateConnection(network_config_params);
					get_result.then((response) => {
						res.writeHead(200, { 'Content-Type': 'application/json' });
						res.end(response);
					})
					get_result.catch((err) => {
						res.writeHead(500, { 'Content-Type': 'application/json' });
						res.end(JSON.stringify(err.message));
					});
				});
			} else {
				res.end();
			}
			break;

		case '/deactivate_network':
			if (req.method == 'POST') {
				//console.log(req);
				var body = "";
				req.on('data', (chunk) => { body += chunk.toString(); });
				req.on('end', () => {
					//console.log(JSON.parse(body));
					const network_config_params = JSON.parse(body);
					const get_result = Network.deactivateConnection(network_config_params);
					get_result.then((response) => {
						res.writeHead(200, { 'Content-Type': 'application/json' });
						res.end(response);
					})
					get_result.catch((err) => {
						res.writeHead(500, { 'Content-Type': 'application/json' });
						res.end(JSON.stringify(err.message));
					});
				});
			} else {
				res.end();
			}
			break;

		case '/update_network_config':
			if (req.method == 'POST') {
				//console.log(req);
				var body = "";
				req.on('data', (chunk) => { body += chunk.toString(); });
				req.on('end', () => {
					//console.log(JSON.parse(body));
					const network_config_params = JSON.parse(body);
					var get_connectionList = Network.getConnectionList();
					get_connectionList.then((connectionList) => {
						const get_result = Network.updateConfig(network_config_params, connectionList);
						get_result.then((response) => {
							res.writeHead(200, { 'Content-Type': 'application/json' });
							res.end(response);
						})
						get_result.catch((err) => {
							res.writeHead(500, { 'Content-Type': 'application/json' });
							res.end(JSON.stringify(err.message));
						});
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
					//console.log(screen_config_params);
					const get_result = Screen.updateConfig(screen_config_params);
					get_result.then((response) => {
						res.writeHead(200, { 'Content-Type': 'application/json' });
						res.end(response);
					})
					get_result.catch((e) => {
						err = e.message;
						//console.log(e.message);
						res.writeHead(500, { 'Content-Type': 'application/json' });
						res.end(JSON.stringify(err));
					});
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
		case String(parsed.pathname.match(/^\/dist\/.*/)):
			console.log(parsed.pathname);
			fs.readFile('./' + parsed.pathname, function (err, data) {
				if (err) {
					res.writeHead(404, { 'ContentType': 'text/plain;charset=UTF-8' });
					res.end(JSON.stringify(':('));
				}
				else {
					res.writeHead(200, { 'ContentType': 'text/plain;charset=UTF-8' });
					res.end(data);
				}
			});
			break;

		// serve app.js
/* 		case '/app.js':
		case appname:
			// case String(parsed.pathname.match(/app\..*\.js/)):
			// 	var appmatch = parsed.pathname.match(/app\..*\.js/);
			// 	var appname = appmatch && appmatch.input;
			// 	console.log(appname);
			res.writeHead(200, { 'Content-Type': 'application/javascript' });
			res.end(fs.readFileSync('./' + appname));
			break; */

		default:
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.end(JSON.stringify(':('));
			break;
	}

}


var server = http.createServer(handle_request);

console.log("Running");
console.log("Listening on 127.0.0.1:8080");
server.listen(8080, '127.0.0.1');



