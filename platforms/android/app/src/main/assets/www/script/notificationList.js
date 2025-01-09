var fromMenus = localStorage.getItem('fromMenus');
var airline = localStorage.getItem('loginName');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');

  $(function () {
 
    GetPuspupNotificationList(CreatedByUserId, OrganizationBranchId, OrganizationId);
  
//       if(fromMenus == '1'){
//         $('#imp_tab').removeClass('active')
//         $('#exp_tab').addClass('active')
//       }

$('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
  localStorage.setItem('activeTab', $(e.target).attr('href'));
 

});
var activeTab = localStorage.getItem('activeTab');
if(activeTab){

  $('#myTab a[href="' + activeTab + '"]').tab('show');
}
    
});
// function openCity(cityName,elmnt,color) {
//   var i, tabcontent, tablinks;
//   tabcontent = document.getElementsByClassName("tabcontent");
//   for (i = 0; i < tabcontent.length; i++) {
//     tabcontent[i].style.display = "none";
//   }
//   tablinks = document.getElementsByClassName("tablink");
//   for (i = 0; i < tablinks.length; i++) {
//     tablinks[i].className = tablinks[i].className.replace(" active", "");
//   }
//   document.getElementById(cityName).style.display = "block";
//   elmnt.currentTarget.className += " active";

// }



  // $('#log-out').on('click', function(e){
  //   e.preventDefault();
  //   $('#myModal').modal('show').find('.modal-content').load($(this).attr('href'));
  // });
  // modal.style.display = "block";

  function logOut() {
     modal.style.display = "block";
  
  }
function exitModal() {
  modal.style.display = "none";
}

// function  GoToEXPAWBTracking(){
//   //localStorage.setItem('fromExport','1')
//   window.location.href = "EXP_AWBTracking.html";
// }
// function  GoToEXPVehicleTracking(){
//   window.location.href = "EXP_VehicleTracking.html";
// }
// function  GoToEXPEGM(){
//   window.location.href = "EXP_EGM.html";
// }
function  GoToEXPCartingOrder(){
  window.location.href = "EXP_CODataList.html";
}



// function  GoToIMPAWBTracking(){
//   window.location.href = "IMP_AWBTracking.html";
// }
// function  GoToIMPVehicleTracking(){
//   window.location.href = "IMP_VehicleTracking.html";
// }
// function  GoToIMPIGM(){
//   window.location.href = "IMP_IGM.html";
// }
function  GoToIMPDeliveryOrder(){
  window.location.href = "IMP_DODataList.html";
}


function  GoToPDAccountBalance(){
  window.location.href = "OTH_PDBalance.html";
}
function  GoToChargeCalculator(){
  window.location.href = "OTH_ChargeCalculator.html";
}
function  GoToApplicableCharges(){
  window.location.href = "OTH_ApplicableCharges.html";
}
function  GoToContactUs(){
  window.location.href = "OTH_ContactUs.html";
}

function  goBack(){
  window.location.href = "AirlineDashboard.html";
}
function  GoToUpdates(){
  localStorage.setItem('dashboard','dashboardUpdates');
  window.location.href = "updates.html";
}
localStorage.removeItem('dashboard');



GetPuspupNotificationList = function (CreatedByUserId, OrganizationBranchId, OrganizationId) {
  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $('body').mLoading({
      text: "Please Wait..",
  });
  $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/GetPuspupNotificationList",
      data: JSON.stringify({CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response, xhr, textStatus) {
          $("body").mLoading('hide');
          var obj = JSON.parse(response.d);
          COList = obj;
          console.log(response.d);
          console.log(obj);

                  FillControl(response);
                  // fillDriverImage(response);
                  //  $("body").mLoading('hide');
                  // $.alert('Details saved successfully');
             
         

      },
      error: function (xhr, textStatus, errorThrown) {
          $("body").mLoading('hide');
          alert('Server not responding...');
      }
  });
}

FillControl = function (response) {
  $("#divNotificationRow").empty();
    var obj = JSON.parse(response.d);
    
    var count = 0;
    var row = "";
    if (obj.length > 0) {
        $.each(obj, function (i, d) {
            // var img = document.getElementById('imgUpadte');
            // img.src = '"'+ d.Imgfilename + '"';
            // img.style.display = 'block';
          
            var _id = '"' + d.NRowId + '"';
            var _type = '"' + d.NType + '"';
            var _mawbNo = '"' + d.NMawbNo + '"';
            var _mawbNo = '"' + d.NMawbNo + '"';
            if(d.NType == "Imports"){
            var _IGMNo = '"' + d.NIGMNo + '"';
            var _IGMYear = '"' + d.NIGMYr + '"';
            }else{
              var _IGMNo = "0";
              var _IGMYear = "0";
            }
            row += " <div class= 'div-wrapper'>";
            row += "<div onclick='updateNotificationList("+ _id +", "+ _type +", "+ _mawbNo +", "+ _IGMNo +", "+ _IGMYear +");'>";
            row += "<h6 class='primary-heading' style='color: #333;font-size: 12px;display: inline-flex;margin-top: 0px !important;'>" + d.NContent + "</h6>";
            row += "</div>";
            row += " </div>";
         
        count++;
    });
        $("#divNotificationRow").append(row);
        $("body").mLoading('hide');
    } else {
        $("body").mLoading('hide');
        $("#divNotificationRow").html('There are no active notifications available').css('color', '#f7347a');
    }
  }
 
  updateNotificationList = function(id, type, mawbNo, igmNo, igmYear) {
    localStorage.setItem('NotificationID', id);
     //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $('body').mLoading({
    text: "Please Wait..",
});
$.ajax({
    type: 'POST',
    url: ACSServiceURL + "/UpdateViewStatusforPushNotification",
    data: JSON.stringify({CreatedByUserId: CreatedByUserId,NoticationId : id, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        $("body").mLoading('hide');
        var obj = JSON.parse(response.d);
        console.log(response.d);
        console.log(obj);
        localStorage.setItem("IGMNo",igmNo);
        localStorage.setItem("IGMYear",igmYear);
        if(type =="Exports"){
          localStorage.setItem("prefix",mawbNo.substring(0, 3));
          localStorage.setItem("awbNo",mawbNo.substring(3, 11));
        window.location.href = 'EXP_CO.html';}
        else{
          localStorage.setItem("prefix",mawbNo.substring(0, 3));
          localStorage.setItem("awbNo",mawbNo.substring(4, 12));
        window.location.href = 'IMP_DO.html';}
                // fillDriverImage(response);
                //  $("body").mLoading('hide');
                // $.alert('Details saved successfully');
           
       

    },
    error: function (xhr, textStatus, errorThrown) {
        $("body").mLoading('hide');
        alert('Server not responding...');
    }
});
    
  }