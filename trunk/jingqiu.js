// 外部植入js
// var sc=document.createElement("script");sc.type='text/javascript';sc.src='http://web-lottery-js.googlecode.com/svn/trunk/jingqiu.js';document.body.appendChild(sc);

var form=$("<form id='ajaxForm2' method='post' action='http://localhost:8080/lottery-web/do.jsp?ac=updateJinqing'></from>");
document.body.appendChild(form[0]);
$(form).append($("<textarea id='dataArray' name='dataArray' width='300px' height='200px'></textarea>"));
$(form).append($("<textarea id='nameArray' name='nameArray'width='300px' height='200px'></textarea>"));
$(".commom_body.clearfix").hide();
var dataArray=null;
var nameArray=null;
function fetch(){
	var size=0;
	dataArray=[];
	nameArray=[];
	var trList=$("#livescoreTB tr");
	for(var i=0;i<trList.length;i++){
		var obj=trList[i];
		var id=getId(obj);
		var tdLen=$("#"+id+" td").length;
		if(tdLen>2){
			//do someting
			var array=[];
			var tdList=$("#"+id+" td");
			for(var j=0;j<tdLen;j++){
				var tdObj=tdList[j];
				if(j==tdLen-1){
					array.push(tdObj.innerHTML);
					continue;	
				}
				array.push(tdObj.innerText.replace(/\t|\s|\n/g,''));
				var tdId=getId(tdObj);

				if($("#"+tdId+" a").length>0){
					var tempH=$("#"+tdId+" a")[0].href;
					array.push(tempH);
				}
			}
			var attrName=array[2]+'VS'+array[6];
			nameArray.push(attrName);
			dataArray.push(array);

		}
	}
	console.debug('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
	postData();
	
}

function postData(){
	$("#nameArray").val(JSON.stringify(nameArray));
	$("#dataArray").val(JSON.stringify(dataArray));
	// form.submit();
}
function getId(obj){
   var id=obj.id;
   if(id==''){
      id=Math.round(Math.random()*99999999);
      obj.id=id;
   }
   return id;
}