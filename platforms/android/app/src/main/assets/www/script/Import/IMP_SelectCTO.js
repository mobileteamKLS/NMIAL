$(function () {
  getCTOName();

  
  localStorage.setItem('HouseArrayData',"");
  localStorage.setItem('HouseObjectToGenerateVT',  "");
});
    
    function logOut() {
    modal.style.display = "block";
  }
  
  function exitModal() {
    modal.style.display = "none";
  }
  function back() {

    // modal.style.display = "block";
    window.location.href = 'dashboard-export.html';
  }
  // function goToAirIndiaAppCharges(){

  //   window.location.href = "IMP_selectHAWBtoVT.html";
  // }
  // function goToMenziesAppCharges(){

  //   window.location.href = "IMP_selectHAWBtoVT.html";
  // }

  getCTOName = function(){

    $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_IMP_GetCustodianDetails",
      data: JSON.stringify({"OperationType": 1 }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response, xhr, textStatus) {
          var obj = JSON.parse(response.d);
         console.log(response.d);
         console.log(obj);

         var count = 0;
         var row = "";
          if (obj.length > 0) {
         
            $.each(obj, function (i, d) {
              var CUSTODIAN = '"' + d.CUSTODIAN + '"';
              var CUSTODIAN_Name = '"' + d.CustodianName + '"';
                
                row += " <div class= 'div-wrapper'>";
                row += " <div onclick='goToAppCTOCharges(" + CUSTODIAN + ", " + CUSTODIAN_Name + ")'>";
                row += " <h5 class='primary-heading' style='color: #fff;padding-top: 15px;display: inline-flex;margin-top:10px !important'>" + d.CustodianName + "</h5>";
                row += " <button id='' class='btn-arrow' ><i class='zmdi zmdi-chevron-right'></i></button>";
                row += " </div>";
                row += " </div>";

                count++;
            
            });
            $("#CTOlist").append(row);
            $("body").mLoading('hide');
        } else {
            $("body").mLoading('hide');
            $("#CTOlist").html('There are no active CTOs').css('color', '#f7347a');
        }
    }
    });
  }

  goToAppCTOCharges = function (ctoID,ghaName) {
    localStorage.setItem('ctoID', ctoID);
    
    localStorage.setItem('GHANAME', ghaName);
    console.log(ctoID)
    // if (vtno.charAt(0) == 'E' || vtno.charAt(1) == 'E') {
    //     localStorage.setItem('Tab', 'Exports');
    // }else{
    //     localStorage.setItem('Tab', 'Imports');
    // }
    window.location.href = 'IMP_selectHAWBtoVTfromMenu.html';
}