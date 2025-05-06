var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');
var OrganizationTypeId = localStorage.getItem('OrganizationTypeId');

var MenuTitle= localStorage.getItem('MenuTitle');
var Tab = localStorage.getItem('Tab');
var eventType = localStorage.getItem('event');
var VTNo = localStorage.getItem('VTNo');

var LocationName;
$(function () {
               
                $(".submitBtn").attr('disabled', 'disabled');
                $(".submitBtn").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
    LocationName = MenuTitle.substring(0, MenuTitle.length-8);
    $("#MenuHeading").text(MenuTitle.substring(0, MenuTitle.length-8));
    setTimeout(function () {
        window.location.href = 'loginScreen2.html'
    }, 1200000);
    $("#txtVTNo").val(VTNo);    
    
    if (VTNo == '') {
        $("#tbTable").hide('slow');
        $("#tbTableVehicle").hide();
        $("#tbTableVehicleHead").hide();
        $("#tbTableArr").hide();
    }
    if (VTNo != '') {
        $("#txtVTNo").val(VTNo);
        if(Tab == "Exports"){
            GetVehicleScanning(VTNo, "2", "95715", eventType);
        }else{
            GetVehicleScanning(VTNo, "1", "95715" ,eventType );
        }
        
         
     
    }
    $(".btnHome").click(function () {
        // if (LocationName == 'DOCK OUT') {
        //     location.href = "ExportVTNoDockOut.html";
        // } else if (LocationName == 'DOCK IN') {
            location.href = "ExportVTNoDockIn.html";
        // }
    });
    $("#btnSearch").click(function () {

        if ($("#txtVTNo").val() == '') {
            $("#tbTable").hide('slow');
            errmsg = "Alert</br>";
            errmsgcont ="Please enter VT Number.</br>";
            $.alert(errmsg,errmsgcont);
     
        } else {
            // $("#tbTable").show('slow');
            // $("#tbTableVehicle").show();
            // $("#tbTableVehicleHead").show();
            
            VTNo = $("#txtVTNo").val();
            getShipmentType(VTNo);

         
            $('body').mLoading({
                text: "Please Wait..",
            });

            setTimeout(function () {
                window.location.href = 'loginScreen2.html'
            }, 120000);


        }

    });
 
    $("#divbtnInfo").hide();


    switch (language) {
        case "Spanish":
            setSpanish();
            break;
        case "Russian":
            setRussian();
            break;
        case "Turkish":
            setTurkish();
            break;
    }
});

function back() {
    window.location.href = "TPSUserVTList.html";
  }

  function logOut() {
    modal.style.display = "block";
 
 }
function exitModal() {
 modal.style.display = "none";
}

function setSpanish() {
    $('select option:contains("ES")').prop('selected',true);
    if(LocationName == 'DOCK IN'){
        $('#txtLocation').text("ATRACAR EN");
      }else{
        $('#txtLocation').text("ATRACAR");
      }
    $('#vehicleDetails').text("Detalles del vehículo");
    $('#vehicleNo').text("Número de vehículo");
    $('#driverName').text("Nombre del conductor");
    $('#slot').text("Detalle de ranura/muelle");

    $('#btnClear').text("Clara");
    $('#btnSubmit').text("Entregar");
  

    
}
function successMessageIn() {
    swal({
        //title: "Warehouse acceptance saved successfully.",
        ////buttonsStyling: false,
        //confirmButtonClass: 'popup-btn'
        title: '',
        text: ' Dock-In recorded successfully.',
        type: 'success',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-primary'
    });
}
function successMessageOut() {
    swal({
        //title: "Warehouse acceptance saved successfully.",
        ////buttonsStyling: false,
        //confirmButtonClass: 'popup-btn'
        title: '',
        text: ' Dock-Out recorded successfully.',
        type: 'success',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-primary'
    });
}
function openScanner() {
    cordova.plugins.barcodeScanner.scan(
    function (result) {

        barCodeResule = result.text;//.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        $("#txtVTNo").val(barCodeResule);
        $("#txtVTNo").css('disabled', 'disabled');
        $('body').mLoading({
            text: "Please Wait..",
        });
        VTNo = $("#txtVTNo").val();

        getShipmentType(VTNo);
        // if (LocationName == 'DOCK OUT') {
        //     if(VTNo.charAt(0) == 'E' || VTNo.charAt(1) == 'E') {
        //     GetVehicleScanningExports(VTNo, '8', CreatedByUserId, OrganizationBranchId, OrganizationId);
        //     }else{
        //     GetVehicleScanningImports(VTNo, '6', CreatedByUserId, OrganizationBranchId, OrganizationId);
        //     }
        // } else if (LocationName == 'DOCK IN') {
        //     if(VTNo.charAt(0) == 'E' || VTNo.charAt(1) == 'E') {
        //     GetVehicleScanningExports(VTNo, '7', CreatedByUserId, OrganizationBranchId, OrganizationId);
        //     }else{
        //     GetVehicleScanningImports(VTNo, '5', CreatedByUserId, OrganizationBranchId, OrganizationId);
        //     }
        // }
        //GetVehicleScanning(barCodeResule, '6', CreatedByUserId, OrganizationBranchId, OrganizationId);

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

function submitVehicleDetails() {
    $("#txtVTNo").css("border", "solid thin #ccc");
    if ($("#txtVTNo").val() == '') {
        $("#tbTable").hide('slow');
        errmsg = "Alert</br>";
        errmsgcont ="Please enter VT Number.</br>";
        $.alert(errmsg,errmsgcont);

        return;
    } 
    else{
    if(Tab == "Exports"){
        UpdateVehicleScanning(VTNo, "2", "95715", eventType);
    }else{
        UpdateVehicleScanning(VTNo, "1", "95715" ,eventType);
    }

    }
}

function fnExit() {
    location.href = "ExportOperations.html";
    //if (LocationName == 'TPS CHECK IN') {
    //    location.href = "TPS_Checkin.html";
    //} else if (FFLocation == '3') {
    //    location.href = "ForwardersTruckersExportDashboard.html";
    //} else {
    //    location.href = "ExportOperations.html";
    //}
}
function fnClear() {
    $("#txtVTNo").removeAttr('disabled');
    $("#tbTable").hide('slow');
    $("#txtVTNo").val('');
    $("#ddlDockOpration").val('0');
    $("#txtTPSCheckIn").val('');
    $("#txtDockIn").val('');
    $("#txtDockOut").val('');
    $("#txtTPSCheckIn").hide();
    $("#txtDockIn").hide();
    $("#txtDockOut").hide();
    $("#lblTPSCheckIn").hide();
    $("#lblDockIn").hide();
    $("#lblDockOut").hide();
        $("#tbTableArrInfo").hide();
}

GetVehicleScanning = function (VTNo, OperationType, OrganizationBranchId, OperationEvent) {
    $.ajax({
        type: 'POST',
        url: TSMServiceUrl + "/GetVehicleScanningCheckInCheckOut",
        data: JSON.stringify({ VTNo: VTNo, OperationType: OperationType, OrganizationBranchId: OrganizationBranchId, OperationEvent: OperationEvent , lang: "en-US"}),

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            var obj = JSON.parse(response.d);
           
            if (obj.length > 0) {
                if (obj[0].ErrorMSG == undefined) {
                    $("#txtVTNo").attr('disabled', 'disabled');
                    $("#spnVehicleNo").text(obj[0].VEHICLENO);
                    $("#spnDriverName").text(obj[0].DRIVERNAME);
                    _DRIVERNAME = obj[0].DRIVERNAME;
                    _DRIVERMOBILENO = obj[0].DRIVERMOBILENO;
                    if(obj[0].TOKENNO == null || obj[0].TOKENNO == "" || obj[0].TOKENNO == undefined){
                        _TOKENNO = obj[0].VTNo;
                        }else {
                        _TOKENNO = obj[0].TOKENNO;
                        }
                        console.log(_TOKENNO)
                    $("#spnSlotDockDetail").text(obj[0].SLOTTIME);
                    $("#divbtnInfo").fadeIn('slow');
                    $("#tbTable").show('slow');
                    $("#tbTableVehicle").show();
                    $("#tbTableVehicleHead").show();
                    $("#tbTableArr").hide();
                    $(".submitBtn").removeAttr('disabled');
                    $(".submitBtn").css({ "background-color": "#00AAA2", "color": "white" , "border-color": "#00AAA2"});
    
                    $("body").mLoading('hide');
                } else {
                    $("body").mLoading('hide');
                    errmsg = "Alert</br>";
                    errmsgcont =obj[0].ErrorMSG;
                    $.alert(errmsg,errmsgcont);
               
                    return;
                }
            } else {
                $("body").mLoading('hide');
                errmsg = "Alert</br>";
                errmsgcont ="VT No. not found</br>";
                $.alert(errmsg,errmsgcont);
          
                return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}

GetVehicleScanningStatus = function (VTNo, OperationType, CreatedByUserId, OrganizationBranchId, OrganizationId) {
    // console.log(VTNo + ',' + OperationType + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetVehicleScanningStatus",
        data: JSON.stringify({ VTNo: VTNo, OperationType: OperationType, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            var obj = JSON.parse(response.d);
            FillGrid(response);
            //if (obj.length > 0) {
            //    $("#spnAWBNo").text(obj[0].AirlinePrefix + '' + MAWBNumber);
            //    $("#spnHAWBNo").text(obj[0].HAWBNumber);
            //    $("#spnArrival").text(obj[0].FlightArrivalStatus);
            //    $("#spnCustom").text(obj[0].CustomReleaseNumber);
            //    $("#spnPayment").text(obj[0].Payment);
            //    $("body").mLoading('hide');
            //} else {
            //    $("body").mLoading('hide');
            //    errmsg = "Invalid Input.</br>";
            //    $.alert(errmsg);
            //    return;
            //}
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}
FillGrid = function (response) {
    var obj = JSON.parse(response.d);
   // console.log(response.d)
    var count = 0;
    var row = '';
    if (obj.length > 0) {
        $.each(obj, function (i, d) {
            row += '<tr>';
            row += '<td class="text-right">' + d.AirlinePrefix + '-' + d.MAWBNumber + '</td>';
            if (d.HAWBNumber == null) {
                row += '<td>---</td>';
            } else {
                row += '<td>' + d.HAWBNumber + '</td>';
            }
            if (d.FlightArrivalStatus == null) {
                row += '<td>---</td>';
            } else {
                //row += '<td>' + d.FlightArrivalStatus + '</td>';
                row += '<td><i style="font-weight: bold;font-size: 20px;color: green;" class="zmdi zmdi-check"></i></td>';
            } if (d.CustomReleaseNumber == null) {
                row += '<td>---</td>';

            } else {
                //row += '<td>' + d.CustomReleaseNumber + '</td>';
                row += '<td><i style="font-weight: bold;font-size: 20px;color: green;" class="zmdi zmdi-check"></i></td>';

            } if (d.Payment == null) {
                row += '<td>---</td>';
            } else {
                //row += '<td>' + d.Payment + '</td>';
                row += '<td><i style="font-weight: bold;font-size: 20px;color: green;" class="zmdi zmdi-check"></i></td>';
            }

        // if (d.Payment == null) {
        //     row += '<td>---</td>';
        // } else {
            //row += '<td>' + d.Payment + '</td>';
            // row += "<td><img src='img/icon_status_pending.png' style='text-transform:none !important'/></td>";
        // }
            row += '</tr>';
            count++;
        });
        $("#tbTableArrInfo").html(row);
    }
}
UpdateVehicleScanning = function (VTNo, OperationType, OrganizationBranchId, OperationEvent) {
    $('body').mLoading({
        text: "Please Wait..",
    });
    // console.log(OperationType + ',' + pVTNo + ',' + pTPS_CHECK_IN + ',' + pDOCK_IN + ',' + pDOCK_OUT + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId)
    $.ajax({
        type: 'POST',
        url: TSMServiceUrl + "/UpdateVehicleScanningCheckInCheckOut",
        data: JSON.stringify(
            {
                "OperationType": OperationType,
                "VTNo": VTNo,
                "CreatedByUserId": "59970",
                "OrganizationBranchId": OrganizationBranchId,
                "OrganizationId": "57132",
                "ParkInStatus": "0",
                "ParkOutStatus": "0",
                "tpscheckInstatus": "0",
                "tpscheckOutstatus": "0",
                "Dockoutstatus": "0",
                "DockInstatus": "0",
                "OperationEvent": OperationEvent,
                "IsGeoFencing": "false",
                "Mode": Tab,
                "lang": "en-US"
            }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            $("body").mLoading('hide');
        console.log("response",response)
            var obj = JSON.parse(response.d);
            if (obj) {
           
                                if (LocationName == 'Parking In') {
                                    $("#divbtnInfo").hide();
                                    successMessageParkIn();
                                    SendSMS();
                                    $(".swal2-confirm").click(function () {
                                        window.location.href = "TPSUserVTList.html";
                                    });
                                } else if (LocationName == 'Parking Out') {
                                    $("#divbtnInfo").hide();
                                    successMessageParkOut();
                                    SendSMS();
                                    $(".swal2-confirm").click(function () {
                                        location.href = "TPSUserVTList.html";
                                    });
                                } else if (LocationName == 'Terminal Gate In') {
                                    $("#divbtnInfo").hide();
                                    successMessageGateIn();
                                    SendSMS();
                                    $(".swal2-confirm").click(function () {
                                        window.location.href = "TPSUserVTList.html";
                                    });
                               
                            }
                            else if (LocationName == 'Terminal Gate Out') {
                                $("#divbtnInfo").hide();
                                successMessageGateOut();
                                SendSMS();
                                $(".swal2-confirm").click(function () {
                                    window.location.href = "TPSUserVTList.html";
                                });
                           
                        }
                      
                
                        
             
            } else {
            
                $("body").mLoading('hide');
                errmsg = "Alert</br>";
                errmsgcont = obj.ErrorMSG;
                $.alert(errmsg,errmsgcont);
          
                return;
          
            }
        },
        //    
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}

getShipmentType = function (VTNo) {
    $.ajax({
        type: 'POST',
        url: TSMServiceUrl + "/GetVTShipmentType",
        data: JSON.stringify({ Tokenno: VTNo, Mode: Tab}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            var obj = JSON.parse(response.d);
            var shipType= obj[0].ShipmentType;
            if(shipType == Tab){
            localStorage.setItem('Tab', shipType);
       
            if(shipType == "Exports"){
                GetVehicleScanning(VTNo, "2", "95715", eventType);
            }else{
                GetVehicleScanning(VTNo, "1", "95715" ,eventType );
            }
        }else{
            $("body").mLoading('hide');
            errmsg = "Alert</br>";
            errmsgcont = "Please enter valid VT no.</br>";
            $.alert(errmsg,errmsgcont);
       
            return;
        }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}
function successMessageParkIn() {
    swal({
        //title: "Dock-In updated successfully for VT No. " + _TOKENNO + "",
        ////buttonsStyling: false,
        //confirmButtonClass: 'popup-btn'
         title: '',
        text: 'Parking-In updated successfully for VT No. ' + _TOKENNO + '',
        type: 'success',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-primary'
    });
}
function successMessageParkOut() {
    swal({
        //title: "Dock-Out updated successfully for VT No. " + _TOKENNO + "",
        ////buttonsStyling: false,
        //confirmButtonClass: 'popup-btn'
         title: '',
        text: 'Parking-Out updated successfully for VT No. ' + _TOKENNO + '',
        type: 'success',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-primary'
    });
}

function successMessageGateIn() {
    swal({
        //title: "TPS Check-In saved successfully for VT No. " + _TOKENNO + "",
        ////buttonsStyling: false,
        //confirmButtonClass: 'popup-btn'
         title: '',
        text: 'Terminal Gate-In saved successfully for VT No. ' + _TOKENNO + '',
        type: 'success',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-primary'
    });
}
function successMessageGateOut() {
    swal({
        //title: "TPS Check-In saved successfully for VT No. " + _TOKENNO + "",
        ////buttonsStyling: false,
        //confirmButtonClass: 'popup-btn'
         title: '',
        text: 'Terminal Gate-Out saved successfully for VT No. ' + _TOKENNO + '',
        type: 'success',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-primary'
    });
}


function SendSMS() {

    var messageContent = " VT No " + $("#txtVTNo").val(); +" Updated for Tucker. " + _DRIVERNAME + "";
    //var messageContent = "Shipment, MAWB No. " + _MAWBNumber + " HAWB No. " + _HawbNumberSMS + " is delivered to  " + _DriverNamer + "";

    //'https://platform.clickatell.com/messages/http/send?apiKey=gS7BfRrtS2yMXtOHkRLAAg==&to=+FF_MobileNo+&content=SMSmessagecontent'
    $.ajax({
        url: 'https://platform.clickatell.com/messages/http/send?apiKey=gS7BfRrtS2yMXtOHkRLAAg==&to=' + _DRIVERMOBILENO + '&content=' + messageContent,
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
