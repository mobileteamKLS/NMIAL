var LocationName = localStorage.getItem('LocationName');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');
var errmsg = "";




$(function () {
 // GetPuspupNotificationList(CreatedByUserId, OrganizationBranchId, OrganizationId);
    ImportDeliveryOrder('4',CreatedByUserId, OrganizationBranchId, OrganizationId);

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
     var IGMNo = $("#IgmNo").val();
     var IGMDate = $("#IgmDt").val();
     var IGMYear = IGMDate.substring(IGMDate.length-4, IGMDate.length);

     HawbNumber = '';

     localStorage.setItem('prefix', AirlinePrefix);
     localStorage.setItem('awbNo', AwbNumber);
     localStorage.setItem('IGMNo', IGMNo);
     localStorage.setItem('IGMYear', IGMYear);
     localStorage.setItem('IGMDate', IGMDate);
     window.location.href = "IMP_DO.html";
     // $('body').mLoading({
     //     text: "Please Wait..",
     // });
     //ImportDeliveryOrder('1', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);
 }
}

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
    window.location.href = "AirlineDashboard.html";
  }

  function exitRevokeModal() {
    revokemodal.style.display = "none";
    confirmmodal.style.display = "none";

  }
  
 

function MovetoNext(current, nextFieldID) {
  if (current.value.length >= current.maxLength) {
      document.getElementById(nextFieldID).focus();
  }
}


ImportDeliveryOrder = function (OperationType,CreatedByUserId, OrganizationBranchId, OrganizationId) {
  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $('body').mLoading({
    text: "Please Wait..",
});
  $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_Imp_DeliveryOrderDetails",
      data: JSON.stringify({ OperationType: OperationType, IGMNo :"", IGMYear :"", AirlinePrefix: "", AwbNumber: "", HawbNumber: "", CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId, DeliveryNo: "",DeliveryDate: "" }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response, xhr, textStatus) {
          var obj = JSON.parse(response.d);
         console.log(response.d);
         console.log(obj);
 
              FillControl(obj);
             // fillDriverImage(response);
              $("body").mLoading('hide');
              // $.alert('Details saved successfully');
            
         

      },
      error: function (xhr, textStatus, errorThrown) {
          $("body").mLoading('hide');
          alert('Server not responding...');
      }
  });
}




          

            FillControl = function (obj) {
                $("#docTable").empty();
                var count = 0;
                var row = "";
                if (obj.length > 0) {
                    $.each(obj, function (i, d) {
                        var MawbNo = '"' + d.MAWBNumber + '"';
                        var AirlinePrefix = MawbNo.substring(1, 4);
                        var AwbNumber = MawbNo.substring(5, 13);
            
                        // $("#tracklabel").show();
                        // $("#tblTrackInfo").show();
            
                        row += "<tr style= 'border-bottom: 2px solid lightgrey;'>";
                      
                        row += "<td class='text-left' style='color: black;' style='text-transform:none !important'>" + d.MAWBNumber + "</td>";
                      
                        row += "<td class='text-left' style='color: black;text-align: right !important' style='text-transform:none !important'>" + d.IGMNo + "</td>";
                      
                        row += "<td class='text-left' style='color: black;text-align: right !important' style='text-transform:none !important'>" + d.PiecesCount + "</td>";
                                  
                        row += "<td class='text-left' style='color: black;text-align: right !important' style='text-transform:none !important'>" + d.Weight + "</td>";
                                  
                        row += "<td class='text-left' style='color: black;text-align: center !important' style='text-transform:none !important'>" + d.FlightNo + "</td>";
                        row += "<td class='text-left' style='color: black;text-align: center !important' style='text-transform:none !important'>" + d.FlightDate + "</td>";
                        row += "<td><img src='img/icon_submit.png' value= '' style='margin:10px' onclick='approve(this, "+ AirlinePrefix + ",  " + AwbNumber + ", " +  d.IGMNo + ", " +  d.IGMYear + ");'><input type='hidden' id= 'myImg"  + count + "'  value= "+ d.MAWBNumber +"></td>";
            
                        row += "</tr>";
            
                        count++;
                    });
                    $("#docTable").append(row);
                    $("body").mLoading('hide');
                } else {
                    $(".theadClass").hide();
                    $("body").mLoading('hide');
                    $("#docTable").html('There are no records available').css('color', '#f7347a','display', 'inline','position', 'absolute');
                }
            
            
            }
          
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

approve = function(element, prefix, awbNo, IGMNo, IGMYear){

  var rowJavascript = element.parentNode.parentNode;

    var index = rowJavascript.rowIndex - 1;

    var rowid = "#myImg" + index;
     var awbNo  = $(rowid).val();
     console.log(awbNo);

     var AirlinePrefix = awbNo.substring(0, 3);
     var AwbNumber = awbNo.substring(4, 12);

    localStorage.setItem('prefix', AirlinePrefix);
    localStorage.setItem('awbNo', AwbNumber);
    localStorage.setItem('IGMNo', IGMNo);
    localStorage.setItem('IGMYear', IGMYear);
    window.location.href = "IMP_DO.html";
}



openNotification = function(){
  window.location.href = "notificationList.html";
}