(function(){
  $("#subnav").click(function(e){
  $("li.active").removeClass("active");
  $(e.target).addClass("active");
})
var imgurl = [
  {name:"img1",url:"https://via.placeholder.com/540x265.png?text=1/O https://placeholder.com/"},
  {name:"img2",url:"https://via.placeholder.com/540x265.png?text=2/O https://placeholder.com/"},
  {name:"img3",url:"https://via.placeholder.com/540x265.png?text=3/O https://placeholder.com/"},
  {name:"img4",url:"https://via.placeholder.com/540x265.png?text=4/O https://placeholder.com/"},
  {name:"img5",url:"https://via.placeholder.com/540x265.png?text=5/O https://placeholder.com/"},
  {name:"img5",url:"https://via.placeholder.com/540x265.png?text=6/O https://placeholder.com/"},
  {name:"img5",url:"https://via.placeholder.com/540x265.png?text=7/O https://placeholder.com/"},
  // {name:"img5",url:"https://via.placeholder.com/540x265.png?text=7/O https://placeholder.com/"},
  // {name:"img5",url:"https://via.placeholder.com/540x265.png?text=7/O https://placeholder.com/"},
  // {name:"img5",url:"https://via.placeholder.com/540x265.png?text=7/O https://placeholder.com/"},
]
var $limg = $("#limg")
var $imgNum = imgurl.length ;
var $imgWidth = 540;
var $limg_html = '';
for(var elem of imgurl){
  $limg_html += `<img src=${elem.url}>`;
}
$limg.html($limg_html);
// .css("left",-$imgWidth*($imgNum-1));

var $lbtn = $("#lbtn");
var $lbtn_html = '';
for(var i = 0;i<imgurl.length;i++){
  $lbtn_html +=`<li data-num="${i}"></li>`
}
//根据图片个数给li 并重新计算ul位置
$lbtn.html($lbtn_html).css("left",($imgWidth-80-16*$imgNum)/2)
var $lunbo = $("#lunbo");
var $num = $imgNum-1;
$lunbo.mouseenter(function(){
  $("#lunbo>ol>li").css("background-color","#000");
}).mouseleave(function(){
  $("#lunbo>ol>li").css("background-color","");
})
$("#lunbo>ol>li").click(function(){
  $num += $(this).data("num");
  if($num < 0){$num = $imgNum-1;}
  if($num > $imgNum-1){$num = 0;}
  $limg.css("left",-$num*$imgWidth);
})
$(".wrap2>div>ul>li").mouseover(function(e){
  // var$num =  e.target.className;
  $num = parseInt($(this).data("num"));
  $limg.css("left",-$num*$imgWidth);
})

$.ajax({
  url:"https://edu.telking.com/api/?type=month",
  type:"get",
  dataType:"json"
}).then(function(res){
var myWr3= echarts.init(document.getElementById("main"));
option = {
  title: {
    textAlign: "auto",
    text: "曲线图数据展示",
    left: 'center'
  },
  xAxis: {
    type: 'category',
    data: res.data.xAxis
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: res.data.series ,
    type: 'line'
  }]
};
myWr3.setOption(option);
})


$.ajax({
  url:"https://edu.telking.com/api/?type=week",
  type:"get",
  dataType:"json"
}).then(function(res){
var xAx = res.data.xAxis;
var ser = res.data.series;
var new_data = [];
for(var i=0;i<xAx.length;i++){
  var obj = {value:ser[i],name:xAx[i]};
  new_data.push(obj)
}
var myChart1= echarts.init(document.getElementById("main1"));
option = {
  title: {
    textAlign: "auto",
    text: "饼状图数据展示",
    left: 'center'
  },
  series: [{
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: new_data,
      emphasis: {
          itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
      }
  }]
};
myChart1.setOption(option);

var myChart2 = echarts.init(document.getElementById("main2"))
option = {
  title:{
    text:"树状图数据展示",
    left:"center"
  },
  color: ['#3398DB'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {       
      type: 'shadow'       
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [{
    type: 'category',
    data: xAx,
    axisTick: {
      alignWithLabel: true
    }
  }],
  yAxis: [{
      type: 'value'
  }],
  series: [{
      name: '商品数',
      type: 'bar',
      barWidth: '60%',
      data: ser
  }]
};
myChart2.setOption(option);
})
})()