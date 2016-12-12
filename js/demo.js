/**
 * Created by hgq on 2016/12/12.
 */
//canvas 画布时钟
var Canvas=document.getElementById("canvas");
function line(){
    if(Canvas.getContext){
        var ctx=Canvas.getContext("2d");
    }else{
        alert("不支持canvas");
    }
    var w=Canvas.width;
    var h=Canvas.height;
    var lineWidth=5;
    var rx=Canvas.width/2;
    var ry=Canvas.height/2;
    var r=Math.min(rx,ry)-lineWidth/2;
    var d=Math.PI*2/60;
    //先清空在绘制
    ctx.clearRect(0, 0, w, h);
    // 绘制表盘
    ctx.beginPath();
    ctx.arc(rx,ry,r,0,Math.PI*2);
    ctx.lineWidth=lineWidth;
    ctx.strokeStyle="#000";
    ctx.stroke();
    var padding=0;
    // 绘制刻度
    for(var i=0;i<60;i++){
        padding=i%5==0?20:10;
        var startX=rx+Math.cos(d*i)*(r-padding);
        var startY=ry+Math.sin(d*i)*(r-padding);
        var endX=rx+Math.cos(d*i)*r;
        var endY=ry+Math.sin(d*i)*r;
        ctx.beginPath();
        ctx.moveTo(startX,startY);
        ctx.lineTo(endX,endY);
        ctx.lineWidth=i%5==0?5:3;
        ctx.strokeStyle="#000";
        ctx.stroke();
    }
    //绘制数字
    for(var j=1;j<13;j++){
        ctx.beginPath();
        ctx.fillStyle = 'orange';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(j,rx+Math.cos(Math.PI/6*(j-1)-Math.PI/3)*(r-50)-8,ry+Math.sin(Math.PI/6*(j-1)-Math.PI/3)*(r-50));
    }

    //绘制秒针
    var date=new Date();
    var rad=Math.PI*2/60*date.getSeconds()-Math.PI/2;//秒针度数，初始实在数字三处，要减去Math.PI/2，使初始在零开始；
    endX=rx+Math.cos(rad)*(r-5);//r-5控制秒针长度
    endY=ry+Math.sin(rad)*(r-5);
    ctx.beginPath();
    ctx.moveTo(rx,ry);
    ctx.lineTo(endX,endY);
    ctx.strokeStyle="red";
    ctx.lineWidth=2;
    ctx.stroke();
    //绘制分针
    rad = Math.PI*2 / 60 * date.getMinutes()+Math.PI*2/3600*date.getSeconds() - Math.PI/2;//分针的度数
    endX=rx+Math.cos(rad)*(r-30);
    endY=ry+Math.sin(rad)*(r-30);
    ctx.beginPath();
    ctx.moveTo(rx,ry);
    ctx.lineTo(endX,endY);
    ctx.strokeStyle="green";
    ctx.lineWidth=4;
    ctx.stroke();
    //绘制时针
    rad =Math.PI*2 / 60 * 5 * ((date.getHours() %12) + (date.getMinutes()/60))- Math.PI/2;//时针走过度数
    endX=rx+Math.cos(rad)*(r-80);
    endY=ry+Math.sin(rad)*(r-80);
    ctx.beginPath();
    ctx.moveTo(rx,ry);
    ctx.lineTo(endX,endY);
    ctx.strokeStyle="blue";
    ctx.lineWidth=8;
    ctx.lineCap="round";//使线端为圆滑形
    ctx.stroke();

    //绘制中心黑点
    ctx.beginPath();
    ctx.arc(rx,ry,6 ,0,Math.PI*2);
    ctx.fillStyle="#000";
    ctx.fill();
}
setInterval(line,1000);
//svg签名
var oPath=document.getElementsByTagName("path")[0];
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}
var dasharray=getStyle(oPath,"stroke-dasharray");
var dashoffset=getStyle(oPath,"stroke-dashoffset");

