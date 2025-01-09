
var LocationName = localStorage.getItem('LocationName');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');
var MAWBNo = localStorage.getItem('mawbNo');
var AirlinePrefix = localStorage.getItem('Prefix');
var AwbNumber = localStorage.getItem('AWBNumber');
var IGMNo = localStorage.getItem('igmNo');
var IGMYear = localStorage.getItem('igmYear');
var HawbNumber = localStorage.getItem('hawbNo');

var HAWBID = localStorage.getItem('HawbId');
var OOCID = localStorage.getItem('OocId');
var GHAID = localStorage.getItem('GhaId');
var MAWBID = localStorage.getItem('MawbId');
var GHANAME = localStorage.getItem('GhaName');
var BOEID = localStorage.getItem('BoeId');
var HouseObjectToGenerateVT = JSON.parse(localStorage.getItem('HouseObjectToGenerateVT'));
var TotalNoP = localStorage.getItem('TotalNoP');
var TotalGrWt = localStorage.getItem('TotalGrWt');

console.log(HouseObjectToGenerateVT)
$(function () {
  $("#CTODot").css('background-color', '#00AAA2');
    $("#AlloDot").css('background-color', '#00AAA2');
    $("#AlloDot").css('border', '1px solid #00AAA2');
    $("#AssDot").css('border', '1px solid orange');

if(HouseObjectToGenerateVT.length > 1){
  $("#btnAdd").attr('disabled', 'disabled');
  $("#btnAdd").css({ "background-color": "lightgrey", "color": "#585a5d"}); 
}
  });
      
      function logOut() {
      modal.style.display = "block";
    }
    
    function exitModal() {
      modal.style.display = "none";
    }
    function back() {
  
      // modal.style.display = "block";
      window.location.href = "IMP_AllocateShipmentfromMenu.html";
    }
    function goToAirIndiaAppCharges(){
  
      window.location.href = "IMP_selectHAWBtoVT.html";
    }
    function goToMenziesAppCharges(){
  
      window.location.href = "IMP_selectHAWBtoVT.html";
    }
  
 
var i = 0;
var vehicleXml = "";

$(".GenerateVTBtn").on('click', function() {
  vehicleXml = "";
        
  console.log("globalCounter = ",window.globalCounter)
  var VTcount = window.globalCounter - 1;
  if ((HouseObjectToGenerateVT.length == 1 && VTcount == 1) || (HouseObjectToGenerateVT.length > 1 && VTcount == 1))
{
  $('#VTList').find('.panel-group').each(function (index) {
    $(this).find('.vehicleDetails').each(function() {
      var VehicleNo = $(this).find("#VehicleNo").val();
      if(VehicleNo ==""){
        errmsg = "Alert</br>";
        errmsgcont = "Please enter Vehicle Number<br>";
        $.alert(errmsg,errmsgcont);
        return;
      }
      var LicenseNo = $(this).find("#licenseNo").val();
      if(LicenseNo ==""){
        errmsg = "Alert</br>";
        errmsgcont = "Please enter License Number<br>";
        $.alert(errmsg,errmsgcont);
        return;
      }
      var DriverName = $(this).find("#driverName").val();
      if(DriverName ==""){
        errmsg = "Alert</br>";
        errmsgcont = "Please enter Driver Name<br>";
        $.alert(errmsg,errmsgcont);
        return;
      }
      var DriverMobNo = $(this).find("#mobileNo").val();
      if(DriverMobNo ==""){
        errmsg = "Alert</br>";
        errmsgcont = "Please enter Mobile Number<br>";
        $.alert(errmsg,errmsgcont);
        return;
      }
      var NoP = $(this).find("#noPcs").val();
      if(NoP ==""){
        errmsg = "Alert</br>";
        errmsgcont = "Please enter NoP.<br>";
        $.alert(errmsg,errmsgcont);
        return;
      }else if(NoP != TotalNoP){
        errmsg = "Alert</br>";
        errmsgcont = "Please enter valid pieces<br>";
        $.alert(errmsg,errmsgcont);
        return;
      }
      var GrWt = $(this).find("#txtGrWt").val();
      if(GrWt ==""){
        errmsg = "Alert</br>";
        errmsgcont = "Please enter Gr Wt.<br>";
        $.alert(errmsg,errmsgcont);
        return;
        }else if(GrWt != TotalGrWt){
        errmsg = "Alert</br>";
        errmsgcont = "Please enter valid Gr Wt.<br>";
        $.alert(errmsg,errmsgcont);
        return;
      }
      var CargoType = $(this).find("#cargoType").val();
      if(CargoType ==""){
        errmsg = "Alert</br>";
        errmsgcont = "Please select Cargo Type<br>";
        $.alert(errmsg,errmsgcont);
        return;
      }

      HouseObjectToGenerateVT.forEach((element, i) => {

        console.log(element.MAWBID); // 100, 200, 300
        console.log(i+1); // 0, 1, 2
        var index = 1;
        vehicleXml +=  "<InsertSBData><SBData><rowIndex>" + (index) + "</rowIndex><AWBid>" + element.MAWBID + "</AWBid><BoEID>" + element.BoEID + "</BoEID><HAWBID>" + element.HAWBID + "</HAWBID><OOCID>" + element.OOCID + "</OOCID><AllocateNOP>" + element.HAWB_Total_Nop + "</AllocateNOP><AllocateGrWt>" + element.HAWB_Total_GrossWt + "</AllocateGrWt><GHAID>" + element.GHAID + "</GHAID><VehicleNo>" + VehicleNo + "</VehicleNo><DriverName>" + DriverName + "</DriverName><DriverCountryCode></DriverCountryCode><DriverMobileNo>" + DriverMobNo + "</DriverMobileNo><AgentMobileNo>" + DriverMobNo + "</AgentMobileNo><DriverLicense>" + LicenseNo + "</DriverLicense><NoOfPieces>" + NoP + "</NoOfPieces><GrossWeight>" + GrWt + "</GrossWeight><Unit>KGS</Unit><Remarks>" + element.GHANAME + "</Remarks><VehicleCargoType>" + CargoType + "</VehicleCargoType></SBData></InsertSBData>";
    });
  
    console.log("vehicleXml == ",vehicleXml);
generateVehicleToken();
    });
   
   
});

}else if(HouseObjectToGenerateVT.length == 1 && VTcount > 1){
    var  TotalPieces = 0;
    var TotalGrossWt = 0;
  HouseObjectToGenerateVT.forEach((element, i) => {

    $('#VTList').find('.panel-group').each(function (index) {
      $(this).find('.vehicleDetails').each(function() {
        var VehicleNo = $(this).find("#VehicleNo").val();
        if(VehicleNo ==""){
          errmsg = "Alert</br>";
          errmsgcont = "Please enter Vehicle Number<br>";
          $.alert(errmsg,errmsgcont);
          vehicleXml = "";
          return;
        }
        var LicenseNo = $(this).find("#licenseNo").val();
        if(LicenseNo ==""){
          errmsg = "Alert</br>";
          errmsgcont = "Please enter License Number<br>";
          $.alert(errmsg,errmsgcont);
          vehicleXml = "";
          return;
        }
        var DriverName = $(this).find("#driverName").val();
        if(DriverName ==""){
          errmsg = "Alert</br>";
          errmsgcont = "Please enter Driver Name<br>";
          $.alert(errmsg,errmsgcont);
          vehicleXml = "";
          return;
        }
        var DriverMobNo = $(this).find("#mobileNo").val();
        if(DriverMobNo ==""){
          errmsg = "Alert</br>";
          errmsgcont = "Please enter Mobile Number<br>";
          $.alert(errmsg,errmsgcont);
          vehicleXml = "";
          return;
        }
        var NoP = $(this).find("#noPcs").val();
        if(NoP ==""){
          errmsg = "Alert</br>";
          errmsgcont = "Please enter NoP.<br>";
          $.alert(errmsg,errmsgcont);
          vehicleXml = "";
          return;
        }else if(TotalPieces != 0){
          var pieces = TotalPieces + parseInt(NoP);
          if(pieces != TotalNoP){
            errmsg = "Alert</br>";
            errmsgcont = "BoE and Vehicle NoP and gross weight is not matched.<br>";
            $.alert(errmsg,errmsgcont);
            vehicleXml = "";
            return;
          }
        }

        var GrWt = $(this).find("#txtGrWt").val();
        
        if(GrWt ==""){
          errmsg = "Alert</br>";
          errmsgcont = "Please enter Gr Wt.<br>";
          $.alert(errmsg,errmsgcont);
          vehicleXml = "";
          return;
        }else if(TotalGrossWt != 0){
          var weight = TotalGrossWt + parseInt(GrWt);
          if(weight != TotalGrWt){
                errmsg = "Alert</br>";
                errmsgcont = "Please enter valid Gr Wt.<br>";
                $.alert(errmsg,errmsgcont);
                vehicleXml = "";
                return;
              }
        }
        TotalPieces += parseInt(NoP);
        TotalGrossWt += parseFloat(GrWt);
        var CargoType = $(this).find("#cargoType").val();
        if(CargoType ==""){
          errmsg = "Alert</br>";
          errmsgcont = "Please select Cargo Type<br>";
          $.alert(errmsg,errmsgcont);
          vehicleXml = "";
          return;
        }
        vehicleXml +=  "<InsertSBData><SBData><rowIndex>" + (index+1) + "</rowIndex><AWBid>" + element.MAWBID + "</AWBid><BoEID>" + element.BoEID + "</BoEID><HAWBID>" + element.HAWBID + "</HAWBID><OOCID>" + element.OOCID + "</OOCID><AllocateNOP>" + NoP + "</AllocateNOP><AllocateGrWt>" + GrWt + "</AllocateGrWt><GHAID>" + element.GHAID + "</GHAID><VehicleNo>" + VehicleNo + "</VehicleNo><DriverName>" + DriverName + "</DriverName><DriverCountryCode></DriverCountryCode><DriverMobileNo>" + DriverMobNo + "</DriverMobileNo><AgentMobileNo>" + DriverMobNo + "</AgentMobileNo><DriverLicense>" + LicenseNo + "</DriverLicense><NoOfPieces>" + NoP + "</NoOfPieces><GrossWeight>" + GrWt + "</GrossWeight><Unit>KGS</Unit><Remarks>" + element.GHANAME + "</Remarks><VehicleCargoType>" + CargoType + "</VehicleCargoType></SBData></InsertSBData>";
      });
     
    });
  });
  // if(TotalPieces != TotalNoP){
  //   errmsg = "Alert</br>";
  //   errmsgcont = "BoE and Vehicle NoP and gross weight is not matched.<br>";
  //   $.alert(errmsg,errmsgcont);
  //   vehicleXml = "";
  //   return;
  // }

//  if(TotalGrossWt != TotalGrWt){
//     errmsg = "Alert</br>";
//     errmsgcont = "Please enter valid Gr Wt.<br>";
//     $.alert(errmsg,errmsgcont);
//     vehicleXml = "";
//     return;
//   }

  console.log("vehicleXml == ",vehicleXml);
generateVehicleToken();
}




});

window.globalCounter = 2;
    $(".btn-add-panel").on("click", function () {
        //var data = '<tr><td>' + window.globalCounter + '</td><td><input type="text" id="name2" value=""/></td><td><input type="text" id="phone2" value=""/></td><td><input type="text" id="email2" value=""/></td><td><button id="delete">Delete</button></td></tr>';
        
        var row = "";
        row += " <div class='panel-group' id='accordion' role='tablist' aria-multiselectable='true'>";
        row += "<div class= 'div-wrapper'>";
        row += "<div class='panel-heading' role='tab' id='heading2' style='font-size: 17px;padding: 5px 10px 0px 10px;display: inline-flex;width: 100%;' data-toggle='collapse' data-parent='#accordion' href='#collapse"+ window.globalCounter +"' aria-expanded='true' >";
        row += "<div class='col-5'>";
        row += "<div class='form-group vtMargin' >";
        row += "<label class='lblAccordian' id ='VehicleId' style='font-size: 15px;font-weight: bold;'>Vehicle "+ window.globalCounter +"</label>";
        row += "</div>";
        row += "</div>";
        row += "<div class='col-5'>";
        row += "<div class='form-group' style='text-align: center;'>";
        row += "<label class='remove' id='delete' style='font-size: 13px;font-weight: bold;color: red'>Remove</label>";
        row += "</div>";
        row += "</div>";
        row += "<div class='col-2'>";
        row += "<div class='form-group'>";
        row += "<button class='btn-arrow'  id='panel-heading' data-toggle='collapse' data-parent='#accordion' href='#collapse"+ window.globalCounter +"' aria-expanded='true' aria-controls='collapse1' style='border: none;background-color: white;' >";
        row += "<i class='more-less zmdi zmdi-chevron-down' id='down-arrow' style='float: none !important;margin-right: 0px !important;font-size: 30px; color:#00AAA2;background-color: white;'></i>";
        row += "</button>";
        row += "</div>";
        row += "</div>";
        row += "</div>";
        row += "<div id='collapse"+ window.globalCounter +"' class='panel-collapse collapse'>";
                           
        row += "<div class= 'div-wrapper_2'>";
        row += "<table id='tblVehicleInfo"+ window.globalCounter +"' class= 'vehicleDetails' width='100%' style='border: lightgrey 1px solid;'>";
                             
        row += "<tr class='table_row'>";
        row += "<td class='spanTD'>Vehicle No.</td>";
        row += "<td class='col2'> <input type='text' id='VehicleNo'  class='fontSize12' style='border-bottom: 1px solid black;' onkeyup=this.value=this.value.replace(/[^a-zA-Z0-9]/g, '')' onchange='upperCase(this)'></input></td>";
        row += "</tr>";
        row += "<tr class='table_row'>";
        row += "<td class='spanTD'>Driver License No.</td>";
        row += "<td class='col2'> <input type='text' id='licenseNo'  class='fontSize12' style='border-bottom: 1px solid black;' onkeyup='this.value=this.value.replace(/[^a-zA-Z0-9]/g, '')' onchange='upperCase(this)'></input></td>";
        row += "</tr>";
        row += "<tr class='table_row'>";
        row += "<td class='spanTD'>Driver Name</td>";
        row += "<td class='col2'> <input id='driverName'  class='fontSize12' style='border-bottom: 1px solid black;' onkeyup='this.value=this.value.replace(/[^a-zA-Z]/g, '')' onchange='spaceAllow(this)'></input></td>";
        row += "</tr>";
        row += "<tr class='table_row'>";
        row += "<td class='spanTD'>Driver Mobile No.</td>";
        row += "<td class='col2'> <input type='number' id='mobileNo'  class='fontSize12' style='border-bottom: 1px solid black;' maxlength='10' oninput='javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);'></input></td>";
        row += "</tr>";
        row += "<tr class='table_row'>";
        row += "<td class='spanTD'>NoP</td>";
        row += "<td class='col2'><input type='number' id='noPcs'  class='fontSize12' style='border-bottom: 1px solid black;'></input></td>";
        row += "</tr>";
        row += "<tr class='table_row'>";
        row += "<td class='spanTD'>Gr. Wt.(Kgs.)</td>";
        row += "<td class='col2'><input type='number' id='txtGrWt'  class='fontSize12' style='border-bottom: 1px solid black;'></input></td>";
        row += "</tr>";
        row += "<tr class='table_row'>";
        row += "<td class='spanTD'>Cargo Type</td>";
        row += "<td class='col2'> <select class='' name='prefix' id='cargoType' style='width: 100%;'><option value='' selected>Select</option><option value='General'>General</option><option value='Perishable'>Perishable</option><option value='Pharmaceuticals'>Pharmaceuticals</option></select></td>";
        row += "</tr></table></div> </div></div></div>";

        $("#VTList").append(row);
        $("body").mLoading('hide');
        window.globalCounter++;
    });
      // $('input').on('input', function() {
    //   var c = this.selectionStart,
    //       r = /[^a-z0-9]/gi,
    //       v = $(this).val();
    //   if(r.test(v)) {
    //     $(this).val(v.replace(r, ''));
    //     c--;
    //   }
    // this.setSelectionRange(c, c);
    // });

    upperCase = function(ele){
      var c = ele.selectionStart,
       r = /[^a-z0-9]/gi,
       v = $(ele).val();
   if(r.test(v)) {
     $(ele).val(v.replace(r, ''));
     c--;
   }
 }

 spaceAllow = function(ele){
   var c = ele.selectionStart,
    r = /[^a-z\s]/gi,
    v = $(ele).val();
if(r.test(v)) {
  $(ele).val(v.replace(r, ''));
  c--;
}
}

    $("#VTList").on("click", "#delete", function (ev) {
        var $currentTableRow = $(ev.currentTarget).parents('#accordion')[0];
        $currentTableRow.remove();
        window.globalCounter--;
        
        $('#VTList').find('.panel-group').each(function (index) {
            var firstTDDomElement = $(this).find('#VehicleId')[0];
            var $firstTDObject = $(firstTDDomElement);
            $firstTDObject.text("Vehicle " + (index + 1));
        });
        console.log(window.globalCounter)
    });

    generateVehicleToken = function () {
      $('body').mLoading({
        text: "Please Wait..",
    });
      console.log(IGMNo + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
      $.ajax({
          type: 'POST',
          url: ACSServiceURL + "/ACS_IMP_INSERT_VehicleToken",
          data: JSON.stringify({
                  "BoEDataXML":vehicleXml,
                  "CreatedByUserId":CreatedByUserId,
                  "strOutMsg":"",
                  "VTNos": ""
              }),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (response, xhr, textStatus) {
            $("body").mLoading('hide');
              var obj = JSON.parse(response.d);
             console.log(response.d);
             console.log(obj);
              if (obj.length > 0) {
                if (obj[0].ERRORMSG == undefined) {
                 localStorage.setItem('FinalVTList',  JSON.stringify(obj));
                 window.location.href = "IMP_FinalVTListfromMenu.html";
                 
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
                  $("#tblAirWayBillInfo1").hide();
                  errmsg = "Wrong MAWB number</br>";
                  errmsgcont = "Please enter a valid MAWB number</br>";
                 // $.alert(errmsg,errmsgcont);
                  return;
              }
    
          },
          error: function (xhr, textStatus, errorThrown) {
              $("body").mLoading('hide');
              alert('Server not responding...');
          }
      });
    }

    function clearInputs() {
      $("#VehicleNo").val(''); 
      $("#licenseNo").val(''); 
      $("#driverName").val('');
      $("#mobileNo").val(''); 
      $("#noPcs").val(''); 
      $("#txtGrWt").val('');
      $("#cargoType").val("");
      
    }

