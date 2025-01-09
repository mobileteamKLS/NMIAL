
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
var BoEId = localStorage.getItem('boeid');
var OoCId = localStorage.getItem('oocid');
var MawbID = localStorage.getItem('MawbRowId');
var VTNO = localStorage.getItem('VT');

var HouseObjectToUpdateVT;
var VTObjectToUpdateVT;
var totalNoP;
var totalGrWt;
var shipmentCount;
var dockInStatus;
$(function () {
  getVTgeneratedDetails();
  getVTHousegeneratedDetails();
    $("#AlloDot").css('background-color', '#00AAA2');
    $('#tblVehicleInfo1 :input').attr('disabled', 'disabled');
    var oldClass = document.getElementById("collapse1").getAttribute("class");
      document.getElementById("collapse1").setAttribute("class", "show");
  
  });
      
      function logOut() {
      modal.style.display = "block";
    }
    
    function exitModal() {
      modal.style.display = "none";
    }
    function back() {
  
      // modal.style.display = "block";
      window.location.href = "IMP_ShipmentDetails.html";
    }
    function goToAirIndiaAppCharges(){
  
      window.location.href = "IMP_selectHAWBtoVT.html";
    }
    function goToMenziesAppCharges(){
  
      window.location.href = "IMP_selectHAWBtoVT.html";
    }
    function viewVehicleTokenDetails(){
  
        window.location.href = "IMP_viewHAWBDetails.html";
      }
    
 
      getVTgeneratedDetails = function(){

        console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
        $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/ACS_IMP_Get_VT_DetailsOnly_Edit",
        data: JSON.stringify({ "MAWBID":MawbID,
                      "BOEID":BoEId,
                      "OrganizationBranchId":OrganizationBranchId,
                      "OrganizationId":OrganizationId,
                      "oocids":OoCId,
                      "VTNo" : VTNO
                    }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            var obj = JSON.parse(response.d);
            console.log(response.d);
            console.log(obj);
            if (obj.length > 0) {
              localStorage.setItem('VTObjectToUpdateVT',  JSON.stringify(obj));

              if (obj[0].ERRORMSG == undefined) {
               
                $("#VehicleNo").val(obj[0].VEHICLENO);
                $("#spnVTNO").val(obj[0].TOKENNO);
                $("#licenseNo").val(obj[0].DLNO);
                $("#driverName").val(obj[0].DRIVERNAME);
                $("#mobileNo").val(obj[0].DRIVERMOBILENO);
                $("#noPcs").val(obj[0].PIECES);
                $("#txtGrWt").val(obj[0].GROSSWEIGHT);
                var text = obj[0].VehicleCargoType;
                dockInStatus =  obj[0].DockInstatus;
                var VehicleCargoType = text.trim();
                shipmentCount = obj[0].shipmentCount;
                $("#cargoType").val(VehicleCargoType);
              
                totalNoP = obj[0].PIECES;
                totalGrWt = obj[0].GROSSWEIGHT;
                // fillDriverImage(response);
                $("body").mLoading('hide');
                // $.alert('Details saved successfully');
              }else{
                  
                errmsg = "Alert</br>";
                errmsgcont = obj[0].Msg;
                // $.alert(errmsg,errmsgcont);
                return;
    
              }
            } else {
                $("body").mLoading('hide');
                
                errmsg = "Wrong MAWB number</br>";
                errmsgcont = "Please enter a valid MAWB number</br>";
                $.alert(errmsg,errmsgcont);
                return;
            }
    
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
      });
      }
      cancel = function(){
        modalVT.style.display = "none";
        window.location.href = "IMP_ShipmentDetails.html";
      }
      cancelVT = function(){
        if(dockInStatus == "true"){
          errmsg = "Alert</br>";
              errmsgcont = "Dock In is performed, cannot cancel Vehicle Token.<br>";
              $.alert(errmsg,errmsgcont);
              return;
        }else{
        $('body').mLoading({
          text: "Please Wait..",
      });
        // var VTno = $("#spnVTNO").val();
        // var cancelVTXML = "<VTInfo><VehicleDet VTNO='" + VTno + "'/></VTInfo>"

         var VehTokenNos = localStorage.getItem('VehTokenNos');
        var cancelVTXML = "";
        var myarray = VehTokenNos.split(','); 
        var finalXml = "<VTInfo>";
        for (var i = 0; i < myarray.length; i++){
          var myarr = "'" + myarray[i] + "'";
        cancelVTXML +="<VehicleDet VTNO=" + myarr + "/>"
        }
        finalXml += cancelVTXML + "</VTInfo>"
        $.ajax({
          type: 'POST',
          url: ACSServiceURL + "/ACS_IMP_CancelVehicleToken",
          data: JSON.stringify({
            "CreatedByUserId":CreatedByUserId,
            "stVehicleDetailsXML":finalXml,
            "strOutMsg":""
            }),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (response, xhr, textStatus) {
              var obj = JSON.parse(response.d);
              console.log(response.d);
              console.log(obj);
              if (obj.length > 0) {
                if (obj[0].StrErrorMsg == undefined) {
                 
                  $("body").mLoading('hide');
                  // $.alert('Details saved successfully');
                }else{
                   $("body").mLoading('hide');
                  // errmsg = "Alert</br>";
                  // errmsgcont = obj[0].StrErrorMsg;
                  // $.alert(errmsg,errmsgcont);
                  // return;
                  modalVT.style.display = "block";
                }
              } else {
                  $("body").mLoading('hide');
                  
                  errmsg = "Wrong MAWB number</br>";
                  errmsgcont = "Please enter a valid MAWB number</br>";
                  $.alert(errmsg,errmsgcont);
                  return;
              }
      
          },
          error: function (xhr, textStatus, errorThrown) {
              $("body").mLoading('hide');
              alert('Server not responding...');
          }
        });
        }
      }
      
      $("#btnEdit").click(function () {
        if(dockInStatus == "true"){
          errmsg = "Alert</br>";
              errmsgcont = "Dock In is performed, cannot edit the VT details.<br>";
              $.alert(errmsg,errmsgcont);
              return;
        }else{
        $('#tblVehicleInfo1 :input').removeAttr('disabled', 'disabled');
        $("#spnVTNO").attr('disabled', 'disabled');
        
        $("#btnEdit").hide();
        $("#btnUpdate").show();
     
        if(shipmentCount > 1){
          $("#AddVehicle").hide();
        }else{
          $("#AddVehicle").show();
        }
      }
     
      });

      $("#btnUpdate").click(function () {
        vehicleXml = "";
        
        console.log("globalCounter = ",window.globalCounter)
        var VTcount = window.globalCounter - 1;
        console.log("VT Object", VTcount)
        HouseObjectToUpdateVT = JSON.parse(localStorage.getItem('HouseObjectToUpdateVT'));
        var TotalNoP = localStorage.getItem('TotalNoP');
        var TotalGrWt = localStorage.getItem('TotalGrWt');
        console.log("HouseObjectToUpdateVT",HouseObjectToUpdateVT);

        if ((HouseObjectToUpdateVT.length == 1 && VTcount == 1) || (HouseObjectToUpdateVT.length > 1 && VTcount == 1))
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
              errmsgcont = "Please enter License Number.<br>";
              $.alert(errmsg,errmsgcont);
              return;
            }
            var DriverName = $(this).find("#driverName").val();
            if(DriverName ==""){
              errmsg = "Alert</br>";
              errmsgcont = "Please enter Driver Name.<br>";
              $.alert(errmsg,errmsgcont);
              return;
            }
            var DriverMobNo = $(this).find("#mobileNo").val();
            if(DriverMobNo ==""){
              errmsg = "Alert</br>";
              errmsgcont = "Please enter Mobile Number.<br>";
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
              errmsgcont = "Please enter valid pieces.<br>";
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
              errmsgcont = "Please select Cargo Type.<br>";
              $.alert(errmsg,errmsgcont);
              return;
            }
      
      
            HouseObjectToUpdateVT.forEach((element, i) => {
      
              console.log(element.MawbID); // 100, 200, 300
              console.log(i+1); // 0, 1, 2
              var index = 1;
              vehicleXml +=  "<InsertSBData><SBData><rowIndex>" + (index) + "</rowIndex><AWBid>" + element.MawbID + "</AWBid><BoEID>" + element.BOEID + "</BoEID><HAWBID>" + element.HawbID + "</HAWBID><OOCID>" + element.OOCID + "</OOCID><AllocateNOP>" + NoP + "</AllocateNOP><AllocateGrWt>" + GrWt + "</AllocateGrWt><GHAID>" + element.CustodianID + "</GHAID><VTROWID>" +  element.VTROWID + "</VTROWID><VehicleNo>" + VehicleNo + "</VehicleNo><DriverName>" + DriverName + "</DriverName><DriverCountryCode></DriverCountryCode><DriverMobileNo>" + DriverMobNo + "</DriverMobileNo><AgentMobileNo>" + DriverMobNo + "</AgentMobileNo><DriverLicense>" + LicenseNo + "</DriverLicense><NoOfPieces>" + NoP + "</NoOfPieces><GrossWeight>" + GrWt + "</GrossWeight><Unit>KGS</Unit><VehicleToken>" + VTNO + "</VehicleToken><Remarks></Remarks><VehicleCargoType>" + CargoType + "</VehicleCargoType><CustodianID>" + element.CustodianID + "</CustodianID></SBData></InsertSBData>";
          });
          console.log("vehicleXml == ",vehicleXml);
          updateVehicleToken();
          });
         
        });
      
        }else if(HouseObjectToUpdateVT.length == 1 && VTcount > 1){
          var TotalPieces = 0;
          var TotalGrossWt = 0;
          HouseObjectToUpdateVT.forEach((element, i) => {
      
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
                  errmsgcont = "Please enter License Number.<br>";
                  $.alert(errmsg,errmsgcont);
                  vehicleXml = "";
                  return;
                }
                var DriverName = $(this).find("#driverName").val();
                if(DriverName ==""){
                  errmsg = "Alert</br>";
                  errmsgcont = "Please enter Driver Name.<br>";
                  $.alert(errmsg,errmsgcont);
                  vehicleXml = "";
                  return;
                }
                var DriverMobNo = $(this).find("#mobileNo").val();
                if(DriverMobNo ==""){
                  errmsg = "Alert</br>";
                  errmsgcont = "Please enter Mobile Number.<br>";
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
                }
                var GrWt = $(this).find("#txtGrWt").val();
                if(GrWt ==""){
                  errmsg = "Alert</br>";
                  errmsgcont = "Please enter Gr Wt.<br>";
                  $.alert(errmsg,errmsgcont);
                  vehicleXml = "";
                  return;
                }
                var CargoType = $(this).find("#cargoType").val();
                if(CargoType ==""){
                  errmsg = "Alert</br>";
                  errmsgcont = "Please select Cargo Type.<br>";
                  $.alert(errmsg,errmsgcont);
                  vehicleXml = "";
                  return;
                }
                  TotalPieces += parseInt(NoP);
                  TotalGrossWt += parseFloat(GrWt);
                  if( index > 0){
                    element.VTROWID = 0;
                    VTNO = "";
                  }
              vehicleXml +=  "<InsertSBData><SBData><rowIndex>" + (index+1) + "</rowIndex><AWBid>" + element.MawbID + "</AWBid><BoEID>" + element.BOEID + "</BoEID><HAWBID>" + element.HawbID + "</HAWBID><OOCID>" + element.OOCID + "</OOCID><AllocateNOP>" + NoP + "</AllocateNOP><AllocateGrWt>" + GrWt + "</AllocateGrWt><GHAID>" + element.CustodianID + "</GHAID><VTROWID>" +  element.VTROWID + "</VTROWID><VehicleNo>" + VehicleNo + "</VehicleNo><DriverName>" + DriverName + "</DriverName><DriverCountryCode></DriverCountryCode><DriverMobileNo>" + DriverMobNo + "</DriverMobileNo><AgentMobileNo>" + DriverMobNo + "</AgentMobileNo><DriverLicense>" + LicenseNo + "</DriverLicense><NoOfPieces>" + NoP + "</NoOfPieces><GrossWeight>" + GrWt + "</GrossWeight><Unit>KGS</Unit><VehicleToken>" + VTNO + "</VehicleToken><Remarks></Remarks><VehicleCargoType>" + CargoType + "</VehicleCargoType></SBData></InsertSBData>";
            });

          });
        });
        if(TotalPieces != TotalNoP){
          errmsg = "Alert</br>";
          errmsgcont = "Please enter valid pieces.<br>";
          $.alert(errmsg,errmsgcont);
          vehicleXml = "";
          return;
        }
      
       if(TotalGrossWt != TotalGrWt){
          errmsg = "Alert</br>";
          errmsgcont = "Please enter valid Gr Wt.<br>";
          $.alert(errmsg,errmsgcont);
          vehicleXml = "";
          return;
        }
      
        console.log("vehicleXml == ",vehicleXml);
        updateVehicleToken();
      }
  
    
      });

      var i = 0;
      var vehicleXml = "";
      window.globalCounter = 2;

      AddVehicleTokenDetails = function()  {

        HouseObjectToUpdateVT = JSON.parse(localStorage.getItem('HouseObjectToUpdateVT'));
       
        console.log("HouseObjectToUpdateVT",HouseObjectToUpdateVT);
       
        if(HouseObjectToUpdateVT.length > 1){
       return;
        
        }
      
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
    }
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
      getVTHousegeneratedDetails = function(){

        var totalPieces = 0;
        var totalGrWt = 0;
        console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
        $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/ACS_IMP_Get_VTHAWB_DetailsOnly_Edit",
        data: JSON.stringify({ "MAWBID":MawbID,
                      "BOEID":BoEId,
                      "OrganizationBranchId":OrganizationBranchId,
                      "OrganizationId":OrganizationId,
                      "oocids":OoCId,
                      "VTNo" : VTNO
                      
                    }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            var obj = JSON.parse(response.d);
            console.log(response.d);
            console.log(obj);
           
            if (obj.length > 0) {
              localStorage.setItem('HouseObjectToUpdateVT',  JSON.stringify(obj));
              $.each(obj, function (i, d) {
                
                totalPieces += d.AllocatedNOP;
                totalGrWt += d.AllocatedGrossWeight;

               
               
                $("body").mLoading('hide');
                // $.alert('Details saved successfully');
              });
              console.log("pieces = ",totalPieces)
              localStorage.setItem('TotalNoP', totalPieces)
              console.log("pieces = ",totalGrWt)
              localStorage.setItem('TotalGrWt', totalGrWt)
            } else {
                $("body").mLoading('hide');
                
                errmsg = "Wrong MAWB number</br>";
                errmsgcont = "Please enter a valid MAWB number</br>";
                $.alert(errmsg,errmsgcont);
                return;
            }
    
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
      });
   
      }

      updateVehicleToken = function () {
        $('body').mLoading({
          text: "Please Wait..",
      });
      $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/ACS_IMP_Updates_VehicleToken",
        data: JSON.stringify({
            "BoEDataXML":vehicleXml,
            "CreatedByUserId":CreatedByUserId,
            "strOutMsg":"",
            "VTNos":""
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
               window.location.href = "IMP_FinalVTList.html";
                //makeCode();
                $("body").mLoading('hide');
                // $.alert('Details saved successfully');
              }else{
              
                errmsg = "Alert</br>";
                errmsgcont = obj[0].ERRORMSG;
                $.alert(errmsg,errmsgcont);
                return;
     
              }
            }else {
                $("body").mLoading('hide');
                
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

  