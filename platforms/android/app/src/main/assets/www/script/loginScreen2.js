


document.addEventListener("deviceready", SetRememberLogin, false);

var availableLoc = [];
var availabledes = [];
var errmsg = "";

$(function () {
    GetOfficerName();
    // GetOfficerDesignationList();
    // // modal.style.display = "block";
    // spHHT_Get_OrgTypemaster('1');

    //here load function
    localStorage.setItem('activeTab', "");
});


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

function checkLogin() {
    var pUserID = $('#txtUserName').val();
    var pPassword = $('#txtPassword').val();
    if (pUserID == '') {
        errmsg = "No Username</br>";
        errmsgcont = "Please enter user name</br>";
        $.alert(errmsg,errmsgcont);
        return false;
    } else if (pPassword == '') {
        errmsg = "No Password</br>";
        errmsgcont = "Please enter password</br>";
        $.alert(errmsg,errmsgcont);
        return false;
    } else {
        $("#txtUserName").css("background-color", "white");
        $("#txtPassword").css("background-color", "white");
        // $('body').mLoading({
        //     text: "Please Wait..",
        // });
      
      
            ValidateUser(pUserID, pPassword); // login function
       
        // UserLogin(pUserID, pPassword); // login function
        RememberCheck(); // Remember User id Password function
    }
    //tempUserLogin();
}


$("#btnLogin").click(function () { // button click event
    var pUserID = $('#txtUserName').val();
    var pPassword = $('#txtPassword').val();
    if (pUserID == '') {
        errmsg = "No Username</br>";
        errmsgcont = "Please enter user name</br>";
        $.alert(errmsg,errmsgcont);
        return false;
    } else if (pPassword == '') {
        errmsg = "No Password</br>";
        errmsgcont = "Please enter password</br>";
        $.alert(errmsg,errmsgcont);
        return false;
    } else {
        $("#txtUserName").css("background-color", "white");
        $("#txtPassword").css("background-color", "white");
        $('body').mLoading({
            text: "Please Wait..",
        });
        var isCustomOfficer = localStorage.getItem('IsCustomsOfficer');
        
         if(isCustomOfficer == "Yes"){
            SaveCustomsLoginDetails();// login function
         }else{
            UserLogin(pUserID, pPassword);
         }
      
  
       
        // UserLogin(pUserID, pPassword); // login function
        RememberCheck(); // Remember User id Password function
    }
    //tempUserLogin();
});

function exitModal() {
    modal.style.display = "none";
  }

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

ValidateUser = function (pUserID, pPassword) {
    $('body').mLoading({
        text: "Please Wait..",
    });
   
    var deviceToken = localStorage.getItem('DeviceTokenId');
    console.log(deviceToken);
    if(pUserID == "tpsuser"){
        loginUrl = "https://acsadaniuat.kalelogistics.com/ACS_NMIAL_UAT_HHT_Services/srvMobile.asmx";
    }
    $.ajax({
        type: 'POST',
        url: loginUrl + "/ValidateUser",
       data: JSON.stringify({ 'pUserID': pUserID, 'pPassword': pPassword, 'pDeviceNumber': deviceToken }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
                HideLoader();
            console.log(response.d);
          
            if (response.d == 'Please enter valid credentials.') {
                HideLoader();
                errmsg = "Wrong Username or Password</br>";
                errmsgcont = "Please enter valid credentials.</br>";
                $.alert(errmsg,errmsgcont);
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
                            localStorage.setItem('Businessline', obj[0].Businessline);
                            localStorage.setItem('IsCustomsOfficer', obj[0].IsCustomsOfficer);
                            $("#customsDiv").hide();
                            // window.location.href = "dashboard-export.html";

                        } else if (obj[0].OrganizationTypeId == '3') { // Freight Forwarder
                            localStorage.setItem('loginName', obj[0].Name);
                            localStorage.setItem('OrgName', obj[0].OrgName);
                            localStorage.setItem('EmailId', obj[0].EmailId);
                            localStorage.setItem('FFLocation', '3');
                            localStorage.setItem('CreatedByUserId', obj[0].CreatedByUserId);
                            localStorage.setItem('OrganizationBranchId', obj[0].OrganizationBranchId);
                            localStorage.setItem('OrganizationTypeId', obj[0].OrganizationTypeId);
                            localStorage.setItem('OrganizationId', obj[0].OrganizationId);
                            localStorage.setItem('Businessline', obj[0].Businessline);
                            localStorage.setItem('IsCustomsOfficer', obj[0].IsCustomsOfficer);
                            $("#customsDiv").hide();
                            // window.location.href = "dashboard-export.html";
                        }
                        else if (obj[0].OrganizationTypeId == '4') { // Airline
                            localStorage.setItem('EmailId', obj[0].EmailId);
                            localStorage.setItem('loginName', obj[0].Name);
                            localStorage.setItem('OrgName', obj[0].OrgName);
                            localStorage.setItem('CreatedByUserId', obj[0].CreatedByUserId);
                            localStorage.setItem('OrganizationBranchId', obj[0].OrganizationBranchId);
                            localStorage.setItem('OrganizationTypeId', obj[0].OrganizationTypeId);
                            localStorage.setItem('OrganizationId', obj[0].OrganizationId);
                            localStorage.setItem('Businessline', obj[0].Businessline);
                            localStorage.setItem('IsCustomsOfficer', obj[0].IsCustomsOfficer);
                            $("#customsDiv").hide();
                            // window.location.href = "AirlineDashboard.html";
                        }
                        else if (obj[0].OrganizationTypeId == '25') { // Airline
                            localStorage.setItem('EmailId', obj[0].EmailId);
                            localStorage.setItem('loginName', obj[0].Name);
                            localStorage.setItem('OrgName', obj[0].OrgName);
                            localStorage.setItem('CreatedByUserId', obj[0].CreatedByUserId);
                            localStorage.setItem('OrganizationBranchId', obj[0].OrganizationBranchId);
                            localStorage.setItem('OrganizationTypeId', obj[0].OrganizationTypeId);
                            localStorage.setItem('OrganizationId', obj[0].OrganizationId);
                            localStorage.setItem('Businessline', obj[0].Businessline);
                            localStorage.setItem('IsCustomsOfficer', obj[0].IsCustomsOfficer);
                            $("#customsDiv").hide();
                            // window.location.href = "TPSUserDashboard.html";
                        }
                        else if (obj[0].OrganizationTypeId == '38') { // Airline
                            localStorage.setItem('EmailId', obj[0].EmailId);
                            localStorage.setItem('loginName', obj[0].Name);
                            localStorage.setItem('OrgName', obj[0].OrgName);
                            localStorage.setItem('CreatedByUserId', obj[0].CreatedByUserId);
                            localStorage.setItem('OrganizationBranchId', obj[0].OrganizationBranchId);
                            localStorage.setItem('OrganizationTypeId', obj[0].OrganizationTypeId);
                            localStorage.setItem('OrganizationId', obj[0].OrganizationId);
                            localStorage.setItem('Businessline', obj[0].Businessline);
                            localStorage.setItem('IsCustomsOfficer', obj[0].IsCustomsOfficer);
                            $("#customsDiv").show();
                            // window.location.href = "TPSUserDashboard.html";
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
// ajax call for login user start here

UserLogin = function (pUserID, pPassword) {
    var deviceToken = localStorage.getItem('DeviceTokenId');
    console.log(deviceToken);

    $.ajax({
        type: 'POST',
        url: loginUrl + "/ValidateUser",
       data: JSON.stringify({ 'pUserID': pUserID, 'pPassword': pPassword, 'pDeviceNumber': deviceToken }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d);
          
            if (response.d == 'Please enter valid credentials.') {
                HideLoader();
                errmsg = "Wrong Username or Password</br>";
                errmsgcont = "Please enter valid credentials.</br>";
                $.alert(errmsg,errmsgcont);
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
                            window.location.href = "dashboard-export.html";
                        }
                        else if (obj[0].OrganizationTypeId == '4') { // Airline
                            localStorage.setItem('EmailId', obj[0].EmailId);
                            localStorage.setItem('loginName', obj[0].Name);
                            localStorage.setItem('OrgName', obj[0].OrgName);
                            localStorage.setItem('CreatedByUserId', obj[0].CreatedByUserId);
                            localStorage.setItem('OrganizationBranchId', obj[0].OrganizationBranchId);
                            localStorage.setItem('OrganizationTypeId', obj[0].OrganizationTypeId);
                            localStorage.setItem('OrganizationId', obj[0].OrganizationId);
                            window.location.href = "AirlineDashboard.html";
                        }
                        else if (obj[0].OrganizationTypeId == '25') { // Airline
                            localStorage.setItem('EmailId', obj[0].EmailId);
                            localStorage.setItem('loginName', obj[0].Name);
                            localStorage.setItem('OrgName', obj[0].OrgName);
                            localStorage.setItem('CreatedByUserId', obj[0].CreatedByUserId);
                            localStorage.setItem('OrganizationBranchId', obj[0].OrganizationBranchId);
                            localStorage.setItem('OrganizationTypeId', obj[0].OrganizationTypeId);
                            localStorage.setItem('OrganizationId', obj[0].OrganizationId);
                            window.location.href = "TPSUserDashboard.html";
                        }
                        else if (obj[0].OrganizationTypeId == '38') { // Airline
                            localStorage.setItem('EmailId', obj[0].EmailId);
                            localStorage.setItem('loginName', obj[0].Name);
                            localStorage.setItem('OrgName', obj[0].OrgName);
                            localStorage.setItem('CreatedByUserId', obj[0].CreatedByUserId);
                            localStorage.setItem('OrganizationBranchId', obj[0].OrganizationBranchId);
                            localStorage.setItem('OrganizationTypeId', obj[0].OrganizationTypeId);
                            localStorage.setItem('OrganizationId', obj[0].OrganizationId);
                            localStorage.setItem('Businessline', obj[0].Businessline);
                            localStorage.setItem('IsCustomsOfficer', obj[0].IsCustomsOfficer);
                            $("#customsDiv").show();
                            window.location.href = "CustomOfficerDashboard.html";
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

SaveCustomsLoginDetails = function () {
    HideLoader();
    $("#customsDiv").show();
   var isCustomOfficer = localStorage.getItem('IsCustomsOfficer');
   var pUserID = $('#txtUserName').val();
    var officerName = $('#officerName').val();
    var designation = $('#designation').val();
    if(isCustomOfficer == "Yes"){
    if (officerName == '') {
        errmsg = "No Username</br>";
        errmsgcont = "Please enter Officer name</br>";
        $.alert(errmsg,errmsgcont);
        return false;
    } else if (designation == '') {
        errmsg = "No Password</br>";
        errmsgcont = "Please enter Designation</br>";
        $.alert(errmsg,errmsgcont);
        return false;
    }
}
    $.ajax({
        type: 'POST',
        url: loginUrl + "/SaveCustomsLoginDetails",
  
       data: JSON.stringify({ 'username': pUserID, 'CustomsOfficerName': officerName, 'CustomsOfficerDesignation': designation }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d);
         
                var obj = JSON.parse(response.d);
                console.log(obj);
                if (obj != null && obj != "") {
                    if (obj.length > 0) {
                        if(obj[0].MSG == "Success") {
                            var OrganizationTypeId = localStorage.getItem('OrganizationTypeId');
                        if (OrganizationTypeId == '10') { // GHA
                            
                            window.location.href = "dashboard-export.html";

                        } else if (OrganizationTypeId == '3') { // Freight Forwarder
                            window.location.href = "dashboard-export.html";
                        }
                        else if (OrganizationTypeId == '4') { // Airline

                            window.location.href = "AirlineDashboard.html";
                        }
                        else if (OrganizationTypeId == '25') { // Airline

                            window.location.href = "TPSUserDashboard.html";
                        }
                        else if (OrganizationTypeId == '38') { // Custom officer
                            localStorage.setItem('OfficerName', officerName);
                            localStorage.setItem('Designation', designation);
                            window.location.href = "CustomOfficerDashboard.html";
                      
                        }
                        else {
                            HideLoader();
                            errmsg = "You are not authenticate user for access this application, please contact Admin.</br>";
                            $.alert(errmsg);
                            return false;
                        }
                    }
                    else {
                        HideLoader();
                        errmsg = errmsg + 'Invalid username and password.';
                        $.alert(errmsg);
                    }
                }
                } else {
                    HideLoader();
                    errmsg = errmsg + 'Invalid username and password.';
                    $.alert(errmsg);
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
                alert(errmsg);
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
                            window.location.href = "dashboard-export.html";
                        } else if ($("#ddlBranchWiseList").val() == '10' && obj[0].OrganizationTypeId == '10') { // GHA
                            localStorage.setItem('loginName', obj[1].Name);
                            localStorage.setItem('OrgName', obj[1].OrgName);
                            localStorage.setItem('EmailId', obj[1].EmailId);
                            localStorage.setItem('CreatedByUserId', obj[1].CreatedByUserId);
                            localStorage.setItem('OrganizationBranchId', obj[1].OrganizationBranchId);
                            localStorage.setItem('OrganizationTypeId', obj[1].OrganizationTypeId);
                            localStorage.setItem('OrganizationId', obj[1].OrganizationId);
                            window.location.href = "dashboard-export.html";

                        } else if ($("#ddlBranchWiseList").val() == '3' && obj[0].OrganizationTypeId == '3') { // Freight Forwarder
                            localStorage.setItem('loginName', obj[1].Name);
                            localStorage.setItem('OrgName', obj[1].OrgName);
                            localStorage.setItem('EmailId', obj[1].EmailId);
                            localStorage.setItem('FFLocation', '3');
                            localStorage.setItem('CreatedByUserId', obj[1].CreatedByUserId);
                            localStorage.setItem('OrganizationBranchId', obj[1].OrganizationBranchId);
                            localStorage.setItem('OrganizationTypeId', obj[1].OrganizationTypeId);
                            localStorage.setItem('OrganizationId', obj[1].OrganizationId);
                            window.location.href = "dashboard-export.html";
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
                            window.location.href = "dashboard-export.html";
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
        $(".zmdi-eye").hide();
        $(".zmdi-eye-off").show();
      
        x.type = "text";
    } else {
        $(".zmdi-eye").show();
        $(".zmdi-eye-off").hide();
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
    window.location.href = "homeScreen2.html";
});
});


function GetOfficerName() {
    var pUserID = $('#txtUserName').val();
      $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetCustomsOfficerNameList",
        data: JSON.stringify(
         
              {
                "username":pUserID,    
          }),
          
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var obj = JSON.parse(response.d);
            console.log(response.d);
            console.log(obj);
            availableLoc.length = 0;
            availabledes.length = 0;
                $.each(obj, function (i, d) {
                     val = (d.CustomsOfficerName).toString();
                     availableLoc.push(val);

                   });
                   autocomplete(document.getElementById("officerName"), availableLoc);
                  
                   $.each(obj, function (i, d) {               
                     des = (d.CustomsOfficerDesignation).toString();              
                     availabledes.push(des);


                   });
                   autocomplete(document.getElementById("designation"), availabledes);

       
      
            // $("#officerName").autocomplete({
            //     source: availableLoc,
            //     minLength: 1,
            //     select: function (event, ui) {
                
            //         log(ui.item ?
            //             "Selected: " + ui.item.label :
            //             "Nothing selected, input was " + this.value);
            //     },
            //     open: function () {
            //         $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
            //     },
            //     close: function () {
            //         $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
            //     }
            // });
      
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
      });


}


function GetOfficerDesignationList() {
    var pUserID = $('#txtUserName').val();
      $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetCustomsOfficerDesgnList",
        data: JSON.stringify(
         
              {
                "Designation":"",    
          }),
          
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var obj = JSON.parse(response.d);
            console.log(response.d);
            console.log(obj);
            availableLoc.length = 0;
            availabledes.length = 0;
                $.each(obj, function (i, d) {
        
              
                     des = (d.CustomsOfficerDesignation).toString();
                     availabledes.push(des);
                   });
        
                //console.log(obj);
   

                autocomplete(document.getElementById("designation"), availabledes);
      
            // $("#officerName").autocomplete({
            //     source: availableLoc,
            //     minLength: 1,
            //     select: function (event, ui) {
                
            //         log(ui.item ?
            //             "Selected: " + ui.item.label :
            //             "Nothing selected, input was " + this.value);
            //     },
            //     open: function () {
            //         $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
            //     },
            //     close: function () {
            //         $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
            //     }
            // });
      
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
      });


}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        var styleId = this.id + "autocomplete-list";
    
        // $("#"+styleId).css({'font-size': '20px','font-weight': 'bold','position': 'fixed','z-index': '1'});
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = arr[i].substr(0, val.length);
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }

 