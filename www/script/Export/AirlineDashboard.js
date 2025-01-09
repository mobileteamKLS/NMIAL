var fromMenus = localStorage.getItem('fromMenus');
var airline = localStorage.getItem('loginName');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');

var notificationList;
  $(function () {
 
    //GetPuspupNotificationList(CreatedByUserId, OrganizationBranchId, OrganizationId);
  
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

function  GoToEXPAWBTracking(){
  //localStorage.setItem('fromExport','1')
  window.location.href = "EXP_DashboardAirline.html";
}
// function  GoToEXPVehicleTracking(){
//   window.location.href = "EXP_VehicleTracking.html";
// }
// function  GoToEXPEGM(){
//   window.location.href = "EXP_EGM.html";
// }
function  GoToEXPCartingOrder(){
  window.location.href = "EXP_CODataList.html";
}



function  GoToIMPAWBTracking(){
  window.location.href = "IMP_DashboardAirline.html";
}
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
function  GoToUpdates(){
  localStorage.setItem('dashboard','dashboardUpdates');
  window.location.href = "updates.html";
}
localStorage.removeItem('dashboard');






openNotification = function(){
  window.location.href = "notificationList.html";
}