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


function  GoToImpDeliveryDocket(){
  window.location.href = "IMP_DeliveryDocket.html";
}


