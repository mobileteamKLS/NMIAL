
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');

var OfficerName = localStorage.getItem('OfficerName');
var Designation = localStorage.getItem('Designation');

var fromMenus = localStorage.getItem('fromMenus');

  $(function () {
     
    getGatePasCount();
$('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
  localStorage.setItem('activeTab', $(e.target).attr('href'));
});
var activeTab = localStorage.getItem('activeTab');
if(activeTab){
  $('#myTab a[href="' + activeTab + '"]').tab('show');
}
    
});


function back() {
    window.location.href = "IMP_DeliveryDocket.html";
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


getGatePasCount = function () {
    //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
   
  
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/ACS_Get_GPCntByCustomsOfficer",
        data: JSON.stringify({ OperationType: "1", CustomsOfficerName :OfficerName, CustomsOfficerDesignation :Designation, GatePassNo: "" }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            var obj = JSON.parse(response.d);
           console.log(response.d);
           console.log(obj);
            if (obj.length > 0) {
              if (obj[0].ERRORMSG == undefined) {
                $("#txtCount").val(obj[0].ApprovedGatePassCount);
                FillControl(response);
               // fillDriverImage(response);
                $("body").mLoading('hide');
                // $.alert('Details saved successfully');
                }else{
                  
                    errmsg = "Alert</br>";
                  errmsgcont = obj[0].ERRORMSG;
                  $.alert(errmsg,errmsgcont);
                  return;
                }
  
            } else {
                $("body").mLoading('hide');
                $("#tblAirWayBillInfo").hide();
                errmsg = "Wrong MAWB number</br>";
                errmsgcont = "Please enter a valid MAWB number</br>";
             //   $.alert(errmsg,errmsgcont);
                return;
            }
  
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
  }
  




