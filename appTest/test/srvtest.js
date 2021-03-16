import xrandrParser from('./node_modules/xrandr');
const shell = require ('child_process').exec;


	shell('xrandr',(err,stdout)=>{
		var query = xrandrParser(stdout);
		console.log(JSON.stringify(query));
	});
	
//var proc = require('child_process');
//var proc2 = require('child_process');
/*function handle_info1(req, res) {
	if(req.method == "GET") {
		var data ={};
		//var data = {res.write(proc.execSync('nmcli -t -f device show'))};pas bon recuperer le resultat de la cmd 
		
		res.writeHead(200, { 'ContentType' : 'application/json' });
		res.end(JSON.stringify(data));
	}
	else {
		if(req.method == "POST") {
			let body = "";
			req.on('data', (chunk) => { body += chunk.toString(); });
			req.on('end', () => {
				console.log(body);
				res.writeHead(200);
				res.end();
			});

		}
	}
}

function handle_info2(req, res) {
	if(req.method == "GET") {
		var data ={};
		//var data = {res.write(proc.execSync('xrandr'))};pas bon recuperer le resultat de la cmd 
		
		res.writeHead(200, { 'ContentType' : 'application/json' });
		res.end(JSON.stringify(data));
	}
	else {
		if(req.method == "POST") {
			let body = "";
			req.on('data', (chunk) => { body += chunk.toString(); });
			req.on('end', () => {
				console.log(body);
				res.writeHead(200);
				res.end();
			});

		}
	}
}
*/
/*
//create a server object:
http.createServer(function (req, res) {
// res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(fs.readFileSync('./index.html'));
  res.write(fs.readFileSync('./app.js'));
  res.write('<pre>');
  res.write(proc.execSync('nmcli -t device show'));
  res.write('</pre>');
  res.write('<pre>');
  res.write(proc2.execSync('xrandr')); //write a response to the client
  res.write('</pre>');
  res.end(); //end the response

}).listen(8080);
*/	
		
		

