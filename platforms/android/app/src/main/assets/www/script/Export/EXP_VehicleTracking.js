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

  // $("#tblVehicleInfo").hide();
  
        $("#spnFlightDt").datepicker({
          showOn: 'button',
          buttonImageOnly: true,
          buttonImage: 'img/Calendar_28x32.png'
         });

      $(".ui-datepicker-trigger").mouseover(function() {
      $(this).css('cursor', 'pointer');
      });

});
$("#tblVehicleDetails").empty();

    function logOut() {
    modal.style.display = "block";

  }
  
  function exitModal() {
    modal.style.display = "none";
  }
  function back() {
    debugger
    localStorage.setItem('fromMenus','1')
    // modal.style.display = "block";
    window.location.href = "EXP_Dashboard.html";
  }
  function searchAWBNumber() {
    if ($("#txtShippingBill").val() == '') {
      // $("#txtFlightPrefix").css("border", "solid thin red");
      // $("#txtFlightNo").css("border", "solid thin #ccc");
      $("#tblAirWayBillInfo").hide();
      $("#tblVehicleInfo").hide();  
      errmsg = "No SB Number</br>";
      errmsgcont = "Please enter a valid SB number</br>";
      $.alert(errmsg,errmsgcont);
      return;
    } else if ($("#spnFlightDt").val() == '') {
      // $("#txtFlightPrefix").css("border", "solid thin red");
      // $("#txtFlightNo").css("border", "solid thin #ccc");
      $("#tblAirWayBillInfo").hide();
      $("#tblVehicleInfo").hide();  
      errmsg = "No date</br>";
      errmsgcont = "Please enter a valid date</br>";
      $.alert(errmsg,errmsgcont);
      return;
    } else {
        AirlinePrefix = "";
        AwbNumber = "";
        SBNo= $("#txtShippingBill").val();
        SBDate= $("#spnFlightDt").val();
        HawbNumber = '';
        // $('body').mLoading({
        //     text: "Please Wait..",
        // });
        ExportVehicleTracking('1', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);
    }
    $("#tblVehicleDetails").empty();
}

function MovetoNext(current, nextFieldID) {
  if (current.value.length >= current.maxLength) {
      document.getElementById(nextFieldID).focus();
  }
}


ExportVehicleTracking = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId) {
 
  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId + ',' + SBNo + ',' + SBDate);

 
  $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_Exp_VehicleTracking",
      data: JSON.stringify({ OperationType: OperationType, AirlinePrefix: "", AwbNumber: "", HawbNumber: HawbNumber, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId, ShippingBillNo: SBNo, ShippingBillDate:SBDate}),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response, xhr, textStatus) {
          var obj = JSON.parse(response.d);
         console.log(response.d);
         console.log(obj);
          if (obj.length > 0) {
            if (obj[0].ERRORMSG == undefined) {
              $("#tblVehicleInfo").show();
              $("#accordion").show();   
              FillControl(response);
             // fillDriverImage(response);
              $("body").mLoading('hide');
              // $.alert('Details saved successfully');
            }else{
            
              $("#tblVehicleInfo").hide();
              errmsg = "Alert</br>";
              errmsgcont = obj[0].ERRORMSG;
              $.alert(errmsg,errmsgcont);
              return;

            }
          } else {
              $("body").mLoading('hide');
              $("#tblAirWayBillInfo").hide();
              $("#tblVehicleInfo").hide();  
              errmsg = "Wrong SB number</br>";
              errmsgcont = "Please enter a valid SB number</br>";
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

// function FillControl(response) {
//   var obj = JSON.parse(response.d);
//   console.log("FillControl obj",obj)
//   $("#spnEVTNo").text(obj[0].EVTNumber);
//   $("#spnVehicleNo").text(obj[0].VehicleNumber);
//   $("#spnLineArea").text(obj[0].LineArea);
//   $("#spnGateIn").text(obj[0].GateIn);
//   $("#spnDockIn").text(obj[0].DockIn);
//   $("#spnDockOut").text(obj[0].DockOut);
//   $("#spnGateOut").text(obj[0].GateOut);
//   $("#parkingAreaExit").text(obj[0].ParkingAreaExit);
  
// }



FillControl = function (response) {
  var obj = JSON.parse(response.d);
  
  var count = 0;
  var row = "";
  if (obj.length > 0) {
      $.each(obj, function (i, d) {
        
        row += "<table style='width: 100%;'>";
        row += "<tbody >";
        row += "<tr style='background-color: #fff;'>";
        row += "<td style='padding:10px;'>";
        row += "<span id='spnEVTNo'>" + d.EVTNumber + "</span>";
        row += "</td>";
        row += "<td style='text-align: center;'>";
        row += "<span id='spnVehicleNo'>" + d.VehicleNumber + "</span>";
        row += "</td>";
        row += "<td>";
        row += "<a role='button' class='btn-arrow' data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "' aria-expanded='true'>";
        row += "<i class='more-less zmdi zmdi-chevron-down' id='down-arrow' style='color:#00AAA2 !important;font-size: 30px !important;' ></i>";
        row += "</a>";
        row += "</td>";
        row += "</tr>";
        row += "</tbody>";
        row += "</table>";
        row += "<div id='collapse" + i + "' class='panel-collapse collapse' role='tabpanel' >";
        row += "<table style='width: 100%;'>";
        row += "<tbody id='tblVehicleDetails'>";
        row += "<tr style='background-color: #fff;'>";
        row += "<td style='padding: 10px;'><b>Parking Area</b>";
        row += "</td>";
        row += "<td colspan='2' >";
        row += "<span id='spnVehicleNo'>" + d.ParkingAreaExit + "</span>";
        row += "</td>";
        row += "</tr>";
        row += "<tr style='background-color: #fff;'>";
        row += "<td style='padding: 10px;'><b>Dock-In</b>";
        row += "</td>";
        row += "<td colspan='2'>";
        row += "<span id='spnVehicleNo'>" + d.DockIn + "</span>";
        row += "</td>";
        row += "</tr>";
        row += "<tr style='background-color: #fff;'>";
        row += "<td style='padding: 10px;'><b>Dock-Out</b>";
        row += "</td>";
        row += "<td colspan='2'>";
        row += "<span id='spnVehicleNo'>" + d.DockOut + "</span>";
        row += "</td>";
        row += "</tr>";
        row += "</tbody>";
        row += "</table>";
        row += "</div>";
      count++;
  });
      $("#tblVehicleDetails").append(row);
      $("body").mLoading('hide');
  } else {
      $("body").mLoading('hide');
      $("#tblVehicleDetails").html('There are no active updates available').css('color', '#f7347a');
  }
}
$("#tblVehicleDetails").empty();
function clearInputs(){
  $("#txtShippingBill").val(''); 
  $("#spnFlightDt").val('');
  $("#tblVehicleInfo").hide();  
  $("#txtShippingBill").focus(); 
  $("#accordion").hide();   

}