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
    localStorage.setItem('fromMenus','2')
    // modal.style.display = "block";
    window.location.href = "IMP_DashboardAirline.html";
  }
  function searchAWBNumber() {
    AirlinePrefix = $("#txtFlightPrefix").val();
    AwbNumber = $("#txtFlightNo").val();
    if ($("#txtFlightPrefix").val() == '' || $("#txtFlightNo").val() == '' || AirlinePrefix.length != 3 || AwbNumber.length != 8 ) {
        // $("#txtFlightPrefix").css("border", "solid thin red");
        // $("#txtFlightNo").css("border", "solid thin #ccc");
        $("#tblAirWayBillInfo").hide();
        $("#tblAirWayBillInfo1").hide();
        errmsg = "No MAWB Number</br>";
        errmsgcont = "Please enter a valid MAWB number</br>";
        $.alert(errmsg,errmsgcont);
        return;
    }  else {
        AirlinePrefix = $("#txtFlightPrefix").val();
        AwbNumber = $("#txtFlightNo").val();
        HawbNumber = $("#ddlHAWBNo").val();
        if( HawbNumber =="-1"){
          HawbNumber="";
        }
        // $('body').mLoading({
        //     text: "Please Wait..",
        // });
        ImportTrackandTrace('1', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);
    }
}

function getHawblist(){
  var HawbNo ='<option value="-1">Select</option>';
  $("#ddlHAWBNo").html(HawbNo);
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
            var HawbNo ='<option value="-1">Select</option>';
       
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

ImportTrackandTrace = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId) {
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
              $("#tblAirWayBillInfo").fadeIn('slow');
              $("#tblAirWayBillInfo1").show();
              FillControl(response);
             // fillDriverImage(response);
              $("body").mLoading('hide');
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

function FillControl123(response) {
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

  if(obj[0].DOCINDATE == null || obj[0].DOCINDATE == ""){
    $("#spnDockIn").text("Pending");
  }else{
    $("#spnDockIn").text(obj[0].DOCINDATE);
    }
    if(obj[0].DOCOUTDATE == null || obj[0].DOCOUTDATE == ""){
      $("#spnDockOut").text("Pending");
    }else{
      $("#spnDockOut").text(obj[0].DOCOUTDATE);
      }


  $("#spnPkg").text(obj[0].Nop);
  $("#spnGrWt").text(obj[0].GrossWt);
  $("#spnChWt").text(obj[0].ChargeWt);
  
  $("#spnCommo").text(obj[0].Commodity);
  
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
 

  if(obj[0].TSP == null || obj[0].TSP == "Pending"){
    $("#spnTSP").text("Pending");
  }else{
    $("#spnTSP").text(obj[0].TSP);
    }
    $("#spnFFE").text(obj[0].FFE);
    $("#spnOC").text(obj[0].OC);
    $("#spnGatePass").text(obj[0].GatePass);
    $("#spnBookSlot").text(obj[0].BOOKSLOT);
    $("#spnParkIn").text(obj[0].ParkingIn);
    $("#spnParkOut").text(obj[0].ParkingOut);
    $("#spnTerminalGateIn").text(obj[0].TerminalGateIn);
    $("#spnDockIn").text(obj[0].DOCIN);
    $("#spnCargoDelivered").text(obj[0].DLV);
    $("#spnDockOut").text(obj[0].DOCOUT);
    $("#spnTerminalGateOut").text(obj[0].TerminalGateOut);


 


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
  $("#tblAirWayBillInfo").hide();
  $("#tblAirWayBillInfo1").hide();
  $("#txtFlightPrefix").focus(); 

}

openNotification = function(){
  window.location.href = "notificationList.html";
}