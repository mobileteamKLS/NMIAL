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
    window.location.href = "OTH_FAQ.html";
  }
  function OTH_AirIndiaSATS() {
    localStorage.setItem("state","FAQs");
    // modal.style.display = "block";
    window.location.href = "OTH_AirIndiaSATS.html";
  }
    function OTH_MenziesAviation() {
      localStorage.setItem("state","FAQs");
      // modal.style.display = "block";
      window.location.href = "OTH_MenziesAviation.html";
    
    }
    localStorage.setItem("state","");
