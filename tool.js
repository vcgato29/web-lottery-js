// 外部植入js
// var sc=document.createElement("script");sc.type='text/javascript';sc.src='http://web-lottery-js.googlecode.com/svn/trunk/tool.js';document.body.appendChild(sc);

var RQ_NAME='rqTr';
var BRQ_NAME='brqTr';

function calRun(){
  flushSpPointGame(true,0.1,10,1.5,3);
}

//过滤sp占整个Sp和值的百分点
function flushSpPointGame(flag,minSpPointNum,minSumSpNum,minSpNum,secondSpMinNum){
   var gamePlayArray=[];
   var elName=flag ? RQ_NAME:BRQ_NAME;
   var trList=document.getElementsByName(elName);

   for(var i=0;i<trList.length;i++){
      var spanList=trList[i].getElementsByTagName("span");
      var sumSpNum=0;
      var stop=false;
      var firstNum=null;

      for(var j=0;j<spanList.length;j++){
         var spNum=parseFloat(spanList[j].innerText);
         switch(j){
            case 0:
               firstNum=spNum;break;
            case 1:
               firstNum=firstNum>spNum ? firstNum:spNum;break;
            case 2:
               firstNum=firstNum<spNum ? firstNum:spNum;
               if(firstNum<secondSpMinNum){
                  stop=true;
               }
               break;
         }

         if(spNum<minSpNum){
            //过滤最小Sp值
            $(trList[i].parentElement).hide();
            stop=true;
            break;
         }
         sumSpNum+=spNum;
      }
      if(stop){
         continue;
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
        stop=true;
            break;
         }
      }
    if(stop){
         continue;
      }
      gamePlayArray.push(trList[i].parentElement.id);
      $(trList[i].parentElement).show();

   }

   makeVoteStr(gamePlayArray);
}

function makeVoteStr(gameList){
   //生成投注文件
   var numArray=[0,1,3];
   var content='';
   while(true){
      if(gameList.length<2){
         console.debug(content);
         break;
      }
      console.debug(gameList);
      var game1=gameList[0];
      gameList.splice(0,1);
      var game2Index=Math.round(Math.random()*99999999)%gameList.length;
      console.debug(game2Index);
      var game2=gameList[game2Index];
      gameList.splice(game2Index,1);

      //
      for(var i=0;i<numArray.length;i++){
         
         var gameDateStr=game1.substr(0,8);
         var game1Date=new Date();
         game1Date.setYear(gameDateStr.substr(0,4));
         game1Date.setMonth(parseInt(gameDateStr.substr(4,2))-1);
         game1Date.setDate(gameDateStr.substr(6,2));
         var game1Day=game1Date.getDay();
         game1Day=game1Day==0 ? 7:game1Day;
         var playNum=game1.substr(8);

         for(var j=0;j<numArray.length;j++){
            console.debug(game2)
            var game2DateStr=game2.substr(0,8);
            var game2Date=new Date();
            game2Date.setYear(game2DateStr.substr(0,4));
            game2Date.setMonth(parseInt(game2DateStr.substr(4,2))-1);
            game2Date.setDate(game2DateStr.substr(6,2));
            var game2Day=game2Date.getDay();
            game2Day=game2Day==0 ? 7:game2Day;
            var playNum2=game2.substr(8);

            content+=game1Day+playNum+':['+numArray[i]+']/'+game2Day+playNum2+':['+numArray[j]+']\n';

         }

      }

   }
   
}

function calSumMoney(){

   var list=$(".biaoge6");
   var sum=0;
   for(var i=0;i<list.length;i++){
      var str=$(list[i]).html();
      if(str.indexOf("￥")==0){
         sum+=parseFloat(str.substr(1));
      }
   }
   console.debug(sum);
}

