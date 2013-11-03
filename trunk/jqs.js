// 外部植入js
// var sc=document.createElement("script");sc.type='text/javascript';sc.src='http://web-lottery-js.googlecode.com/svn/trunk/jqs.js';document.body.appendChild(sc);

function run(){
	test(50);
}
function test(minMoney){

	var gamelist=$("tr[name='zjq']");
	for(var i=0;i<gamelist.length;i++){
		var game=gamelist[i];
		var gameid=getId(game);
		var sumMoney=0;
		var divlist=$("#"+gameid+" tr td div");
		$(game).show();
		for(var j=0;j<divlist.length;j++){
			var div=divlist[j];
			var money=parseFloat(div.innerText);
			if(money>sumMoney){
				sumMoney=money;
			}
		}
		if(sumMoney<minMoney){
			$(game).hide();
		}
	}
}

function getId(obj){
   var id=obj.id;
   if(id==''){
      id=Math.round(Math.random()*99999999);
      obj.id=id;
   }
   return id;
}
