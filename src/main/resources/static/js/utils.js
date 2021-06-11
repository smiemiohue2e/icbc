var openID;  //
var userID;
var respzk;
function GetQueryString(name) {                                       //获取浏览器地址栏参数的方法。
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
};
$.ajaxSetup({
    async: false //取消异步         
});

//银行卡
var bankA;
var bankB;
var bankC;
var bankD;

//添加cookie
function addCookie(name, value, expiresHours) {
    var cookieString = name + "=" + escape(value);                     //escape()函数可以对字符串进行编码，这样就可以在所有的计算机上读取该字符串。
    //判断是否设置过期时间,0代表关闭浏览器时失效
    if (expiresHours > 0) {
        var date = new Date();
        date.setTime(date.getTime + expiresHours * 3600 * 1000);
        cookieString = cookieString + "; expires=" + date.toGMTString();
    }
    document.cookie = cookieString;
}

//得到cookie
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");//这里因为传进来的的参数就是带引号的字符串，所以c_name可以不用加引号
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);//当indexOf()带2个参数时，第二个代表其实位置，参数是数字，这个数字可以加引号也可以不加（最好还是别加吧）
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
}

//获取当前时间
function getNowFormatDate() {
    var date = new Date();

    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var seconds = date.getSeconds();
    seconds = seconds.toString();
    var hours = date.getHours();

    var minutes = date.getMinutes();

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }

    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }

    var currentdate = String(date.getFullYear()) + String(month) + String(strDate)
             + String(hours) + String(minutes)
             + String(seconds);

    return currentdate;
}



//校验openId的方法
var checkOpenID = function () {
    
    //通过openID和学校编号获取 学工号 并检测
    userID = $("#hiddenArea").attr("data-UserId");
    schoolNo = "NJIT";

   
   memberCode = userID;
     
    return 1;
}

//检测非法字符，用来密码输入的
function check_str(str) {
    var re_ck = "[@/'\"#$%&^*]+";
    var strForText = str;
    var reg = new RegExp(re_ck);
    if (reg.test(strForText)) {
        return true;
    } else {
        return false;
    }
}

//延时重载函数
function myrefresh() {

    setInterval('window.location.reload()',3000);

}

