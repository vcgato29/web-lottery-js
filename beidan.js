// 外部植入js
// var sc=document.createElement("script");sc.type='text/javascript';sc.src='http://web-lottery-js.googlecode.com/svn/trunk/beidan.js';document.body.appendChild(sc);

var maxRqnum=-1;
function makeResult1(){
	var shengNum=0;
	var pingNum=0;
	var fuNum=0;

	var trList=$("tr[id*='tr_']");
	for(var i=0;i<trList.length;i++){
		var numplayed=trList[i].id.substr(3);
		var state=$(trList[i]).attr('name2')=='已开奖';
		var rqState=$(trList[i]).attr('name3')=='让球';
		var rqNum=parseInt($("#td_"+numplayed+"_null_e").html())==maxRqnum;
		if(!state || !rqState || !rqNum){
			//如果未开奖则过滤
			$(trList[i]).hide();
			continue;
		}
		$(trList[i]).show()
		console.debug(numplayed+"  "+$("#td_"+numplayed+"_null_e").html());

		var sp1=parseFloat($("#sp_"+numplayed+"_1").html());
		var sp2=parseFloat($("#sp_"+numplayed+"_2").html());
		var sp3=parseFloat($("#sp_"+numplayed+"_3").html());

		if(sp1!=NaN && sp1>0){
			shengNum++;
		}
		if(sp2!=NaN && sp2>0){
			pingNum++;
		}
		if(sp3!=NaN && sp3>0){
			fuNum++;
		}
	}
	console.debug("shengNum: "+shengNum);
	console.debug("pingNum: "+pingNum);
	console.debug("fuNum: "+fuNum);
}


function makeResult2(){
	var shengNum=0;
	var pingNum=0;
	var fuNum=0;
	var gameList=[];
	var trList=$("tr[id*='tr_']");
	for(var i=0;i<trList.length;i++){
		var numplayed=trList[i].id.substr(3);
		
		var rqNum=parseInt($("#td_"+numplayed+"_null_d").html())==maxRqnum;
		if(!rqNum){
			//如果未开奖则过滤
			$(trList[i]).hide();
			continue;
		}
		$(trList[i]).show()
		console.debug(numplayed+"  "+$("#td_"+numplayed+"_null_d").html());

		var gresult=$("#td_"+numplayed+"_null_f").html();

		var sp=$("#td_"+numplayed+"_null_g").html();
		console.debug('gresult:'+gresult);
		if(gresult=='3'){
			shengNum++;
		}
		if(gresult=='1'){
			pingNum++;
		}
		if(gresult=='0'){
			fuNum++;
		}
		var obj={};
		obj.numplayed=numplayed;
		obj.gresult=gresult;
		obj.sp=sp;
		gameList.push(obj);
	}
	console.debug("shengNum: "+shengNum);
	console.debug("pingNum: "+pingNum);
	console.debug("fuNum: "+fuNum);

	//

	getMoney(gameList);
}

function getMoney(gameList){
	var resultMap={};
	var numplayedList=[];
	for(var i=0;i<gameList.length;i++){
		var obj=gameList[i];
		var numplayed=obj.numplayed;
		var gresult=obj.gresult;
		var sp=obj.sp;
		$(resultMap).attr(numplayed+'-'+gresult,sp);

		numplayedList.push(numplayed);
	}

	//
	var solList=makeVote(numplayedList);

	//
	var allMoney=0;
	console.debug(solList);
	var voteMoney=solList.length*2;
	for(var i=0;i<solList.length;i++){
		var tempArray=solList[i].split(":");
		var sp1=$(resultMap).attr(tempArray[0]);
		var sp2=$(resultMap).attr(tempArray[1]);

		

		sp1=sp1==null ? 0:parseFloat(sp1);
		sp2=sp2==null ? 0:parseFloat(sp2);

		var money=sp1*sp2*2;
		allMoney+=money;
		console.debug("sp1:"+sp1+" sp2:"+sp2+" money:"+money);
	}

	console.debug("allMoney:"+allMoney+" voteMoney:"+voteMoney);
}

function makeVote(numplayedList){
	var solList=[];
	while(numplayedList.length>1){
		var len=numplayedList.length;
		var gameIndex=makeLuckNum()%len;
		var game1=numplayedList[gameIndex];
     	numplayedList.splice(gameIndex,1);

     	var len2=numplayedList.length;
		var game2Index=makeLuckNum()%len2;
		var game2=numplayedList[game2Index];
     	numplayedList.splice(game2Index,1);


        var ballSol = '0-0,0-0,3-0,0-1';
        var ballSol2 = '0-0,0-0,0-3,1-0';
        var ballSol3=makeLuckNum()%3==0 ? ballSol:ballSol2;

        var tempArray=ballSol3.split(',');
        for(var i=0;i<tempArray.length;i++){
        	var tempSol=tempArray[i].split('-');
        	var str=game1+'-'+tempSol[0]+':'+game2+'-'+tempSol[1];
        	solList.push(str);
        }

	}
	return solList;
}


var lucknum=88888;
function makeLuckNum(){
  var lknum=0;
  for(var i=0;i<lucknum;i++){
    lknum=Math.round(Math.random()*lucknum);
  }
  return lknum;
}