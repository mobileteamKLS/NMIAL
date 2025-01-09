var fromMenus = localStorage.getItem('fromMenus');

  $(function () {
     
// debugger
  
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

function back() {
    window.location.href = "AirlineDashboard.html";
  }

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
    window.location.href = "EXP_AWBTrackingAirline.html";
  }
  function  GoToEXPVehicleTracking(){
    window.location.href = "EXP_VehicleTracking.html";
  }
  function  GoToEXPEGM(){
    window.location.href = "EXP_EGM.html";
  }
  


