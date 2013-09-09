// 外部植入js
// var sc=document.createElement("script");sc.type='text/javascript';sc.src='http://web-lottery-js.googlecode.com/svn/trunk/tool.js';document.body.appendChild(sc);

var RQ_NAME='rqTr';
var BRQ_NAME='brqTr';
var DATA_MAP={}

var sc=document.createElement("script");sc.type='text/javascript';
sc.src='http://web-lottery-js.googlecode.com/svn/trunk/data/ft/core.js';
sc.charset="gb2312";
document.body.appendChild(sc);

var DATA_MAP={}
var sc2=document.createElement("script");sc2.type='text/javascript';
sc2.src='http://web-lottery-js.googlecode.com/svn/trunk/data/ft/dmap.js';
sc2.charset="gb2312";
document.body.appendChild(sc2);


function calRun(){
  flushSpPointGame(true,0.1,10,1.5,3);
}

var gamePlayArray=[];
var gameTTList=[];

//过滤sp占整个Sp和值的百分点
function flushSpPointGame(flag,minSpPointNum,minSumSpNum,minSpNum,secondSpMinNum){
   
   var elName=flag ? RQ_NAME:BRQ_NAME;
   var trList=document.getElementsByName(elName);

   for(var i=0;i<trList.length;i++){
      var trId=getId(trList[i]);
      var spanList=trList[i].getElementsByTagName("span");
      
      var gameId=$(trList[i].parentElement)[0].id;
      var home=$("#"+gameId+" tr td")[4].title;
      var visit=$("#"+gameId+" tr td")[6].title;

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
               console.debug(2+'  '+firstNum);
               if(firstNum<secondSpMinNum){
                  stop=true;
               }
               break;
         }
         if(stop){
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
         $(trList[i].parentElement).hide();
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
      
      var game22={gameId:gameId,home:home,visit:visit};
      gameTTList.push(game22);
      gamePlayArray.push(trList[i].parentElement.id);

      
      $(trList[i].parentElement).show();

   }

   showBox(gameTTList);
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

function getId(obj){
   var id=obj.id;
   if(id==''){
      id=Math.round(Math.random()*99999999);
      obj.id=id;
   }
   return id;
}

function createGameDiv(game){
   var id='template_tr_'+game.gameId;
   if($("#"+id).length==0){

      $("#gameTemplate").append('<tr id="'+id+'" gameId="'+game.gameId+'" state="" class="tem_tr" style="border:2px solid #FFF;"></tr>');
    $("#"+id).append('<td>'+game.gameId+'</td>');
    $("#"+id).append('<td>'+game.home+'</td>');
    $("#"+id).append('<td>'+game.visit+'</td>');
    $("#"+id).append('<td>2.00</td>');
    $("#"+id).append('<td>2.00</td>');
    $("#"+id).append('<td>2.00</td>');
    $("#"+id).append('<td>0球</td>');
    $("#"+id).append('<td>0联赛积分</td>');
    $("#"+id).append('<td>0总进球</td>');
    $("#"+id).append('<td>0赢</td>');
    $("#"+id).append('<td>0平</td>');
    $("#"+id).append('<td>0输</td>');
   }
   

}

function refreshData(){
   var trList=$("#gameTemplate .tem_tr");
   for(var i=0;i<trList.length;i++){
      var tr=trList[i];
      var state=tr.state;
      if(state=='1'){
         continue;
      }
      console.debug('refresh '+tr.gameId);
      
      var homeId=$(DATA_MAP.KEY).attr($(tr).attr("home"));
      var visitId=$(DATA_MAP.KEY).attr($(tr).attr("visit"));

      var homeData=$(DATA_MAP.MAP).attr(homeId);
      var visitData=$(DATA_MAP.MAP).attr(visitId);

      var homeMatchData=homeData.matchData;
      var homeAllJf=homeMatchData.jfnum;
      var homeAllQnum=homeMatchData.qnum;

      var visitMatchData=visitData.matchData;
      var visitAllJf=visitMatchData.jfnum;
      var visitAllQnum=visitMatchData.qnum;

      $("#"+tr.id+" td")[6].innerHTML=homeAllQnum+'<br/>'+visitAllQnum;

      $("#"+tr.id+" td")[7].innerHTML=homeAllJf+'<br/>'+visitAllJf;

      

      if(objData==undefined){
         addDuiJs();
      }
   }
}

var init=false;
function initDiv(){
    if(init){
      return;
    }
    document.body.appendChild($('<div id="divTemplate"></div>')[0]);
    $("#divTemplate").append('<div style="padding:15px;"><span>数据计算中心</span><a href="javascript:closeBox();" style="float:right;">关闭</a></div>');
    $("#divTemplate").css({width:'60%',height:'450px',margin:'30px auto',background:'#EEE',border:'10px solid #ccc',fontSize:'16px'});
    $("#divTemplate").hide();
    
    $("#divTemplate").append('<table id="gameTemplate" width="97%" style="margin:10px;text-align:center;border:1px solie #FFF;font-size:15px;"></table>');

    $("#gameTemplate").append('<tr id="trTemplate" style="border:2px solid #FFF;"></tr>');
    $("#trTemplate").append('<td>id</td>');
    $("#trTemplate").append('<td>主队</td>');
    $("#trTemplate").append('<td>客队</td>');
    $("#trTemplate").append('<td>胜</td>');
    $("#trTemplate").append('<td>平</td>');
    $("#trTemplate").append('<td>负</td>');
    $("#trTemplate").append('<td>联赛球</td>');
    $("#trTemplate").append('<td>联赛积分</td>');
    $("#trTemplate").append('<td>总进球</td>');
    $("#trTemplate").append('<td>赢</td>');
    $("#trTemplate").append('<td>平</td>');
    $("#trTemplate").append('<td>输</td>');


    init=true;
}
initDiv();


function showBox(gamelist){
   for(var i=0;i<gamelist.length;i++){
      var game=gamelist[i];
      createGameDiv(game);
   }
   $('.header').hide();
   $('.wra').hide();
   $("#divTemplate").show();

}

function closeBox(){
   $("#divTemplate").hide();
    $('.header').show();
   $('.wra').show();
}
