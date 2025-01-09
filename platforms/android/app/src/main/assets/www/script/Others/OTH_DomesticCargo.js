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

      }
    // modal.style.display = "block";
      else{
        localStorage.setItem("state","");
        window.location.href = "OTH_ApplicableCharges.html";

      }
  }
 
  function goToOutboundCharges() {

    // modal.style.display = "block";
    window.location.href = "OTH_DomesticOutbound.html";
  }
  function goToInboundCharges() {

    // modal.style.display = "block";
    window.location.href = "OTH_DomesticInbound.html";
  }