
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
  // $("#tblVehicleInfo").hide();
  // $("#tblVehicleInfo1").hide();
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
    window.location.href = "IMP_Dashboard.html";
  }
  function searchAWBNumber() {
    AirlinePrefix = $("#txtFlightPrefix").val();
    AwbNumber = $("#txtFlightNo").val();
    if ($("#txtFlightPrefix").val() == '' || $("#txtFlightNo").val() == '' || AirlinePrefix.length != 3 || AwbNumber.length != 8 ) {
      // $("#txtFlightPrefix").css("border", "solid thin red");
      // $("#txtFlightNo").css("border", "solid thin #ccc");
      $("#tblVehicleInfo").hide();
      $("#tblVehicleInfo1").hide();
      errmsg = "No MAWB Number</br>";
      errmsgcont = "Please enter a valid MAWB number</br>";
      $.alert(errmsg,errmsgcont);
      return;
    } else {
        AirlinePrefix = $("#txtFlightPrefix").val();
        AwbNumber = $("#txtFlightNo").val();
        HawbNumber = '';
        // $('body').mLoading({
        //     text: "Please Wait..",
        // });
        ImportTrackandTrace('1', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);
    }
}

function MovetoNext(current, nextFieldID) {
  if (current.value.length >= current.maxLength) {
      document.getElementById(nextFieldID).focus();
  }
}


ImportTrackandTrace = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId) {
  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_Imp_IGMTracking",
      data: JSON.stringify({ OperationType: OperationType, AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response, xhr, textStatus) {
          var obj = JSON.parse(response.d);
         console.log(response.d);
         console.log(obj);
          if (obj.length > 0) {
            if (obj[0].ERRORMSG == undefined) {
              $("#tblVehicleInfo").show();
              $("#tblVehicleInfo1").show();
              FillControl(response);
             // fillDriverImage(response);
              $("body").mLoading('hide');
              // $.alert('Details saved successfully');
            }else{
              $("#tblVehicleInfo").hide();
              $("#tblVehicleInfo1").hide();
              errmsg = "Alert</br>";
              errmsgcont = obj[0].ERRORMSG;
              $.alert(errmsg,errmsgcont);
              return;
            }
          } else {
              $("body").mLoading('hide');
              $("#tblVehicleInfo").hide();
              $("#tblVehicleInfo1").hide();
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
  $("#spnIGMNo").text(obj[0].IGMNo);
  $("#spnIGMDate").text(obj[0].IGMYear);
  $("#spnFlightNo").text(obj[0].FlightNo);
  $("#spnFlightDate").text(obj[0].FlightDateTime);
 
}

function clearInputs(){
  $("#txtFlightPrefix").val(''); 
  $("#txtFlightNo").val('');
  $("#tblVehicleInfo").hide();
  $("#tblVehicleInfo1").hide();

  $("#txtFlightPrefix").focus(); 
}
