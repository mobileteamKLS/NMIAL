
var LocationName = localStorage.getItem('LocationName');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');
var MAWBNo = localStorage.getItem('mawbNo');
var AirlinePrefix = localStorage.getItem('Prefix');
var AwbNumber = localStorage.getItem('AWBNumber');
var TSPSetting;

var errmsg = "";
$(function () {
  localStorage.removeItem('fromMenus')
  setTimeout(function () {
      window.location.href = 'loginScreen2.html'
  }, 1200000);

  console.log(MAWBNo);
  
  $("#txtMawbNo").text(MAWBNo); 
  var HawbNumber = "";
  
  ImportListingPage('1', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);
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




ImportListingPage = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId) {
  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_Exp_ListingPage",
      data: JSON.stringify({ OperationType: OperationType, AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId, AWBID:0 , SBID:0}),
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
              TSPSetting = obj[0].TSPSetting;
              localStorage.setItem('TSPSetting',TSPSetting);
              MAWBID = obj[0].MAWBID;
              localStorage.setItem('MAWBID',MAWBID);

              if(obj[0].HAWBNumber){
                $("#listHeading").text("HAWB and SB List"); 
              }else{ 
                $("#listHeading").text("MAWB and SB List"); 
              }

              if(TSPSetting == ""){
              FillControl(response);
            }
              else{
                localStorage.setItem('hawbNo',"");
                localStorage.setItem('SBNo',obj[0].SBNumber);
                localStorage.setItem('awbID',obj[0].MasterId);
                localStorage.setItem('sbID',obj[0].SBID);
                window.location.href = "EXP_ShipmentDetails.html";
              }
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
  var _HAWBNumber ="";
  var index;
  var count = 0;
  var row = "";
  var arr =[];
  var _awbid;
  if (obj.length > 0) {
debugger
    //row +="<div class='panel-group' id='accordion' role='tablist' aria-multiselectable='true'>";
                $.each(obj, function (i, d) {
              
                  if(d.HAWBNumber != null)
                  {
                 
                    var _awbid = '' + d.AWBID + '';
                    // sbid += d.SBID;
                    arr.push(_awbid)
                  

                    // localStorage.setItem('sbID',sbid);
                        if(_HAWBNumber == d.HAWBNumber){

                          row +="<div id='collapse" + index + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading" + index + "'>";
                          row +="<div class= 'div-wrapper1' style='margin:0px 10px'>";
                           _HAWBNumber = '"' + _HAWBNumber + '"';
                          // index = i;
                          var _SBNumber = '"' + d.SBNumber + '"';
                          var _AWBID = '"' + d.AWBID + '"';
                          var _SBID = '"' + d.SBID + '"';
                          row +="<div onclick='goToHawbData(" + _HAWBNumber + "," + _SBNumber + ", " + _AWBID + ", " + _SBID + ");'>";
                          row +="<h5 class='primary-heading" + index + "' style='color: #fff;padding: 15px;display: inline-flex;' id= 'hawbNo'>" + d.SBNumber + "</h5>";
                          row +="<button id='' class='btn-arrow' style='margin-top: 13px;'><i class='zmdi zmdi-chevron-right' style='color: white;font-size: 29px;'></i></button>";
                          row +="</div>";
                          row +="</div>";
                          row +="</div>";
                        }else{
                          row +="<div class= 'div-wrapper'>";
                          row +="<div class='panel-heading' role='tab' id='heading" + i + "' style='font-size: 17px;padding: 5px 10px 0px 10px;width: 100%;' data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "' aria-expanded='true' >";
                          row +="<label style='font-weight: bold;margin-right: 10px;'>HAWB No.</label><span id='IgmNo' style='margin-right: 20px'>" + d.HAWBNumber + "</span>";
      
                          row +="<button class='btn-arrow' data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "' aria-expanded='true' aria-controls='collapse" + i + "' style='border: none;background-color: white;'>";
                          row +="<i class='more-less zmdi zmdi-chevron-down' id='down-arrow' style='float: none !important;margin-right: 0px !important;font-size: 30px; color:#00AAA2;background-color: white;margin-left: 15px;'></i>";
                          row +="</button>";
                          row +="</div>";
                          row +="<div id='collapse" + i + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading" + i + "'>";
                          row +="<div class= 'div-wrapper1'>";
                          _HAWBNumber = d.HAWBNumber;
                          index = i;
                          var HawbNumber = '"' + d.HAWBNumber + '"';
                          var _SBNumber = '"' + d.SBNumber + '"';
                          var _AWBID = '"' + d.AWBID + '"';
                          var _SBID = '"' + d.SBID + '"';
                          row +="<div onclick='goToHawbData(" + HawbNumber + "," + _SBNumber + ", " + _AWBID + ", " + _SBID + ");'>";
                          row +="<h5 class='primary-heading" + i + "' style='color: #fff;padding: 15px;display: inline-flex;' id= 'hawbNo'>" + d.SBNumber + "</h5>";
                          row +="<button id='' class='btn-arrow' style='margin-top: 13px;'><i class='zmdi zmdi-chevron-right' style='color: white;font-size: 29px;'></i></button>";
                          row +="</div>";
                          row +="</div>";
                          row +="</div>";
                        }
     
                  }else{
                  var _SBNumber = '"' + d.SBNumber + '"';
                  var _AWBID = '"' + d.AWBID + '"';
                  var _SBID = '"' + d.SBID + '"';
                    row +="<div class= 'div-wrapper' >";
                    row +="<div class='panel-heading' role='tab' id='heading" + i + "' style='font-size: 17px;padding: 5px 10px 0px 10px;width: 100%;' data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "' aria-expanded='true' >";
                    row +="<label style='font-weight: bold;margin-right: 10px;'>MAWB No.</label><span id='IgmNo' style='margin-right: 20px'>" + d.MAWBNumber + "</span>";
                   
                    row +="<button class='btn-arrow' data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "' aria-expanded='true' aria-controls='collapse" + i + "' style='border: none;background-color: white;'>";
                    row +="<i class='more-less zmdi zmdi-chevron-down' id='down-arrow' style='float: none !important;margin-right: 0px !important;font-size: 30px; color:#00AAA2;background-color: white;margin-left: 15px;'></i>";
                    row +="</button>";
                    row +="</div>";
                    row +="<div id='collapse" + i + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading" + i + "'>";
                    row +="<div class= 'div-wrapper1'>";
                    var _SBNumber = '"' + d.SBNumber + '"';
                    var _AWBID = '"' + d.AWBID + '"';
                    var _SBID = '"' + d.SBID + '"';
                    row +="<div onclick='goToDirectShip(" + _SBNumber + "," + _AWBID + "," + _SBID + ");'>";
                    row +="<h5 class='primary-heading" + i + "' style='color: #fff;padding: 15px;display: inline-flex;' id= 'hawbNo'>" + d.SBNumber + "</h5>";
                    row +="<button id='' class='btn-arrow' style='margin-top: 13px;'><i class='zmdi zmdi-chevron-right' style='color: white;font-size: 29px;'></i></button>";
                    row +="</div>";
                    row +="</div>";
                    row +="</div>";
                  }
                    
                
                  row +="</div>";
                  
                
                count++;
               
            });
            //row +="</div>";
      $("#listingDetailsRow").append(row);
      $("body").mLoading('hide');
  } else {
      $("body").mLoading('hide');
      $("#listingDetailsRow").html('There are no Vehicle details available').css('color', '#f7347a');
  }

  console.log("AWBID Array =",arr);
  localStorage.setItem('ArrayOfAwbId',arr.join(','));
}

goToDirectShip = function (SBNo,id,sbid) {
  console.log(SBNo);
  localStorage.setItem('hawbNo',"");
  localStorage.setItem('SBNo',SBNo);
  localStorage.setItem('awbID',id);
  localStorage.setItem('sbID',sbid);
  window.location.href = "EXP_ShipmentDetails.html";
}

goToHawbData = function (hawbNo,SBNo,id,sbid){
  console.log(hawbNo)
  console.log(SBNo)
  localStorage.setItem('hawbNo',hawbNo);
  localStorage.setItem('SBNo',SBNo);
  localStorage.setItem('awbID',id);
  localStorage.setItem('sbID',sbid);
  window.location.href = "EXP_ShipmentDetails.html";
}
function clearInputs(){
  $("#txtFlightPrefix").val(''); 
  $("#txtFlightNo").val('');
  $("#tblVehicleInfo").hide();
  $("#tblVehicleInfo1").hide();

  $("#txtFlightPrefix").focus(); 
}


// if(TSPSetting =="M "){
//   sbid = 0;
// localStorage.setItem('awbID',id);
// localStorage.setItem('sbID',sbid);
// }else{
// localStorage.setItem('awbID',id);
// localStorage.setItem('sbID',sbid);
// }

