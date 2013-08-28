//this is first node js application
var msg="hello world";
console.log(msg);

var http=require('http');
var port=3000;
http.createServer(function(req,res){
	res.writeHead({200:"text/html"});
	res.write("<h1>hello world</h1>");
	res.end("end.....");
}).listen(port);

console.log('http server has start ,port:'+port);

