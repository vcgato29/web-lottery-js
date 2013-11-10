//根据对阵id，组合投注号码

var orders=[['3,3','0,0','3,3,3','0,0,0'],['3,3,3,3','0,0,0,0']];

/**
 * gameids 1001,1002,1003
 */
function make(gameids){

	/*
	 *5004:[0]/5010:[0]
	 */
	 for(var j=0;j<orders.length;j++){
	 	var order=orders[j];
	 	var gameArray=gameids.split(',');
		var chuanLen=getOrderMaxChuanLen(order);
		var cutGameArray=cutArray(gameArray,chuanLen);
		while(cutGameArray.length>0){
			printTicket(cutGameArray,order);

			cutGameArray=cutArray(gameArray,chuanLen);
		}	
	 }
}

function printTicket(cutGameArray,order){
	var str='';
	for(var i=0;i<order.length;i++){

		var orderArray=order[i].split(',');
		var len=orderArray.length;

		var voteArray=makeMathGameArray(cutGameArray,len);
		for(var j=0;j<voteArray.length;j++){
			if(voteArray[j]==''){
				continue;
			}
			var voteStrArray=voteArray[j].split('-');
			for(var k=0;k<voteStrArray.length;k++){
				if(k!=0){
					str+='/';
				}
				var voteId=voteStrArray[k];
				str+=voteId+':['+orderArray[k]+']';
			}
			str+='\n';
		}
	}
	console.debug(str);
}

//根据组合-拼接数组
function makeMathGameArray(gameArray,len){
	if(gameArray.len==len){
		return gameArray;
	}
	else if(gameArray.length>=len){

		//C3-2
		var gameList=makeMathGroupStr(gameArray,len).split(',');

		return gameList;
	}
	else{
		return [];
	}
}

//组合
function makeMathGroupStr(gameArray,len){
	var tempArray=gameArray.slice(0,gameArray.length);
	return getGameStr(tempArray,len,'');
}

function getGameStr(gameArray,len,id){
	var str='';
	var idstr=id=='' ? '':id+'-';
	while(gameArray.length>0){
		var tempId=idstr+gameArray.pop();
		var tempGameArray=gameArray.slice(0,gameArray.length);
		

		if(len==1){
			str+=tempId;
			str+=',';
		}
		
		if(len>1){
			str+=getGameStr(tempGameArray,len-1,tempId);
		}

	}
	return str;
}

var lastGameArray=[];
//从对阵数组中切出组合的对阵
function cutArray(gameArray,len){
	var gLen=gameArray.length;
	if(gLen>=len){
		lastGameArray=gameArray.splice(0,len);
		return lastGameArray;
	}
	else{
		while(gameArray.length>0){
			lastGameArray.push(gameArray.pop());
		}
		var index=lastGameArray.length-len;
		return lastGameArray.splice(index,len);
	}
	
}

//从方案中找出最大的串关数
function getOrderMaxChuanLen(orderArray){

	var len=0;
	for(var i=0;i<orderArray.length;i++){
		var tempNum=orderArray[i].split(',').length;
		len=tempNum>len ? tempNum:len;
	}
	return len;
}

