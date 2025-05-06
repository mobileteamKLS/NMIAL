var LocationName = localStorage.getItem('LocationName');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');
var AirlinePrefix = localStorage.getItem('prefix');
var AwbNumber = localStorage.getItem('awbNo');
var HawbNumber = "";
var IGMNo = localStorage.getItem('IGMNo');
var IGMYear = localStorage.getItem('IGMYear');
var IGMDate = localStorage.getItem('IGMDate');
var errmsg = "";

$(function () {
  $("#txtMAWBNo").text(AirlinePrefix +"-"+AwbNumber); 
  //GetPuspupNotificationList(CreatedByUserId, OrganizationBranchId, OrganizationId);
  ImportDeliveryOrder('1', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);
  localStorage.removeItem('fromMenus')
  setTimeout(function () {
      window.location.href = 'loginScreen2.html'
  }, 1200000);

  // $("#tblAirWayBillInfo").hide();
  // $("#submit").hide();
  // $("#revoke").hide();

  $("#IgmDt").datepicker({
    showOn: 'button',
    buttonImageOnly: true,
    buttonImage: 'img/Calendar_28x32.png'
});

$(".ui-datepicker-trigger").mouseover(function() {
$(this).css('cursor', 'pointer');
});


});

var dd_mm_yyyy;
$("#IgmDt").change( function(){
    changedDate = $(this).val(); //in yyyy-mm-dd format obtained from datepicker
   var date = new Date(changedDate);

   
   var str = $.datepicker.formatDate( "MM", date)

   dd_mm_yyyy = twoDigitDate(date)+" "+str.substring(0,3)+" "+date.getFullYear(); // in dd-mm-yyyy format
   
   $('#IgmDt').val(dd_mm_yyyy);
  

   var d = new Date();      
   function twoDigitDate(d){
      return ((d.getDate()).toString().length == 1) ? "0"+(d.getDate()).toString() : (d.getDate()).toString();
    };
        
    function twoDigitMonth(d){
     	return ((d.getMonth()+1).toString().length == 1) ? "0"+(d.getMonth()+1).toString() : (d.getMonth()+1).toString();
    };    
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
    window.location.href = "IMP_DODataList.html";
  }

  function exitRevokeModal() {
    revokemodal.style.display = "none";
    confirmmodal.style.display = "none";

  }
  
  function searchAWBNumber() {
    
     if ($("#IgmNo").val() == '') {
      // $("#txtFlightPrefix").css("border", "solid thin red");
      // $("#txtFlightNo").css("border", "solid thin #ccc");
      $("#tblAirWayBillInfo").hide();
      errmsg = "Alert</br>";
      errmsgcont = "Please enter IGM number</br>";
      $.alert(errmsg,errmsgcont);
      return;
  }
  else if ($("#IgmDt").val() == '') {
    // $("#txtFlightPrefix").css("border", "solid thin red");
    // $("#txtFlightNo").css("border", "solid thin #ccc");
    $("#tblAirWayBillInfo").hide();
    errmsg = "Alert</br>";
    errmsgcont = "Please enter IGM Date</br>";
    $.alert(errmsg,errmsgcont);
    return;
}else if ($("#txtFlightPrefix").val() == '' || $("#txtFlightNo").val() == '' ) {
  // $("#txtFlightPrefix").css("border", "solid thin red");
  // $("#txtFlightNo").css("border", "solid thin #ccc");
  $("#tblAirWayBillInfo").hide();
  errmsg = "No MAWB Number</br>";
  errmsgcont = "Please enter a valid MAWB number</br>";
  $.alert(errmsg,errmsgcont);
  return;
}
      else {
        AirlinePrefix = $("#txtFlightPrefix").val();
        AwbNumber = $("#txtFlightNo").val();
        HawbNumber = '';
        // $('body').mLoading({
        //     text: "Please Wait..",
        // });
        ImportDeliveryOrder('1', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);
    }
}

function MovetoNext(current, nextFieldID) {
  if (current.value.length >= current.maxLength) {
      document.getElementById(nextFieldID).focus();
  }
}


ImportDeliveryOrder = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId) {
  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
 

  $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_Imp_DeliveryOrderDetails",
      data: JSON.stringify({ OperationType: "1", IGMNo :IGMNo, IGMYear :IGMYear, AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId, DeliveryNo: "",DeliveryDate: IGMDate }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response, xhr, textStatus) {
          var obj = JSON.parse(response.d);
         console.log(response.d);
         console.log(obj);
          if (obj.length > 0) {
            if (obj[0].ERRORMSG == undefined) {
              $("#tblAirWayBillInfo").show();
              FillControl(response);
             // fillDriverImage(response);
              $("body").mLoading('hide');
              // $.alert('Details saved successfully');
              }else{
                $("#tblAirWayBillInfo").hide();
                $("#submit").hide();
                $("#revoke").hide();
                  errmsg = "Alert</br>";
                errmsgcont = obj[0].ERRORMSG;
                $.alert(errmsg,errmsgcont);
                setTimeout(function () {
                  window.location.href = 'IMP_DODataList.html'
                }, 2500);
              }

          } else {
              $("body").mLoading('hide');
              $("#tblAirWayBillInfo").hide();
              errmsg = "Wrong MAWB number</br>";
              errmsgcont = "Please enter a valid MAWB number</br>";
           //   $.alert(errmsg,errmsgcont);
              return;
          }

      },
      error: function (xhr, textStatus, errorThrown) {
          $("body").mLoading('hide');
          alert('Server not responding...');
      }
  });
}

function DeliveryOrderSubmit(){
  submitDO('2', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);

}
function DeliveryOrderRevoke(){

  revokemodal.style.display = "block";
}



submitDO = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId) {

  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_Imp_DeliveryOrderDetails",
    data: JSON.stringify({ OperationType: OperationType,  IGMNo :IGMNo ,IGMYear :IGMYear , AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId, DeliveryNo: "",DeliveryDate: "" }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
      var obj = JSON.parse(response.d);
      console.log(response.d);
      console.log(obj);
      clearInputs();  
      $("#submit").hide();
      $("#revoke").hide();
      errmsg = "Approve DO</br>";
      errmsgcont = "DO approved Successfully for " + AirlinePrefix +" - " + AwbNumber + "</br>";
      $.alert(errmsg,errmsgcont);
      setTimeout(function () {
        window.location.href = 'IMP_DODataList.html'
      }, 3000);
    },
    error: function (xhr, textStatus, errorThrown) {
      $("body").mLoading('hide');
      alert('Server not responding...');
    }
  });
}

revokeDO = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId) {

  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_Imp_DeliveryOrderDetails",
    data: JSON.stringify({ OperationType: OperationType,  IGMNo :IGMNo ,IGMYear :IGMYear, AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId,  DeliveryNo: "",DeliveryDate: ""}),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
      var obj = JSON.parse(response.d);
      console.log(response.d);
      console.log(obj);
      clearInputs();  
      $("#submit").hide();
      $("#revoke").hide();
      $("#txtFlightPrefix").val(''); 
      $("#txtFlightNo").val('');
      $("#tblAirWayBillInfo").hide();
      $("#IgmNo").val(''); 
      $("#IgmDt").val(''); 
      setTimeout(function () {
        window.location.href = 'IMP_DODataList.html'
      }, 3000);
    },
  
    error: function (xhr, textStatus, errorThrown) {
      $("body").mLoading('hide');
      alert('Server not responding...');
    }
  });
}
function deleteDeliveryorder() {
  revokemodal.style.display = "none";
  confirmmodal.style.display = "block";
  revokeDO('3', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);
}


function FillControl(response) {
  var obj = JSON.parse(response.d);
  console.log("FillControl obj",obj)
  $("#spnFlightNo").text(obj[0].FlightNo);
  $("#spnFlightdate").text(obj[0].FlightDate);
  $("#spnAgentname").text(obj[0].AgentName);
  $("#spnPieces").text(obj[0].NoofPcs);
  $("#spnGrWt").text((obj[0].GrossWt).toFixed(3));
  $("#spnCommo").text(obj[0].Commodity);
  
  isDOSubmit = obj[0].DOStatus;
  isCDOStatus = obj[0].CDOStatus;
  
  if(isCDOStatus == true){
     
    $("#revoke").show().attr('disabled', 'disabled').css({"border": "solid 1px grey","background-color": "lightgrey","color": "grey"});
    $("#submit").show().attr('disabled', 'disabled').css({"border": "solid 1px grey","background-color": "lightgrey","color": "grey"});
}
else{
  $("#revoke").show().removeAttr('disabled').css({"border": "solid 1px grey","background-color": "#00AAA2","color": "white"});
  if(isDOSubmit == '1'){
   
     $("#revoke").show().removeAttr('disabled').css({"border": "solid 1px grey","background-color": "#00AAA2","color": "white"});
     $("#submit").show().attr('disabled', 'disabled').css({"border": "solid 1px grey","background-color": "lightgrey","color": "grey"});
}
else{
    
  $("#submit").show().removeAttr('disabled').css({"border": "solid 1px grey","background-color": "#00AAA2","color": "white"});
  $("#revoke").show().attr('disabled', 'disabled').css({"border": "solid 1px grey","background-color": "lightgrey","color": "grey"});
}
}
  

}
// AirlinePrefix: "176"
// DOStatus: 1
// Destination: "BLR"
// FlightNo: "SQ8867"
// GrossWt: 2500
// IGMNo: 1000441
// IGMYear: 2021
// Mawbnumber: "27783711"
// NoofPcs: 10
// Origin: "SIN"
function clearInputs(){
  $("#txtFlightPrefix").val(''); 
  $("#txtFlightNo").val('');
  $("#tblAirWayBillInfo").hide();
  $("#IgmNo").val(''); 
  $("#IgmDt").val(''); 

  $("#IgmNo").focus(); 
  $("#submit").hide();
  $("#revoke").hide();
  
}



openNotification = function(){
  window.location.href = "notificationList.html";
}