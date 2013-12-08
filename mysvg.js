/*
 * 纯html实现的图表画布
 * author Fan.Zhang
 */


  /*
   *模拟画布
   *data 一个json对象，
   */
  function MockCanvas(data){
    this.id='chart';//画布容器id
    this.height=150;//画布高度
    this.width=300;//画布宽度
    this.pxClass='px_div';//
    this.brClass='br_div';//
    this.linePxClass='px_line';//
    this.pxTagName='div';//div,span 坐标纸单位坐标使用的标签
    this.brTagName='div';//P,div           坐标纸换行标签
    this.absTagName='div';//绝对悬浮控件
    this.xuY=true;//画y轴，分割虚线
    this.xuX=true;//画x轴，分割虚线
    this.xZColor='#3880aa';//x轴颜色
    this.yZColor='#3880aa';//y轴颜色
    this.xuColor='#EEE';//虚线颜色

    this.xKedu=data.xKedu;//x轴刻度  {size:12,map:{1:'1月',2:'2月',3:'3月',4:'4月',5:'5月',6:'6月'}}
    this.yKedu=data.yKedu;//y轴刻度  {size:6,map:{1:'1000',2:'2000',3:'3000',4:'4000',5:'5000',6:'6000'}}

    this.initCanvas();
  }


  //画布初始化
  MockCanvas.prototype.initCanvas=function(){

    var html='';
    $("#"+this.id).html(html);//清空坐标纸

    for(var y=this.height;y>=-1;y--){
      var trHtml='';
      for(var x=-1;x<=this.width;x++){
        var px_id=this.createPxId(x,y);//像素的id
        var div=this.createPx(px_id);
        
        //将像素添加到坐标纸
        trHtml+=div;
      }
      //添加换行
      var brId=this.createBrId(y);
      html+=this.createBr(trHtml,brId);
    }
    $("#"+this.id).html(html);
    this.printXYZhou();//画x轴，y轴
  }

  //画XY轴
  MockCanvas.prototype.printXYZhou=function(){

    this.printHengLine(0,this.width,0,this.xZColor);
    this.printSuLine(0,0,this.height,this.yZColor);
    

    //X轴刻度
    var xKedu=this.xKedu;
    var xSize=this.xKedu.size;
    var xMap=this.xKedu.map;
    var xOne=this.width/xSize;//X轴每个单位刻度
    for(var key in xMap){
      //添加X轴刻度
      var keyNum=parseInt(parseInt(key)*xOne);
      var keyValue=xMap[key];
      this.printSuLine(keyNum,-1,0,this.xZColor);//画刻度点
      
      //是否需要画虚线
      if(this.xuY){
        //X轴画Y轴虚线
        this.printSuLine(keyNum,1,this.height,this.xuColor);//画虚线
      }

      //添加x轴刻度标识
      this.appendXAbsolute(keyNum,keyValue,xOne);
    }

    //Y轴刻度
    var yKedu=this.yKedu;
    var ySize=this.yKedu.size;
    var yMap=this.yKedu.map;
    var yOne=this.height/ySize;//Y轴每个单位刻度

    for(var key in yMap){
      var keyNum=parseInt(parseInt(key)*yOne);
      var keyValue=yMap[key];
      this.printHengLine(-1,0,keyNum,this.yZColor);

      //是否需要画虚线
      if(this.xuX){
        //X轴画Y轴虚线
        this.printHengLine(1,this.width,keyNum,this.xuColor);//画虚线
      }

      //添加y轴刻度标识
      this.appendYAbsolute(keyNum,keyValue,yOne);
    }
  }


  //x轴刻度标识添加到画布上
  MockCanvas.prototype.appendXAbsolute=function(keyNum,keyValue,xOne){
    var pos=$('#'+this.createPxId(keyNum,-1)).position();
    var html=this.createAbsolute('abs_X'+keyNum,keyValue);
    var absDiv=$(html);
    var absLeft=pos.left-xOne/2;
    var absTop=pos.top+2;
    var absWidth=xOne;
    absDiv.css({top:absTop+'px',left:absLeft+'px',width:absWidth+'px',textAlign:'center'});
    $("#"+this.id).append(absDiv);
  }

  //y轴刻度标识添加到画布上
  MockCanvas.prototype.appendYAbsolute=function(keyNum,keyValue,yOne){
    var pos=$('#'+this.createPxId(-1,keyNum)).position();
    var html=this.createAbsolute('abs_Y'+keyNum,keyValue);
    var absDiv=$(html);
    var absTop=pos.top-10;
    var absLeft=pos.left-100;
    absDiv.css({top:absTop+'px',left:absLeft+'px',width:95+'px',textAlign:'right'});
    $("#"+this.id).append(absDiv);
  }


  //画一个矩形
  MockCanvas.prototype.printRect=function(x1,x2,y1,y2,color){
    //填充x,y区域像素
    for(var x=x1;x<=x2;x++){
      
      for(var y=y1;y<=y2;y++){
        $('#'+this.createPxId(x,y)).css('backgroundColor',color);
      }
    }

  }

  //画点两点间的直线
  MockCanvas.prototype.printZhiLine=function(x1,y1,x2,y2,color){

    var line_id='Zline_'+x1+'_'+x2+'_'+y1+'_'+y2;
    if($("#"+line_id).length>0){
      $("#"+line_id).empty();
    }
    else{
      $("#"+this.id).append($("<div id='"+line_id+"'></div>")); 
    }

    var xC=Math.abs(x1-x2);
    var yC=Math.abs(y1-y2);
    var xyC=xC/yC;
    var yxC=yC/xC;
    var pos=$('#'+this.createPxId(0,0)).position();
    var html='';
    for(var x=x1;x<=x2;){
      var y=y1+(x-x1)*yxC;
      var intY=pos.top-y;
      var intX=pos.left+x;

      var cssStyle='top:'+intY+'px;left:'+intX+'px;background-color:'+color;
      var linePxHtml=this.createLinePx('lpx_'+intX+'_'+intY,cssStyle);

      // var absDiv=$(linePxHtml);
      // absDiv.css({top:intY+'px',left:intX+'px',backgroundColor:color});
      html+=linePxHtml;
      x=x+0.2;
    }

    for(var y=y1;y<=y2;){

      var x=x1+(y-y1)/yxC;
      var intY=pos.top-y;
      var intX=pos.left+x;
      
      var cssStyle='top:'+intY+'px;left:'+intX+'px;background-color:'+color;
      var linePxHtml=this.createLinePx('lpx_'+intX+'_'+intY,cssStyle);
      html+=linePxHtml;
      //if($("#"+'lpx_'+intX+'_'+intY).length==0)
     
      y=y+0.5;
    }
    $("#"+line_id).html(html);
    // var lineBox=$('<div></div>').html(html);
    // $("#"+this.id).append(lineBox); 
  }

  /*
   *画一条横线
   *param x1 x轴开始坐标
   *param x2 x轴结束坐标
   *param y  y轴坐标
   *param color 颜色
   */
  MockCanvas.prototype.printHengLine=function(x1,x2,y,color){

    for(var x=x1;x<=x2;x++){
      //给这条线上的每一个像素块添加颜色
      $('#'+this.createPxId(x,y)).css('background-color',color);
    }
  }

  /*
   *画一条竖线
   *param x  x轴坐标
   *param y1 y轴开始坐标
   *param y2 y轴结束坐标
   *param color 颜色
   */
  MockCanvas.prototype.printSuLine=function(x,y1,y2,color){
    for(var y=y1;y<=y2;y++){
       //给这条线上的每一个像素块添加颜色
       $('#'+this.createPxId(x,y)).css('backgroundColor',color);
    }
  }

  //创建像素
  MockCanvas.prototype.createPx=function(px_id){
     var pxHtml='<TagName id="ID" class="pxClass"></TagName>'
     .replace(/TagName/g,this.pxTagName)
     .replace(/pxClass/g,'px_'+this.pxTagName)
     .replace(/ID/g,px_id);
     return pxHtml;
  }

  //创建换行
  MockCanvas.prototype.createBr=function(trHtml,brId){
    var brHtml='<TagName id="brId" class="brClass">trHtml</TagName>'.replace(/TagName/g,this.brTagName)
    .replace(/brClass/g,'br_'+this.brTagName)
    .replace(/trHtml/g,trHtml)
    .replace(/brId/g,brId);
    return brHtml;
  }

  //创建悬浮
  MockCanvas.prototype.createAbsolute=function(absId,html){
    var absDiv='<TagName id="ID" class="absClass">HTML</TagName>'.replace(/TagName/g,this.absTagName)
    .replace(/absClass/g,'absolute_'+this.absTagName)
    .replace(/HTML/g,html)
    .replace(/ID/g,absId);
    return absDiv;
  }

  //画折线至少需要0.1px精度的像素控件
  MockCanvas.prototype.createLinePx=function(px_id,cssStyle){
    
    var pxHtml='<TagName id="ID" class="pxClass" style="CSS"></TagName>'
     .replace(/TagName/g,this.pxTagName)
     .replace(/pxClass/g,this.linePxClass)
     .replace(/CSS/g,cssStyle)
     .replace(/ID/g,px_id);
     return pxHtml;
  }

  //创建像素id
  //x 横坐标
  //y 竖坐标
  MockCanvas.prototype.createPxId=function(x,y){
    return 'px_'+x+'_'+y;
  }

  //创建trid
  MockCanvas.prototype.createBrId=function(brId){
    return 'br_'+brId;
  }

