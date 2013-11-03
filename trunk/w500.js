//
// var sc=document.createElement("script");sc.type='text/javascript';sc.src='http://web-lottery-js.googlecode.com/svn/trunk/tool.js';document.body.appendChild(sc);
var sc=document.createElement("script");sc.type='text/javascript';sc.src='http://code.jquery.com/jquery-latest.js';document.body.appendChild(sc);

//
function exe(minNum,maxNum){
	var obj={};
	var trList=$('.bet_content tr');
	for(var i=0;i<trList.length;i++){
		var tr=trList[i];
		$(tr).show();
		var pname=$(tr).attr("pname");
		var id=getId(tr);
		var gray=$('#'+id+' td .gray');
		var first=gray[0].innerHTML.replace(/\[|\]/g,'');
		var second=gray[1].innerHTML.replace(/\[|\]/g,'');
		var num=parseInt(first)-second;
		if(num<minNum || num>maxNum){
			$(tr).hide();
		}
		
		$(obj).attr(pname,num);
	}
	console.debug(obj);
}

function getId(obj){
   var id=obj.id;
   if(id==''){
      id=Math.round(Math.random()*99999999);
      obj.id=id;
   }
   return id;
}