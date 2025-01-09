var LocationName = localStorage.getItem('LocationName');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var errmsg = "";
var FF_ID;
var _HandlerId;
var _HandlerBranchId;
var _CreatedBy;
var _AirlineName;
var _imageDataFromCamera = '';
var _signitureDataURL = '';
var _Email;
var DriverMobileNo;

$(function () {
    createCaptcha();
    //$("#btnQRCodeModal").trigger("click");
    $("#txtDriverMobileNo").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            //display error message
            $("#errmsg").html("Digits Only").show().fadeOut("slow");
            return false;
        }
    });
    setTimeout(function () {
        window.location.href = 'Login.html'
    }, 1200000);
});

function MovetoNext(current, nextFieldID) {
    if (current.value.length >= current.maxLength) {
        document.getElementById(nextFieldID).focus();
        $('body').mLoading({
            text: "Please Wait..",
        });
        getTPSDetails('1', $("#txtAirlineCode").val());
        getTruckType('2')
    }
}
getTruckType = function (OperationType, CarrierCode) {
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/getTruckType",
        data: JSON.stringify({ OperationType: OperationType, CarrierCode: CarrierCode }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.length > 0) {
                var s = '<option value="-1">--Select--</option>';
                for (var i = 0; i < obj.length; i++) {
                    s += '<option value="' + obj[i].TruckTypeId + '">' + obj[i].TruckTypeName + '</option>';
                }
                $("#ddlVehicleType").html(s);
            } else {
                errmsg = "Invalid Carrier Code</br>";
                $.alert(errmsg);
            }
        },
        error: function (response) {
            // HideLoader();
            errmsg = jQuery.parseJSON(response.responseText);
            $.alert(errmsg);
        }
    });
}
getTPSDetails = function (OperationType, CarrierCode) {
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/getTPSDetails",
        data: JSON.stringify({ OperationType: OperationType, CarrierCode: CarrierCode }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.length > 0) {
                $("body").mLoading('hide');
                _HandlerId = obj[0].HandlerId
                _HandlerBranchId = obj[0].HandlerBranchId
                _CreatedBy = obj[0].CreatedById
                _AirlineName = obj[0].AirlineName
                _Email = obj[0].Email
                $("#txtAirlineName").val(obj[0].AirlineName);
                $("#txtGHAName").val(obj[0].HandlerName);
            } else {
                $("body").mLoading('hide');
                clearFunction();
                errmsg = "Invalid Carrier Code</br>";
                $.alert(errmsg);
            }
        },
        error: function (response) {
            // HideLoader();
            errmsg = jQuery.parseJSON(response.responseText);
            $.alert(errmsg);
        }
    });
}

function setDeliveryOrder() {

}

function exitFunction() {
    window.location.href = 'Login.html';
}
function clearFunction() {

    $("#rbtImport").prop("checked", false);
    $("#rbtExport").prop("checked", false);
    $('input[type=radio][name=mode]').removeAttr("checked");
    $("#txtAirlineCode").val('');
    $("#txtAirlineName").val('');
    $("#txtGHAName").val('');
    $("#txtVehicleNo").val('');
    $("#ddlVehicleType").val('-1');
    $("#txtDriverName").val('');
    $("#txtDriverMobileNo").val('');
    $("#ddlPriority").val('-1');
    $("#cpatchaTextBox").val('');
    $("#txtEmailId").val('');


}

saveTPSDetails = function (OperationType, Mode, IATACarrierCode, AirlinePrefix, VehicleNo, VehicleType, DriverName, DriverMobileNo, Priority, _HandlerId, _HandlerBranchId, _CreatedBy, _AirlineName, _imageDataFromCamera, _signitureDataURL, EMAILID) {
    //  console.log(OperationType + '-' + Mode + '-' + AirlineName + '-' + GHAName + '-' + VehicleNo + '-' + VehicleType + '-' + DriverName + '-' + DriverMobileNo + '-' + Priority + '-' + _HandlerId + '-' + _HandlerBranchId + '-' + _CreatedBy + '-' + _AirlineName + '-' + _imageDataFromCamera + '-' + _signitureDataURL);
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/saveTPSDetails",
        data: JSON.stringify({
            'OperationType': OperationType,
            'Mode': Mode,
            'IATACarrierCode': IATACarrierCode,
            'AirlinePrefix': AirlinePrefix,
            'VehicleNo': VehicleNo,
            'VehicleType': VehicleType,
            'DriverName': DriverName,
            'DriverMobileNo': DriverMobileNo,
            'Priority': Priority,
            '_HandlerId': _HandlerId,
            '_HandlerBranchId': _HandlerBranchId,
            '_CreatedBy': _CreatedBy,
            '_AirlineName': _AirlineName,
            '_imageDataFromCamera': _imageDataFromCamera,
            '_signitureDataURL': _signitureDataURL,
            'EMAILID': EMAILID
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.length > 0) {
                _VTokenNo = JSON.stringify(obj[0].VTokenNo);
                $("body").mLoading('hide');
                SendSMS(response);
                clearFunction();
                // successMessage();

                createCaptcha();
                $("#btnQRCodeModal").trigger("click");
                makeCode(_VTokenNo);

                $(".swal2-confirm").click(function () {
                    window.location.href = "Login.html";
                });
            } else {
                $("body").mLoading('hide');
                errmsg = jQuery.parseJSON(response.responseText);
                $.alert(errmsg);
            }
        },
        error: function (response) {
            HideLoader();
            errmsg = jQuery.parseJSON(response.responseText);
            $.alert(errmsg);
        }
    });
}
GetFFDetails = function (OperationType) {
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetFFDetails",
        data: JSON.stringify({ OperationType: OperationType }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);

            var s = '<option value="-1">--Select--</option>';
            for (var i = 0; i < obj.length; i++) {
                s += '<option value="' + obj[i].OrganizationId + '">' + obj[i].Name + '</option>';
            }
            $("#ddlFFList").html(s);

        },
        error: function (requestObject, error, errorThrown) {
        }
    });
}

$(document).ready(function () {
    $('#btnImageGetFromCamera').click(function () {
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            saveToPhotoAlbum: true
        };
        navigator.camera.getPicture(onImageSuccess, onImageFail, options);
    });
    function onImageSuccess(imageData) {
        //var image = document.getElementById('myImage');
        //image.src = "data:image/jpeg;base64," + imageData;
        //imageFile = imageData;
        $('#imgCameraImage').show();
        var image = document.getElementById('imgCameraImage');
        image.style.display = 'block';
        image.src = "data:image/jpeg;base64," + imageData;
        _imageDataFromCamera = imageData;
    }
    function onImageFail(message) {
        // alert('Failed because: ' + message);
    }
});


function successMessage() {
    swal({
        //title: "Vehicle details saved successfully.",
        ////buttonsStyling: false,
        //confirmButtonClass: 'popup-btn'
        title: '',
        text: "Vehicle details saved successfully.",
        type: 'success',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-primary'
    });
}



var code;
function createCaptcha() {
    //clear the contents of captcha div first
    document.getElementById('captcha').innerHTML = "";
    var charsArray =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
    var lengthOtp = 6;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
        //below code will not allow Repetition of Characters
        var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
        if (captcha.indexOf(charsArray[index]) == -1)
            captcha.push(charsArray[index]);
        else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha";
    canv.width = 150;
    canv.height = 35;
    var ctx = canv.getContext("2d");
    ctx.font = "25px Georgia";
    ctx.strokeText(captcha.join(""), 0, 30);
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    code = captcha.join("");
    document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
}
function validateCaptcha() {
    event.preventDefault();
    // debugger
    //    if (document.getElementById("cpatchaTextBox").value != code) {
    //        if ($("#txtAirlineCode").val() == '') {
    //            errmsg = "All * field are mandatory.</br>";
    //            $.alert(errmsg);
    //            return;
    //        } else if ($("#txtAirlineName").val() == '') {
    //            errmsg = "All * field are mandatory.</br>";
    //            $.alert(errmsg);
    //            return;
    //        } else if ($("#txtVehicleNo").val() == '') {
    //            errmsg = "All * field are mandatory.</br>";
    //            $.alert(errmsg);
    //            return;
    //        } else if ($("#ddlVehicleType").val() == '-1') {
    //            errmsg = "AllAll * field are mandatory.</br>";
    //            $.alert(errmsg);
    //            return;
    //        } else if ($("#txtDriverName").val() == '') {
    //            errmsg = "All * field are mandatory.</br>";
    //            $.alert(errmsg);
    //            return;
    //        } else if ($("#txtDriverMobileNo").val() == '') {
    //            errmsg = "All * field are mandatory.</br>";
    //            $.alert(errmsg);
    //            return;
    //        } else if ($("#ddlPriority").val() == '-1') {
    //            errmsg = "All * field are mandatory.</br>";
    //            $.alert(errmsg);
    //            return;
    //        }
    //        else if ($('input[type=radio][name=mode]:checked').length == 0) {
    //            errmsg = "Select mode.</br>";
    //            $.alert(errmsg);
    //            return;
    //        }
    //        else {
    //            if ($("input:radio[id='rbtImport']").is(":checked")) {
    //                OperationType = '3';
    //                Mode = 'Import';
    //                IATACarrierCode = $("#txtAirlineCode").val();
    //                AirlinePrefix = $("#txtAirlineName").val();
    //                VehicleNo = $("#txtVehicleNo").val();
    //                VehicleType = $("#ddlVehicleType").val();
    //                DriverName = $("#txtDriverName").val();
    //                DriverMobileNo = $("#txtDriverMobileNo").val();
    //                Priority = $("#ddlPriority").val();
    //                $('body').mLoading({
    //                    text: "Please Wait..",
    //                });
    //                saveTPSDetails(OperationType, Mode, IATACarrierCode, AirlinePrefix, VehicleNo, VehicleType, DriverName, DriverMobileNo, Priority, _HandlerId, _HandlerBranchId, _CreatedBy, _AirlineName, _imageDataFromCamera, _signitureDataURL);

    //            } else if ($("input:radio[id='rbtExport']").is(":checked")) {

    //                OperationType = '3';
    //                Mode = 'Export';
    //                IATACarrierCode = $("#txtAirlineCode").val();
    //                AirlinePrefix = $("#txtAirlineName").val();
    //                VehicleNo = $("#txtVehicleNo").val();
    //                VehicleType = $("#ddlVehicleType").val();
    //                DriverName = $("#txtDriverName").val();
    //                DriverMobileNo = $("#txtDriverMobileNo").val();
    //                Priority = $("#ddlPriority").val();
    //                $('body').mLoading({
    //                    text: "Please Wait..",
    //                });
    //                saveTPSDetails(OperationType, Mode, IATACarrierCode, AirlinePrefix, VehicleNo, VehicleType, DriverName, DriverMobileNo, Priority, _HandlerId, _HandlerBranchId, _CreatedBy, _AirlineName, _imageDataFromCamera, _signitureDataURL);

    //            } else {
    //                // alert('nothing');
    //            }

    //        }
    //    } else {
    //        errmsg = "Invalid Captcha. try Again</br>";
    //        $.alert(errmsg);
    //        //alert("Invalid Captcha. try Again");
    //        createCaptcha();
    //        $("#cpatchaTextBox").val('');
    //    }

    if ($('input[type=radio][name=mode]:checked').length == 0) {
        errmsg = "Please select Mode</br>";
        $.alert(errmsg);
        return;
    } else if ($("#txtAirlineCode").val() == '') {
        errmsg = "Please enter Carrier Code</br>";
        $.alert(errmsg);
        return;
    } else if ($("#txtVehicleNo").val() == '') {
        errmsg = "Please enter Vehicle No.</br>";
        $.alert(errmsg);
        return;
    } else if ($("#ddlVehicleType").val() == '-1') {
        errmsg = "Please select Vehicle Type</br>";
        $.alert(errmsg);
        return;
    } else if ($("#txtDriverName").val() == '') {
        errmsg = "Please enter Driver Name</br>";
        $.alert(errmsg);
        return;
    } else if ($("#txtDriverMobileNo").val() == '') {
        errmsg = "Please enter Mobile No.</br>";
        $.alert(errmsg);
        return;
    } else if ($("#ddlPriority").val() == '-1') {
        errmsg = "Please select Priority</br>";
        $.alert(errmsg);
        return;
    } else if (document.getElementById("cpatchaTextBox").value == '') {
        errmsg = "Please enter captcha</br>";
        $.alert(errmsg);
        createCaptcha();
        $("#cpatchaTextBox").val('');
    }
    else if (document.getElementById("cpatchaTextBox").value != code) {
        errmsg = "Invalid Captcha. try Again</br>";
        $.alert(errmsg);
        createCaptcha();
        $("#cpatchaTextBox").val('');
    } else {
        if ($("input:radio[id='rbtImport']").is(":checked")) {
            OperationType = '3';
            Mode = 'Import';
            IATACarrierCode = $("#txtAirlineCode").val();
            AirlinePrefix = $("#txtAirlineName").val();
            VehicleNo = $("#txtVehicleNo").val();
            VehicleType = $("#ddlVehicleType").val();
            DriverName = $("#txtDriverName").val();
            DriverMobileNo = $("#txtDriverMobileNo").val();
            Priority = $("#ddlPriority").val();
            EMAILID = $("#txtEmailId").val();
            $('body').mLoading({
                text: "Please Wait..",
            });
            saveTPSDetails(OperationType, Mode, IATACarrierCode, AirlinePrefix, VehicleNo, VehicleType, DriverName, DriverMobileNo, Priority, _HandlerId, _HandlerBranchId, _CreatedBy, _AirlineName, _imageDataFromCamera, _signitureDataURL, EMAILID);

        } else if ($("input:radio[id='rbtExport']").is(":checked")) {

            OperationType = '3';
            Mode = 'Export';
            IATACarrierCode = $("#txtAirlineCode").val();
            AirlinePrefix = $("#txtAirlineName").val();
            VehicleNo = $("#txtVehicleNo").val();
            VehicleType = $("#ddlVehicleType").val();
            DriverName = $("#txtDriverName").val();
            DriverMobileNo = $("#txtDriverMobileNo").val();
            Priority = $("#ddlPriority").val();
            EMAILID = $("#txtEmailId").val();
            $('body').mLoading({
                text: "Please Wait..",
            });
            saveTPSDetails(OperationType, Mode, IATACarrierCode, AirlinePrefix, VehicleNo, VehicleType, DriverName, DriverMobileNo, Priority, _HandlerId, _HandlerBranchId, _CreatedBy, _AirlineName, _imageDataFromCamera, _signitureDataURL, EMAILID);

        } else {
            // alert('nothing');
        }
    }
}


function SendSMS(response) {
    var obj = JSON.parse(response.d);
    var messageContent = "Vehicle%20Gate-In%20registered%20successfully,%20Ref%20No%20is:%20" + obj[0].VTokenNo + "";
    var _urlforSMS = 'https://platform.clickatell.com/messages/http/send?apiKey=gS7BfRrtS2yMXtOHkRLAAg==&to=' + DriverMobileNo + '&content=' + messageContent;
    //'https://platform.clickatell.com/messages/http/send?apiKey=gS7BfRrtS2yMXtOHkRLAAg==&to=+FF_MobileNo+&content=SMSmessagecontent'
    $.ajax({
        url: _urlforSMS,
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            // alert("success");
        },
        fail: function (jqXHR, textStatus) {
            //alert("Request failed: " + textStatus);
        }
    })
}
var qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 150,
    height: 150
});
function makeCode(_VTokenNo) {
    qrcode.makeCode(_VTokenNo);
    var VNO = _VTokenNo;
    $("#vtNo").text(_VTokenNo.replace(/\"/g, ""));


}