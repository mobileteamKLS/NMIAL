var LocationName = localStorage.getItem('LocationName');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');
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
function GoToEXPParkingIn(){
  localStorage.setItem('Tab','Exports');
  localStorage.setItem('MenuTitle','Parking In VT List');
  localStorage.setItem('event','ParkIn');
  window.location.href = "TPSUserVTList.html";
}
function GoToEXPParkingOut(){
  localStorage.setItem('Tab','Exports');
  localStorage.setItem('MenuTitle','Parking Out VT List');
  localStorage.setItem('event','ParkOut');
  window.location.href = "TPSUserVTList.html";
}
function GoToEXPTerminalGateIn(){
  localStorage.setItem('Tab','Exports');
  localStorage.setItem('MenuTitle','Terminal Gate In VT List');
  localStorage.setItem('event','YardCheckIn');
  window.location.href = "TPSUserVTList.html";
}
function GoToEXPTerminalGateOut(){
  localStorage.setItem('Tab','Exports');
  localStorage.setItem('MenuTitle','Terminal Gate Out VT List');
  localStorage.setItem('event','YardCheckOut');
  window.location.href = "TPSUserVTList.html";
}

function GoToExpWalkIn(){
  localStorage.setItem('Tab','Exports');
  localStorage.setItem('MenuTitle','Walk-In');
  localStorage.setItem('event','walkIn');
  window.location.href = "TPSUserWalkIn.html";
}

function GoToEXPLiveDock(){
  localStorage.setItem('Tab','Exports');
  window.location.href = "TPSUserVTList.html";
}


function GoToIMPParkingIn(){
  localStorage.setItem('Tab','Imports');
  localStorage.setItem('MenuTitle','Parking In VT List');
  localStorage.setItem('event','ParkIn');
  window.location.href = "TPSUserVTList.html";
}
function GoToIMPParkingOut(){
  localStorage.setItem('Tab','Imports');
  localStorage.setItem('MenuTitle','Parking Out VT List');
  localStorage.setItem('event','ParkOut');
  window.location.href = "TPSUserVTList.html";
}
function GoToIMPTerminalGateIn(){
  localStorage.setItem('Tab','Imports');
  localStorage.setItem('MenuTitle','Terminal Gate In VT List');
  localStorage.setItem('event','YardCheckIn');
  window.location.href = "TPSUserVTList.html";
}
function GoToIMPTerminalGateOut(){
  localStorage.setItem('Tab','Imports');
  localStorage.setItem('MenuTitle','Terminal Gate Out VT List');
  localStorage.setItem('event','YardCheckOut');
  window.location.href = "TPSUserVTList.html";
}

function GoToIMPWalkIn(){
  localStorage.setItem('Tab','Imports');
  localStorage.setItem('MenuTitle','Walk-In');
  localStorage.setItem('event','walkIn');
  window.location.href = "TPSUserWalkIn.html";
}

function GoToIMPLiveDock(){
  localStorage.setItem('Tab','Imports');
  window.location.href = "TPSUserVTList.html";
}

