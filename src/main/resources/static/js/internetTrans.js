//设置参数
var schoolNo;
var memberCode;
var mcard;

$(function () {
    
    if (checkOpenID()) {
        checkmcard();
        $("#payMoney").on("click", internetTrans);
    }
});

var checkmcard = function () {
    var ajaxPram = {};
    ajaxPram["schoolNum"] = schoolNo;
    ajaxPram["lostMemberCode"] = memberCode;
    $.post("loserDetail.ashx", ajaxPram, function (response) {
        var resp = eval("(" + response + ")");
        var length = resp.body.data.list.length;
        var mcardSelected = $("#mcard").find("option:selected").text()
        $select = $("#mcard");
        if (length == 1) {
            $("#memberName").attr("value", resp.body.data.list[0]["memberName"]);
            $("#memberCode").attr("value", resp.body.data.list[0]["memberCode"]);
            $("#deptDes").attr("value", resp.body.data.list[0]["deptDes"]);
            $("#mcard").attr("value", resp.body.data.list[0]["mcard"]);
            mcard = resp.body.data.list[0]["mcard"];

            $select.attr("disabled", "disabled");
        } else {
            if (resp.body.data.list[0]["cardStatus"] != "挂失" && resp.body.data.list[1]["cardStatus"] != "挂失") {
                for (var i = 0; i < resp.body.data.list.length; i++) {

                    
                    if (resp.body.data.list[i]["mcard"] == mcardSelected) {
                        $("#memberName").attr("value", resp.body.data.list[i]["memberName"]);
                        $("#memberCode").attr("value", resp.body.data.list[i]["memberCode"]);
                        $("#deptDes").attr("value", resp.body.data.list[i]["deptDes"]);
                        mcard = resp.body.data.list[i]["mcard"];
                       
                        break;
                    }
                } 

            } else if (resp.body.data.list[0]["cardStatus"] != "挂失" && resp.body.data.list[1]["cardStatus"] == "挂失") {
                $("#memberName").attr("value", resp.body.data.list[0]["memberName"]);
                $("#memberCode").attr("value", resp.body.data.list[0]["memberCode"]);
                $("#deptDes").attr("value", resp.body.data.list[0]["deptDes"]);
                
                mcard = resp.body.data.list[0]["mcard"];
                
                if (mcard == "普通卡") {
                    $("#mcard option[value='0']").attr("selected", "selected");
                } else {
                    $("#mcard option[value='1']").attr("selected", "selected");
                }
                $select.attr("disabled", "disabled");
               
            } else if (resp.body.data.list[0]["cardStatus"] == "挂失" && resp.body.data.list[1]["cardStatus"] != "挂失") {
                $("#memberName").attr("value", resp.body.data.list[1]["memberName"]);
                $("#memberCode").attr("value", resp.body.data.list[1]["memberCode"]);
                $("#deptDes").attr("value", resp.body.data.list[1]["deptDes"]);
               
                mcard = resp.body.data.list[1]["mcard"];
                if (mcard == "普通卡") {
                    $("#mcard option[value='0']").attr("selected", "selected");
                } else {
                    $("#mcard option[value='1']").attr("selected", "selected");
                }
                $select.attr("disabled", "disabled");
                
            }
        }
       
    });
}

var internetTrans = function () {
    var ajaxPram = {};
    var transTime = getNowFormatDate();

    var transAmt = $("#transAmt").val();

    if (Number(transAmt) <= 0 || Number(transAmt) > 500) {
        $.alert({
            title: '金额错误',
            text: '只能充值1-500元',
            onOK: function () {
                $("#transAmt").val("");
                return;
            }
        });
        return;
    }

    ajaxPram["schoolNo"] = schoolNo;
    ajaxPram["memberCode"] = memberCode;
    if (mcard == "普通卡") {
        ajaxPram["mcard"] = "0";

    } else {
        ajaxPram["mcard"] = "1";
    }
    ajaxPram["transAmt"] = transAmt*100;
    ajaxPram["transTime"] = transTime;

    $.post("internetTrans.ashx", ajaxPram, function (response) {
       // alert(response)
        var resp = eval("(" + response + ")");


        if (resp.body.resp_code == "0") {
            $.toast("划款成功", "success");
        } else {
            $.toast("失败", "forbidden");
        }

    })

}

