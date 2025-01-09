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
    window.location.href = "dashboard-export.html";
  }
  function goToDomesticCharges(){

    window.location.href = "OTH_DomesticCargo.html";
  }
  function goToInternationalCharges(){

    window.location.href = "OTH_InternationalCargo.html";
  }

  function goToInternationalCourierCharges(){

    window.location.href = "OTH_InternationalCourierCargo.html";
  }

  function goToAirlineCharges(){

    window.location.href = "OTH_AirlineCharges.html";
  }