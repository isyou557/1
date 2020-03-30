(function() {
    $.ajax({
        url:"../json/data.json",
        dataType: "json"
    }).then(function(res){
        console.log(res);
        // 插入轮播图片
        var $limg_html = '';
        for(let i = 0;i < 5; i++) {
            $limg_html += `<a href="#"><img class=${i} src=${res.img[i].url}></a>`;
        }
        $("#limg").html($limg_html);
        // 插入表格

        var tableHtml = `<tr>
                            <th>TIME</th>
                            <th>USER NAME</th>
                            <th>STATUS</th>
                        </tr>`;
        for(let i = 0;i < 2; i++){
            tableHtml +=  `<tr>
                                <td>${res.tableDate[i].TIME}</td>
                                <td>${res.tableDate[i].USER_NAME}</td>
                                <td><button class="btn-success">${res.tableDate[i].STATUS}</button></td>
                            </tr>`;

        }
        $("#contable").html(tableHtml);

    })




    var $spanLeft = $(".container-item3 span.left");
    var $spanRight = $(".container-item3 span.right");
    // 导航栏点击
    $("#subnav").click(function(e){
        $("#subnav li.active").removeClass("active");
        $(e.target).addClass("active");
    })

    
    var $lbtn_html = '';
    for(var i = 0; i < 5; i++) {
        $lbtn_html +=`<li data-num="${i}"></li>`
    }
    $("#lbtn").html($lbtn_html)


    // 鼠标进入轮播图显示按钮组
    $(".container-item3").mouseenter(function(){
        $spanLeft.removeClass("left-in")
        $spanRight.removeClass("right-in")
    }).mouseleave(function(){
        $spanLeft.addClass("left-in")
        $spanRight.addClass("right-in")
    })

    // 左右按钮切图
    var count = 1;
    $(`#lbtn li:nth-child(1)`).addClass("active");
    $spanLeft.click(function(){
        if(count == 1){
            count = 5;
        }else{
            count--;
        }
        $(`#limg a img`).css("opacity","0");
        $(`#limg a:nth-child(${count}) img`).css("opacity","1");
        $(`#lbtn li`).removeClass("active");
        $(`#lbtn li:nth-child(${count})`).addClass("active");
    })

    $spanRight.click(function(){
        if(count == 5){
            count = 1;
        }else{
            count++;
        }
        $(`#limg a img`).css("opacity","0");
        $(`#limg a:nth-child(${count}) img`).css("opacity","1");
        $(`#lbtn li`).removeClass("active");
        $(`#lbtn li:nth-child(${count})`).addClass("active");
    })



    // 轮播图小按钮
    $("#lbtn>li").mouseover(function(e) {
        $num = parseInt($(this).data("num"));
        $("#limg a img").css("opacity","0")
        $("#lbtn li").removeClass("active")
        $(`.${$num}`).css("opacity","1")
        $(this).addClass("active")
        count = $num+1
    })




    $.ajax({
        url: "https://edu.telking.com/api/?type=month",
        type: "get",
        dataType: "json"
    }).then(function(res) {
            var myWr3 = echarts.init(document.getElementById("main"));
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
        console.log(res);
        myWr3.setOption(option);
    })


    $.ajax({
        url: "https://edu.telking.com/api/?type=week",
        type: "get",
        dataType: "json"
    }).then(function(res) {
            var xAx = res.data.xAxis;
            var ser = res.data.series;
            var new_data = [];
            for(var i = 0; i < xAx.length; i++) {
                var obj = {value:ser[i],name:xAx[i]};
                new_data.push(obj)
            }
            var myChart1 = echarts.init(document.getElementById("main1"));
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
                text: "树状图数据展示",
                left: "center"
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