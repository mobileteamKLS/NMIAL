
var LocationName = localStorage.getItem('LocationName');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');

var GHACreatedByUserId = localStorage.getItem('TSMCreatedByUserId');
var GHAOrganizationBranchId = localStorage.getItem('TSMOrganizationBranchId');
var GHAOrganizationId = localStorage.getItem('TSMOrganizationId');

var FFCreatedByUserId = localStorage.getItem('FFCreatedByUserId');
var FFOrganizationBranchId = localStorage.getItem('FFOrganizationBranchId');
var FFOrganizationId = localStorage.getItem('FFOrganizationId');

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
var HouseObjectToGenerateVT =localStorage.getItem('HouseObjectToGenerateVT');
var FinalVTList = JSON.parse(localStorage.getItem('FinalVTList'));


$(function () {
  $("#CTODot").css('background-color', '#00AAA2');
  $("#CTODot").css('border', '1px solid #00AAA2');
    $("#AlloDot").css('background-color', '#00AAA2');
    $("#AlloDot").css('border', '1px solid #00AAA2');
    $("#slotDot").css('background-color', '#00AAA2');
    $("#slotDot").css('border', '1px solid #00AAA2');
    $("#AssDot").css('background-color', '#00AAA2');
    $("#AssDot").css('border', '1px solid #00AAA2');
    $("#GenDot").css('background-color', '#00AAA2');
    $("#GenDot").css('border', '1px solid #00AAA2');
    // if(HouseObjectToGenerateVT){
    //   if(HouseObjectToGenerateVT.length > 1){

        var uniqueIds = [];
        var unique = FinalVTList.filter(element => {
        var isDuplicate = uniqueIds.includes(element.TOKENNO);

          if (!isDuplicate) {
            uniqueIds.push(element.TOKENNO);
            return true;
          }
            return false;
        });
            console.log(unique);
            generateVTPrint(unique[0].TOKENNO,unique[0].SBID);
            setTimeout(function() {
              
              FillControl(unique);
            }, 1800);
       


  
  });
      
      function logOut() {
      modal.style.display = "block";
    }
    
    function exitModal() {
      modal.style.display = "none";
    }
    function back() {
  
      // modal.style.display = "block";
      window.location.href = "EXP_AssignVehicle.html";
    }
    function backButtonShipment(){
  
        window.location.href = "EXP_ShipmentDetails.html";
      }
      function backButtonExports(){
    
          window.location.href = "dashboard-export.html"
      }
  var QRcount;
  var TokenNo;
  var SBID;
FillControl = function (obj) {
  $("#VTDetailsRow").empty();
    var count = 0;
    var row = "";
   
    if (obj.length > 0) {
      console.log(obj)
                  $.each(obj, function (i, d) {
                    var QRid = "qrcode" + i.toString();
               QRcount = obj.length;
               TokenNo = d.TOKENNO;
               SBID = d.SBID;
                    row += "<div class='contacts row contacts__itemfortext' style='padding: 2px 8px !important;margin: 10px !important;'>";
                    row += "<table id='tblVehicleInfo1' class= 'vehicleDetails' width='100%' style='border: lightgrey 1px solid;'>";
                    row += "<tbody>";
                    row += "<tr class='table_row'>";
                    row += "<td class='spanTD'>Vehicle No.</td>";
                    row += "<td class='col2'><span id= 'vehicleNo'>" + d.VEHICLENO + "</span></td>";
                    row += "</tr>";
                    row += "<tr class='table_row'>";
                    row += "<td class='spanTD'>VT NO.</td>";
                    row += "<td class='col2'><span id= 'VtNo'>" + d.TOKENNO + "</span></td>";
                    row += "</tr>";
                    
                    row += "<tr class='table_row'>";
                    row += '<td class="spanTD" onclick="downloadPDF();"><i class="zmdi zmdi-download" id="iconsShareDownoad" style="margin-left: 30px;background-color: #00AAA2;color: white;height: 20px;width: 20px;border-radius: 50%;padding: 2px 5px;" ></i><input type="button"  id="btnClear" value="Download" style="border: none;width: 50%;background-color: white;font-weight: bold;" ></td>';
                    row += '<td class="col2" onclick="sharePDF();"><i class="zmdi zmdi-share" id="iconsShareDownoad" style="margin-left: 30px;background-color: #00AAA2;color: white;height: 20px;width: 20px;border-radius: 50%;padding: 2px 3px;" ></i> <input type="button"  id="btnClear" value="Share" style="color: #03b6ae;border: none;width: 30%;background-color: white;font-weight: bold;"></td>';
                    row += "</tr>";

                    row += "</tbody>";
                    row += "</table>";
                    row += "</div>";
                   
            
                    row += '</div>';
                    row += "<div class='qrcode' id='" + QRid + "' style='text-align: -webkit-center;' ></div>";
                  
                    count++;
              });
            
        $("#VTDetailsRow").append(row);
        // generateVTPrint(TokenNo,SBID);
    } else {
        $("body").mLoading('hide');
        $("#VTDetailsRow").html('There are no Vehicle Tokens available').css('color', '#f7347a');
    }

  }
  
  generateQRCodeData = function(){
    var ImageString = "";
    $.each(FinalVTList, function (i, d) {
      var QRid = "qrcode" + i.toString();
      var QR_CODE = new QRCode(QRid, {
                      width: 100,
                      height: 100,
                    });

       console.log(d.TOKENNO.toString())
            QR_CODE.makeCode(d.TOKENNO.toString());

            var VTNumber = d.TOKENNO.toString();
            var qrcode = document.getElementById(QRid)

            const img = qrcode.getElementsByTagName("img")[0];		
            const canvas = qrcode.getElementsByTagName("canvas")[0];
            const image = canvas.toDataURL("image/png", 1);
            ImageString = image.toString().replace("data:image/png;base64,","")
            console.log(image.toString())
            insertVTBarcode(ImageString,VTNumber);
    });
               
  }

  insertVTBarcode = function(image,VTNumber){

    $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_EXP_InsertVTBarCode",
      data: JSON.stringify({
        "ActualFileData":image,
        "FileExtension":".jpg",
        "VTNumber":VTNumber

        }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response, xhr, textStatus) {
          console.log(response);
      },
      error: function (xhr, textStatus, errorThrown) {
          $("body").mLoading('hide');
          alert('Server not responding...');
      }
    });
  }
  
 var VTPath;
  generateVTPrint = function(token,id){
    $('body').mLoading({
      text: "Please Wait..",
  });
    $.ajax({
      type: 'POST',
      url: TSMServiceUrl + "/ExportPrintVTCB",
      data: JSON.stringify({
        "AWBId": id,
        "VehicleTokenNo":token,
        "OrganizationID" : FFOrganizationId,
        "OrganizationBranchID" : FFOrganizationBranchId,
        "GHAOrganizationId":GHAOrganizationId,
        "GHABranchId":GHAOrganizationBranchId
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response, xhr, textStatus) {
       
          console.log(response);
          var obj = JSON.parse(response.d);
          console.log(response.d);
          console.log(obj);
 
            VTPath = obj.ErrorMSG;
             $("body").mLoading('hide');
             
      },
      error: function (xhr, textStatus, errorThrown) {
          $("body").mLoading('hide');
          alert('Server not responding...');
      }
    });
  }
  

  function downloadPDF() {
  
    // var path = "https://acssrvdev.kalelogistics.com/ACS_SAS_UAT_Upgrade/PDFFile/DOPrint_"+ number +".pdf";
    window.open(VTPath);
  }
  
  function sharePDF() {

    // var path = "https://bialsrvuat.cargobyblr.in/EDocket_BIAL/DOPrint_"+ number +".pdf";
    window.plugins.socialsharing.share('', 'Your PDF', VTPath)
  }