var dir='E:\\lottery\\db\\game\\spinfo\\';


var http = require('http'); 
var fs=require('fs');
var iconv = require('iconv-lite');

var url='http://info.sporttery.cn/football/info/fb_match_hhad.php?s=fb';

//start 17000 to 45794
var start=17000;
var end=25794;
var size=1000;
for(var i=start;i<end;){
	exeobj(i,i+size);
	i=i+size+1;
}


function exeobj(mid,end){
	if(mid>end){
		return;
	}
	var ops={  host: 'info.sporttery.cn', path: '/football/info/fb_match_hhad.php?s=fb&m='+mid }
	var req=http.get(ops); 
	var alldata='';
	
	req.on('response',  function(res) { 
	  // res.setEncoding('utf8'); 
	  res.on('data', function (data) {  

		var str = iconv.decode(data, 'gb2312'); //return unicode string from GBK encoded bytes
		str=iconv.encode(str,'utf8');
		var path=dir+'match-sp-'+mid+'.html';
	    alldata+=str
	    fs.writeFile(path,alldata);

	  }); 

	  res.on('end',function(){
	  	mid=mid+1;
	  	sleep(200);
	  	console.log('sleep 1s');
	  	exeobj(mid,end);
	  	
	  });

	}); 

}

function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds){};
 }
