var dir='E:\\lottery\\db\\game\\list\\';




var http = require('http'); 
var fs=require('fs');
var iconv = require('iconv-lite');

var url='info.sporttery.cn/football/match_result.php?search_league=';
var page=764;
var start_date='2009-01-29';
var end_date='2013-08-31';

for(var i=page;i>0;i--){
	sleep(5000);
	exeobj(i,end_date,start_date);
}

function exeobj(page,end_date,start_date){
	var ops={  host: 'info.sporttery.cn', path: '/football/match_result.php?page='+page+'&search_league=&start_date=2009-01-29&end_date=2013-08-31' }
	var req=http.get(ops); 
	var alldata='';
	var path=dir+start_date+'--'+end_date+'--'+page+'.html';
	req.on('response',  function(res) { 
	  // res.setEncoding('utf8'); 
	  res.on('data', function (data) {  
		var str = iconv.decode(data, 'gb2312'); //return unicode string from GBK encoded bytes
		str=iconv.encode(str,'utf8');
		var path=dir+start_date+'--'+end_date+'--'+page+'.html';
	    alldata+=str
	    fs.writeFile(path,alldata);
	  }); 
	}); 
}

function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
 }
