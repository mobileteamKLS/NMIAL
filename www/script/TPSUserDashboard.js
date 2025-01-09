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

function  GoToEXPAWBTracking(){
  //localStorage.setItem('fromExport','1')
  window.location.href = "EXP_AWBTracking.html";
}
function  GoToEXPVehicleTracking(){
  window.location.href = "EXP_VehicleTracking.html";
}
function  GoToEXPEGM(){
  window.location.href = "EXP_EGM.html";
}



function  GoToIMPAWBTracking(){
  window.location.href = "IMP_Dashboard.html";
}



function  GoToPDAccountBalance(){
  window.location.href = "OTH_PDBalance.html";
}
function  GoToFAQ(){
  window.location.href = "OTH_FAQ.html";
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


function  GoToUploadBoEOoC(){
  localStorage.setItem('ImportsMenu','Upload BoE and OoC');
  window.location.href = "IMP_BoEandOoCDetails.html";
}
function  GoToPickOrderExam(){
  localStorage.setItem('ImportsMenu','Pick Order Examination (Opt.)');
  window.location.href = "IMP_BoEandOoCDetails.html";
}
function  GoToSubmitBoEASI(){
  localStorage.setItem('ImportsMenu','BoE ASI Submission');
  window.location.href = "IMP_BoEandOoCDetails.html";
}
function  GoToPayTSP(){
  localStorage.setItem('ImportsMenu','Pay TSP');
  window.location.href = "IMP_BoEandOoCDetails.html";
}
function  GoToGenerateVT(){
  localStorage.setItem('ImportsMenu','Generate Vehicle Token');
  window.location.href = "IMP_SelectCTO.html";
}
function  GoToAdditionalCharges(){
  localStorage.setItem('ImportsMenu','Additional Charges');
  window.location.href = "IMP_BoEandOoCDetails.html";
}

function MovetoNext(current, nextFieldID) {
  if (current.value.length >= current.maxLength) {
      document.getElementById(nextFieldID).focus();
  }
}

function  GoToEXPAWBTracking(){
  window.location.href = "EXP_Dashboard.html";
}
function  GoToViewSB(){
  localStorage.setItem('ExportsMenu','View SB Details');
  window.location.href = "EXP_MenuSearch.html";
}
function  GoToSBASI(){
  localStorage.setItem('ExportsMenu','SB ASI');
  window.location.href = "EXP_MenuSearch.html";
}
function  GoToUploadDocExp(){
  localStorage.setItem('ExportsMenu','e-Docket');
  window.location.href = "EXP_MenuSearch.html";
}
function  GoToExpPayTSP(){
  localStorage.setItem('ExportsMenu','Pay TSP');
  window.location.href = "EXP_MenuSearch.html";
}
function  GoToExpGenerateVT(){
  localStorage.setItem('ExportsMenu','Generate Vehicle Token');
  window.location.href = "EXP_SelectCTO.html";
}
function  GoToExpAdditionalCharges(){
  localStorage.setItem('ExportsMenu','Additional Charges');
  window.location.href = "EXP_MenuSearch.html";
}


function searchAWBNumber() {
  if ($("#txtFlightPrefix").val() == '' || $("#txtFlightNo").val() == '' || $("#txtFlightPrefix").val().length != 3 || $("#txtFlightNo").val().length != 8) {
    
      errmsg = "No MAWB Number</br>";
      errmsgcont = "Please enter a valid MAWB number</br>";
      $.alert(errmsg,errmsgcont);
      return;
  }  else {
      AirlinePrefix = $("#txtFlightPrefix").val();
      AwbNumber = $("#txtFlightNo").val();
      HawbNumber = "";
      var mawbNo = AirlinePrefix.concat("-", AwbNumber);
      localStorage.setItem('mawbNo',mawbNo);
      localStorage.setItem('Prefix',AirlinePrefix);
      localStorage.setItem('AWBNumber',AwbNumber);

      window.location.href = "IMP_IGMHawbList.html";
     
  }
}

function searchAWBNumberExports() {
  if ($("#txtFlightPrefixExp").val() == '' || $("#txtFlightNoExp").val() == '' || $("#txtFlightPrefixExp").val().length != 3 || $("#txtFlightNoExp").val().length != 8) {
    
      errmsg = "No MAWB Number</br>";
      errmsgcont = "Please enter a valid MAWB number</br>";
      $.alert(errmsg,errmsgcont);
      return;
  }  else {
      AirlinePrefix = $("#txtFlightPrefixExp").val();
      AwbNumber = $("#txtFlightNoExp").val();
      HawbNumber = "";
      var mawbNo = AirlinePrefix.concat("-", AwbNumber);
      localStorage.setItem('mawbNo',mawbNo);
      localStorage.setItem('Prefix',AirlinePrefix);
      localStorage.setItem('AWBNumber',AwbNumber);

      //if()
      window.location.href = "EXP_SBHawbList.html";
      //EXP_SBHawbList
  }
}

function clearInputs() {
  $("#txtFlightPrefix").val('');
   $("#txtFlightNo").val('');
   $("#txtFlightNoExp").val('');
   $("#txtFlightPrefixExp").val('');
   
   
}