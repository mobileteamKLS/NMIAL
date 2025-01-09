$(function () {
});
    
    function logOut() {
    modal.style.display = "block";
  }
  
  function exitModal() {
    modal.style.display = "none";
  }
  function back() {

    // modal.style.display = "block";
    window.location.href = "OTH_ApplicableCharges.html";
  }
  function goToExportCharges(){

    window.location.href = "OTH_AirlinesExportCharges.html";
  }
  function goToImportCharges(){

    window.location.href = "OTH_AirlinesImportCharges.html";
  }

  function goToOutboundAirlines(){

    window.location.href = "OTH_AirlinesOutboundCharges.html";
  }

  function goToInboundAirlines(){

    window.location.href = "OTH_AirlinesInboundCharges.html";
  }