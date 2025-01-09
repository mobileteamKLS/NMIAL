var LocationName = localStorage.getItem('LocationName');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');
var AirlinePrefix = localStorage.getItem('prefix');
var AwbNumber = localStorage.getItem('awbNo');
var HawbNumber = "";
var DOCStatus;
//var fromExport = localStorage.getItem('fromExport');
var errmsg = "";
var isCOSubmit = '';

$(function () {
  $("#txtMAWBNo").text(AirlinePrefix +"-"+AwbNumber); 
  //GetPuspupNotificationList(CreatedByUserId, OrganizationBranchId, OrganizationId);
  ExportCartingOrder('1', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);
  // $("#submit").hide();
  // $("#revoke").hide();

  localStorage.removeItem('fromMenus')
  setTimeout(function () {
    window.location.href = 'loginScreen2.html'
  }, 1200000);

  // $("#tblAirWayBillInfo").hide();

      $("#spnFlightDt").datepicker({
        showOn: 'button',
        buttonImageOnly: true,
        buttonImage: 'img/Calendar_28x32.png'
    });

$(".ui-datepicker-trigger").mouseover(function() {
  $(this).css('cursor', 'pointer');
});

});

var dd_mm_yyyy;
$("#spnFlightDt").change( function(){

    changedDate = $(this).val(); //in yyyy-mm-dd format obtained from datepicker
   var date = new Date(changedDate);

  var str = $.datepicker.formatDate( "MM", date)

   dd_mm_yyyy = twoDigitDate(date)+" "+str.substring(0,3)+" "+date.getFullYear(); // in dd-mm-yyyy format
   $('#spnFlightDt').val(dd_mm_yyyy);
   //console.log($(this).val());
   //console.log("Date picker clicked");

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

function exitRevokeModal() {
  revokemodal.style.display = "none";
}

// $("#spnFlightDt").click(function () { // button click event
//   $( "#spnFlightDt" ).datepicker("show");
// });

function back() {
  localStorage.setItem('fromMenus','1')
  // modal.style.display = "block";
  window.location.href = "EXP_CODataList.html";
}
function searchAWBNumber() {
  if ($("#txtFlightPrefix").val() == '' || $("#txtFlightNo").val() == '') {
    // $("#txtFlightPrefix").css("border", "solid thin red");
    // $("#txtFlightNo").css("border", "solid thin #ccc");
    $("#tblAirWayBillInfo").hide();
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
    ExportCartingOrder('1', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);
  }
}

function MovetoNext(current, nextFieldID) {
  if (current.value.length >= current.maxLength) {
    document.getElementById(nextFieldID).focus();
  }
}


ExportCartingOrder = function (OperationType,AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId) {
  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_Exp_CartingOrderDetails",
    data: JSON.stringify({ OperationType: OperationType, AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId,  FlightNo :"",FlightDate :"",CARRIERCODE:"",FlightOffPoint:"",CartingOrderStatus:"",CartingOrderStatusComments:"" }),
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
      //  $("body").mLoading('hide');
        // $.alert('Details saved successfully');
        }else{
          $("#tblAirWayBillInfo").hide();
          $("#submit").hide();
          $("#revoke").hide();
            errmsg = "Alert</br>";
          errmsgcont = obj[0].ERRORMSG;
          $.alert(errmsg,errmsgcont);
          return;
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
function CartingOrderSubmit(){
  submitCO('2', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);

}
function CartingOrderRevoke(){

   if ($("#spnFlightNo").val() == '') {
    errmsg = "No Flight Number</br>";
    errmsgcont = "Please enter Flight Number.</br>";
    $.alert(errmsg,errmsgcont);
    return;
  }
  if($("#spnFlightDt").val() == ''){
    errmsg = "No Flight Date</br>";
    errmsgcont = "Please enter Flight Date.</br>";
    $.alert(errmsg,errmsgcont);
    return;
  }
  var FlightDate= $("#spnFlightDt").val();
  var currentDate = new Date(); 
  // (YYYY-MM-DD) 
  var selectDate = new Date(FlightDate); 
  if (selectDate.getTime() > currentDate.getTime() || (currentDate.setHours(0, 0, 0, 0) ==  
          selectDate.setHours(0, 0, 0, 0))) {
            console.log(selectDate)
      }else{
        errmsg = "Error</br>";
        errmsgcont = "Please enter date greater than current date.</br>";
        $.alert(errmsg,errmsgcont);
        return;  
      }
  revokemodal.style.display = "block";
}

function deleteCartingorder() {
   revokeCO('3', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);
}


submitCO = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId) {
  if ($("#spnFlightNo").val() == '') {
    errmsg = "No Flight Number</br>";
    errmsgcont = "Please enter Flight Number.</br>";
    $.alert(errmsg,errmsgcont);
    return;
  }
  if($("#spnFlightDt").val() == ''){
    errmsg = "No Flight Date</br>";
    errmsgcont = "Please enter Flight Date.</br>";
    $.alert(errmsg,errmsgcont);
    return;
  }
  
  var FlightNo= $("#spnFlightNo").val();
  
  var FlightDate= $("#spnFlightDt").val();
  
  var currentDate = new Date();
  var selectDate = new Date(FlightDate); 
  
      if (selectDate.getTime() > currentDate.getTime() || (currentDate.setHours(0, 0, 0, 0) ==  
          selectDate.setHours(0, 0, 0, 0))) {
            console.log(selectDate)
      }else{
        errmsg = "Error</br>";
        errmsgcont = "Please enter date greater than current date.</br>";
        $.alert(errmsg,errmsgcont);
        return;  
      }
  var CARRIERCODE= $("#spnCarrCd").val();
  var FlightOffPoint= $("#spnFlightOffPt").text(); 
  console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId + ',' +FlightNo + ',' + FlightDate + ',' + CARRIERCODE+ ',' + FlightOffPoint);
  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_Exp_CartingOrderDetails",
    data: JSON.stringify({ OperationType: OperationType, AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId,  FlightNo :FlightNo ,FlightDate :FlightDate ,CARRIERCODE:CARRIERCODE,FlightOffPoint:FlightOffPoint,CartingOrderStatus:"A",CartingOrderStatusComments:""}),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
      var obj = JSON.parse(response.d);
      console.log(response.d);
      clearInputs();  
      $("#submit").hide();
      $("#revoke").hide();
      errmsg = "Approve CO</br>";
      errmsgcont = "CO approved Successfully for " + AirlinePrefix +"-" + AwbNumber + "</br>";
      $.alert(errmsg,errmsgcont);
      setTimeout(function () {
        window.location.href = 'EXP_CODataList.html'
      }, 3000);
    },
    error: function (xhr, textStatus, errorThrown) {
      $("body").mLoading('hide');
      alert('Server not responding...');
    }
  });
}

revokeCO = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId) {
  if($("#txtFeedBack").val() == ""){
    $("#spnRemark").show();
    return;
  }
  var FlightNo= $("#spnFlightNo").val();
  var FlightDate= $("#spnFlightDt").val();

  var currentDate = new Date(); 
  // (YYYY-MM-DD) 
  var selectDate = new Date(FlightDate); 
  if (selectDate.getTime() > currentDate.getTime() || (currentDate.setHours(0, 0, 0, 0) ==  
          selectDate.setHours(0, 0, 0, 0))) {
            console.log(selectDate)
      }else{
        errmsg = "Error</br>";
        errmsgcont = "Please enter date greater than current date.</br>";
        $.alert(errmsg,errmsgcont);
        return;  
      }
  var CARRIERCODE= $("#spnCarrCd").val();
  var FlightOffPoint= $("#spnFlightOffPt").val(); 
  var remark = $("#txtFeedBack").val();

  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_Exp_CartingOrderDetails",
    data: JSON.stringify({ OperationType: OperationType, AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId,  FlightNo :FlightNo ,FlightDate :FlightDate ,CARRIERCODE:CARRIERCODE,FlightOffPoint:FlightOffPoint,CartingOrderStatus:"J",CartingOrderStatusComments:remark}),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
      var obj = JSON.parse(response.d);
      console.log(response.d);
      clearInputs();  
      $("#submit").hide();
      $("#revoke").hide();
      revokemodal.style.display = "none";
      errmsg = "Reject CO</br>";
      errmsgcont = "CO rejected for " + AirlinePrefix +"-" + AwbNumber + "</br>";
      $.alert(errmsg,errmsgcont);
      setTimeout(function () {
        window.location.href = 'EXP_CODataList.html'
      }, 3000);
    },
    error: function (xhr, textStatus, errorThrown) {
      $("body").mLoading('hide');
      alert('Server not responding...');
    }
  });
}

function FillControl(response) {
 
  var obj = JSON.parse(response.d);
  console.log("FillControl obj", obj)
  DOCStatus = obj[0].Doc_Status;
  if(obj[0].Doc_Status == "Completed"){
    $("#DocStatus").text(obj[0].Doc_Status).css( "color", "#00AAA2" );
    // $("#DocStatusDate").text(obj[0].DocApprovedDate.substring(0, 11));
    //   $("#DocStatusTime").text(obj[0].DocApprovedDate.substring(11, 17));
   }
    else{
    $("#DocStatus").text(obj[0].Doc_Status).css( "color", "#ff9800" );
    // $("#DocStatusDate").text("--");
    }
  $("#spnDestination").text(obj[0].DestinationAirport);
  $("#spnFirstCarrier").text(obj[0].FirsCarrier);
  $("#spnNoOfPieces").text(obj[0].NoofPcs);
  $("#spnGrWt").text((obj[0].GrossWt).toFixed(2));
  $("#spnChrgWt").text((obj[0].ChargeableWt).toFixed(2));
  $("#spnFlightNo").val(obj[0].FlightNo);
  $("#spnCarrCd").val(obj[0].CarrierCode);
  $("#spnFlightOffPt").text(obj[0].FlightOffPoint);
  $("#spnFlightDt").val(obj[0].FlightDate);
  
  isCOSubmit = obj[0].CartingOrderStatus;
 
  if(isCOSubmit == 'A'){

      $("#revoke").show();
      $("#submit").show().attr('disabled', 'disabled').css({"border": "solid 1px grey","background-color": "lightgrey","color": "grey"});
  }
  else{
    
      $("#submit").show().removeAttr('disabled').css({"border": "solid 1px grey","background-color": "#00AAA2","color": "white"});
      $("#revoke").show();
  }
}

function clearInputs(){
  $("#txtFlightPrefix").val(''); 
  $("#txtFlightNo").val('');
  $("#tblAirWayBillInfo").hide();
  $("#txtFlightPrefix").focus(); 
  $("#submit").hide();
  $("#revoke").hide();
}





openNotification = function(){
  window.location.href = "notificationList.html";
}

GetDocumentsForJobByOrganization_EDocketExport = function () {
  var element = document.getElementById("headingDoc");
  var text = element.getAttribute("aria-expanded");
 // alert(text);

 if(text == "true"){
    if(DOCStatus == "Completed" ){
      $('body').mLoading({
        text: "Please Wait..",
    });
      GetDocumentsEDocketExport();
    }else{
      var disablePanel = true;  //or falsey value
      $("#accordionDocUpload").on('hide.bs.collapse show.bs.collapse',  PanelEvent);

    }
  }
  function PanelEvent(e){
    $self = (this);  
    if(disablePanel){    
    e.preventDefault();    // this is the trick
    console.log("panel should not behave");
   }
  else{
    console.log("panel opens or closes!");
   }
  };
}

GetDocumentsEDocketExport = function () {

  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_Exp_CartingOrderDetails",
    data: JSON.stringify({ OperationType: "6", AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId,  FlightNo :"",FlightDate :"",CARRIERCODE:"",FlightOffPoint:"",CartingOrderStatus:"",CartingOrderStatusComments:"" }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
      var obj = JSON.parse(response.d);
      console.log(response.d);
      console.log(obj);
     
      if (obj.length > 0) {

        if (obj[0].ERRORMSG == undefined) {
        $("#tblAirWayBillInfo").show();
        $("body").mLoading('hide');
        FillGridDocDetails(obj);
        // fillDriverImage(response);
      //  $("body").mLoading('hide');
        // $.alert('Details saved successfully');
        }else{
          $("#tblAirWayBillInfo").hide();
          $("#submit").hide();
          $("#revoke").hide();
            errmsg = "Alert</br>";
          errmsgcont = obj[0].ERRORMSG;
          $.alert(errmsg,errmsgcont);
          return;
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


FillGridDocDetails = function (obj) {
  $("#docTable").empty();
    var count = 0;
    var row = "";
    if (obj.length > 0) {
        $.each(obj, function (i, d) {
          var DocumentStoreId = '"' + d.DocumentStoreId + '"';
          var DocumentTemplateId = '"' + d.DocumentTemplateId + '"';
          var status =  d.Status ;
          path = '' + d.FilePath + '';
          
              $("#tracklabel").show();
              $("#tblTrackInfo").show();
          
              row += "<tr id= " + count + ">";
              
              row += "<td class='text-left' style='color: black;font-size:12px;word-break: break-all;padding-bottom: 5px;' style='text-transform:none !important' ><input type='' id= 'file"  + count + "' style='display:none' />" + d.DocumentName + ".pdf</td>";
              row += "<td class='text-left' style='color: black;font-size:12px;word-break: break-all;padding-bottom: 5px;' style='text-transform:none !important' ><input type='' id= 'file"  + count + "' style='display:none' />" + d.DocumentTemplateName + "</td>";
                  
            
              row += "<td class='text-left' style='color: black;font-size:12px;word-break: break-all;padding-bottom: 5px;' style='text-transform:none !important' ><input type='' id= 'file"  + count + "' style='display:none' />" + d.CreatedDate.substring(0, 11) + "</td>";
                     
               
                  row += "</tr><br><br>";
              
              count++;
              });
        $("#docTable").append(row);
        $("body").mLoading('hide');
    } else {
        $("body").mLoading('hide');
        $("#vehicleDetailsRow").html('There are no Vehicle details available').css('color', '#f7347a');
    }


}