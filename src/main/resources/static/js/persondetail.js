function GetQueryString(name) {                                       //获取浏览器地址栏参数的方法。
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
};

//设置参数
var schoolNo;  //学校编号
var memberCode;//用户帐号
var openid;
var as;
var shenfen;
var carddd;
var data = {}
data.url = "";
data.memberCode = "";


//$.ajaxSetup({
//    async:false

//$.ajaxSetup({
//    async:false
//})

$(function () {
    //alert(2)
    token = $("#hiddenArea").attr("data-token");
    code = $("#hiddenArea").attr("data-code");
    openid = $("#hiddenArea").attr("data-UserId");//="J00000080099"
    //alert("token=" + token);
    //alert("code=" + code);
   // alert("id=" + openid);


    if (openid.length == 5 || openid.length == 9)
    { }
    else {
        $.alert({
            title: 'warring',
            text: '未绑定微信号，请绑定',
            onOK: function () {
                WeixinJSBridge.call('closeWindow');
                return 0;
            }
        });
    }
    //openid = "02715"
    //alert(openid);
    //alert(1)
    leixin();
    pic();
});

var leixin = function () {
    //判断是否绑定
   // alert(openid)
    var ajaxPram = {};
    ajaxPram["schoolNo"] = "NJIT";
    ajaxPram["memberCode"] = openid;

    $.post("persondetail.ashx", ajaxPram, function (response) {
        //alert(response);
        //alert(1);
        var resp = eval("(" + response + ")");
        //alert(resp.body.data.list.length);
        //alert(resp.body.data.list[0].memberName);
        for (var i = 0; i < resp.body.data.list.length; i++) {
            //只有一张卡
            if (resp.body.data.list.length == 1) {
                var $select = $('#mcard');
                $select.attr('disabled', "disabled");
            }


            //卡类选择
            if ($("#mcard").val() == "0") {
                
                //data.url= resp.body.data.list[i].headImg;
                //data.memberCode=resp.body.data.list[i].memberCode;
              
                //$.ajax({
                //    url: "getImg.ashx",
                //    async: false,
                //    data: data,
                //    success: function (response) {

                //    }
                //})
              
                //alert(i);
                //alert(resp.body.data.list[i].headImg);
                // var imgPath = "../../images/" + resp.body.data.list[i].memberCode + ".jpg";

                //图片的读取
                //var imgPath = "../../images/" + data.memberCode + ".jpg";
                //$.post("getImg.ashx", data, function (response) {
                //    alert(response)
                //    $("#headImg").attr("style", "background-image:url('" + imgPath + "')");
                //})


                //整个读取
                $("#memberName").html(resp.body.data.list[i].memberName);
                $("#memberCode").html(resp.body.data.list[i].memberCode);
               // $("#headImg").attr("style", "background-image:url('../../images/J00000080099.jpg')");
               
                $("#gender").html(resp.body.data.list[i].gender);
                $("#deptDes").attr("value", resp.body.data.list[i].deptDes);// 这里写要显示的东西
                $("#ideDes").attr("value", resp.body.data.list[i].ideDes);
                $("#telephone").attr("value", resp.body.data.list[i].telephone);
                $("#accountNo").attr("value", resp.body.data.list[i].accountNo);
                shenfen = resp.body.data.list[i].identityNo;
                var shenfen1 = shenfen.replace(shenfen.substr(10,6),"******")
                $("#identityNo").attr("value", shenfen1);
                $("#gender").attr("value", resp.body.data.list[i].gender);
                $("#mcard").attr("value", resp.body.data.list[i].mcard);
                $("#cardStatus").attr("value", resp.body.data.list[i].cardStatus);



                //日期格式
                var a = resp.body.data.list[i].validityDate;
                var k = a.split("");
                var x = k[0] + k[1] + k[2] + k[3];
                var x1 = k[4] + k[5];
                var x2 = k[6] + k[7];
                var x4 = x + "/" + x1 + "/" + x2
                $("#validityDate").attr("value", x4);
                $("#cardBalance").attr("value", resp.body.data.list[i].cardBalance / 100+"元" );
                $("#unsettleAmt").attr("value", resp.body.data.list[i].unsettleAmt / 100+"元");
                //隐藏银行卡
                if (resp.body.data.list[i]["bank_number"] != "") {
                    carddd = resp.body.data.list[i].bank_number
                    var carddd1 = carddd.replace(carddd.substr(4, 11), "************")
                    $("#bankNumber").attr("value", carddd1);
                }
                else
                    // document.getElementById("aaa").style.visibility = "hidden";
                    $('#all>div[name="aaa"]').remove();
                if (resp.body.data.list[i]["bbnk_number"] != "") {
                    $("#bbnkNumber").attr("value", resp.body.data.list[i].bbnk_number);
                }
                else
                    // document.getElementById("bbb").style.visibility = "hidden";
                    $('#all>div[name="bbb"]').remove();
                if (resp.body.data.list[i]["bcnk_number"] != "")
                    $("#bcnkNumber").attr("value", resp.body.data.list[i].bcnk_number);
                else
                    // document.getElementById("ccc").style.visibility = "hidden";
                    $('#all>div[name="ccc"]').remove();




            }
        }
    });


    //var imgPath = "../../images/" + data.memberCode + ".jpg";
    //$.post("getImg.ashx", data, function (response) {
    //    alert(response)
    //    $("#headImg").attr("style", "background-image:url('" + imgPath + "')");
    //})


};
var pic = function () {
    var ajaxPram = {};
    ajaxPram["schoolNo"] = "NJIT";
    ajaxPram["memberCode"] = openid;
    $.post("persondetail.ashx", ajaxPram, function (response) {
        //alert(response)
        var resp = eval("(" + response + ")");

        var ajaxPram1 = {};
        ajaxPram1["url"] = resp.body.data.list[0].headImg;
        ajaxPram1["memberCode"] = resp.body.data.list[0].memberCode;

        //data.url = resp.body.data.list[0].headImg;
        //data.memberCode = resp.body.data.list[0].memberCode;
        var imgPath = "http://202.119.160.114/images/" + resp.body.data.list[0].headImg;
        //alert(imgPath);
       
        $.post("getImg.ashx", ajaxPram1, function (response) {
            $("#headImg").attr("style", "background-image:url('" + imgPath + "')");
            //alert(response)
            //$("#headImg").attr("style", "background-image:url('" + imgPath + "')");
        })

    })
}
