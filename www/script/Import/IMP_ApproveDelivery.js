var LocationName = localStorage.getItem('LocationName');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');
var errmsg = "";
$(function () {
  localStorage.removeItem('fromMenus')
  setTimeout(function () {
      window.location.href = 'loginScreen2.html'
  }, 1200000);

  // $("#tblAirWayBillInfo").hide();
  // $("#tblAirWayBillInfo1").hide();
});
    function logOut() {
    modal.style.display = "block";
  }
  
  function exitModal() {
    modal.style.display = "none";
  }
  function back() {
    // modal.style.display = "block";
    window.location.href = "IMP_DeliveryDocket.html";
  }
  function searchAWBNumber() {
    AirlinePrefix = $("#txtFlightPrefix").val();
    AwbNumber = $("#txtFlightNo").val();
    HawbNumber = $("#ddlHAWBNo").val();
    if ($("#txtGatePassNo").val() == '' ){
        if ($("#txtFlightPrefix").val() == '' || $("#txtFlightNo").val() == '' || AirlinePrefix.length != 3 || AwbNumber.length != 8 ) {
        // $("#txtFlightPrefix").css("border", "solid thin red");
        // $("#txtFlightNo").css("border", "solid thin #ccc");
        $("#tblAirWayBillInfo").hide();
        $("#tblAirWayBillInfo1").hide();
        errmsg = "No MAWB Number</br>";
        errmsgcont = "Please enter a valid MAWB number</br>";
        $.alert(errmsg,errmsgcont);
        return;
    } 
    // else if(HawbNumber =="-1"){
    //     errmsg = "No HAWB Number</br>";
    //     errmsgcont = "Please select HAWB number</br>";
    //     $.alert(errmsg,errmsgcont);
    //     return;
    // }
    else{
        $('body').mLoading({
            text: "Please Wait..",
        });
        ImportGetDetails();
    }
} else {
        $('body').mLoading({
            text: "Please Wait..",
        });
        ImportGetDetails();
    }
}

function getHawblist(){
    AirlinePrefix = $("#txtFlightPrefix").val();
    AwbNumber = $("#txtFlightNo").val();
    HawbNumber = '';
    ImportHawbList('2', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);
  
  }
  function MovetoNext(current, nextFieldID) {
    if (current.value.length >= current.maxLength) {
        document.getElementById(nextFieldID).focus();
    }
  }
  ImportHawbList = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId) {
    //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/ACS_Imp_TrackandTrace",
        data: JSON.stringify({ OperationType: OperationType, AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            var obj = JSON.parse(response.d);
           console.log(response.d);
           console.log(obj);
           
            if (obj.length > 0) {
              var HawbNo ='<option value="">Select</option>';
         
              for (var i = 0; i < obj.length; i++) {
                  $("#ddlHAWBNo").show();
                  // $("#lblVTno").show();
                  HawbNo += '<option>' + obj[i].HAWBNumber + '</option>';
              }
              $("#ddlHAWBNo").html(HawbNo);
  
                $("body").mLoading('hide');
                // $.alert('Details saved successfully');
            } else {
                $("body").mLoading('hide');
                $("#tblAirWayBillInfo").hide();
                $("#tblAirWayBillInfo1").hide();
               
            }
  
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
  }
ImportGetDetails = function () {
    AirlinePrefix = $("#txtFlightPrefix").val();
    AwbNumber = $("#txtFlightNo").val();
    HawbNumber = $("#ddlHAWBNo").val();
    GatePassNo = $("#txtGatePassNo").val();
    if(GatePassNo != ""){
        OperationType = "2";
    }else{
        OperationType = "1";
    }

    localStorage.setItem('AWBNumber',  AirlinePrefix.concat(AwbNumber));
    localStorage.setItem('hawbNo',  HawbNumber);
    localStorage.setItem('GPNumber',  GatePassNo);
  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_Get_GatePassDetails",
      data: JSON.stringify({ OperationType: OperationType, MAWBNumber: AirlinePrefix.concat(AwbNumber), HAWBNumber: HawbNumber, GatePassNo: GatePassNo }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response, xhr, textStatus) {
          var obj = JSON.parse(response.d);
         console.log(response.d);
         console.log(obj);
         $("body").mLoading('hide');
          if (obj.length > 0) {
            if (obj[0].ERRORMSG == undefined) {
               
                console.log(response)
                window.location.href = "IMP_ApproveDeliveryDetails.html";
                
               // fillDriverImage(response);
                $("body").mLoading('hide');
                // $.alert('Details saved successfully');
              }else{
                 
                errmsg = "Alert</br>";
                errmsgcont = obj[0].ERRORMSG;
                $.alert(errmsg,errmsgcont);
                return;
    
              }
            } else {
                $("body").mLoading('hide');
               
                errmsg = "Wrong MAWB number</br>";
                errmsgcont = "Please enter a valid MAWB number</br>";
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

function FillControl(response) {
  var obj = JSON.parse(response.d);
  console.log("FillControl obj",obj)

  

  $("#spnFlArr").text(obj[0].ARRDate);
  $("#spnRCF").text(obj[0].RCFDate);
  $("#spnDI").text(obj[0].DIDATE);
  $("#spnADO").text(obj[0].AirlineDO);
  $("#spnConDO").text(obj[0].ConsolDO);
  $("#spnBoE").text(obj[0].BOE);
  $("#spnOC").text(obj[0].OC);

  if(obj[0].TSP == null || obj[0].TSP == "Pending"){
    $("#spnTSP").text("Pending");
  }else{
    $("#spnTSP").text(obj[0].TSP);
    }
  $("#spnParkArea").text(obj[0].PARKINGAREA);
  $("#spnCargoDelivered").text(obj[0].DLV);
  $("#spnDamaged").text(obj[0].Damaged);

  $("#spnDockIn").text(obj[0].DOCINDATE);
  $("#spnDockOut").text(obj[0].DOCOUTDATE);

  $("#spnPkg").text(obj[0].Nop);
  $("#spnGrWt").text(obj[0].GrossWt);
  $("#spnChWt").text(obj[0].ChargeWt);
  
  $("#spnCommo").text(obj[0].Commodity);
  
}
function clearInputs(){
  $("#txtFlightPrefix").val(''); 
  $("#txtFlightNo").val('');
  var HawbNo ='<option value="-1">Select</option>';
  $("#ddlHAWBNo").html(HawbNo);
  $("#txtGatePassNo").val('');
  
  $("#tblAirWayBillInfo").hide();
  $("#tblAirWayBillInfo1").hide();
  $("#txtFlightPrefix").focus(); 

}


function openScannerMawb() {
  cordova.plugins.barcodeScanner.scan(
  function (result) {
      barCodeResule = result.text;//.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
      var prefix = (barCodeResule.substring(0, 3))
       var awbNumber = barCodeResule.substring(3,barCodeResule.length);  
      $("#txtFlightPrefix").val(prefix);
      $("#txtFlightNo").val(awbNumber);

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

function openScannerGP() {
  cordova.plugins.barcodeScanner.scan(
  function (result) {
      barCodeResule = result.text;//.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
      $("#txtGatePassNo").val(barCodeResule);
    

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