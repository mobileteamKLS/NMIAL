
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
var CTOId = localStorage.getItem('ctoID');
var BoEId = localStorage.getItem('boeid');
var OoCId = localStorage.getItem('oocid');
var MawbID = localStorage.getItem('MawbRowId');
var VTNO = localStorage.getItem('VT');
var awbID = localStorage.getItem('awbID');
var sbID = localStorage.getItem('sbID');
var TSPSetting = localStorage.getItem('TSPSetting');
$(function () {
  $("#AlloDot").css('background-color', '#00AAA2');
  getVTHousegeneratedDetails();
  });
      
      function logOut() {
      modal.style.display = "block";
    }
    
    function exitModal() {
      modal.style.display = "none";
    }
    function back() {
  
      // modal.style.display = "block";
      window.location.href = "EXP_viewVehicleTokenDetails.html";
    }
    function goToAirIndiaAppCharges(){
  
      window.location.href = "EXP_selectHAWBtoVT.html";
    }
    function goToMenziesAppCharges(){
  
      window.location.href = "EXP_selectHAWBtoVT.html";
    }
    function backButtonShipment(){
  
      window.location.href = "EXP_ShipmentDetails.html";
    }
    function backButtonImports(){
  
        window.location.href = "dashboard-export.html"
    }
    
    getVTHousegeneratedDetails = function(){

      var totalPieces = 0;
      var totalGrWt = 0;
      console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
      $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_EXP_GetSBDetailsForGenerateTokenForEdit",
      data: JSON.stringify({ "OperationType":1,
                      "AirlinePrefix":AirlinePrefix,
                      "AwbNumber":AwbNumber,
                      "HawbNumber":HawbNumber,
                      "SBID":sbID,
                      "AWBID":awbID,
                      "OrganizationId":OrganizationId,
                      "OrganizationBranchId":OrganizationBranchId,
                      "VTNo" : VTNO
                  }),
       
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response, xhr, textStatus) {

        var input = response.d;
        console.log(response.d);
            const [VtDetails, shipmentDetails] = input.split('~');
            console.log(VtDetails); 
            console.log(shipmentDetails);
          var obj = JSON.parse(shipmentDetails);
          console.log(shipmentDetails);
          console.log(obj);
         
          if (obj.length > 0) {
            FillControl(obj);
            $("body").mLoading('hide');
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
    
    // getVTHousegeneratedDetails = function () {
    //     console.log(IGMNo + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    //     $.ajax({
    //         type: 'POST',
    //         url: ACSServiceURL + "/ACS_EXP_GetSBDetailsForGenerateToken",
    //         data: JSON.stringify({
    //             "OperationType":1,
    //             "AirlinePrefix":AirlinePrefix,
    //             "AwbNumber":AwbNumber,
    //             "HawbNumber":HawbNumber,
    //             "SBID":sbID,
    //             "AWBID":awbID,
    //             "OrganizationBranchId":OrganizationBranchId,
    //             "OrganizationId":OrganizationId,
    //             }),
    //         contentType: "application/json; charset=utf-8",
    //         dataType: "json",
    //         success: function (response, xhr, textStatus) {
    //             var obj = JSON.parse(response.d);
    //            console.log(response.d);
    //            console.log(obj);
    //             if (obj.length > 0) {
    //               if (obj[0].ERRORMSG == undefined) {
    //                 FillControl(response);
    //                // fillDriverImage(response);
    //                 $("body").mLoading('hide');
    //                 // $.alert('Details saved successfully');
    //               }else{
                  
    //                 errmsg = "Alert</br>";
    //                 errmsgcont = obj[0].ERRORMSG;
    //                 $.alert(errmsg,errmsgcont);
    //                 return;
         
    //               }
    //             } else {
    //                 $("body").mLoading('hide');
    //                 $("#tblAirWayBillInfo").hide();
    //                 $("#tblAirWayBillInfo1").hide();
    //                 errmsg = "Wrong MAWB number</br>";
    //                 errmsgcont = "Please enter a valid MAWB number</br>";
    //                 //$.alert(errmsg,errmsgcont);
    //                 return;
    //             }
      
    //         },
    //         error: function (xhr, textStatus, errorThrown) {
    //             $("body").mLoading('hide');
    //             alert('Server not responding...');
    //         }
    //     });
    //   }
      FillControl = function (obj) {
      
        
        var totalPieces = 0;
        var totalGrWt = 0;
        var count = 0;
        var row = "";
        if (obj.length > 0) {
                      $.each(obj, function (i, d) {
                    
                        var MawbNo = '"' + d.MAWBNumber + '"';
                        var AirlinePrefix = MawbNo.substring(1, 4);
                        var AwbNumber = MawbNo.substring(4, 12);
                        var MAWBNumber = AirlinePrefix.concat("-", AwbNumber);
  
                        totalPieces += d.SBNOP;
                        totalGrWt += d.SBGrossWeight;
  
                        row += "<div class='panel-group' id='accordion' role='tablist' aria-multiselectable='true'>";
                        row += "<div class= 'div-wrapper'>";
                        row += "<div class='panel-heading' role='tab' id='heading3' style='font-size: 17px;padding: 5px 10px 0px 10px;display: inline-flex;width: 100%;' data-toggle='collapse' data-parent='#accordion' href='#collapse"+ i +"' aria-expanded='true'>";
                        row += "<div class='col-4' style='padding: 0px !important;'>";
                        row += "<div class='form-group vtMargin' >";
                      //   if(d.HAWBNumber == null || d.HAWBNumber == "")
                      //   row += "<label class='lbl' style='font-size: 13px;font-weight: bold;'></label>";
                      //   else
                      if(TSPSetting == "M"){
                        row += "<label class='lbl' style='font-size: 13px;font-weight: bold;'></label>";
                      }else{
                        row += "<label class='lbl' style='font-size: 13px;font-weight: bold;'>" + d.SBNumber + "</label>";
                      }
                        row += "</div>";
                        row += "</div>";
                        row += "<div class='col-4' style='padding: 0px !important;'>";
                        row += "<div class='form-group vtMargin' >";
                        row += "<label class='lbl' style='font-size: 13px;font-weight: bold;'>" + d.MAWB + "</label>";
                        row += "</div>";
                        row += "</div>";
                     
                        row += "<div class='col-4'>";
                        row += "<div class='form-group'>";
                        row += "<button class='btn-arrow' data-toggle='collapse' data-parent='#accordion' href='#collapse"+ i +"' aria-expanded='true' aria-controls='collapse1' style='border: none;background-color: white;' onclick='getPickOrderDetails();'>";
                        row += "<i class='more-less zmdi zmdi-chevron-down' id='down-arrow' style='float: none !important;margin-right: 0px !important;font-size: 30px; color:#00AAA2;background-color: white;'></i>";
                        row += "</button>";
                        row += "</div>";
                        row += "</div>";
                        row += "</div>";
                        row += "<div id='collapse"+ i +"' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading3'>";
                        row += "<table style='width: 100%;'>";
                        row += "<thead><tr style='background-color: orange;font-size: 13px;height: 25px;'>";
                        if(TSPSetting == "M"){
                          row += "<th>MAWB Date</th>";
                        }else{
                          row += "<th>SB Date</th>";
                        }
                       
                        row += "<th> NOP</th>";
                        row += "<th>Gr.Wt.</th>";
                        row += "<th>Unit</th></tr>";
                        row += "</thead><tbody>";
                        row += "<tr style='text-align: center;font-size: 13px;height: 25px;'>";
                        if(TSPSetting == "M"){
                          row += "<td><span id=''>"+ d.SBDate +"</span></td>";
                        }else{
                          row += "<td><span id=''>"+ d.SBDate +"</span></td>";
                        }
                        row += "<td><span id=''>"+ d.SBNOP +"</span></td>";
                        row += "<td><span id=''>"+ (d.SBGrossWeight).toFixed(2) +"</span></td>";
                        row += "<td><span id=''>Kgs</span></td>";
                        row += "</tr></tbody></table>";
                        row += "<table><tbody>";
                        row += "<tr style='text-align: center;font-size: 13px;height: 25px;'>";
                        row += "<td><span id=''>Allocated NOP</span></td>";
                        row += "<td><span id=''>Allocated Gr.Wt.</span></td>";
                        row += "<td><span id='' style = 'margin-right: 13px'>Unit</span></td></tr>";
                        row += "<tr style='text-align: center;font-size: 13px;height: 25px;'>";
                        row += "<td><input type= 'number' id='' value= '"+ d.SBNOP +"' style='width: 70%;margin: 5px;' disabled/></td>";
                        row += "<td><input type= 'number' id='' value= '"+ (d.SBGrossWeight).toFixed(2) +"' style='width: 70%;margin: 5px;' disabled/></td>";
                        row += "<td ><span id='' style = 'margin-right: 13px'>Kgs</span></td>";
                        row += "</tr></tbody></table>";
                        row += "</div></div></div>";
  
                      count++;
                          
                  });
                
            $("#houseDetailsRow").append(row);
            $("body").mLoading('hide');
        } else {
            $("body").mLoading('hide');
            $("#houseDetailsRow").html('There are no Vehicle details available').css('color', '#f7347a');
        }
        console.log("pieces = ",totalPieces)
        localStorage.setItem('TotalNoP', totalPieces)
        console.log("pieces = ",totalGrWt)
        localStorage.setItem('TotalGrWt', totalGrWt)
      }
      
    
  
      
     