
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
var HouseObjectToGenerateVT =localStorage.getItem('HouseObjectToGenerateVT');
var FinalVTList = JSON.parse(localStorage.getItem('FinalVTList'));


$(function () {
  $("#CTODot").css('background-color', '#00AAA2');
    $("#AlloDot").css('background-color', '#00AAA2');
    $("#AssDot").css('background-color', '#00AAA2');
    $("#GenDot").css('background-color', '#00AAA2');
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
            FillControl(unique);


  
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
FillControl = function (obj) {
  $("#VTDetailsRow").empty();
    var count = 0;
    var row = "";
   
    if (obj.length > 0) {
      console.log(obj)
                  $.each(obj, function (i, d) {
                    var QRid = "qrcode" + i.toString();
               QRcount = obj.length;
                    var TokenNo = "'" + d.TOKENNO + "'"
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
                    row += "</tbody>";
                    row += "</table>";
                    row += "</div>";
                    row += "<div class='qrcode' id='" + QRid + "' style='text-align: -webkit-center;' ></div>";
                  
                    count++;
              });
            
        $("#VTDetailsRow").append(row);
        $("body").mLoading('hide');
    } else {
        $("body").mLoading('hide');
        $("#VTDetailsRow").html('There are no Vehicle Tokens available').css('color', '#f7347a');
    }
    generateQRCodeData();
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
  

  	downloadBtn.onclick = function (e) {
		const img = qrcode.getElementsByTagName("img")[0];		
    const canvas = qrcode.getElementsByTagName("canvas")[0];
    const image = canvas.toDataURL("image/png", 1);
    console.log(image)
    }
