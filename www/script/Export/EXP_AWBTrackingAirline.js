var LocationName = localStorage.getItem('LocationName');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');
//var fromExport = localStorage.getItem('fromExport');
var errmsg = "";


$(function () {

  // $("#tblAirWayBillInfo1").hide();
  // $("#tblAirWayBillInfo").hide();
 
  localStorage.removeItem('fromMenus')
  setTimeout(function () {
    window.location.href = 'loginScreen2.html'
  }, 1200000);

  // $("#tblAirWayBillInfo").empty();
  // $("#tblAirWayBillInfo1").empty();


});
function logOut() {
 modal.style.display = "block";
}

function exitModal() {
  modal.style.display = "none";
}

function back() {
  localStorage.setItem('fromMenus','1')
  // modal.style.display = "block";
  window.location.href = "EXP_DashboardAirline.html";
}
function searchAWBNumber() {
  AirlinePrefix = $("#txtFlightPrefix").val();
  AwbNumber = $("#txtFlightNo").val();
  if ($("#txtFlightPrefix").val() == '' || $("#txtFlightNo").val() == '' || AirlinePrefix.length != 3 || AwbNumber.length != 8) {
    // $("#txtFlightPrefix").css("border", "solid thin red");
    // $("#txtFlightNo").css("border", "solid thin #ccc");
    $("#tblAirWayBillInfo").hide();
    $("#tblAirWayBillInfo1").hide();

    errmsg = "No MAWB Number</br>";
    errmsgcont = "Please enter a valid MAWB number</br>";
    $.alert(errmsg,errmsgcont);
    return;
  } else {
    AirlinePrefix = $("#txtFlightPrefix").val();
    AwbNumber = $("#txtFlightNo").val();
    HawbNumber = '';
    // $('body').mLoading({
    //   text: "Please Wait..",
    // });
    ExportTrackandTrace('1', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);
  }
}

function MovetoNext(current, nextFieldID) {
  if (current.value.length >= current.maxLength) {
    document.getElementById(nextFieldID).focus();
  }
}


ExportTrackandTrace = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId) {
  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_Exp_TrackandTrace",
    data: JSON.stringify({ OperationType: OperationType, AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
      var obj = JSON.parse(response.d);
      console.log(response.d);
    
      console.log(obj);
      if (obj.length > 0) {
       
        $("#tblAirWayBillInfo").show();
        $("#tblAirWayBillInfo1").show();

        FillControl(response);
        // fillDriverImage(response);
      //  $("body").mLoading('hide');
        // $.alert('Details saved successfully');
      } else {
        $("body").mLoading('hide');
        $("#tblAirWayBillInfo").hide();
        $("#tblAirWayBillInfo1").hide();

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

function FillControl12(response) {
  var obj = JSON.parse(response.d);
  console.log("FillControl obj", obj)

  
  $("#spnMawbCreation").text(obj[0].MAWBCreationDate);
  $("#spnHawbCreation").text(obj[0].HAWBCreationDate);
  $("#spnASI").text(obj[0].ASIApproval);
  $("#spnSB").text(obj[0].SBDate);
    if(obj[0].COApproval == "Rejected"){
      $("#spnCOApproval").text(obj[0].COApproval).css("color" , "red");
    }else{
      $("#spnCOApproval").text(obj[0].COApproval);
      }
  $("#spnWhAcceptance").text(obj[0].TDGDATE);
  $("#spnEGM").text(obj[0].EGM);
  $("#spnLEO").text(obj[0].LEO);
  $("#spnDOC").text(obj[0].DOC);
  $("#spnRCS").text(obj[0].RCS);
  $("#spnSCR").text(obj[0].SCR);
  $("#spnFlightDep").text(obj[0].DEPDate);
  $("#spnParkingArea").text(obj[0].PARKINGAREA);
  
  if(obj[0].DOCINDATE == null || obj[0].DOCINDATE == "Pending" || obj[0].DOCINDATE == ""){
    $("#spnDockIn").text("Pending");
  }else{
    $("#spnDockIn").text(obj[0].DOCINDATE);
    }

    if(obj[0].DOCOUTDATE == null || obj[0].DOCOUTDATE == "Pending" || obj[0].DOCOUTDATE == "" ){
      $("#spnDockOut").text("Pending");
    }else{
      $("#spnDockOut").text(obj[0].DOCOUTDATE);
      }
  $("#spneDocket").text(obj[0].eDocketDate);
  $("#spnTSP").text(obj[0].TSPDate);

  $("#spnVT").text(obj[0].VTDATE);
  $("#spnSBASI").text(obj[0].SBASIApproval);
  $("#spnPKG").text(obj[0].Nop);
  $("#spnGrWt").text(obj[0].GrossWt);
  $("#spnChWt").text(obj[0].ChargeWt);
  $("#spnCommo").text(obj[0].Commodity);
}

function FillControl(response) {
  var obj = JSON.parse(response.d);
  console.log("FillControl obj", obj)

  
  $("#spnMawbCreation").text(obj[0].MAWBCreationDate);
  $("#spnHawbCreation").text(obj[0].HAWBCreationDate);
  $("#spnASI").text(obj[0].ASIApproval);

    if(obj[0].COApproval == "Rejected"){
      $("#spnCOApproval").text(obj[0].COApproval).css("color" , "red");
    }else{
      $("#spnCOApproval").text(obj[0].COApproval);
      }
      $("#spnSB").text(obj[0].SBDate);
      $("#spnTSP").text(obj[0].TSPDate);
      $("#spnBookSlot").text(obj[0].BookSlot);
      $("#spnParkingIn").text(obj[0].ParkingIn);
      $("#spnParkingOut").text(obj[0].ParkingOut);
      $("#spnGateIn").text(obj[0].GateIn);
      if(obj[0].DOCINDATE == null || obj[0].DOCINDATE == "Pending"){
        $("#spnDockIn").text("Pending");
      }else{
        $("#spnDockIn").text(obj[0].DOCINDATE);
        }
    
        if(obj[0].DOCOUTDATE == null || obj[0].DOCOUTDATE == "Pending"){
          $("#spnDockOut").text("Pending");
        }else{
          $("#spnDockOut").text(obj[0].DOCOUTDATE);
          }
  $("#spnWhAcceptance").text(obj[0].TDGDATE);

  $("#spnGateOut").text(obj[0].GateOut);

  $("#spnLEO").text(obj[0].LEO);
  $("#spnDOC").text(obj[0].DOC);
  $("#spnRCS").text(obj[0].RCS);
  $("#spnSCR").text(obj[0].SCR);
  $("#spnDEP").text(obj[0].DEPDate);
  $("#spnEGM").text(obj[0].EGM);
  
 

  $("#spnSBASI").text(obj[0].SBASIApproval);
  $("#spnPKG").text(obj[0].Nop);
  $("#spnGrWt").text(obj[0].GrossWt);
  $("#spnChWt").text(obj[0].ChargeWt);
  $("#spnCommo").text(obj[0].Commodity);
}
function clearInputs(){
  $("#txtFlightPrefix").val(''); 
  $("#txtFlightNo").val('');
  $("#tblAirWayBillInfo").hide();
  $("#tblAirWayBillInfo1").hide();

  $("#txtFlightPrefix").focus(); 
}

openNotification = function(){
  window.location.href = "notificationList.html";
}