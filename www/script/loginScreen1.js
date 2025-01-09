document.addEventListener("deviceready", SetRememberLogin, false);
var errmsg = "";

$(function () {

    spHHT_Get_OrgTypemaster('1');

    //here load function
    $("#btnLogin").click(function () { // button click event
        var pUserID = $('#txtUserName').val();
        var pPassword = $('#txtPassword').val();
        if (pUserID == '') {
            errmsg = "Please enter user name</br>";
            $.alert(errmsg);
            return false;
        } else if (pPassword == '') {
            errmsg = "Please enter password</br>";
            $.alert(errmsg);
            return false;
        } else {
            $('body').mLoading({
                text: "Please Wait..",
            });
          
          
                UserLogin(pUserID, pPassword); // login function
           
            // UserLogin(pUserID, pPassword); // login function
            RememberCheck(); // Remember User id Password function
        }
        //tempUserLogin();
    });
});
//document.addEventListener("deviceready", onDeviceReady, false);
//function onDeviceReady() {
//    document.addEventListener("backbutton", function (e) {
//        e.preventDefault();
//        navigator.notification.confirm("Are you sure want to exit from App?", onConfirmExit, "Confirmation", "Yes,No");
//    }, false);
//}
//function onConfirmExit(button) {
//    if (button == 2) { //If User select a No, then return back;
//        return;
//    } else {
//        navigator.app.exitApp(); // If user select a Yes, quit from the app.
//    }
//}

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false); //Listen to the User clicking on the back button
}

function onBackKeyDown(e) {
    e.preventDefault();
    navigator.notification.confirm("Are you sure you want to exit ?", onConfirm, "Confirmation", "Yes,No");
    // Prompt the user with the choice
}

function onConfirm(button) {
    if (button == 2) {//If User selected No, then we just do nothing
        return;
    } else if (button == 1) {
        navigator.app.exitApp();// Otherwise we quit the app.
    } else if (button == 0) {
        return;
        // navigator.app.exitApp();// Otherwise we quit the app.
    }
}

// ajax call for logi user start here

UserLogin = function (pUserID, pPassword) {
    debugger
    localStorage.clear();
    $.ajax({
        type: 'POST',
        url: loginUrl + "/ValidateUser",
        data: JSON.stringify({ 'pUserID': pUserID, 'pPassword': pPassword }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d);
            if (response.d == 'Please enter valid credentials.') {
                HideLoader();
                errmsg = "Please enter valid credentials.</br>";
                $.alert(errmsg);
                return false;
            }
            else {
            
                var obj = JSON.parse(response.d);
                console.log(obj);
                if (obj != null && obj != "") {
                    if (obj.length > 0) {
                        if (obj[0].OrganizationTypeId == '10') { // GHA
                            localStorage.setItem('loginName', obj[0].Name);
                            localStorage.setItem('OrgName', obj[0].OrgName);
                            localStorage.setItem('EmailId', obj[0].EmailId);
                            localStorage.setItem('CreatedByUserId', obj[0].CreatedByUserId);
                            localStorage.setItem('OrganizationBranchId', obj[0].OrganizationBranchId);
                            localStorage.setItem('OrganizationTypeId', obj[0].OrganizationTypeId);
                            localStorage.setItem('OrganizationId', obj[0].OrganizationId);
                            window.location.href = "dashboard-export.html";

                        } else if (obj[0].OrganizationTypeId == '3') { // Freight Forwarder
                            localStorage.setItem('loginName', obj[0].Name);
                            localStorage.setItem('OrgName', obj[0].OrgName);
                            localStorage.setItem('EmailId', obj[0].EmailId);
                            localStorage.setItem('FFLocation', '3');
                            localStorage.setItem('CreatedByUserId', obj[0].CreatedByUserId);
                            localStorage.setItem('OrganizationBranchId', obj[0].OrganizationBranchId);
                            localStorage.setItem('OrganizationTypeId', obj[0].OrganizationTypeId);
                            localStorage.setItem('OrganizationId', obj[0].OrganizationId);
                            window.location.href = "ForwardersTruckersExportDashboard.html";
                        }
                        else if (obj[0].OrganizationTypeId == '25') {  // TPS
                            localStorage.setItem('EmailId', obj[0].EmailId);
                            localStorage.setItem('loginName', obj[0].Name);
                            localStorage.setItem('OrgName', obj[0].OrgName);
                            localStorage.setItem('CreatedByUserId', obj[0].CreatedByUserId);
                            localStorage.setItem('OrganizationBranchId', obj[0].OrganizationBranchId);
                            localStorage.setItem('OrganizationTypeId', obj[0].OrganizationTypeId);
                            localStorage.setItem('OrganizationId', obj[0].OrganizationId);
                            window.location.href = "TPS_Checkin.html";
                        } else if (obj[0].OrganizationTypeId == '5') { // Trucker
                            localStorage.setItem('EmailId', obj[0].EmailId);
                            localStorage.setItem('loginName', obj[0].Name);
                            localStorage.setItem('OrgName', obj[0].OrgName);
                            localStorage.setItem('CreatedByUserId', obj[0].CreatedByUserId);
                            localStorage.setItem('OrganizationBranchId', obj[0].OrganizationBranchId);
                            localStorage.setItem('OrganizationTypeId', obj[0].OrganizationTypeId);
                            localStorage.setItem('OrganizationId', obj[0].OrganizationId);
                            window.location.href = "DashboardDriverDepart.html";
                        }
                        else {
                            HideLoader();
                            errmsg = "You are not authenticate user for access this application, please contact Admin.</br>";
                            $.alert(errmsg);
                            return false;
                        }
                    }
                } else {
                    HideLoader();
                    errmsg = errmsg + 'Invalid username and password.';
                    $.alert(errmsg);
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}


UserLoginWithDropDown = function (pUserID, pPassword) {
    localStorage.clear();
    $.ajax({
        type: 'POST',
        url: loginUrl + "/ValidateUser",
        data: JSON.stringify({ 'pUserID': pUserID, 'pPassword': pPassword }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d);
            if (response.d == 'Please enter valid credentials.') {
                HideLoader();
                errmsg = "Please enter valid credentials.</br>";
                $.alert(errmsg);
                return false;
            }
            else {
                var obj = JSON.parse(response.d);
                if (obj != null && obj != "") {
                    if (obj.length == 2) {
                        if ($("#ddlBranchWiseList").val() == '5' && obj[1].OrganizationTypeId == '5') { // Trucker
                            localStorage.setItem('EmailId', obj[1].EmailId);
                            localStorage.setItem('loginName', obj[1].Name);
                            localStorage.setItem('OrgName', obj[1].OrgName);
                            localStorage.setItem('CreatedByUserId', obj[1].CreatedByUserId);
                            localStorage.setItem('OrganizationBranchId', obj[1].OrganizationBranchId);
                            localStorage.setItem('OrganizationTypeId', obj[1].OrganizationTypeId);
                            localStorage.setItem('OrganizationId', obj[1].OrganizationId);
                            window.location.href = "DashboardDriverDepart.html";
                        } else if ($("#ddlBranchWiseList").val() == '10' && obj[0].OrganizationTypeId == '10') { // GHA
                            localStorage.setItem('loginName', obj[1].Name);
                            localStorage.setItem('OrgName', obj[1].OrgName);
                            localStorage.setItem('EmailId', obj[1].EmailId);
                            localStorage.setItem('CreatedByUserId', obj[1].CreatedByUserId);
                            localStorage.setItem('OrganizationBranchId', obj[1].OrganizationBranchId);
                            localStorage.setItem('OrganizationTypeId', obj[1].OrganizationTypeId);
                            localStorage.setItem('OrganizationId', obj[1].OrganizationId);
                            window.location.href = "Dashboard.html";

                        } else if ($("#ddlBranchWiseList").val() == '3' && obj[0].OrganizationTypeId == '3') { // Freight Forwarder
                            localStorage.setItem('loginName', obj[1].Name);
                            localStorage.setItem('OrgName', obj[1].OrgName);
                            localStorage.setItem('EmailId', obj[1].EmailId);
                            localStorage.setItem('FFLocation', '3');
                            localStorage.setItem('CreatedByUserId', obj[1].CreatedByUserId);
                            localStorage.setItem('OrganizationBranchId', obj[1].OrganizationBranchId);
                            localStorage.setItem('OrganizationTypeId', obj[1].OrganizationTypeId);
                            localStorage.setItem('OrganizationId', obj[1].OrganizationId);
                            window.location.href = "ForwardersTruckersExportDashboard.html";
                        }
                        else {
                            HideLoader();
                            errmsg = "Please select valid Branch.</br>";
                            $.alert(errmsg);
                            return false;
                        }
                    } else if (obj.length == 1) {
                        if (obj[0].OrganizationTypeId == '10' && $("#ddlBranchWiseList").val() == '10') { // GHA
                            localStorage.setItem('loginName', obj[0].Name);
                            localStorage.setItem('OrgName', obj[0].OrgName);
                            localStorage.setItem('EmailId', obj[0].EmailId);
                            localStorage.setItem('CreatedByUserId', obj[0].CreatedByUserId);
                            localStorage.setItem('OrganizationBranchId', obj[0].OrganizationBranchId);
                            localStorage.setItem('OrganizationTypeId', obj[0].OrganizationTypeId);
                            localStorage.setItem('OrganizationId', obj[0].OrganizationId);
                            window.location.href = "Dashboard.html";

                        } else if (obj[0].OrganizationTypeId == '3' && $("#ddlBranchWiseList").val() == '3') { // Freight Forwarder
                            localStorage.setItem('loginName', obj[0].Name);
                            localStorage.setItem('OrgName', obj[0].OrgName);
                            localStorage.setItem('EmailId', obj[0].EmailId);
                            localStorage.setItem('FFLocation', '3');
                            localStorage.setItem('CreatedByUserId', obj[0].CreatedByUserId);
                            localStorage.setItem('OrganizationBranchId', obj[0].OrganizationBranchId);
                            localStorage.setItem('OrganizationTypeId', obj[0].OrganizationTypeId);
                            localStorage.setItem('OrganizationId', obj[0].OrganizationId);
                            window.location.href = "ForwardersTruckersExportDashboard.html";
                        }
                        else if (obj[0].OrganizationTypeId == '5' && $("#ddlBranchWiseList").val() == '5') { // Trucker
                            localStorage.setItem('EmailId', obj[0].EmailId);
                            localStorage.setItem('loginName', obj[0].Name);
                            localStorage.setItem('OrgName', obj[0].OrgName);
                            localStorage.setItem('CreatedByUserId', obj[0].CreatedByUserId);
                            localStorage.setItem('OrganizationBranchId', obj[0].OrganizationBranchId);
                            localStorage.setItem('OrganizationTypeId', obj[0].OrganizationTypeId);
                            localStorage.setItem('OrganizationId', obj[0].OrganizationId);
                            window.location.href = "DashboardDriverDepart.html";
                        }
                        else {
                            HideLoader();
                            errmsg = errmsg + 'Invalid username and password.';
                            $.alert(errmsg);
                        }
                    }

                }
                else {
                    HideLoader();
                    errmsg = errmsg + 'Invalid username and password.';
                    $.alert(errmsg);
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}

// ajax call for logi user start here

//function ProcessLogin() {

//    var pUserID = $('#txtUserName').val();
//    var pPassword = $('#txtPassword').val();
//    var connectionStatus = navigator.onLine ? 'online' : 'offline'
//    var errmsg = "";
//    if (pUserID == null || pUserID == "") {
//        errmsg = errmsg + 'Enter User Id.<br/>';
//    }
//    if (pPassword == null || pPassword == "") {
//        errmsg = errmsg + 'Enter Password.';
//    }

//    if (pUserID != null && pUserID != "" && pPassword != null && pPassword != "" && connectionStatus == "online") {
//        $.ajax({
//            type: 'POST',
//            url: loginUrl + "/ValidateUser",
//            data: JSON.stringify({ 'pUserID': pUserID, 'pPassword': pPassword }),
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            success: function (response) {
//                var obj = JSON.parse(response.d);
//                if (obj.length > 0) {
//                    if (obj[0].OrganizationTypeId == '10') {
//                        window.location.href = "Dashboard.html";
//                    } else if (obj[0].OrganizationTypeId == '3') {
//                        window.location.href = "ForwardersTruckersExportDashboard.html";
//                    }
//                    else if (obj[0].OrganizationTypeId == '25') {
//                        window.location.href = "ForwardersTruckersExportDashboard.html";
//                    } else {
//                        errmsg = "You are not authenticate user for access this application, please contact contact.</br>";
//                        $.alert(errmsg);
//                        return false;
//                    }
//                } else {
//                    //errmsg = "Invalid User ID or Password.</br>";
//                    $.alert(response.d);
//                    return false;
//                }
//            },
//            error: function (msg) {
//                HideLoader();
//                var r = jQuery.parseJSON(msg.responseText);
//                alert("Message: " + r.Message);
//            }
//        });
//    }
//    else if (connectionStatus == "offline") {
//        HideLoader();
//        $.alert('No Internet Connection!');
//    }
//    if (errmsg != "") {
//        HideLoader();
//        $.alert(errmsg);
//    }
//}

// Remember user id and password function start here

function RememberCheck() {
    if ($('#chkRemember').is(':checked')) {
        var UserName = $('#txtUserName').val();
        var PassWord = $('#txtPassword').val();
        window.localStorage.setItem("UserName", UserName);
        window.localStorage.setItem("Password", PassWord);
        window.localStorage.setItem("IsRememberChecked", "true");
    }
    else {
        window.localStorage.setItem("UserName", "");
        window.localStorage.setItem("Password", "");
        window.localStorage.setItem("IsRememberChecked", "false");
    }
}

// Remember user id and password function end here

function SetRememberLogin() {

    var U = window.localStorage.getItem("UserName");
    var P = window.localStorage.getItem("Password");
    var R = window.localStorage.getItem("IsRememberChecked");
    if (R != null && R == "true") {
        $('#chkRemember').prop("checked", true);
    }
    else {
        $('#chkRemember').prop("checked", false);
    }
    if (U != null && U != "") {
        $('#txtUserName').val(U);
    }
    if (P != null && P != "") {
        $('#txtPassword').val(P);
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    if (connectionStatus == 'offline') {
        $.alert('No Internet Connection!');
        setInterval(function () {
            connectionStatus = navigator.onLine ? 'online' : 'offline';
            if (connectionStatus == 'online') {
            }
            else {
                $.tips('You are offline.');
            }
        }, 3000);
    }

}

function viewPassword() {
    var x = document.getElementById("txtPassword");
    if (x.type === "password") {
        $(".zmdi-eye").show();
        $(".zmdi-eye-off").hide();
        x.type = "text";
    } else {
        $(".zmdi-eye").hide();
        $(".zmdi-eye-off").show();
        x.type = "password";
    }
}


spHHT_Get_OrgTypemaster = function (OperationType) {
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/spHHT_Get_OrgTypemaster",
        data: JSON.stringify({ OperationType: OperationType }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            var obj = JSON.parse(response.d);
            $("body").mLoading('hide');
            if (obj.length > 0) {

                var branch = '<option value="-1">-- Select Organization Type --</option>';
                for (var i = 0; i < obj.length; i++) {
                    branch += '<option value="' + obj[i].OrganizationTypeId + '">' + obj[i].Name + '</option>';
                }
                $("#ddlBranchWiseList").html(branch);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}
$(function () {
 //here back function
 $("#btnBack").click(function () { // button click event
    window.location.href = "homeScreen1.html";
});
});
