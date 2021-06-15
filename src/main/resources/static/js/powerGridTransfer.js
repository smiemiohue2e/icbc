//设置参数
var buildingNo;
var floorNo;
var roomNo;
var sysNo;

var schoolNo = "NJIT";
var mcard;


var token;
var code
var openid;
$.ajaxSetup({
    async: false //取消异步         
});

$(function () {

    // alert(1)


    token = $("#hiddenArea").attr("data-token");
    code = $("#hiddenArea").attr("data-code");
    openid = $("#hiddenArea").attr("data-UserId");//="J00000080099"

    checkmcard();
    getBuilding();
    $("#payMoney").on("click", powerGridTransfer);

});

var checkmcard = function () {



    var ajaxPram = {};
    ajaxPram["schoolNum"] = schoolNo;
    ajaxPram["lostMemberCode"] = openid;
    // alert(memberCode)
    $.post("loserDetail.ashx", ajaxPram, function (response) {
        //alert(response)
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

var getBuilding = function () {
    //alert("building")
    $("#buildingCheck").html(
              '<option  >选择楼宇</option>'
              );
    $("#floorCheck").html(
               '<option  >选择楼层</option>'
               );
    $("#roomCheck").html(
             '<option  >选择寝室</option>'
             );
    var ajaxPram = {};
    ajaxPram["schoolNo"] = schoolNo;
    ajaxPram['page'] = "1";
    ajaxPram['pageSize'] = "100";

    $.post("getBuilding.ashx", ajaxPram, function (response) {
        //alert(response)
        var resp = eval("(" + response + ")");

       // sysNo = resp.body.data.list[0]["sysNo"];
        //alert(sysNo)
        for (var i = 0; i < resp.body.data.list.length; i++) {

            $("#buildingCheck").append(
                '<option data-sysNo=' + resp.body.data.list[i]["sysNo"] + ' value=' + resp.body.data.list[i]["buildingNo"] + '>' + resp.body.data.list[i]["buildingDes"] + '</option>'
                );
        }
    })

}
var getBuildingRes = function () {
    //alert("看房间号")
    buildingNo = $("#buildingCheck").find("option:selected").text();
    //alert(buildingNo);
    //alert(sysNo);
    sysNo = $("#buildingCheck").find("option:selected").attr("data-sysNo")
    //alert(sysNo)
    
    var ajaxPram = {};
    ajaxPram["schoolNo"] = schoolNo;
    ajaxPram["sysNo"] = sysNo;
    ajaxPram["buildingNo"] = buildingNo
    ajaxPram['page'] = "1";
    ajaxPram['pageSize'] = "100";

    $("#floorCheck").html(
                '<option  >选择楼层</option>'
                );

    $.post("getFloor.ashx", ajaxPram, function (response) {
        //alert(response);
        var resp = eval("(" + response + ")");
        for (var i = 0; i < resp.body.data.list.length; i++) {
            $("#floorCheck").append(
                '<option value=' + resp.body.data.list[i]["floorNo"] + ' >' + resp.body.data.list[i]["floorDes"] + '</option>'
                );
        }
    })

}

var getFloorRes = function () {

    floorNo = $("#floorCheck").find("option:selected").val();

    var ajaxPram = {};
    ajaxPram["schoolNo"] = schoolNo;
    ajaxPram["sysNo"] = sysNo;
    ajaxPram["buildingNo"] = buildingNo;
    ajaxPram["floorNo"] = floorNo;
    ajaxPram['page'] = "1";
    ajaxPram['pageSize'] = "100";

    $("#roomCheck").html(
               '<option  >选择寝室</option>'
               );

    $.post("getRoom.ashx", ajaxPram, function (response) {
        //alert(response)
        var resp = eval("(" + response + ")");

        pageTotalRoom = resp.body.data.totalpage;
        pageTotalRoom = Number(pageTotalRoom);


        for (var i = 0; i < resp.body.data.list.length; i++) {
            $("#roomCheck").append(
                '<option value=' + resp.body.data.list[i]["roomNo"]+'  data-No='+resp.body.data.list[i]["roomBal"] + ' >' + resp.body.data.list[i]["roomDes"] + '</option>'
                );
        }
    })
}

var getRoomRes = function () {
    var roomMax = $("#roomCheck").find("option:selected").text();
    roomNo = $("#roomCheck").find("option:selected").val();
    roomBal = $("#roomCheck").find("option:selected").attr("data-No");
}

var powerGridTransfer = function () {
    var ajaxPram = {};
    var transTime = getNowFormatDate();

    var transAmt = $("#transAmt").val();
    //alert(transAmt)

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
    //alert(schoolNo)
    ajaxPram["memberCode"] = openid;
    //alert(openid)
    if (mcard == "普通卡") {
        ajaxPram["mcard"] = "0";

    } else {
        ajaxPram["mcard"] = "1";
    }

    ajaxPram["sysNo"] = sysNo;
    //alert(sysNo)
    ajaxPram["roomNo"] = roomNo;
    //alert(roomNo)
    
    ajaxPram["transAmt"] = transAmt;
    //alert(transAmt)
    ajaxPram["transTime"] = transTime;



    $.confirm("电表剩余度数为" + roomBal + "元,是否充值", function () {
        $.post("powerGridTransfer.ashx", ajaxPram, function (response) {
            //alert(response)
            var resp = eval("(" + response + ")");
            
            if (resp.body.resp_code == "0") {
                $.toast("圈电成功", "success");
            } else {
                $.toast("失败", "forbidden");
            }
        });
    }, function () {

        document.location.reload();
    });




}


