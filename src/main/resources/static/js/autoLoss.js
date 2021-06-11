//设置参数
var schoolNo;   //学校编号
var memberCode;   //学工号

var cardStatus;

$.ajaxSetup({
    async: false //取消异步         
});

function GetQueryString(name) {                                       //获取浏览器地址栏参数的方法。
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
};

$(function () {


    //通过openID和学校编号获取 学工号
    if (checkOpenID()) {

        checkmcard();

 //   memberCode = "WX0002"//getCookie("memberCode");             //这两步其实可以不需要了
  //  addCookie("memberCode", memberCode, 0);

    //通过学工号和学校编号获取用户信息显示
      $("#autoLoss").on("click",lossConfirm);
    }


});

var checkmcard = function () {
    var ajaxPram = {};
    ajaxPram["schoolNum"] = schoolNo;
    ajaxPram["lostMemberCode"] = memberCode;
    $.post("loserDetail.ashx", ajaxPram, function (response) {
        var resp = eval("(" + response + ")");
        var cardStatus = resp.body.data.list[0]["cardStatus"];
        var mcardSelected = $("#mcard").find("option:selected").text()
        var resp = eval("(" + response + ")");
        var length = resp.body.data.list.length;
        $select = $("#mcard");
        if (length == 1) {
            $("#memberName").attr("value", resp.body.data.list[0]["memberName"]);
            $("#memberCode").attr("value", resp.body.data.list[0]["memberCode"]);
            $("#deptDes").attr("value", resp.body.data.list[0]["deptDes"]);
            $("#mcard").attr("value", resp.body.data.list[0]["mcard"]);
            mcard = resp.body.data.list[0]["mcard"];
           
            $select.attr("disabled", "disabled");
        } else {
                for (var i = 0; i < resp.body.data.list.length; i++) {        
                    if (resp.body.data.list[i]["mcard"] == mcardSelected) {
                            $("#memberName").attr("value", resp.body.data.list[i]["memberName"]);
                            $("#memberCode").attr("value", resp.body.data.list[i]["memberCode"]);
                            $("#deptDes").attr("value", resp.body.data.list[i]["deptDes"]);                      
                            mcard = resp.body.data.list[i]["mcard"];
                            cardStatus = resp.body.data.list[i]["cardStatus"];
                            $("#mcard").attr("value", resp.body.data.list[0]["mcard"]);
                            break;
                        
                    } 
                }
            }

        $("#cardStatus").attr("value", cardStatus);
        if (cardStatus != "正常") {
            //    $("#autoLoss").attr("class", "weui-btn weui-btn_disabled weui-btn_warn ");
            $("#autoLoss").attr("disabled", "disabled");
            $("#autoLoss").attr("style", "background:gray");   //
        } else {
            $("#autoLoss").removeAttr("disabled", "disabled");
            $("#autoLoss").removeAttr("style", "background:gray");
        }
    });

}

var lossConfirm = function () {
    var password = $("#password").val();
    if (!password) {
        //密码为空
        $.alert("密码为空", "警告");
        return false;
    } else if (check_str(password)) {
        $.alert("密码不能包含非法字符!", "警告");
        return false;
    } 
    //通过学校编号，学工号，卡类型和一卡通密码 进行自助挂失

    var ajaxPram2 = {};
    ajaxPram2["schoolNo"] = schoolNo;
    ajaxPram2["memberCode"] = memberCode;
    ajaxPram2["mcard"] = "0";
    ajaxPram2["password"] = $("#password").val();

    $.post("autoLoss.ashx", ajaxPram2, function (response) {
        var resp = eval("(" + response + ")");
        if (resp.body.resp_code == "0") {
            
            $.toast("挂失成功", "success");
        } else {
            $.toast("挂失失败,密码是否正确？", "forbidden");
        }
        
    });

}
