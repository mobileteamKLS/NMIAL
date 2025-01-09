$(function () {
  localStorage.removeItem('fromExport')
});
    
    function logOut() {
    modal.style.display = "block";
  }
  
  function exitModal() {
    modal.style.display = "none";
  }
  function back() {
    localStorage.setItem('fromExport','3')
    // modal.style.display = "block";
    window.location.href = "dashboard-export.html";
  }