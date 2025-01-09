var LocationName = localStorage.getItem('LocationName');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');

var AwbNumber = localStorage.getItem('AWBNumber');
var HawbNumber = localStorage.getItem('hawbNo');
var GPnumber = localStorage.getItem('GPNumber');

var OfficerName = localStorage.getItem('OfficerName');
var Designation = localStorage.getItem('Designation');

var errmsg = "";
$(function () {
  ImportGetDetails();
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
    window.location.href = "IMP_ApproveDelivery.html";
  }


ImportGetDetails = function () {

    if(GPnumber != ""){
        OperationType = "2";
    }else{
        OperationType = "1";
    }
  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_Get_GatePassDetails",
      data: JSON.stringify({ OperationType: OperationType, MAWBNumber: AwbNumber, HAWBNumber: HawbNumber, GatePassNo: GPnumber }),
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
             
                
                FillControl(response) 
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
 
 
  $("#MawbNo").text(obj[0].MAWBNumber.substring(0, 3) + " " + obj[0].MAWBNumber.substring(3, obj[0].MAWBNumber.length));  
  $("#HawbNo").text(obj[0].HAWBNumber == null ? "" : obj[0].HAWBNumber);
  $("#GPno").text(obj[0].GATEPASSNO);
  GPnumber = obj[0].GATEPASSNO;
  $("#spnPieces").text(obj[0].NoP + " / " + obj[0].Weight);
  $("#spnBoE").text(obj[0].BoENumber + " / " + obj[0].BoEDate);
  $("#spnConsignee").text(obj[0].Consignee);

  $("#spnContents").text(obj[0].Contents);
  $("#OoCNo").text(obj[0].OoCNumber);
  $("#CHANo").text(obj[0].CHANO);
  $("#CHADet").text(obj[0].CHADetail);
  $("#cardexNo").text(obj[0].CardexNO);

}
function clearInputs(){
  $("#txtFlightPrefix").val(''); 
  $("#txtFlightNo").val('');
  var HawbNo ='<option value="">Select</option>';
  $("#ddlHAWBNo").html(HawbNo);
  $("#tblAirWayBillInfo").hide();
  $("#tblAirWayBillInfo1").hide();
  $("#txtFlightPrefix").focus(); 

}


ApproveDelivery = function () {

//console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
$.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_Get_GPCntByCustomsOfficer",
    data: JSON.stringify({ OperationType: "2", CustomsOfficerName: OfficerName, CustomsOfficerDesignation: Designation, GatePassNo: GPnumber }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
       console.log(response.d);
       console.log(obj);
       $("body").mLoading('hide');
        if (obj.length > 0) {
          if (obj[0].MSG == undefined) {
             
              console.log(response);
           
              $("body").mLoading('hide');
              // $.alert('Details saved successfully');
            }else{
               
              errmsg = "Alert</br>";
              errmsgcont = obj[0].MSG;
              $.alert(errmsg,errmsgcont);
           
  
            }
            setTimeout(function () {
              window.location.href = "CustomOfficerDashboard.html";
          }, 3000);
        
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