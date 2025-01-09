
var LocationName = localStorage.getItem('LocationName');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');
var MAWBNo = localStorage.getItem('mawbNo');
var AirlinePrefix = localStorage.getItem('Prefix');
var AwbNumber = localStorage.getItem('AWBNumber');
var MenuTitle= localStorage.getItem('ImportsMenu');

var errmsg = "";
$(function () {
  localStorage.removeItem('fromMenus')
  setTimeout(function () {
      window.location.href = 'loginScreen2.html'
  }, 1200000);

  console.log(MAWBNo);
  
  $("#txtMawbNo").val(MAWBNo); 
  console.log(MenuTitle)
  $("#MenuHeading").text(MenuTitle);
  
  var HawbNumber = "";
  
 
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
    window.location.href = "dashboard-export.html";
  }
  function searchAWBNumber() {
    AirlinePrefix = $("#txtFlightPrefix").val();
    AwbNumber = $("#txtFlightNo").val();
    $("#listingDetailsRow").empty();
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
        var mawbNo = AirlinePrefix.concat("-", AwbNumber);
        localStorage.setItem('mawbNo',mawbNo);
        localStorage.setItem('Prefix',AirlinePrefix);
        localStorage.setItem('AWBNumber',AwbNumber);
        ImportListingPage('1', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);
    }
}

function MovetoNext(current, nextFieldID) {
  if (current.value.length >= current.maxLength) {
      document.getElementById(nextFieldID).focus();
  }
}

function clearInputs() {
  $("#txtFlightPrefix").val('');
   $("#txtFlightNo").val('');
}



ImportListingPage = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId) {
  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_Imp_ListingPage",
      data: JSON.stringify({ OperationType: OperationType, AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response, xhr, textStatus) {
          var obj = JSON.parse(response.d);
         console.log(response.d);
         console.log(obj);
          if (obj.length > 0) {
            if (obj[0].ERRORMSG == undefined) {
              $("#tblAirWayBillInfo").fadeIn('slow');
              $("#tblAirWayBillInfo1").show();
              FillControl(response);
             // fillDriverImage(response);
              $("body").mLoading('hide');
              // $.alert('Details saved successfully'); }else{
               
              }else{
               
                errmsg = "Alert</br>";
                errmsgcont = obj[0].ERRORMSG;
                $.alert(errmsg,errmsgcont);
                return;
  
              }
           
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

FillControl = function (response) {
  console.log(response)
  var obj = JSON.parse(response.d);
  
  var count = 0;
  var row = "";
  if (obj.length > 0) {

                $.each(obj, function (i, d) {
              
                  row +="<div class='panel-group' id='accordion' role='tablist' aria-multiselectable='true'>";
                  
                  if(d.HAWBNumber != null)
                  {
                    row +="<div class= 'div-wrapper'>";
                  row +="<div class='panel-heading' role='tab' id='heading" + i + "' style='font-size: 17px;padding: 5px 10px 0px 10px;display: inline-flex;width: 100%;' data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "' aria-expanded='true' >";
                  row +="<label style='font-weight: bold;margin-right: 5px;'>IGM No.</label><span id='IgmNo' style='margin-right: 20px'>" + d.IGMNo + "</span>";
                  row +="<label style='font-weight: bold;margin-right: 5px;'>IGM Year.</label><span id='IgmYear' >" + d.IGMYear + "</span>";
                     
                    
                  row +="<button class='btn-arrow' data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "' aria-expanded='true' aria-controls='collapse" + i + "' style='border: none;background-color: white;'>";
                  row +="<i class='more-less zmdi zmdi-chevron-down' id='down-arrow' style='float: none !important;margin-right: 0px !important;font-size: 30px; color:#00AAA2;background-color: white;margin-left: 15px;'></i>";
                  row +="</button>";
                  row +="</div>";
                  row +="<div id='collapse" + i + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading" + i + "'>";
                  row +="<div class= 'div-wrapper1'>";
                  var _igmNo = '"' + d.IGMNo + '"';
                  var _igmYear = '"' + d.IGMYear + '"';
                  var _hawbNo = '"' + d.HAWBNumber + '"';
                  row +="<div onclick='goToHawbData(" + _igmNo + "," + _igmYear + "," + _hawbNo + ");'>";
                  row +="<h5 class='primary-heading" + i + "' style='color: #fff;padding: 15px;display: inline-flex;' id= 'hawbNo'>" + d.HAWBNumber + "</h5>";
                  row +="<button id='' class='btn-arrow' style='margin-top: 13px;'><i class='zmdi zmdi-chevron-right' style='color: white;font-size: 29px;'></i></button>";
                  row +="</div>";
                  row +="</div>";
                  row +="</div>";
                  }else{
                  var _IGMNo = '"' + d.IGMNo + '"';
                  var _IGMYear = '"' + d.IGMYear + '"';
                    row +="<div class= 'div-wrapper' onclick='goToDirectShip(" + _IGMNo + "," + _IGMYear + ");'>";
                    row +="<div class='panel-heading' role='tab' id='heading" + i + "' style='font-size: 17px;padding: 5px 10px 0px 10px;display: inline-flex;width: 100%;' data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "' aria-expanded='true' >";
                    row +="<label style='font-weight: bold;margin-right: 10px;'>IGM No.</label><span id='IgmNo' style='margin-right: 20px'>" + d.IGMNo + "</span>";
                    row +="<label style='font-weight: bold;margin-right: 10px;'>IGM Year.</label><span id='IgmYear' >" + d.IGMYear + "</span>";
                       
                      
                    row +="<button class='btn-arrow' data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "' aria-expanded='true' aria-controls='collapse" + i + "' style='border: none;background-color: white;'>";
                    row +="<i class='more-less zmdi zmdi-chevron-down' id='down-arrow' style='float: none !important;margin-right: 0px !important;font-size: 30px; color:#00AAA2;background-color: white;margin-left: 15px;'></i>";
                    row +="</button>";
                    row +="</div>";
                  }
                    
                
                  row +="</div>";
                  
                  row +="</div>";
                count++;
                    
            });
          
      $("#listingDetailsRow").append(row);
      $("body").mLoading('hide');
  } else {
      $("body").mLoading('hide');
      $("#listingDetailsRow").html('There are no Vehicle details available').css('color', '#f7347a');
  }

}
// FillControl = function (response) {
//   console.log(response)
//   var obj = JSON.parse(response.d);
  
//   var count = 0;
//   var row = "";
//   if (obj.length > 0) {

//                 $.each(obj, function (i, d) {
              
//                   row +="<div class='panel-group' id='accordion' role='tablist' aria-multiselectable='true'>";
                  
                 
                       
//                   if(d.HAWBNumber != null)
//                   {
//                     row +="<div class= 'div-wrapper'>";
//                   row +="<div class='panel-heading' role='tab' id='heading1' style='font-size: 17px;padding: 5px 10px 0px 10px;display: inline-flex;width: 100%;' data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "' aria-expanded='true' >";
//                   row +="<label style='font-weight: bold;margin-right: 10px;'>IGM No.</label><span id='IgmNo' style='margin-right: 20px'>" + d.IGMNo + "</span>";
//                   row +="<label style='font-weight: bold;margin-right: 10px;'>IGM Year.</label><span id='IgmYear' >" + d.IGMYear + "</span>";
                     
                    
//                   row +="<button data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "' aria-expanded='true' aria-controls='collapse" + i + "' style='border: none;background-color: white;'>";
//                   row +="<i class='more-less zmdi zmdi-chevron-down' id='down-arrow' style='float: none !important;margin-right: 0px !important;font-size: 30px; color:#00AAA2;background-color: white;margin-left: 20px;'></i>";
//                   row +="</button>";
//                   row +="</div>";
//                   row +="<div id='collapse" + i + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading1'>";
//                   row +="<div class= 'div-wrapper1'>";
//                   var _igmNo = '"' + d.IGMNo + '"';
//                   var _igmYear = '"' + d.IGMYear + '"';
//                   var _hawbNo = '"' + d.HAWBNumber + '"';
//                   row +="<div onclick='goToHawbData(" + _igmNo + "," + _igmYear + "," + _hawbNo + ");'>";
//                   row +="<h5 class='primary-heading1' style='color: #fff;padding: 15px;display: inline-flex;' id= 'hawbNo'>" + d.HAWBNumber + "</h5>";
//                   row +="<button id='' class='btn-arrow' style='margin-top: 13px;'><i class='zmdi zmdi-chevron-right' style='color: white;font-size: 26px;'></i></button>";
//                   row +="</div>";
//                   row +="</div>";
//                   row +="</div>";
//                   }else{
//                     var _IGMNo = '"' + d.IGMNo + '"';
//                     var _IGMYear = '"' + d.IGMYear + '"';
//                     row +="<div class= 'div-wrapper' onclick='goToDirectShip(" + _IGMNo + "," + _IGMYear + ");'>";
//                     row +="<div class='panel-heading' role='tab' id='heading1' style='font-size: 17px;padding: 5px 10px 0px 10px;display: inline-flex;width: 100%;' data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "' aria-expanded='true' >";
//                     row +="<label style='font-weight: bold;margin-right: 10px;'>IGM No.</label><span id='IgmNo' style='margin-right: 20px'>" + d.IGMNo + "</span>";
//                     row +="<label style='font-weight: bold;margin-right: 10px;'>IGM Year.</label><span id='IgmYear' >" + d.IGMYear + "</span>";
                       
                      
//                     row +="<button data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "' aria-expanded='true' aria-controls='collapse" + i + "' style='border: none;background-color: white;'>";
//                     row +="<i class='more-less zmdi zmdi-chevron-down' id='down-arrow' style='float: none !important;margin-right: 0px !important;font-size: 30px; color:#00AAA2;background-color: white;margin-left: 15px;'></i>";
//                     row +="</button>";
//                     row +="</div>";
//                   }
                    
                
//                   row +="</div>";
                  
//                   row +="</div>";
//                 count++;
                    
//             });
          
//       $("#listingDetailsRow").append(row);
//       $("#listingHeading").show();
      
//       $("body").mLoading('hide');
//   } else {
//       $("body").mLoading('hide');
//       $("#listingDetailsRow").html('There are no details available').css('color', '#f7347a');
//   }

// }

goToDirectShip = function (igmNo,igmYear) {
  console.log(igmNo)
  console.log(igmYear)
  localStorage.setItem('igmNo',igmNo);
  localStorage.setItem('igmYear',igmYear);
  localStorage.setItem('hawbNo',"");

  window.location.href = "IMP_ShipmentDetailsFromMenu.html";
}

goToHawbData = function (igmNo,igmYear,hawbNo){
  console.log(igmNo)
  console.log(igmYear)
  console.log(hawbNo)
  localStorage.setItem('igmNo',igmNo);
  localStorage.setItem('igmYear',igmYear);
  localStorage.setItem('hawbNo',hawbNo);
  window.location.href = "IMP_ShipmentDetailsFromMenu.html";
}
function clearInputs(){
  $("#txtFlightPrefix").val(''); 
  $("#txtFlightNo").val('');
  $("#listingDetailsRow").empty();
  $("#listingHeading").hide();
  $("#txtFlightPrefix").focus(); 
}



