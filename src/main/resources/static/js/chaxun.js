function GetQueryString(name) {                                       //获取浏览器地址栏参数的方法。
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
};
//设置参数
var schoolNo;  //学校编号
var memberCode;//用户帐号
var pageIndex = 1;
var pageTotal = 1;
var tranType;
var beginDate;
var endDate;
var pageIndex;
var pageSize;
var inc = "全部";
var shijian1;
var shijian2;
var time1;
var time2;
var datetime = new Date();
var year = datetime.getFullYear();
var month = datetime.getMonth() + 1;
var date = datetime.getDate();
var hour = datetime.getHours();
var minutes = datetime.getMinutes();
var second = datetime.getSeconds();
var chongzhi = 0;
var xiaofei = 0;
var openid;
var as;
var openid12;


//月，日，时，分，秒 小于10时，补0
if (month < 10) {
    month = "0" + month;
}
if (date < 10) {
    date = "0" + date;
}
if (hour < 10) {
    hour = "0" + hour;
}
if (minutes < 10) {
    minutes = "0" + minutes;
}
if (second < 10) {
    second = "0" + second;
}

//拼接日期格式【例如：yyyymmdd】
var time1 = String(year) +String(month)  + String(date) +String(hour)  +String(minutes)  +String(second) ;//now
var x = year + month + "01";
var time2 = x * 1000000;//当月时间


var arr = new Array(3);
arr[0] = year;
arr[1] = month;
arr[2] = date;
var time8 = arr.join("-")
//alert(time8)
var time3 = new Date();
var time4 = time3.toLocaleDateString();
var time5 = time4.split("/");
var time6 = time5.join("-");
var time7 = (String(year) + String(month) + String(date)) +"000001"




$(function () {
    //alert(1);
    token = $("#hiddenArea").attr("data-token");
    code = $("#hiddenArea").attr("data-code");
    openid = $("#hiddenArea").attr("data-UserId");//="J00000080099"
    //alert("token=" + token);
    //alert("code=" + code);
    //alert("id=" + openid);
      //alert(1);

    //openid = "80099"
    //日期选择器

    shijian2 = time1
    shijian1 = time7

    var datetest1;
    var datetest2;
    var Datepicker = $("#i_mui_calendar").datepicker({
        initData: '2012-12-23', min: '2012-6-6', max: '2030-8-8', type: 'date', onChange: function (date) {
            console.log('the date is change', date);
            datetest1 = date;
            //alert(datetest1);
            var str1 = datetest1
            var kk = str1.split("-");
            //alert(kk[0]);
            //alert(kk[1]);
            //alert(kk[2]);
            riqi1 = kk.join("");
            //alert(riqi1)
            shijian1 = riqi1 + "000101";
           // alert(shijian1);
        }
    })
    var Datepicker1 = $("#i_mui_calendar1").datepicker({
        initData: '2012-12-23', min: '2012-6-6', max: '2030-8-8', type: 'date', onChange: function (date) {
            console.log('the date is change', date);
            datetest2 = date;
            //alert(datetest2);
            var str2 = datetest2
            var ff = str2.split("-");
            //alert(ff[0]);
            //alert(ff[1]);
            //alert(ff[2]);
            riqi2 = ff.join("");
            shijian2 = riqi2 + "235959";
            //alert(shijian2);
            $("#chaxun").html("");
            loserShow();
            pageIndex = 1;
        }
    })


    //日期选择器获当前值
    $("#i_mui_calendar").val(time8);
    $("#i_mui_calendar1").val(time8);



    //前一页
    $("#prepage").on("click", function goPrev_HS() {
        //alert(pageIndex);
        if (pageIndex < 2) {
            pageIndex = 1

        } else {
            pageIndex--;

        }
        $("#chaxun").html("");
        loserShow();
    });

    //下一页
    $("#nextpage").on("click", function goNext_HS() {
        //alert(pageIndex);
        //var tr = $("#loserList").html();
        if (pageIndex < pageTotal)
            pageIndex++;

        $("#chaxun").empty();
        loserShow();
        if (pageIndex == pageTotal) {
            //alert(已经到最后一页！);
        }
    });
    //类型选择
    $("#a").click(function () {
        $("#a").css({ color: "#20C9D4" })
        $("#b").css({ color: "black" })
        $("#c").css({ color: "black" })
        inc = "全部";
        //alert(inc);
        pageIndex = 1
        $("#chaxun").html("");
        loserShow();
    });
    $("#b").click(function () {
        $("#b").css({ color: "#20C9D4" })
        $("#a").css({ color: "black" })
        $("#c").css({ color: "black" })
        inc = "充值";
        //alert(inc);
        pageIndex = 1
        $("#chaxun").html("");
        loserShow();
    });
    $("#c").click(function () {
        $("#c").css({ color: "#20C9D4" })
        $("#b").css({ color: "black" })
        $("#a").css({ color: "black" })
        inc = "减值";
        //alert(inc);
        pageIndex = 1
        $("#chaxun").html("");
        loserShow();
    });

    if (openid.length == 5||openid.length == 9)
    {
            
        $("#a").css({ color: "#20C9D4" })
        $("#b").css({ color: "black" })
        $("#c").css({ color: "black" })
        $("#chaxun").html("");
        loserShow();
    }
   
    else {
        //未绑定
        $("#tishi").css("display", "block");
        $("#a").css({ color: "#20C9D4" })
        $("#b").css({ color: "black" })
        $("#c").css({ color: "black" })
        
    }
   // $("#chaxun").html("");
    //loserShow();
});



//循环函数
var loserShow = function () {

 

    var ajaxPram = {};
    var time = {};
    var consume = {};
    var remain = {};
    //alert(openid);
    //alert(shijian1)
    //alert(shijian2)

    //查询用
    ajaxPram["schoolNo"] = "NJIT";
    ajaxPram["memberCode"] = openid;
    ajaxPram["tranType"] = inc;
    ajaxPram["beginDate"] = shijian1; //time6
    ajaxPram["endDate"] = shijian2; //time1
    ajaxPram["pageIndex"] = pageIndex.toString();
    //ajaxPram["pageIndex"] = "1";
    ajaxPram["pageSzie"] = "40";


    //当月充值
    ajaxPram["schoolNo1"] = "NJIT";
    ajaxPram["memberCode1"] = openid;
    ajaxPram["tranType1"] = "充值";
    ajaxPram["beginDate1"] = shijian1;//time2
    ajaxPram["endDate1"] = shijian2;//time1
    ajaxPram["pageIndex1"] = "1";//pageIndex.toString()
    //ajaxPram["pageIndex"] = "1";
    ajaxPram["pageSzie1"] = "99";

    //当月消费
    ajaxPram["schoolNo2"] = "NJIT";
    ajaxPram["memberCode2"] = openid;
    ajaxPram["tranType2"] = "减值";
    ajaxPram["beginDate2"] = shijian1;//time2
    ajaxPram["endDate2"] = shijian2;//time1
    ajaxPram["pageIndex2"] = "1";//pageIndex.toString()
    //ajaxPram["pageIndex"] = "1";
    ajaxPram["pageSzie2"] = "99";



    //当月消费
    $.post("chaxun2.ashx", ajaxPram, function (response) {
        //alert("消费");
        //alert(response);
        xiaofei = 0;
        var resp = eval("(" + response + ")");
        if (resp.body.resp_desc == "该用户没有交易记录")//无记录
        { }
        else {
            for (var i = 0; i < resp.body.data.list.length; i++) {
                xiaofei = Number(resp.body.data.list[i]["tranAmt"]) + xiaofei;
            }
        }
        xiaofei1 = xiaofei / 100;
        var xiaofei2 = xiaofei1.toFixed(2);
       // alert("消费"+xiaofei2);
        $("#2").html(xiaofei2);
    });
    //当月充值,到999页有bug
    $.post("chaxun1.ashx", ajaxPram, function (response) {
        //alert("充值");
        //alert(response);
        chongzhi = 0;
        var resp = eval("(" + response + ")");

        //if (resp.body.data.list.length ==0);
        //{
        //}
        if (resp.body.resp_desc == "该用户没有交易记录")//无记录
        { }
        else {
            for (var i = 0; i < resp.body.data.list.length; i++) {
                chongzhi = Number(resp.body.data.list[i]["tranAmt"]) + chongzhi;
            }
        }
        chongzhi1 = chongzhi / 100;
        var chongzhi2 = chongzhi1.toFixed(2);
        //alert("充值"+chongzhi2);
        $("#1").html(chongzhi2);
    });

    //全部记录
    $.post("chaxun.ashx", ajaxPram, function (response) {
       // alert("全部");
        //alert(inc)
        //alert(response);
        var resp = eval("(" + response + ")");
        pageTotal = resp.body.data.totalpage;
        pageTotal = Number(pageTotal);
        $("#meiyou").css("display", "block");
        $("#shangxia").css("display", "block");
        $("#tishi").css("display", "none");
        if (resp.body.resp_desc == "该用户没有交易记录")//无记录
        {
            //    alert(1);
            $("#shangxia").css("display", "none");//不显示
        

        }
        else {
            $("#meiyou").css("display", "none");//不显示
            if (pageTotal == 1) {
                $("#shangxia").css("display", "none");
            }
            else {
                $("#prepage").css("display", "block");
                $("#nextpage").css("display", "block");

                if (pageIndex == 1) {
                    $("#prepage").css("display", "none");
                }
                if (pageIndex == pageTotal) {
                    $("#nextpage").css("display", "none");
                }
            }
        }
        //查询所有的循环            
        for (var i = 0; i < resp.body.data.list.length; i++) {
            var type;
            if (resp.body.data.list[i]["inc"] == "1") {
                type = "减值"
            }
            else {
                type = "充值"
            }
            switch (inc) {
                case "减值":
                    if (resp.body.data.list[i]["inc"] == "1") {
                        var time = resp.body.data.list[i]["tranTime"].replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1/$2/$3 $4:$5:$6');

                        var consume = resp.body.data.list[i]["tranAmt"] / 100;
                        var remain = resp.body.data.list[i]["cardBalance"] / 100;
                        var a = consume.toFixed(2);
                        var b = remain.toFixed(2);
                        $("#chaxun").append(
                        '<div id="messDivId">' + '<div class="story">' + '<p class="story_t">' + '交易类型：' + type + '</p>' + '<p class="story_t">' + '交易地点：' + resp.body.data.list[i]["propName"] + '</p>' + '<p class="story_t">' + '交易金额：' + a + '元' + '</p>' + '<p class="story_t">' + '交易余额：' + b + '元' + '</p>' + '<p class="story_time">' + time + '</p>' + '</div>'
                        )
                    };
                    break;
                case "充值":
                    if (resp.body.data.list[i]["inc"] == "0") {
                        var time = resp.body.data.list[i]["tranTime"].replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1/$2/$3 $4:$5:$6');
                        var consume = resp.body.data.list[i]["tranAmt"] / 100;
                        var remain = resp.body.data.list[i]["cardBalance"] / 100;
                        var a = consume.toFixed(2);
                        var b = remain.toFixed(2);
                        $("#chaxun").append(
                        '<div id="messDivId">' + '<div class="story">' + '<p class="story_t">' + '交易类型：' + type + '</p>' + '<p class="story_t">' + '交易地点：' + resp.body.data.list[i]["propName"] + '</p>' + '<p class="story_t">' + '交易金额：' + a + '元' + '</p>' + '<p class="story_t">' + '交易余额：' + b + '元' + '</p>' + '<p class="story_time">' + time + '</p>' + '</div>')
                    };
                    break;
                case "全部":
                    var time = resp.body.data.list[i]["tranTime"].replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1/$2/$3 $4:$5:$6');
                    var consume = resp.body.data.list[i]["tranAmt"] / 100;
                    var remain = resp.body.data.list[i]["cardBalance"] / 100;
                    var a = consume.toFixed(2);
                    var b = remain.toFixed(2);
                    $("#chaxun").append(
                        '<div id="messDivId">' + '<div class="story">' + '<p class="story_t">' + '交易类型：' + type + '</p>' + '<p class="story_t">' + '交易地点：' + resp.body.data.list[i]["propName"] + '</p>' + '<p class="story_t">' + '交易金额：' + a + '元' + '</p>' + '<p class="story_t">' + '交易余额：' + b + '元' + '</p>' + '<p class="story_time">' + time + '</p>' + '</div>');
                    break;
            }
        };
    });
    //判断是否绑定
    //var openid = GetQueryString("openid");
}