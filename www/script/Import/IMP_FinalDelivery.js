var LocationName = localStorage.getItem('LocationName');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');
var errmsg = "";
var FF_MobileNo;
var _MAWBNumber;
var _HawbNumberSMS = [];
var _AirlinePrefix;
var _HAWBNumber;
var _DriverNamer;
var imageDataFromCamera = "";
var signitureDataURL = "";
var _DONo;
var _DOId;
var _validPrifix;
var _validMawbNo;
var _NoOfPackage;
var _GrossWeight;
var _AWBNoAuto = localStorage.getItem('AWBNo');
var _DONoOptionsText;
var VTNumber;
var ROWID = '';
var TOKENNO = '';
var _hawbOptionsText;
var pkgsWtCal;
$(function () {

    setTimeout(function () {
        window.location.href = 'loginScreen2.html'
    }, 1200000);

    $("#tblAirWayBillInfo").hide();
    $("#btndiv").hide();
    $("#btnSignDiv").hide();
    if (_AWBNoAuto != '') {
        var str = _AWBNoAuto;
        var prifix = str.substring(0, 3);
        var AwbNo = str.substring(3, 12);
        $("#txtFlightPrefix").val(prifix);
        $("#txtFlightNo").val(AwbNo);
        GETFinalDeliveryDetail('2', prifix, AwbNo, '', CreatedByUserId, OrganizationBranchId, OrganizationId);

    }

    $('#ddlHAWBList').on('change', function () {
        if ($('#ddlHAWBList').val() != '-1') {
            //$("#tblAirWayBillInfo").fadeOut();
            //$("#btndiv").fadeOut();
            //$("#btnSignDiv").fadeOut();
            _hawbOptionsText = this.options[this.selectedIndex].text;
            _AirlinePrefix = $("#txtFlightPrefix").val();
            _MAWBNumber = $("#txtFlightNo").val();
            $('body').mLoading({
                text: "Please Wait..",
            });
            _GETFinalDeliveryDetail('2', _AirlinePrefix, _MAWBNumber, _hawbOptionsText, CreatedByUserId, OrganizationBranchId, OrganizationId);
            //$("#tblAirWayBillInfo").fadeIn();
            //$("#btndiv").fadeIn();
            //$("#btnSignDiv").fadeIn();
        } else {

        }
    });


    $('#txtPieces').change(function () {
        var calGrossWt = pkgsWtCal * $('#txtPieces').val();
        $('#txtWeight').val(calGrossWt);
    });


    $('#ddlVTNoList').on('change', function () {
        if ($('#ddlVTNoList').val() != '-1') {
            $("#tblAirWayBillInfo").fadeOut();
            $("#btndiv").fadeOut();
            $("#btnSignDiv").fadeOut();
            VTNumber = this.options[this.selectedIndex].text;

            _AirlinePrefix = $("#txtFlightPrefix").val();
            _MAWBNumber = $("#txtFlightNo").val();
            $('body').mLoading({
                text: "Please Wait..",
            });

            if ($('#ddlHAWBList').val() != '-1') {
                getVTNumberWiseData('4', _AirlinePrefix, _MAWBNumber, _hawbOptionsText, CreatedByUserId, OrganizationBranchId, OrganizationId, VTNumber);
            } else {
                getVTNumberWiseData('4', _AirlinePrefix, _MAWBNumber, '', CreatedByUserId, OrganizationBranchId, OrganizationId, VTNumber);
            }

            $("#tblAirWayBillInfo").fadeIn();
            $("#btndiv").fadeIn();
            $("#btnSignDiv").fadeIn();
        } else {

        }
    });
});

function MovetoNext(current, nextFieldID) {
    if (current.value.length >= current.maxLength) {
        document.getElementById(nextFieldID).focus();
    }
}


function searchAWBNumberAndHAWBNo() {
    if ($("#txtFlightPrefix").val() == '') {
        $("#txtFlightPrefix").css("border", "solid thin red");
        $("#txtFlightNo").css("border", "solid thin #ccc");
        errmsg = "Please enter Flight Prefix</br>";
        $.alert(errmsg);
        return;
    } else if ($("#txtFlightNo").val() == '') {
        $("#txtFlightNo").css("border", "solid thin red");
        $("#txtFlightPrefix").css("border", "solid thin #ccc");
        errmsg = "Please enter Flight No.</br>";
        $.alert(errmsg);
        return;

    } else {
        $("#txtFlightNo").css("border", "solid thin #ccc");
        $("#txtHAWBNo").css("border", "solid thin #ccc");
        AirlinePrefix = $("#txtFlightPrefix").val();
        AwbNumber = $("#txtFlightNo").val();
        _AirlinePrefix = $("#txtFlightPrefix").val();
        _MAWBNumber = $("#txtFlightNo").val();
        if ($("#ddlHAWBList").val() == "-1") {
            _HAWBNumber = $("#txtHAWBNo").val();
        } else {
            _HAWBNumber = $("#ddlHAWBList").val();
        }

        $('body').mLoading({
            text: "Please Wait..",
        });
        GETFinalDeliveryDetail('2', AirlinePrefix, AwbNumber, _HAWBNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);
    }
}


function setFinalDelivery() {


    if ($("#txtPieces").val() == '') {
        errmsg = "Please enter Actual Pieces</br>";
        $.alert(errmsg);
        return;

    } else if ($("#txtWeight").val() == '') {
        errmsg = "Please enter Actual Weight</br>";
        $.alert(errmsg);
        return;
    } else if ($("#txtDriverName").val() == '') {
        errmsg = "Please enter Driver Name</br>";
        $.alert(errmsg);
        return;
        // }
        //else if ($("#txtDelivaryStatus").val() == '') {
        //    errmsg = "Please enter CRN No.</br>";
        //    $.alert(errmsg);
        //    return;
    } else {
        OperationType = '1';
        AirlinePrefix = $("#txtFlightPrefix").val();
        MAWBNumber = $("#txtFlightNo").val();
        // HAWBNumber = $("#txtHAWBNo").val();
        if ($("#ddlHAWBList").val() == "-1") {
            HAWBNumber = $("#txtHAWBNo").val();
        } else {
            HAWBNumber = $("#ddlHAWBList").val();
        }
        Pieces = $("#txtPieces").val();
        Weight = $("#txtWeight").val();
        DeliveryTo = $("#txtDeliveryTo").val();
        DriverName = $("#txtDriverName").val();
        DelivaryStatus = $("#txtDelivaryStatus").val();
        IsDeleted = false;
        CreatedBy = CreatedByUserId;
        canvas = document.getElementById('signature-pad');
        signitureData = canvas.toDataURL("image/jpeg");
        str = signitureData;
        signitureDataURL = str.substring(23);
        //if ($("#ddlDONoList").val() == "-1") {
        //    DO_Number = $("#txtDONo").val();
        //} else {
        //    DO_Number = $("#ddlDONoList").val();
        //}
        DO_Number = $("#txtDONo").val();
        if (_validPrifix == $("#txtFlightPrefix").val() && _validMawbNo == $("#txtFlightNo").val()) {

            if (_NoOfPackage < $("#txtPieces").val()) {
                errmsg = "Please enter less value in actual received pieces</br>";
                $.alert(errmsg);
                return;
            } else if (_GrossWeight < $("#txtWeight").val()) {
                errmsg = "Please enter less value in actual received weight</br>";
                $.alert(errmsg);
                return;
            } else {
                $('body').mLoading({
                    text: "Please Wait..",
                });
                ImportShipmentFinalDelivery(OperationType, AirlinePrefix, MAWBNumber, HAWBNumber, Pieces, Weight, DeliveryTo, DriverName, DelivaryStatus, IsDeleted, CreatedBy, imageDataFromCamera, signitureDataURL, TOKENNO, ROWID);
            }

        } else {
            errmsg = "AWB No. not matched</br>";
            $.alert(errmsg);
            return;
            $("body").mLoading('hide');
        }

        // }
    }


}

function exitFunction() {
    window.location.href = 'Dashboard.html';
}
function clearFunction() {
    //$("#txtFlightPrefix").val('');
    //$("#txtFlightNo").val('');
    //$("#txtHAWBNo").val('');
    $("#txtPieces").val('');
    $("#txtWeight").val('');
    $("#txtDeliveryTo").val('');
    $("#txtDriverName").val('');
    $("#txtDelivaryStatus").val('');
}


_GETFinalDeliveryDetail = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId) {
    console.log(OperationType + '-' + AirlinePrefix + '-' + AwbNumber + '-' + HawbNumber + '-' + CreatedByUserId + '-' + OrganizationBranchId + '-' + OrganizationId);
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/getImportShipmentFinalDelivery",
        data: JSON.stringify({
            OperationType: OperationType,
            AirlinePrefix: AirlinePrefix,
            AwbNumber: AwbNumber,
            HawbNumber: HawbNumber,
            CreatedByUserId: CreatedByUserId,
            OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            var obj = JSON.parse(response.d);
            console.log(response.d)
            if (obj.length > 0) {
                // $("#txtDONo").show();
                //  $("#lblDOno").show();
                // $("#txtDONo").val(obj[0].DONo)
                // FillControl(response);
                HideLoader();
                _NoOfPackage = obj[0].DONoOfPackage;
                _GrossWeight = obj[0].DOGrossWeight;

                pkgsWtCal = _GrossWeight / _NoOfPackage;
                //var DONo = '<option value="-1">--Select--</option>';
                //for (var i = 0; i < obj.length; i++) {
                //    $("#ddlDONoList").show();
                //    $("#lblDOno").show();
                //    if (obj[i].DONo != 'Create') {
                //        $("#tblAirWayBillInfo").hide();
                //        DONo += '<option>' + obj[i].DONo + '</option>';
                //    }
                //}
                //$("#ddlDONoList").html(DONo);
            } else {
                // FillControl(response);
                $("#tblAirWayBillInfo").fadeOut();
                $("#btndiv").fadeOut();
                $("#btnSignDiv").fadeOut();
                HideLoader();
                $("body").mLoading('hide');
                errmsg = "AWB No. not found.</br>";
                $.alert(errmsg);
                return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}

ImportShipmentFinalDelivery = function (OperationType, AirlinePrefix, MAWBNumber, HAWBNumber, Pieces, Weight, DeliveryTo, DriverName, DelivaryStatus, IsDeleted, CreatedBy, _imageDataFromCamera, signitureDataURL, TOKENNO, ROWID) {
    console.log(OperationType + ',' + AirlinePrefix + ',' + MAWBNumber + ',' + HAWBNumber + ',' + Pieces + ',' + Weight + ',' + DeliveryTo + ',' + DriverName + ',' + DelivaryStatus + ',' + IsDeleted + ',' + CreatedBy + ',' + TOKENNO + ',' + ROWID)
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/ImportShipmentFinalDelivery",
        data: JSON.stringify({
            'OperationType': OperationType,
            'AirlinePrefix': AirlinePrefix,
            'MAWBNumber': MAWBNumber,
            'HAWBNumber': HAWBNumber,
            'Pieces': Pieces,
            'Weight': Weight,
            'DeliveryTo': DeliveryTo,
            'DriverName': DriverName,
            'DelivaryStatus': DelivaryStatus,
            'IsDeleted': IsDeleted,
            'CreatedBy': CreatedBy,
            '_imageDataFromCamera': _imageDataFromCamera,
            'signitureDataURL': signitureDataURL,
            'TOKENNO': TOKENNO,
            'ROWID': ROWID

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            var obj = JSON.parse(response.d);
            SendSMS();
            $("body").mLoading('hide');
            successMessage();
            $(".swal2-confirm").click(function () {
                window.location.href = "Dashboard.html";
            });
            $("#tblAirWayBillInfo").hide();
            $("#btndiv").hide();
            $("#btnSignDiv").hide();
            // setInterval(function () { window.location.href = 'ImportOperations.html'; }, 3000);
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}

function exitFunction() {
    window.location.href = 'Dashboard.html';
}

function openScanner() {
    cordova.plugins.barcodeScanner.scan(
    function (result) {

        barCodeResule = result.text;//.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        var str = barCodeResule;

        var prifix = str.substring(0, 3);
        var AwbNo = str.substring(3, 12);
        var _HAWBNumber = $("#txtHAWBNo").val();

        $("#txtFlightPrefix").val(prifix);
        $("#txtFlightNo").val(AwbNo);

        $('body').mLoading({
            text: "Please Wait..",
        });
        GETFinalDeliveryDetail('2', prifix, AwbNo, _HAWBNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);
    },
    function (error) {
        // alert("Scanning failed: " + error);
    },
    {
        preferFrontCamera: false, // iOS and Android
        showFlipCameraButton: true, // iOS and Android
        showTorchButton: true, // iOS and Android
        torchOn: true, // Android, launch with the torch switched on (if available)
        saveHistory: true, // Android, save scan history (default false)
        prompt: "Place a barcode inside the scan area", // Android
        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
        formats: "CODE_128,QR_CODE,PDF_417,QR_CODE,DATA_MATRIX,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,CODE_93,CODABAR,ITF,RSS14,PDF417,RSS_EXPANDED", // default: all but PDF_417 and RSS_EXPANDED
        orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
        disableAnimations: true, // iOS
        disableSuccessBeep: false // iOS
    }
 );
}

GETFinalDeliveryDetail = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId) {
    //console.log(OperationType + '-' + AirlinePrefix + '-' + AwbNumber + '-' + HawbNumber + '-' + CreatedByUserId + '-' + OrganizationBranchId + '-' + OrganizationId);
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/getImportShipmentFinalDelivery",
        data: JSON.stringify({
            OperationType: OperationType,
            AirlinePrefix: AirlinePrefix,
            AwbNumber: AwbNumber,
            HawbNumber: HawbNumber,
            CreatedByUserId: CreatedByUserId,
            OrganizationBranchId: OrganizationBranchId,
            OrganizationId: OrganizationId

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            var obj = JSON.parse(response.d);
            //console.log(response.d)
            if (obj.length > 0) {
                if (obj[0].ErrorMSG == undefined) {
                    GetExportWarehouseAcceptanceForHistoryImport('5', AirlinePrefix, AwbNumber, HawbNumber, OrganizationBranchId);
                    _validPrifix = $("#txtFlightPrefix").val();
                    _validMawbNo = $("#txtFlightNo").val();

                    FF_MobileNo = obj[0].MobileNo;

                    var vtno = '';//'<option value="-1">--Select--</option>';
                    for (var i = 0; i < obj.length; i++) {
                        vtno += '<option>' + obj[i].TOKENNO + '</option>';
                        //if (obj[i].DONo != 'Create') {
                        //    $("#tblAirWayBillInfo").hide();
                        //    DONo += '<option>' + obj[i].DONo + '</option>';
                        //}
                    }
                    $("#ddlVTNoList").html(vtno);
                    $("#ddlVTNoList").trigger("change");
                    //var a = new Array();
                    //$("#ddlVTNoList").children("option").each(function (x) {
                    //    test = false;
                    //    b = a[x] = $(this).text();
                    //    for (i = 0; i < a.length - 1; i++) {
                    //        if (b == a[i]) test = true;
                    //    }
                    //    if (test) $(this).remove();
                    //});

                    var sel = document.getElementById('ddlVTNoList');
                    for (var i = 0; i < sel.options.length; i++) {
                        if (sel.options[i].value === "") {
                            sel.remove(i--);//decrease i to preserve future index references after removal
                        }
                    }
                    sel.options.selectedIndex = 0;

                    if (obj.length > 1) {
                        if (obj[0].ClearanceType == "bonded") {

                            $("#txtPieces").attr('disabled', 'disabled');
                            $("#txtWeight").attr('disabled', 'disabled');
                            $("#txtHAWBNo").show();
                            $("#txtHAWBNo").val('Bonded Shipment').attr('disabled', 'disabled');

                        } else {

                            $("#ddlHAWBList").show();
                            $("#txtHAWBNo").hide();
                            var s = '<option value="-1">--Select--</option>';
                            for (var i = 0; i < obj.length; i++) {
                                if (obj[i].HAWBNumber == "") {

                                    if (obj[i].ClearanceType == "cleared") {
                                        $("#txtHAWBNo").show();
                                        $("#txtHAWBNo").val('Cleared Shipment').attr('disabled', 'disabled');
                                    } else if (obj[i].ClearanceType == "bonded") {
                                        $("#txtHAWBNo").show();
                                        $("#txtHAWBNo").val('Bonded Shipment').attr('disabled', 'disabled');
                                    }
                                    $("#ddlHAWBList").hide();
                                    // console.log($("#txtHAWBNo").val() + '-' + $("#ddlDONoList").val() + '-' + $("#ddlHAWBList").val())
                                    if ($("#txtHAWBNo").val() == "" && $("#ddlHAWBList").val() != null) {
                                        FillControl(response);
                                        //$("#tblAirWayBillInfo").fadeIn();
                                        //$("#btndiv").fadeIn();
                                        //$("#btnSignDiv").fadeIn();
                                        $("body").mLoading('hide');
                                    }

                                } else {
                                    _HawbNumberSMS = obj[i].HAWBNumber;
                                    $("#txtHAWBNo").hide();
                                    s += '<option>' + obj[i].HAWBNumber + '</option>';
                                }
                            }
                        }

                        $("#ddlHAWBList").html(s);
                        $("#tblAirWayBillInfo").fadeIn();
                        $("#btndiv").fadeIn();
                        $("#btnSignDiv").fadeIn();
                        $("body").mLoading('hide');
                    } else {
                        if ($("#ddlHAWBList").val() != null) {
                            //$("#txtHAWBNo").show();
                            // FillControl(response);
                            $("#tblAirWayBillInfo").fadeIn();
                            $("#btndiv").fadeIn();
                            $("#btnSignDiv").fadeIn();
                            $("body").mLoading('hide');
                        } else {

                            // FillControl(response);
                            $("#tblAirWayBillInfo").fadeIn();
                            $("#btndiv").fadeIn();
                            $("#btnSignDiv").fadeIn();
                            $("body").mLoading('hide');
                        }

                    }


                } else {
                    $("#tblAirWayBillInfo").fadeOut();
                    $("#btndiv").fadeOut();
                    $("#btnSignDiv").fadeOut();
                    $("body").mLoading('hide');
                    errmsg = obj[0].ErrorMSG;
                    $.alert(errmsg);
                    return;
                }

            } else {
                $("#tblAirWayBillInfo").fadeOut();
                $("#btndiv").fadeOut();
                $("#btnSignDiv").fadeOut();
                $("body").mLoading('hide');
                errmsg = "AWB No. not found</br>";
                $.alert(errmsg);
                return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}


function GetExportWarehouseAcceptanceForHistoryImport(OperationType, AirlinePrefix, MAWBNumber, HAWBNumber, OrganizationBranchId) {
    console.log(OperationType + ', ' + AirlinePrefix + ', ' + MAWBNumber + ', ' + HAWBNumber + ', ' + OrganizationBranchId);
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetExportWarehouseAcceptanceForHistoryImport",
        data: JSON.stringify({ OperationType: OperationType, AirlinePrefix: AirlinePrefix, MAWBNumber: MAWBNumber, HAWBNumber: HAWBNumber, OrganizationBranchId: OrganizationBranchId }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            var obj = JSON.parse(response.d);
            console.log(response.d);
            if (obj.length > 0) {
                fillHistoryTable(response);
            } else {
                //$("body").mLoading('hide');
                //errmsg = "AWB No. not found</br>";
                //$.alert(errmsg);
                //return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            //$("body").mLoading('hide');
            //alert('Server not responding...');
        }
    });
}

function fillHistoryTable(response) {
    var obj = JSON.parse(response.d);
    //console.log(response.d)
    var count = 0;
    var row = '';
    if (obj.length > 0) {
        $.each(obj, function (i, d) {
            row += '<tr>';
            if (d.RcvdPKG > 0) {
                $('#HistoryDiv').show();
                row += '<td>' + d.TOKENNO + '</td>';
                row += '<td>' + d.FlightDate + '</td>';
                row += '<td class="text-right">' + d.RcvdPKG + '</td>';
                row += '<td class="text-right">' + d.RcvdGrossWT + '</td>';
            }
            row += '</tr>';
            count++;
        });
        $("#tbTableHistory").html(row);
    }
}

function SendSMS() {
    var messageContent = " Shipment for MAWB No. " + _MAWBNumber + " & HAWB No(s). " + _HawbNumberSMS + " is delivered to" + _DriverNamer + "";
    //var messageContent = "Shipment, MAWB No. " + _MAWBNumber + " HAWB No. " + _HawbNumberSMS + " is delivered to  " + _DriverNamer + "";

    //'https://platform.clickatell.com/messages/http/send?apiKey=gS7BfRrtS2yMXtOHkRLAAg==&to=+FF_MobileNo+&content=SMSmessagecontent'
    $.ajax({
        url: 'https://platform.clickatell.com/messages/http/send?apiKey=gS7BfRrtS2yMXtOHkRLAAg==&to=' + FF_MobileNo + '&content=' + messageContent,
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
function FillControl(response) {
    var obj = JSON.parse(response.d);
    if ($("#ddlDONoList").val() != '-1') {
        $("#txtDONo").show();
        $("#lblDOno").show();
        $("#txtDONo").val(obj[0].DONo);
    }
    $("#tblAirWayBillInfo").fadeIn('slow');
    $("#btndiv").fadeIn('slow');
    $("#btnSignDiv").fadeIn('slow');
    //$("#txtPieces").val(obj[0].DONoOfPackage);
    $("#txtPiecesOnlyShow").val(obj[0].DONoOfPackage);
    $("#txtWeightOnlyShow").val(obj[0].DOGrossWeight);
    $("#txtDelivaryStatus").val(obj[0].Custom_Release_Status);
    $("#txtPieces").val(obj[0].DONoOfPackage).css({ "color": "red", "font-weight": "bold" });
    $("#txtWeight").val(obj[0].DOGrossWeight).css({ "color": "red", "font-weight": "bold" });
}


function FillControlBonded(response) {
    var obj = JSON.parse(response.d);
    if ($("#ddlDONoList").val() != '-1') {
        $("#txtDONo").show();
        $("#lblDOno").show();
        $("#txtDONo").val(obj[0].DONo);
    }

    $("#tblAirWayBillInfo").fadeIn('slow');
    $("#btndiv").fadeIn('slow');
    $("#btnSignDiv").fadeIn('slow');
    //$("#txtPieces").val(obj[0].DONoOfPackage);
    $("#txtPiecesOnlyShow").val(obj[0].TotalNoOfPackage);
    $("#txtWeightOnlyShow").val(obj[0].TotalGrossWeight);
    $("#txtDelivaryStatus").val(obj[0].Custom_Release_Status);
    $("#txtPieces").val(obj[0].TotalNoOfPackage).css({ "color": "red", "font-weight": "bold" });
    $("#txtWeight").val(obj[0].TotalGrossWeight).css({ "color": "red", "font-weight": "bold" });
}

function FillControlDONo(response) {
    var obj = JSON.parse(response.d);
    //$("#txtDONo").show();
    //$("#lblDOno").show();
    //$("#txtDONo").val(obj[0].DONo);
    $("#tblAirWayBillInfo").fadeIn('slow');
    $("#btndiv").fadeIn('slow');
    $("#btnSignDiv").fadeIn('slow');
    //$("#txtPieces").val(obj[0].DONoOfPackage);
    $("#txtPiecesOnlyShow").val(obj[0].DONoOfPackage);
    $("#txtWeightOnlyShow").val(obj[0].DOGrossWeight);
    $("#txtDelivaryStatus").val(obj[0].Custom_Release_Status);
    $("#txtPieces").val(obj[0].DONoOfPackage).css({ "color": "red", "font-weight": "bold" });
    $("#txtWeight").val(obj[0].DOGrossWeight).css({ "color": "red", "font-weight": "bold" });
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
        imageDataFromCamera = imageData;
    }
    function onImageFail(message) {
        // alert('Failed because: ' + message);
    }
});

function successMessage() {
    swal({
        //title: "POD record saved successfully.",
        ////buttonsStyling: false,
        //confirmButtonClass: 'popup-btn'
        title: '',
        text: 'POD record saved successfully.',
        type: 'success',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-primary'
    });
}

getVTNumberWiseData = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId, VTNo) {
    // console.log(OperationType + '-' + AirlinePrefix + '-' + AwbNumber + '-' + HawbNumber + '-' + CreatedByUserId + '-' + OrganizationBranchId + '-' + OrganizationId);
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/getVTNumberWiseData",
        data: JSON.stringify({
            OperationType: OperationType,
            AirlinePrefix: AirlinePrefix,
            AwbNumber: AwbNumber,
            HawbNumber: HawbNumber,
            CreatedByUserId: CreatedByUserId,
            OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId, VTNo: VTNo

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            var obj = JSON.parse(response.d);
            // console.log(obj[0].TOKENNO + ',' + obj[0].ROWID);
            if (obj.length > 0) {
                if (obj[0].ErrorMSG == undefined) {

                    $("#txtDONo").hide();
                    $("#lblDOno").show();

                    _NoOfPackage = obj[0].DONoOfPackage;
                    _GrossWeight = obj[0].DOGrossWeight;

                    pkgsWtCal = _GrossWeight / _NoOfPackage;
                    //$("#txtDONo").val(obj[0].DONo)

                    TOKENNO = obj[0].TOKENNO;
                    ROWID = obj[0].ROWID;

                    FillControlDONo(response);
                    HideLoader();


                } else {
                    $("#tblAirWayBillInfo").fadeOut();
                    $("#btndiv").fadeOut();
                    $("#btnSignDiv").fadeOut();
                    HideLoader();
                    errmsg = obj[0].ErrorMSG;
                    $.alert(errmsg);
                    return;
                }

            } else {
                // FillControl(response);
                $("#tblAirWayBillInfo").fadeOut();
                $("#btndiv").fadeOut();
                $("#btnSignDiv").fadeOut();
                HideLoader();
                $("body").mLoading('hide');
                errmsg = "AWB No. not found.</br>";
                $.alert(errmsg);
                return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}
