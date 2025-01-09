var LocationName = localStorage.getItem('LocationName');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');
var errmsg = "";
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
  function showPDBalance(){

    var selectValue = $("#selectedVal").val();
    $("#balance").val('');
    checkPDBalance("1", selectValue, CreatedByUserId, OrganizationBranchId, OrganizationId);

  }
checkPDBalance = function (OperationType, selectValue, CreatedByUserId, OrganizationBranchId, OrganizationId) {
  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
 
  $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_CheckPDABalance",
      data: JSON.stringify({ OperationType: OperationType, PDABalanceFor: selectValue,  CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response, xhr, textStatus) {
          var obj = JSON.parse(response.d);
         console.log(response.d);
         console.log(obj);
         if (obj == null) {
          $("#balance").text('0');
         }
         else if (obj.length == 0) {
          $("#balance").text('0');
         }
          else if (obj.length > 0) {
            $("#balance").text(obj[0].Balance);
          
              
             // fillDriverImage(response);
              $("body").mLoading('hide');
              // $.alert('Details saved successfully');
          } else {
              $("body").mLoading('hide');
             
          }

      },
      error: function (xhr, textStatus, errorThrown) {
          $("body").mLoading('hide');
          alert('Server not responding...');
      }
  });
}

