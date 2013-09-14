// 外部植入js
// var sc=document.createElement("script");sc.type='text/javascript';sc.src='http://web-lottery-js.googlecode.com/svn/trunk/jingqiu.js';document.body.appendChild(sc);

function fetch(){
	var size=0;
	var trList=$("#livescoreTB tr");
	for(var i=0;i<trList.length;i++){
		var obj=trList[0];
		var id=getId(obj);
		var tdLen=$("#"+id+" td").length;
		if(tdLen>2){
			//do someting
			size++;
		}
	}
	console.debug(size);
}

function getId(obj){
   var id=obj.id;
   if(id==''){
      id=Math.round(Math.random()*99999999);
      obj.id=id;
   }
   return id;
}