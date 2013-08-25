var RQ_NAME='rqTr';
var BRQ_NAME='brqTr';


//过滤sp占整个Sp和值的百分点
function flushSpPointGame(flag,minSpPointNum,minSumSpNum,minSpNum){
	var elName=flag ? RQ_NAME:BRQ_NAME;
	var trList=document.getElementsByName(elName);

	for(var i=0;i<trList.length;i++){
		var spanList=trList[i].getElementsByTagName("span");
		var sumSpNum=0;
		for(var j=0;j<spanList.length;j++){
			var spNum=parseFloat(spanList[j].innerText);
			if(spNum<minSpNum){
				//过滤最小Sp值
				$(trList[i].parentElement).hide();
				break;
			}
			sumSpNum+=spNum;
		}
		
		if(sumSpNum!=null){
			//过滤Sp最小和值
			if(sumSpNum<minSumSpNum){
				$(trList[i].parentElement).hide();
				continue;
			}
		}
		for(var j=0;j<spanList.length;j++){
			var spNum=parseFloat(spanList[j].innerText);
			var point=spNum/sumSpNum;
			//过滤最小SP百分点
			if(point<minSpPointNum){
				$(trList[i].parentElement).hide();
				break;
			}
		}
		$(trList[i].parentElement).show();	
	}
}

