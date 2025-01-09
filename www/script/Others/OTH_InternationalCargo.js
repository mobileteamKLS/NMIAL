$(function () {
});
    
    function logOut() {
    modal.style.display = "block";
  }
  
  function exitModal() {
    modal.style.display = "none";
  }
  function back() {
    if(localStorage.getItem("state")== "FAQs"){
      window.location.href = "OTH_MobileAppFAQs.html";

    }else{
    localStorage.setItem("state","");
    window.location.href = "OTH_ApplicableCharges.html";

  }
  }
  function goToExportCharges() {

    // modal.style.display = "block";
    window.location.href = "OTH_InterCargoExport.html";
  }
  function goToImportCharges() {

    // modal.style.display = "block";
    window.location.href = "OTH_InterCargoImport.html";
  }