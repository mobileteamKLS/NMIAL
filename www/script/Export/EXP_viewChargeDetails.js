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
var isHouse = localStorage.getItem('isHouse');
var MawbID = localStorage.getItem('MawbRowId');
var HawbID = localStorage.getItem('HawbRowId');

var DOstatus = localStorage.getItem('DOstatus');
var DONumber = localStorage.getItem('DONo');
var MultipleSHC = localStorage.getItem('MultipleSHC');

var FlightNo = localStorage.getItem('FlightNo');
var FlightDate = localStorage.getItem('FlightDate');
var DOLevel = localStorage.getItem('DOLevel');
var DamagedNOP;
localStorage.setItem('FinalVTList',  "");

localStorage.setItem('HouseArrayData',"");
  localStorage.setItem('HouseObjectToGenerateVT',  "");
var GHAID;
var documentStorePath;
var pdfFileName;
var pdfFileSize;
var ft;
var ExamPiecesVal;
var CTOName;

var fileParm;
var fileUploadParm;
  var base64textString;
  var documentuploadobj = { };
  var CompanyIncoDocUploadModel;
  var docsStatus;
  var StatusOfdocs;
  var nfileLocation;
  var ActualFileData;
  var rejectedOperationType;
  var VehTokenNos;
  var TspStatus;
  var DOstatus;
  var boestatus;
  var oocstatus;
  var asistatus;
  var VTStatus;
  var BOEID;
  var OOCID;
  var OoCFilePath;
  var BoEFilePath;
  $(function () {

    if(DOstatus =="Completed"){
      getTSPDetailsApproved();
     }
     else if(DONumber){
      getTSPDetailsApproved();
    }
     else if(MultipleSHC !== "null"){
      if(MultipleSHC.includes("AVI") || MultipleSHC.includes("RMD") || MultipleSHC.includes("VAL")){
        getCTOStatusDetails();
        CheckTSPConfigurationSetting();
      }else{
        var CommodityGroup = "NA";
        var CommodityName = "NA";
        getTSPDetailsKaleGHA(CommodityGroup,CommodityName);
    
        $("#ddlCommodityNameList").html('<option>Select</option>').attr('disabled','disabled');  
      }
     }else{
      var CommodityGroup = "NA";
      var CommodityName = "NA";
      getTSPDetailsKaleGHA(CommodityGroup,CommodityName);
      // $("#ddlCommodityTypeList").html('<option>Select</option>').attr('disabled','disabled'); 
      $("#ddlCommodityNameList").html('<option>Select</option>').attr('disabled','disabled');  
     }

 if(DONumber)
 $("#DoNumber").text(DONumber);
 else
 $("#DoNumber").text("");


 if(isHouse == "true")
 $("#shipmentData").text(HawbNumber);
 else
 $("#shipmentData").text(MAWBNo);


$('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
  localStorage.setItem('activeTab', $(e.target).attr('href'));
});
var activeTab = localStorage.getItem('activeTab');
if(activeTab){
  $('#myTab a[href="' + activeTab + '"]').tab('show');
}
    
$("#txtBOEDate").datepicker({
  showOn: 'button',
  buttonImageOnly: true,
  buttonImage: 'img/Calendar_28x32.png',
  dateFormat: "dd M yy"
 });

 $("#spnOoCDate").datepicker({
  showOn: 'button',
  buttonImageOnly: true,
  buttonImage: 'img/Calendar_28x32.png',
  dateFormat: "dd M yy"
 });

 if( HawbNumber == "" || HawbNumber == null){
  $("#lblHouseMaster").hide();
  $("#lblHouse").hide();
   $("#txtHawbNo").hide();
   $("#lblHawb").hide();
   $("#dateAwb").text("MAWB Date");
   $("#accordionMawb").show();
 }else{
  $("#lblHouseMaster").show();
  $("#lblHouse").show();
 $("#dateAwb").text("HAWB Date");
 $("#accordionHawb").show();
 }

getDocumentStorePath();
const myTimeout = setTimeout(myFunction, 500);

function myFunction() {
  getBoEDetails();
  getPickOrderDetails();
  
  getOoCDetails();
  getAsiDetails();
 
  
}


});




function back() {
    window.location.href = "EXP_ShipmentDetails.html";
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

function selectCTO() {
  window.location.href = "IMP_SelectCTO.html";
}

function handleFileSelect(evt) {
  var files = evt.target.files;
  var file = files[0];
  if (files && file) {
    var reader = new FileReader();

    reader.onload = this._handleReaderLoaded.bind(this);

    reader.readAsBinaryString(file);

  }
}

function _handleReaderLoaded(readerEvt) {

  var binaryString = readerEvt.target.result;
  this.base64textString = btoa(binaryString);

  this.documentuploadobj.FileData = this.base64textString.toString(binaryString);

  console.log(this.documentuploadobj.FileData);

 ActualFileData = this.documentuploadobj.FileData;
 
}


function onFileSelected(event) {
  if (event.target.files.length > 0) {
    this.fileList = event.target.files[0].name;
  }
}

function readFile(event) {

  this.fileOC = event.target.files[0];
  console.log("file========", event.target.files[0]);

  this.fileName = this.fileOC.name;
  console.log("file Name========", this.fileName);
  const fsize = this.fileOC.size;
  this.fileSize = Math.round((fsize / 1024));
  console.log("file size ========", this.fileSize);
  // The size of the file.
  if (this.fileSize >= 2048) {
    this.fileList = '';
    $("#fileList").val(''); 
    $("#fileListOoC").val(''); 
    errmsg = "Alert</br>";
    errmsgcont = "Please select a file less than 2MB.</br>";
    $.alert(errmsg,errmsgcont);
    return;
  } else {

  }


}


function onSelectFile(event) {
  this.handleFileSelect(event);

  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url
    var file = event.target.files[0];

    documentuploadobj.FileName = event.target.files[0].name;
    documentuploadobj.FileSize = event.target.files[0].size;

    documentuploadobj.ActualFile = event.target.files[0];

    reader.onload = event => {
    };
  }
  console.log(JSON.stringify(documentuploadobj))
}


$('#removeFile').click(function () {
   $("#fileList").val("");
   $("#viewFile").text("");
}); 

$('#removeFileOoC').click(function () {
  $("#fileListOoC").val("");
  $("#viewFileOoC").val("");
}); 

onChangePaymentMode = function(){
  var paymentMode = $("#paymentMode").val();
  if(paymentMode == "Cash"){
    $("#btnPayTSP").val("Proceed");
  }else{
    $("#btnPayTSP").val("Pay Now");
  }
}

ImportListingPageDetails = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber, IGMNo, IGMYear, CreatedByUserId, OrganizationBranchId, OrganizationId) {
  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_Imp_ListingPage_details",
      data: JSON.stringify({ OperationType: OperationType, AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, IGMNo: IGMNo, IGMYear: IGMYear, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response, xhr, textStatus) {
          var obj = JSON.parse(response.d);
         console.log(response.d);
         console.log(obj);
          if (obj.length > 0) {
            if (obj[0].ERRORMSG == undefined) {
              $("#tblAirWayBillInfo").fadeIn('slow');
              $("#tblAirWayBillInfo1").show();
              console.log(response)
              localStorage.setItem('GhaName', obj[0].GHAName);
                GHAID = obj[0].GHAID;
               localStorage.setItem('ctoID', GHAID);
              localStorage.setItem('MawbRowId', obj[0].MAWBROWID);
              localStorage.setItem('HawbRowId', obj[0].HAWBROWID);
              localStorage.setItem('IgmRowId', obj[0].IGMROWID);

                  localStorage.setItem('HouseArrayData',obj[0].BoEID);
              $("#txtIGMNo").text(obj[0].IGMNo); 
              $("#txtIGMYear").text(obj[0].IGMYear); 
              $("#txtHawbNo").text(obj[0].HAWBNumber); 
              $("#txtMawbNo").text(obj[0].MAWBNumber.substring(0, 3) + "-" + obj[0].MAWBNumber.substring(3, obj[0].MAWBNumber.length));  
              $("#txtHawbDate").text(obj[0].HAWBDate.substring(0, 11)); 

              $("#txtFlightNo").text(obj[0].FlightNo);
              $("#txtFlightDate").text(obj[0].FlightDate.substring(0, 11));
             
              // $("#spnHawbNo").text(obj[0].HAWBNumber); 
              $("#spnPcsTotal").text(obj[0].HAWB_Total_Nop); 
              $("#spnPcsRcvd").text(obj[0].HAWB_Rcvd_Nop); 
          
              $("#spnPcsTotalMawb").text(obj[0].HAWB_Total_Nop); 
              $("#spnPcsRcvdMawb").text(obj[0].HAWB_Rcvd_Nop); 
         

              if( HawbNumber == "" || HawbNumber == null){
                $("#spnGrWtTotalMawb").text((obj[0].HAWB_Total_GrossWt).toFixed(2)); 
                $("#spnGrWtRcvdMawb").text((obj[0].HAWB_Rcvd_GrossWt).toFixed(2));
                $("#spnChWtTotalMawb").text((obj[0].HAWB_Total_ChargeWt).toFixed(2));  
              }else{
                $("#spnGrWtTotal").text((obj[0].HAWB_Total_GrossWt).toFixed(2)); 
                $("#spnGrWtRcvd").text((obj[0].HAWB_Rcvd_GrossWt).toFixed(2));
                $("#spnChWtTotal").text((obj[0].HAWB_Total_ChargeWt).toFixed(2));
              }
              boestatus = obj[0].BoEApproved;
              oocstatus = obj[0].OoCApproved;
              asistatus = obj[0].BoEASIStatus;
              VTStatus = obj[0].VTStatus;
             
              if(obj[0].BoEASIStatus == "Pending"){
                $("#btnSubmitAsi").removeAttr('disabled');
                $("#btnSubmitAsi").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
              }else{
                $("#btnSubmitAsi").attr('disabled', 'disabled');
                $("#btnSubmitAsi").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
              }

              if(obj[0].BoEApproved == "Approved"){
              $("#BoEStatus").text(obj[0].BoEApproved).css( "color", "#03b6ae" );
              $("#BoEStatusDate").text(obj[0].BoEDate.substring(0, 11));
              $("#BoEStatusTime").text(obj[0].BoEApprovedDatetime.substring(11, 16));}
              else if(obj[0].BoEApproved == "Pending"){
              $("#spnBoEMode").text("MANUAL"); 
              $("#BoEStatus").text(obj[0].BoEApproved).css( "color", "#ff9800" );
              $("#BoEStatusDate").text("--");
              }else{
                $("#BoEStatus").text(obj[0].BoEApproved).css( "color", "red" );
                $("#BoEStatusDate").text(obj[0].BoEDate.substring(0, 11));
                $("#BoEStatusTime").text(obj[0].BoEApprovedDatetime.substring(11, 16));
                $("#statusRowBoE").show(); 
                $("#spnStatusBoE").text(obj[0].BoEApproved).css( "color", "red" );
              }
             
              if(obj[0].OoCApproved == "Approved"){
                $("#OoCStatus").text(obj[0].OoCApproved).css( "color", "#03b6ae" );
                $("#OoCStatusDate").text(obj[0].OoCDate.substring(0, 11));
                $("#OoCStatusTime").text(obj[0].OoCApprovedDatetime.substring(11, 16));}
                else if(obj[0].OoCApproved == "Pending"){
                $("#spnOoCMode").text("MANUAL"); 
                $("#OoCStatus").text(obj[0].OoCApproved).css( "color", "#ff9800" );
                $("#OoCStatusDate").text("--");
                }else{
                  $("#OoCStatus").text(obj[0].OoCApproved).css( "color", "red" );
                  $("#OoCStatusDate").text(obj[0].OoCDate.substring(0, 11));
                  $("#OoCStatusTime").text(obj[0].OoCApprovedDatetime.substring(11, 16));
                  $("#statusRowOoC").show(); 
                  $("#spnStatusOoC").text(obj[0].OoCApproved).css( "color", "red" );
                }

                
               

                

              $("#AddChargeStatus").text(obj[0].AdditionalChargesStatus).css( "color", "#ff9800" );
             
              if(obj[0].BoEASIStatus == "Approved"){
                $("#BoEAsiStatus").text(obj[0].BoEASIStatus).css( "color", "#03b6ae" );
                $("#BoEAsiStatusDate").text(obj[0].BoEASIDateTime.substring(0, 11));
                  $("#BoEAsiStatusTime").text(obj[0].BoEASIDateTime.substring(11, 17));
               }
                else{
                $("#BoEAsiStatus").text(obj[0].BoEASIStatus).css( "color", "#ff9800" );
                $("#BoEAsiStatusDate").text("--");
                }

              

              if(obj[0].BoEApproved == "Approved"){
                $("#BoEDot").css('background-color', '#03b6ae');
                $("#BoEDot").css('border', '1px solid #03b6ae');
                $("#OoCDot").css('border', '1px solid orange');
                $('#accordionBoE :input').attr('disabled', 'disabled');
                $("#removeFile").attr('disabled', 'disabled'); 
                $("#btnClearBoE").attr('disabled', 'disabled'); 
                $('#accordionPOE :input').removeAttr('disabled', 'disabled');
                $("#btnPickorderSave").removeAttr('disabled');
                $("#btnPickorderSave").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
                $("#btnPickorderClear").removeAttr('disabled');
               
              }else{
                $("#BoEDot").css('background-color', '#f9f9f9');
                $("#BoEDot").css('border', '1px solid orange');
                $('#accordionBoE :input').removeAttr('disabled', 'disabled');
                $("#removeFile").removeAttr('disabled', 'disabled'); 
                $("#btnClearBoE").removeAttr('disabled');

                $('#accordionPOE :input').attr('disabled', 'disabled');
                $("#btnPickorderSave").attr('disabled', 'disabled');
                $("#btnPickorderSave").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
                $("#btnPickorderClear").attr('disabled', 'disabled'); 
                
              }

              if(obj[0].OoCApproved == "Approved"){
                $("#OoCDot").css('background-color', '#03b6ae');
                $("#OoCDot").css('border', '1px solid #03b6ae');
                $("#BoEASIDot").css('border', '1px solid orange');
                $('#accordionOoC :input').attr('disabled', 'disabled');
                $("#removeFileOoC").attr('disabled', 'disabled');
                $("#btnClearOoc").attr('disabled', 'disabled');
              
              }else{
                $("#OoCDot").css('background-color', '#f9f9f9');
                $('#accordionOoC :input').removeAttr('disabled', 'disabled');
                $("#removeFileOoC").removeAttr('disabled', 'disabled');
                $("#btnClearOoc").removeAttr('disabled');
              }

              if(obj[0].BoEASIStatus == "Pending"){
                $("#BoEASIDot").css('background-color', '#f9f9f9');
              }else{
                $("#BoEASIDot").css('background-color', '#03b6ae');
                $("#BoEASIDot").css('border', '1px solid #03b6ae');
                $("#GenerateDO").css('border', '1px solid orange');

              }
              if( HawbNumber == ""){
                if(obj[0].ADODONE == 1){
                  if(obj[0].BoEApproved == "Approved"){
                    $('#accordionBoE :input').attr('disabled', 'disabled');
                    $("#removeFile").attr('disabled', 'disabled'); 
                    $("#btnSubmitBoE").attr('disabled', 'disabled');
                    $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                  }
                  else {
                  if(obj[0].BoENumber && obj[0].BoEApproved == "Approved"){
                    $('#accordionBoE :input').attr('disabled', 'disabled');
                    $("#removeFile").attr('disabled', 'disabled'); 
                    $("#btnSubmitBoE").attr('disabled', 'disabled');
                    $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                  }else if(obj[0].BoENumber && obj[0].BoEApproved == "Pending"){
                    $('#accordionBoE :input').attr('disabled', 'disabled');
                    $("#removeFile").attr('disabled', 'disabled'); 
                    $("#btnSubmitBoE").attr('disabled', 'disabled');
                    $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                  }
                  else{
                    $(".ui-datepicker-trigger").show(); 
                    $('#accordionBoE :input').removeAttr('disabled', 'disabled');
                    $("#removeFile").removeAttr('disabled', 'disabled'); 
                    $("#btnSubmitBoE").removeAttr('disabled');
                    $("#btnSubmitBoE").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
                  }
                }
                  if(obj[0].OoCApproved == "Approved"){
                    $('#accordionOoC :input').attr('disabled', 'disabled');
                    $("#removeFileOoC").attr('disabled', 'disabled'); 
                    $("#btnSubmitOoC").attr('disabled', 'disabled');
                    $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                  }
                  else {
                  if(obj[0].OoCNumber && obj[0].OoCApproved == "Approved"){
                    $('#accordionOoC :input').attr('disabled', 'disabled');
                    $("#removeFileOoC").attr('disabled', 'disabled'); 
                    $("#btnSubmitOoC").attr('disabled', 'disabled');
                    $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                  }
                  else if(obj[0].OoCNumber && obj[0].OoCApproved == "Pending"){
                    $('#accordionOoC :input').attr('disabled', 'disabled');
                    $("#removeFileOoC").attr('disabled', 'disabled'); 
                    $("#btnSubmitOoC").attr('disabled', 'disabled');
                    $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                  }else{
                    $(".ui-datepicker-trigger").show(); 
                    $('#accordionOoC :input').removeAttr('disabled', 'disabled');
                    $("#removeFileOoC").removeAttr('disabled', 'disabled'); 
                    $("#btnSubmitOoC").removeAttr('disabled');
                    $("#btnSubmitOoC").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
                  }
                }
              }else{
                $('#accordionBoE :input').attr('disabled', 'disabled');
                $("#removeFile").attr('disabled', 'disabled'); 
                $("#btnSubmitBoE").attr('disabled', 'disabled');
                $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                $('#accordionOoC :input').attr('disabled', 'disabled');
                $("#removeFileOoC").attr('disabled', 'disabled'); 
                $("#btnSubmitOoC").attr('disabled', 'disabled');
                $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
              }
              }else{
                if(obj[0].CDODONE == true && obj[0].ADODONE == 1){

                  if(obj[0].BoEApproved == "Approved"){
                    $('#accordionBoE :input').attr('disabled', 'disabled');
                    $("#removeFile").attr('disabled', 'disabled'); 
                    $("#btnSubmitBoE").attr('disabled', 'disabled');
                    $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                  }
                  else {
                  if(obj[0].BoENumber  && obj[0].BoEApproved == "Approved"){
                    $('#accordionBoE :input').attr('disabled', 'disabled');
                    $("#removeFile").attr('disabled', 'disabled'); 
                    $("#btnSubmitBoE").attr('disabled', 'disabled');
                    $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                  }
                  else if(obj[0].BoENumber && obj[0].BoEApproved == "Pending"){
                    $('#accordionBoE :input').attr('disabled', 'disabled');
                    $("#removeFile").attr('disabled', 'disabled'); 
                    $("#btnSubmitBoE").attr('disabled', 'disabled');
                    $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                  }else{
                    $(".ui-datepicker-trigger").show(); 
                    $('#accordionBoE :input').removeAttr('disabled', 'disabled');
                    $("#removeFile").removeAttr('disabled', 'disabled'); 
                    $("#btnSubmitBoE").removeAttr('disabled');
                    $("#btnSubmitBoE").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
                  }
                }
                  if(obj[0].OoCApproved == "Approved"){
                    $('#accordionOoC :input').attr('disabled', 'disabled');
                    $("#removeFileOoC").attr('disabled', 'disabled'); 
                    $("#btnSubmitOoC").attr('disabled', 'disabled');
                    $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                  }
                  else {
                  if(obj[0].OoCNumber && obj[0].OoCApproved == "Approved"){
                    $('#accordionOoC :input').attr('disabled', 'disabled');
                    $("#removeFileOoC").attr('disabled', 'disabled'); 
                    $("#btnSubmitOoC").attr('disabled', 'disabled');
                    $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                  }
                  else if(obj[0].OoCNumber && obj[0].OoCApproved == "Pending"){
                      $('#accordionOoC :input').attr('disabled', 'disabled');
                      $("#removeFileOoC").attr('disabled', 'disabled'); 
                      $("#btnSubmitOoC").attr('disabled', 'disabled');
                      $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                    }else{
                    $(".ui-datepicker-trigger").show(); 
                    $('#accordionOoC :input').removeAttr('disabled', 'disabled');
                    $("#removeFileOoC").removeAttr('disabled', 'disabled'); 
                    $("#btnSubmitOoC").removeAttr('disabled');
                    $("#btnSubmitOoC").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
                  }
                }
              }else{
                $('#accordionBoE :input').attr('disabled', 'disabled');
                $("#removeFile").attr('disabled', 'disabled'); 
                $("#btnSubmitBoE").attr('disabled', 'disabled');
                $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                $('#accordionOoC :input').attr('disabled', 'disabled');
                $("#removeFileOoC").attr('disabled', 'disabled'); 
                $("#btnSubmitOoC").attr('disabled', 'disabled');
                $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
              }
              }
              
              // if(obj[0].OoCApproved == "Rejected" || obj[0].BoEApproved == "Rejected"){
              //   $("#btnSubmitOoC").removeAttr('disabled');
              //   $("#btnSubmitOoC").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
              //   $("#btnSubmitBoE").removeAttr('disabled');
              //   $("#btnSubmitBoE").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
              
              // }

              if(obj[0].BoEApproved == "Pending"){
                $('#accordionOoC :input').attr('disabled', 'disabled');
                $("#removeFileOoC").attr('disabled', 'disabled'); 
                $("#btnSubmitOoC").attr('disabled', 'disabled');
                $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
               
              }else if(obj[0].BoEApproved == "Approved" && (obj[0].OoCApproved == "Pending") && (!obj[0].OoCNumber )){
                $(".ui-datepicker-trigger").show(); 
                $('#accordionOoC :input').removeAttr('disabled', 'disabled');
                $("#removeFileOoC").removeAttr('disabled', 'disabled'); 
                $("#btnSubmitOoC").removeAttr('disabled');
                $("#btnSubmitOoC").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
                
              }   else if(obj[0].BoEApproved == "Approved" && (obj[0].OoCApproved == "Rejected") && (obj[0].OoCNumber )){
              $(".ui-datepicker-trigger").show(); 
              $('#accordionOoC :input').removeAttr('disabled', 'disabled');
              $("#removeFileOoC").removeAttr('disabled', 'disabled'); 
              $("#btnSubmitOoC").removeAttr('disabled');
              $("#btnSubmitOoC").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
            }
              else{
                $('#accordionOoC :input').attr('disabled', 'disabled');
                $("#removeFileOoC").attr('disabled', 'disabled'); 
                $("#btnSubmitOoC").attr('disabled', 'disabled');
                $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
              }

               if(obj[0].BoEApproved == "Rejected"){
                  document.getElementById("btnSubmitBoE").value = "Re-submit";
               }else if(obj[0].OoCApproved == "Rejected" ){
                   document.getElementById("btnSubmitOoC").value = "Re-submit";
               }

              if(obj[0].DOstatus == "Completed"){
                $("#DODot").css('background-color', '#03b6ae');
                $("#DODot").css('border', '1px solid #03b6ae');
                $("#AssignCLAgntDot").css('border', '1px solid orange');
                DOstatus = "Completed";
                $("#DOStatus").text((obj[0].TSPPayableAmount).toFixed(2)).css( "color", "#03b6ae" );
                $("#DOStatusDate").text(obj[0].TspDateTime.substring(0, 11));
                  $("#DOStatusTime").text(obj[0].TspDateTime.substring(11, 17));
               }else{
                  $("#DOStatus").text(obj[0].TspStatus).css( "color", "#ff9800" );
                  $("#TSPDot").css('background-color', '#f9f9f9');
                $("#DOStatusDate").text("--");
                }
            if(obj[0].VTStatus == "Approved" || obj[0].VTStatus == "Generated"){
              VehTokenNos = obj[0].VehicleTokenNo;
              localStorage.setItem('VehTokenNos',VehTokenNos);
              //VehTokenNos = "IVT2203100543,IVT2203100543";
              $("#VTDot").css('background-color', '#03b6ae');
              $("#VTDot").css('border', '1px solid #03b6ae');
              $("#VTStatus").text(obj[0].VTStatus).css( "color", "#03b6ae" );
              $("#VTStatusDate").text(obj[0].VTDateTime.substring(0, 11));
              $("#VTStatusTime").text(obj[0].VTDateTime.substring(11, 17));}
              
              else{
                $("#VTDot").css('background-color', '#f9f9f9');
                $("#VTStatus").text(obj[0].VTStatus).css( "color", "#ff9800" );
              $("#VTStatusDate").text("--");
              }
          
            $("#AddChargeStatus").text(obj[0].AdditionalChargesStatus).css( "color", "#ff9800" );

            if(obj[0].PickOrderStatus == "Approved" || obj[0].PickOrderStatus == "Completed"  || obj[0].PickOrderStatus == "Generated"){
              $("#PickorderStatus").text(obj[0].PickOrderStatus).css( "color", "#03b6ae" );
              $("#PickorderStatusDate").text(obj[0].PickOrderDate.substring(0, 11));
              $("#PickorderStatusTime").text(obj[0].PickOrderDate.substring(11, 17));
              $('#accordionPOE :input').attr('disabled', 'disabled');
              $("#btnPickorderSave").attr('disabled', 'disabled');
              $("#btnPickorderSave").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
              $("#btnPickorderClear").attr('disabled', 'disabled'); 
          
            }
            else if(obj[0].BoEApproved == "Pending" || obj[0].BoEApproved == "Rejected"){
              $("#PickorderStatus").text(obj[0].PickOrderStatus).css( "color", "#ff9800" );
              $("#PickorderStatusDate").text("--");
              $('#accordionPOE :input').attr('disabled', 'disabled');
            $("#btnPickorderSave").attr('disabled', 'disabled');
            $("#btnPickorderSave").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
            $("#btnPickorderClear").attr('disabled', 'disabled'); 
          }
          else{
            $("#PickorderStatus").text(obj[0].PickOrderStatus).css( "color", "#ff9800" );
            $("#PickorderStatusDate").text("--");
            $('#accordionPOE :input').removeAttr('disabled', 'disabled');
            $("#btnPickorderSave").removeAttr('disabled');
            $("#btnPickorderSave").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
            $("#btnPickorderClear").removeAttr('disabled');
          }
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
              $("#tblAirWayBillInfo1").hide();
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

getTSPDetailsApproved = function(){
  $('body').mLoading({
    text: "Please Wait..",
});

if(isHouse == "true")
$("#shipmentDataAfterGenerate").text(HawbNumber);
else
$("#shipmentDataAfterGenerate").text(MAWBNo);

if(DONumber)
$("#DoNumberAfterGenerate").text(DONumber);
else
$("#DoNumberAfterGenerate").text("");
if(isHouse == "true"){
  var house = HawbNumber;
  var houseID = HawbID
}else{
  var houseID = 0;
  var house = "";}
$("#viewList").empty();
  var boENum=  $("#txtBOENo").val(); 

  console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
  type: 'POST',
  url: ACSServiceURL + "/ACS_IMP_TSPGetDetails_SAS",
  data: JSON.stringify({
      "OperationType":1,
      "AirlinePrefix":AirlinePrefix,
      "AwbNumber":AwbNumber,
      "HawbNumber":house, //IF HAWB IS THERE THEN SEND
      "IGMNo":0,
      "IGMYear":0,
      "BoENumber":0,
      "CreatedByUserId":CreatedByUserId,
      "OrganizationBranchId":OrganizationBranchId,
      "OrganizationId":OrganizationId,
      "CommodityGroup":"",
      "CommodityName":"",
      "MAWBID":MawbID,
      "HAWBID":houseID
      }
      
    ),
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: function (response, xhr, textStatus) {
    var obj = JSON.parse(response.d);
   console.log(response.d);
   console.log(obj);
    if (obj.length > 0) {
      if (obj[0].strErrorMsg == undefined) {
         xmlDoc = $.parseXML( obj[0].ClientResponseXML),

        console.log(obj[0].MultipleSHC);
        var MultipleSHC = obj[0].MultipleSHC;
       // var arr = MultipleSHC.split(",");
        if(MultipleSHC){
          if(MultipleSHC.includes("AVI") || MultipleSHC.includes("RMD") || MultipleSHC.includes("VAL")){
            $("#ddlCommodityTypeListAfterGenerate").html('<option>' + obj[0].CargoType + '</option>'); 
            $("#ddlCommodityNameListAfterGenerate").html('<option>' + $(xmlDoc).find('CommodityDesc').text() + '</option>'); 
          }else{
            $("#ddlCommodityTypeListAfterGenerate").html('<option value='+ obj[0].CargoType +'>'+ obj[0].CargoType +'</option>').attr('disabled','disabled'); 
            $("#ddlCommodityNameListAfterGenerate").html('<option>Select</option>').attr('disabled','disabled');  
          }
        }else{
          $("#ddlCommodityTypeListAfterGenerate").html('<option value='+ obj[0].CargoType +'>'+ obj[0].CargoType +'</option>').attr('disabled','disabled'); 
          $("#ddlCommodityNameListAfterGenerate").html('<option>Select</option>').attr('disabled','disabled'); 
        }
        $("#HSNCode").hide();
        $("#hsnCode").hide();
          $("#HSNCode").val(obj[0].HSNCode1).attr('disabled','disabled');
          $("#payModeAfterGenerate").text(obj[0].PaymentMode); 
          $("#TSPCommCodeAfterGenerate").text((obj[0].CommodityCode));
          $("#TSPFlightNoDate").text((FlightNo +" / "+  FlightDate));
          $("#TSPFlightNoDate").hide();
          $("#lblFlightNo").hide();
          $("#approvedDiv").show();
          $("#tblDOInfo").hide();
          
          

          $("#PDAccNoAfterGenerate").text($(xmlDoc).find('PDAccountNo').text()); 
          $("#CTOPDBalanceAfterGenerate").text(Number($(xmlDoc).find('PDBalance').text()).toFixed(2)); 
          $("#TSPPayAmountAfterGenerate").text(Number($(xmlDoc).find('PayableAmount').text()).toFixed(2)); 
       
          $("#tblChargeDetails").hide(); 
          $("#proceedBtn").hide(); 
          $("#passwordTag").hide(); 
          
          
          $("#btnPayTSP").attr('disabled', 'disabled'); 
          $("#btnPayTSP").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
         
         
       
   
          // if(CTOName == "KALE_GHA"){
          //   $eventItem = $(xmlDoc).find("clsImpChargeDetails");  
          // }else{
          //   $eventItem = $(xmlDoc).find("clsChargeDetails");  
          // }

          $eventItem = $(xmlDoc).find("clsImpChargeDetails");  
          var row = "";
          row += " <tr class=''>";
          $eventItem.each(function(index, element) {     
              row += "<td>" + ($(element).find('ChargeDescription').text()) + "</td>";
              row += "<td>" + parseInt($(element).find('TotalAmount').text()).toFixed(2) + "</td>";
              row += "<td>" + parseInt($(element).find('TaxAmount').text()).toFixed(2) + "</td>";
              var a = $(element).find('TotalAmount').text();
              var b = $(element).find('TaxAmount').text();
              var totalAmt = parseInt(a) + parseInt(b);
            
              row += "<td>" + totalAmt.toFixed(2) + "</td>";
              row += "</tr>";  
          });
               
          $("#viewList").append(row);
          $("body").mLoading('hide');
      }else{
       
        $("body").mLoading('hide');
        errmsg = "Alert</br>";
        errmsgcont = obj[0].strErrorMsg;
        $.alert(errmsg,errmsgcont);
        return;

      }
    } else {
        $("body").mLoading('hide');
       
        errmsg = "Wrong MAWB number</br>";
        errmsgcont = "Please enter a valid BoE number</br>";
      //  $.alert(errmsg,errmsgcont);
        return;
    }

},
error: function (xhr, textStatus, errorThrown) {
    $("body").mLoading('hide');
    alert('Server not responding...');
}
});
}




  FillMasterData = function(){
    $("#masterData").show();
    $("#masterData").empty();

    var boENum=  $("#txtBOENo").val(); 

    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_IMP_TSPGetDetails",
    data: JSON.stringify({
        "OperationType":1,
        "AirlinePrefix":AirlinePrefix,
        "AwbNumber":AwbNumber,
        "HawbNumber":"", //IF HAWB IS THERE THEN SEND
        "IGMNo":IGMNo,
        "IGMYear":IGMYear,
        "BoENumber":0,
        "CreatedByUserId":CreatedByUserId,
        "OrganizationBranchId":OrganizationBranchId,
        "OrganizationId":OrganizationId,
        "CommodityGroup":"",
        "CommodityName":""
        }
        
      ),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
      var obj = JSON.parse(response.d);
      console.log(response.d);
      console.log(obj);
      var count = 0;
      var row = "";
       if (obj.length > 0) {
        var MAWBNo = obj[0].MAWBNo;
         if (obj[0].HAWBNo == null) {
          if(obj[0].IHM_DONO != null)
          var DOnum = obj[0].IHM_DONO;
          else
          var DOnum = "";
                row += " <div class= 'div-wrapper' style= 'background-color:#03b6ae !important'>";
                row += " <div onclick='goToMasterDetails(" + MAWBNo+ ")'>";
              
                row += " <h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;font-size: 13px;margin:0px !important'>" + MAWBNo+ "&nbsp;&nbsp;&nbsp;&nbsp;" + DOnum+ "</h5>";
                row += " <button id='' class='btn-arrow' style= 'float:right;margin :3px 10px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>";
                row += " </div>";
                row += " </div>";
                
         }else{
              
                row += " <div class= 'div-wrapper' style= 'background-color:#03b6ae !important'>";
                row += " <div onclick='goToMasterDetails(" + MAWBNo+ ")'>";
              
                row += " <h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;font-size: 13px;margin:0px !important'>" + MAWBNo+ "</h5>";
                row += " <button id='' class='btn-arrow' style= 'float:right;margin :3px 10px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>";
                row += " </div>";
                row += " </div>";
               $.each(obj, function (i, d) {
                if(d.IHM_DONO != null)
                var DOnumber = '"' + d.IHM_DONO + '"';
                else
                var DOnumber = "";
                row += " <div class= 'div-wrapper' style= 'background-color:#03b6ae !important'>";
                row += " <div onclick='goToMasterDetails(" + d.HAWBNo+ ")'>";
              
                row += " <h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;font-size: 13px;margin:0px !important'>" + d.HAWBNo+ "&nbsp;&nbsp;&nbsp;&nbsp;" + DOnumber+ "</h5>";
                row += " <button id='' class='btn-arrow' style= 'float:right;margin :3px 10px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>";
                row += " </div>";
                row += " </div>";
                  
                
                  count++;
                      
              });
         }
         $("#masterData").append(row);
              $("body").mLoading('hide');
       } else {
           $("body").mLoading('hide');
          
           errmsg = "Wrong MAWB number</br>";
           errmsgcont = "Please enter a valid BoE number</br>";
       //    $.alert(errmsg,errmsgcont);
           return;
       }
 
   },
   error: function (xhr, textStatus, errorThrown) {
       $("body").mLoading('hide');
       alert('Server not responding...');
   }
 });

        } 
      

   goToMasterDetails = function (number) {
          localStorage.setItem('hawbNo', number);
           console.log(number);
            window.location.href = 'IMP_DOPayment.html';
           
           
          // if (vtno.charAt(0) == 'E' || vtno.charAt(1) == 'E') {
          //     localStorage.setItem('Tab', 'Exports');
          // }else{
          //     localStorage.setItem('Tab', 'Imports');
          // }
          //window.location.href = 'IMP_viewVehicleTokenDetails.html';
      }
  getTspDetails = function(){
   var element = document.getElementById("heading6"); 
   var text = element.getAttribute("aria-expanded");
  // alert(text)

  if(text == "true"){
    if(asistatus == "Approved"){
        $('body').mLoading({
          text: "Please Wait..",
        });
              // if(DOstatus == "Approved"){
              //   var CommodityGroup = "";
              //   var CommodityName = "";
              FillMasterData();
              // }else{
              //   getCTOStatusDetails();
              // }
    }else{
          var disablePanel = true;  //or falsey value
          $("#accordionTSP").on('hide.bs.collapse show.bs.collapse',  PanelEvent);

    }    
  }
  function PanelEvent(e){
    $self = (this);  
    if(disablePanel){    
    e.preventDefault();    // this is the trick
    console.log("panel should not behave");
   }
  else{
    console.log("panel opens or closes!");
   }
  };
  }

   
 getTSPDetailsMABB = function(CommodityGroup,CommodityName){
  $('body').mLoading({
    text: "Please Wait..",
});
$("#viewList").empty();
  var boENum=  $("#txtBOENo").val(); 

  console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
  type: 'POST',
  url: ACSServiceURL + "/ACS_IMP_TSPGetDetails",
  data: JSON.stringify({
      "OperationType":1,
      "AirlinePrefix":AirlinePrefix,
      "AwbNumber":AwbNumber,
      "HawbNumber":HawbNumber, //IF HAWB IS THERE THEN SEND
      "IGMNo":IGMNo,
      "IGMYear":IGMYear,
      "BoENumber":boENum,
      "CreatedByUserId":CreatedByUserId,
      "OrganizationBranchId":OrganizationBranchId,
      "OrganizationId":OrganizationId,
      "CommodityGroup":CommodityGroup,
      "CommodityName":CommodityName
      }
      
    ),
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: function (response, xhr, textStatus) {
      var input = response.d;
      console.log(response.d);
      $("body").mLoading('hide');
          const [clientXml, id] = input.split('~');
          console.log(clientXml); 
          console.log(id);
          var fields = id.split('=');
          console.log(fields[1]);
          var payTspId = fields[1];
          localStorage.setItem('payTspId', payTspId);
          var obj = JSON.parse(clientXml);
          console.log(obj);
      console.log(obj.Status);
      if (obj.ErrorMessage == "" || obj.ErrorMessage == null) {
      $("#PDAccNo").text(obj["ReceiptDetails"].PDAccountNo); 
      $("#CTOPDBalance").text((obj["ReceiptDetails"].PDBalance).toFixed(2));  
      $("#TSPPayAmount").text((obj["ReceiptDetails"].PayableAmount).toFixed(2)); 
      $("#payMode").text(obj["ReceiptDetails"].PaymentMode); 
          var count = 0;
          var row = "";

      
        
          if (obj["ChargeDetails"].length > 0) {
            for(i = 0; i< obj["ChargeDetails"].length ; i++){
              
              row += " <tr class=''>";
              row += "<td>" + obj["ChargeDetails"][i].ChargeDescription + "</td>";
              row += "<td>" + (obj["ChargeDetails"][i].TotalAmount).toFixed(2) + "</td>";
              var gstAmount = obj["ChargeDetails"][i].CGSTAmount + obj["ChargeDetails"][i].IGSTAmount + obj["ChargeDetails"][i].SGSTAmount + obj["ChargeDetails"][i].UTGSTAmount;
              row += "<td>" + (gstAmount).toFixed(2) + "</td>";
              var totalAmt = gstAmount + (obj["ChargeDetails"][i].TotalAmount);
              row += "<td>" + totalAmt.toFixed(2) + "</td>";
              row += "</tr>";
             
              count++;
            }
              $("#viewList").append(row);
            } else {
                $("#viewList").html('There are no records').css('color', '#f7347a');
            }
      
          // console.log(response);
          // $("#ddlCommodityTypeList").html('<option>' + obj[0].CargoType + '</option>'); 
          // $("#ddlCommodityNameList").html('<option>' + obj[0].CommodityName + '</option>'); 
          // $("#HSNCode").val(obj[0].HSNCode); 
          // $("#payMode").text(obj[0].PaymentMode); 
          // $("#CTOPDBalance").text($(xml).find('PDBalance').text()); 
          // $("#TSPPayAmount").text($(xml).find('PayableAmount').text()); 
          
          // fillDriverImage(response);
          $("body").mLoading('hide');
          // $.alert('Details saved successfully');
        }else{
          $("#btnSubmitTSP").attr('disabled', 'disabled');
          $("#btnSubmitTSP").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
          
          errmsg = "Alert</br>";
          errmsgcont = obj.ErrorMessage;
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
  getTSPDetailsAISATS = function(CommodityGroup,CommodityName){
    $('body').mLoading({
      text: "Please Wait..",
  });
  $("#viewList").empty();
    var boENum=  $("#txtBOENo").val(); 
 
    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_IMP_TSPGetDetails",
    data: JSON.stringify({
        "OperationType":1,
        "AirlinePrefix":AirlinePrefix,
        "AwbNumber":AwbNumber,
        "HawbNumber":HawbNumber, //IF HAWB IS THERE THEN SEND
        "IGMNo":IGMNo,
        "IGMYear":IGMYear,
        "BoENumber":boENum,
        "CreatedByUserId":CreatedByUserId,
        "OrganizationBranchId":OrganizationBranchId,
        "OrganizationId":OrganizationId,
        "CommodityGroup":CommodityGroup,
        "CommodityName":CommodityName
        }
        
      ),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var input = response.d;
        console.log(response.d);
        $("body").mLoading('hide');
            const [clientXml, id] = input.split('~');
            console.log(clientXml); 
            console.log(id);
            var fields = id.split('=');
            console.log(fields[1]);
            var payTspId = fields[1];
            localStorage.setItem('payTspId', payTspId);
            var obj = JSON.parse(clientXml);
            console.log(obj);
            if (obj["IMPCHGCALCULATIONRESPONSE"][0].errorMessage == "" || obj["IMPCHGCALCULATIONRESPONSE"][0].errorMessage == null) {
            console.log(obj["IMPCHGCALCULATIONRESPONSE"][0].chargeDetails);
            console.log(obj["IMPCHGCALCULATIONRESPONSE"][0].receiptDetails.pdAccountNo);
            console.log(obj["IMPCHGCALCULATIONRESPONSE"][0].status);
            $("#PDAccNo").text(obj["IMPCHGCALCULATIONRESPONSE"][0].receiptDetails.pdAccountNo);
            $("#CTOPDBalance").text((obj["IMPCHGCALCULATIONRESPONSE"][0].receiptDetails.pdBalance).toFixed(2));  
            $("#TSPPayAmount").text((obj["IMPCHGCALCULATIONRESPONSE"][0].receiptDetails.payableAmount).toFixed(2));  
            $("#payMode").text(obj["IMPCHGCALCULATIONRESPONSE"][0].receiptDetails.paymentMode); 
            var count = 0;
            var row = "";
 
         
          
            if ((obj["IMPCHGCALCULATIONRESPONSE"][0].chargeDetails).length > 0) {
              for(i = 0; i< (obj["IMPCHGCALCULATIONRESPONSE"][0].chargeDetails).length ; i++){
                
                row += " <tr class=''>";
                row += "<td>" + obj["IMPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].chargeDescription + "</td>";
                row += "<td>" + (obj["IMPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].totalAmount).toFixed(2) + "</td>";
                var gstAmount = obj["IMPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].cgstAmount + obj["IMPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].sgstAmount + obj["IMPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].igstAmount + obj["IMPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].utgstAmount;
                row += "<td>" + (gstAmount).toFixed(2) + "</td>";
                var totalAmt = obj["IMPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].totalAmount + gstAmount;
                row += "<td>" + totalAmt.toFixed(2) + "</td>";
                row += "</tr>";
               
                count++;
              }
                $("#viewList").append(row);
              } else {
                  $("#viewList").html('There are no records').css('color', '#f7347a');
              }
        
            // console.log(response);
            // $("#ddlCommodityTypeList").html('<option>' + obj[0].CargoType + '</option>'); 
            // $("#ddlCommodityNameList").html('<option>' + obj[0].CommodityName + '</option>'); 
            // $("#HSNCode").val(obj[0].HSNCode); 
            // $("#payMode").text(obj[0].PaymentMode); 
            // $("#CTOPDBalance").text($(xml).find('PDBalance').text()); 
            // $("#TSPPayAmount").text($(xml).find('PayableAmount').text()); 
            
            // fillDriverImage(response);
            $("body").mLoading('hide');
            // $.alert('Details saved successfully');
          }else{
            $("#btnSubmitTSP").attr('disabled', 'disabled');
            $("#btnSubmitTSP").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
            errmsg = "Alert</br>";
            errmsgcont = obj["IMPCHGCALCULATIONRESPONSE"][0].errorMessage;
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
  getTSPDetailsKaleGHA = function(CommodityGroup,CommodityName){
    $('body').mLoading({
      text: "Please Wait..",
  });

      if(isHouse == "true"){
        var house = HawbNumber;
        var houseID = HawbID
      }else{
        var houseID = 0;
        var house = "";}
  $("#viewList").empty();
    var boENum=  $("#txtBOENo").val(); 

    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_IMP_TSPGetDetails_SAS",
    data: JSON.stringify({
        "OperationType":1,
        "AirlinePrefix":AirlinePrefix,
        "AwbNumber":AwbNumber,
        "HawbNumber":house, //IF HAWB IS THERE THEN SEND
        "IGMNo":0,
        "IGMYear":0,
        "BoENumber":0,
        "CreatedByUserId":CreatedByUserId,
        "OrganizationBranchId":OrganizationBranchId,
        "OrganizationId":OrganizationId,
        "CommodityGroup":CommodityGroup,
        "CommodityName":CommodityName,
        "MAWBID":MawbID,
        "HAWBID":houseID
        }
      ),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {

      var obj = JSON.parse(response.d);
     console.log(response.d);
     console.log(obj);
      if (obj.length > 0) {
        if (obj[0].Msg == undefined) {

          console.log(response);
          $("#HSNCode").val(obj[0].HSNCode); 
          $("#PDAccNo").text(obj[0].PDAccountNo);
          $("#payMode").text(obj[0].PaymentMode);
          $("#CTOPDBalance").text((obj[0].PDBalance));
          $("#TSPPayAmount").text((obj[0].PayableAmount));

          $("#TSPCommCode").text((obj[0].CommodityGroup));
          $("#TSPFlightNoDate").text((FlightNo +" / "+  FlightDate));
          $("#ddlCommodityTypeList").html('<option value='+ obj[0].CargoType +'>'+ obj[0].CargoType +'</option>').attr('disabled','disabled'); 
          // var ClientResponseXML = "<?xml version='1.0' encoding='utf-16'?><clsImpCalculationResponse xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema'><ReceiptDetails><PaymentMode>PDA</PaymentMode><PDAccountNo>123</PDAccountNo><TotalAmount>1100.25</TotalAmount><TotalTax>198.25</TotalTax><AdjustableAmount>0</AdjustableAmount><PayableAmount>1280.25</PayableAmount><PaidBy /><CreatedBy>ACS</CreatedBy><CreatedOn>2022-03-14T19:42:58.2960483+05:30</CreatedOn><Pieces>30</Pieces><GrossWeight>300.000</GrossWeight><ChargeableWeight>300.000</ChargeableWeight><PDBalance>10000</PDBalance><CommodityGroup>GEN</CommodityGroup><CommodityDesc>AUTO PARTS</CommodityDesc></ReceiptDetails><ChargeDetails><clsImpChargeCalculationResponse><ChargeCode>TER</ChargeCode><ChargeDescription>Terminal Charge</ChargeDescription><TotalAmount>800</TotalAmount><TaxAmount>144</TaxAmount><TaxCode /></clsImpChargeCalculationResponse><clsImpChargeCalculationResponse><ChargeCode>STP</ChargeCode><ChargeDescription>Strapping Charge</ChargeDescription><TotalAmount>200</TotalAmount><TaxAmount>36</TaxAmount><TaxCode /></clsImpChargeCalculationResponse><clsImpChargeCalculationResponse><ChargeCode>DEM</ChargeCode><ChargeDescription>Demurrage Charges</ChargeDescription><TotalAmount>100</TotalAmount><TaxAmount>18</TaxAmount><TaxCode /></clsImpChargeCalculationResponse></ChargeDetails><Status>0</Status></clsImpCalculationResponse>"
  
          //   xmlDoc = $.parseXML(ClientResponseXML);
            
          //   console.log(xmlDoc);
         
            // $("#tblChargeDetails").show(); 
            // $("#proceedBtn").hide(); 
            
            var row = "";
            row += " <tr class=''>";

            // $eventItem = $(xmlDoc).find("clsImpChargeCalculationResponse");  
  
            //$eventItem.each(function(index, element) {     
                row += "<td>" + obj[0].TChargeDescription + "</td>"; 
                row += "<td>" + parseInt(obj[0].TTotalAmount).toFixed(2) + "</td>";
                row += "<td>" + parseInt(obj[0].TTaxAmount).toFixed(2) + "</td>";
                var a = obj[0].TTotalAmount;
                var b = obj[0].TTaxAmount;
                var totalT = parseInt(a) + parseInt(b);
                row += "<td>" + totalT.toFixed(2)+ "</td>";
                row += "</tr>";  

                row += " <tr class=''>";
                row += "<td>" + obj[0].SChargeDescription + "</td>";
                row += "<td>" + parseInt(obj[0].STotalAmount).toFixed(2) + "</td>";
                row += "<td>" + parseInt(obj[0].STaxAmount).toFixed(2) + "</td>";
                var c = obj[0].STotalAmount;
                var d = obj[0].STaxAmount;
                var totalS = parseInt(c) + parseInt(d);
                row += "<td>" + totalS.toFixed(2)+ "</td>";
                row += "</tr>"; 
 
 

                var totalChrgeAmt = parseFloat(a) + parseFloat(c);
                var totalTaxAmt = parseFloat(b) + parseFloat(d);
                var totalAmt = parseFloat(totalT) + parseFloat(totalS);
          
  
                row += " <tr class=''>";   
                row += "<td>" + "Total Charges" + "</td>";
                row += "<td>" + totalChrgeAmt.toFixed(2) + "</td>";
                row += "<td>" + totalTaxAmt.toFixed(2) + "</td>";
         
                row += "<td>" + totalAmt.toFixed(2) + "</td>";
                row += "</tr>";  
            
                 
            $("#viewList").append(row);
            $("body").mLoading('hide');
 
          //getTSPDetailsKaleGHAXML();
            $("body").mLoading('hide');
        }else{
          $("#btnSubmitTSP").attr('disabled', 'disabled');
          $("#btnSubmitTSP").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
         $("body").mLoading('hide');
          errmsg = "Alert</br>";
          errmsgcont = obj[0].Msg;
           $.alert(errmsg,errmsgcont);
          return;
  
        }
      } else {
          $("body").mLoading('hide');
         
          errmsg = "Wrong MAWB number</br>";
          errmsgcont = "No valid Document</br>";
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
  getTSPDetailsKaleGHAXML = function(CommodityGroup,CommodityName){
    $('body').mLoading({
      text: "Please Wait..",
  });
  $("#viewList").empty();
    var boENum=  $("#txtBOENo").val(); 

    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_IMP_TSPGetDetails",
    data: JSON.stringify({
        "OperationType":1,
        "AirlinePrefix":AirlinePrefix,
        "AwbNumber":AwbNumber,
        "HawbNumber":HawbNumber, //IF HAWB IS THERE THEN SEND
        "IGMNo":IGMNo,
        "IGMYear":IGMYear,
        "BoENumber":boENum,
        "CreatedByUserId":CreatedByUserId,
        "OrganizationBranchId":OrganizationBranchId,
        "OrganizationId":OrganizationId,
        "CommodityGroup":CommodityGroup,
        "CommodityName":CommodityName
        }
        
      ),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {

      var obj = JSON.parse(response.d);
     console.log(response.d);
     console.log(obj);
      if (obj.length > 0) {
        if (obj[0].StrMessage == undefined) {

          var ClientResponseXML = "<ReceiptDetails><PaymentMode>PDA</PaymentMode><PDAccountNo>123</PDAccountNo><TotalAmount>1100.25</TotalAmount><TotalTax>198.25</TotalTax><AdjustableAmount>0</AdjustableAmount><PayableAmount>1280.25</PayableAmount><PaidBy /><CreatedBy>ACS</CreatedBy><CreatedOn>2022-03-14T19:42:58.2960483+05:30</CreatedOn><Pieces>30</Pieces><GrossWeight>300.000</GrossWeight><ChargeableWeight>300.000</ChargeableWeight><PDBalance>10000</PDBalance><CommodityGroup>GEN</CommodityGroup><CommodityDesc>AUTO PARTS</CommodityDesc></ReceiptDetails><ChargeDetails><clsImpChargeCalculationResponse><ChargeCode>TER</ChargeCode><ChargeDescription>Terminal Charge</ChargeDescription><TotalAmount>800</TotalAmount><TaxAmount>144</TaxAmount><TaxCode /></clsImpChargeCalculationResponse><clsImpChargeCalculationResponse><ChargeCode>STP</ChargeCode><ChargeDescription>Strapping Charge</ChargeDescription><TotalAmount>200</TotalAmount><TaxAmount>36</TaxAmount><TaxCode /></clsImpChargeCalculationResponse><clsImpChargeCalculationResponse><ChargeCode>DEM</ChargeCode><ChargeDescription>Demurrage Charges</ChargeDescription><TotalAmount>100</TotalAmount><TaxAmount>18</TaxAmount><TaxCode /></clsImpChargeCalculationResponse></ChargeDetails><Status>0</Status></clsImpCalculationResponse>"
   
          console.log(response);
     
            xmlDoc = $.parseXML(ClientResponseXML),
            
         
            // $("#tblChargeDetails").show(); 
            // $("#proceedBtn").hide(); 
            // $("#passwordTag").hide(); 
            
            
            $("#btnPayTSP").attr('disabled', 'disabled'); 
            $("#btnPayTSP").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
            var row = "";
            row += " <tr class=''>";

            $eventItem = $(xmlDoc).find("clsImpChargeCalculationResponse");  
  
            $eventItem.each(function(index, element) {     
                row += "<td>" + ($(element).find('ChargeDescription').text()) + "</td>";
                row += "<td>" + ($(element).find('TotalAmount').text()) + "</td>";
                row += "<td>" + ($(element).find('TaxAmount').text()) + "</td>";
                var totalAmt = $(element).find('TotalAmount').text().toString() + $(element).find('TaxAmount').text().toString();
                row += "<td>" + totalAmt + "</td>";
                row += "</tr>";  
            });
                 
            $("#viewList").append(row);
            $("body").mLoading('hide');
        }else{
         $("#fileListOoC").show(); 
         $("#fileDataOoC").hide(); 
         $("body").mLoading('hide');
          errmsg = "Alert</br>";
          errmsgcont = obj[0].StrMessage;
           $.alert(errmsg,errmsgcont);
          return;
  
        }
      } else {
          $("body").mLoading('hide');
         
          errmsg = "Wrong MAWB number</br>";
          errmsgcont = "No valid Document</br>";
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
 
  PayTSPDetails = function(){
    var paymentMode = $("#paymentMode").val();
    if($("#HSNCode").val() == "" ){
      $("body").mLoading('hide');
      errmsg = "Message</br>";
      errmsgcont = "Please enter HSN Code.</br>";
      $.alert(errmsg,errmsgcont);
      return;
    }
    if(paymentMode == "Cash"){
      
    }else{
      if($("#tspPassword").val() == "" ){
        $("body").mLoading('hide');
        errmsg = "Alert</br>";
        errmsgcont = "Please enter transaction password.</br>";
        $.alert(errmsg,errmsgcont);
        return;
      }
    }
   
    $('body').mLoading({
      text: "Please Wait..",
  });


  if(isHouse == "true"){
    var house = HawbNumber;
    var houseID = HawbID
  }else{
    var houseID = 0;
    var house = "";}

   var boENumber=  $("#txtBOENo").val(); 
    var boEDate = $("#txtBOEDate").val(); 
    var boEPcs = $("#txtBOEPcs").val(); 
    var boEGrWt = $("#txtBOEGrWt").val(); 
    var boEChWt = $("#txtBOEChWt").val();
    var HSNCode = $("#HSNCode").val(); 
    var payMode = $("#paymentMode").val(); 
    var password = $("#tspPassword").val(); 
    var RequestID = localStorage.getItem('payTspId');
    if(RequestID == null || RequestID == ""){
      RequestID = "12345";
    }
   var commodityType = $('#ddlCommodityTypeList :selected').text();

  var commodityTypeId = $('#ddlCommodityNameList :selected').val();
  if(commodityTypeId == "Select"){
    commodityTypeId = 0;
  }
  var commodityName = $('#ddlCommodityNameList :selected').text();
  if(commodityName == "Select"){
    commodityName = "NA";
  }
  var fields = commodityName.split(': ');
                  console.log(fields[1]);
                  var CommodityGroup = fields[1];
                  if(CommodityGroup == undefined){
                    CommodityGroup = "NA";
                  }

    $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_IMP_Insert_OR_Pay_TSPDetails_SAS",
      data: JSON.stringify(
        {
          "OperationType":1,
          "AirlinePrefix":AirlinePrefix,
          "AwbNumber":AwbNumber,
          "HawbNumber":house,
          "IGMNo":0,
          "IGMYear":0,
          "BoENumber":0,
          "CreatedByUserId":CreatedByUserId,
          "OrganizationBranchId":OrganizationBranchId,
          "OrganizationId":OrganizationId,
          "CommodityGroup":CommodityGroup,
          "CommodityName":commodityName,
          "mode":"I",
          "BoERcvPices":0,
          "BoERCVDGRWt":0,
          "BoEChWt":0,
          "HSNCode":HSNCode,
          "CommodityTypeID":commodityTypeId,
          "BoEID":MawbID,
          "RequestID":RequestID,
          "CalculationResponse":"",
          "Transactionpassword":password,
          "HAWBID":houseID,
          "PaymentMode":payMode
          }),
      
          
          
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
       console.log(response.d);
       console.log(obj);
        if (obj.length > 0) {
          if (obj[0].StrMessage == undefined) {
            console.log(response);
            $("body").mLoading('hide');
          }else{
            if(obj[0].StrMessage == "Transaction password is invalid."){
              $("body").mLoading('hide');
              errmsg = "Alert</br>";
              errmsgcont = obj[0].StrMessage;
              $.alert(errmsg,errmsgcont);
              return;
            }else{
           //ImportListingPageDetails('1', AirlinePrefix, AwbNumber, HawbNumber, IGMNo, IGMYear, CreatedByUserId, OrganizationBranchId, OrganizationId);
            getTSPDetailsApproved();
            $("body").mLoading('hide');
            errmsg = "Alert</br>";
            errmsgcont = obj[0].StrMessage;
            $.alert(errmsg,errmsgcont);
            const myTimeout = setTimeout(myFunction, 3000);
            function myFunction() {
              window.location.href = "IMP_ShipmentDetails.html";
            
            }
             
            return;
            }
          }
        } else {
            $("body").mLoading('hide');
            errmsg = "Wrong MAWB number</br>";
            errmsgcont = "Please enter a valid BoE number</br>";
            //$.alert(errmsg,errmsgcont);
            return;
        }
  
    },
    error: function (xhr, textStatus, errorThrown) {
        $("body").mLoading('hide');
        alert('Server not responding...');
    }
  });
  }

  getCTOStatusDetails = function(){
    
    var boENum=  $("#txtBOENo").val(); 
    if(boENum == "" || boENum == undefined || boENum == null){
      boENum = 0;
    }

    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_IMP_spAWB_GET_CTOStatus",
    data: JSON.stringify({
      "OperationType": 1,
      "AirlinePrefix":AirlinePrefix,
      "AwbNumber":AwbNumber,
      "HawbNumber":HawbNumber,
      "BoENumber":boENum,
      "Message":""
      }
      ),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
        console.log(response.d);
        console.log(obj);
        if (obj.length > 0) {
          if (obj[0].ERRORMSG == undefined) {
            console.log(response)

            checkCommodityNameandGroup();
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
  proceedTSPDetails = function(){
    if($("#viewList").val() == ""){
      $("#tblChargeDetails").show(); 
    }else{
      $("#tblChargeDetails").show(); 
    }
  }
  checkCommodityNameandGroup = function(){
    
    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_IMP_CheckCommodityNameandGroup",
    data: JSON.stringify({
        "OperationType":1,
        "AirlinePrefix":AirlinePrefix,
        "AwbNumber":AwbNumber,
        "HawbNumber":HawbNumber
        }
      ),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
        console.log(response.d);
        console.log(obj);
        if (obj.length > 0) {
          if (obj[0].ERRORMSG == undefined) {
            console.log(response)
            $("body").mLoading('hide');
            if(obj[0].CommodityGroup == null && obj[0].CommodityName == null  ){
              getCommodityTypeAndDescription();
            }else{
              var commoGrp = obj[0].CommodityGroup;
              var commoName = obj[0].CommodityName;
              getExistedCommodityTypeAndDescription(commoGrp,commoName);
            }
            
          }else{
            $("body").mLoading('hide');
            errmsg = "Alert</br>";
            errmsgcont = obj[0].ERRORMSG;
            $.alert(errmsg,errmsgcont);
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


  getCommodityTypeAndDescription = function(){
    
    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_IMP_Get_ComodityType_ComodityDescription",
    data: JSON.stringify({
      "OperationType":1,
      "AirlinePrefix":AirlinePrefix,
      "CategoryDescription":"",
      "CreatedByUserId":CreatedByUserId,
      "OrganizationId":OrganizationId,
      "OrganizationBranchId":OrganizationBranchId
      }
      
      ),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
        console.log(response.d);
        console.log(obj);
        if (obj.length > 0) {
          if (obj[0].ERRORMSG == undefined) {
            console.log(response)
            var s = '<option value="-1">Select</option>';
            for (var i = 0; i < obj.length; i++) {
     
                  s += '<option value = ' + obj[i].CommodityTypeId +'>' + obj[i].CategoryDescription + '</option>';
         
                  $("#ddlCommodityTypeList").html(s);
           
          }
           
            // $.alert('Details saved successfully');
          }else{
              
            errmsg = "Alert</br>";
            errmsgcont = obj[0].ERRORMSG;
            $.alert(errmsg,errmsgcont);
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

  getExistedCommodityTypeAndDescription = function(CommodityGroup,CommodityName){
    console.log(CommodityGroup);
    console.log(CommodityName);
    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_IMP_Get_IFEXIST_ComodityType_ComodityDescriptionForTSP",
    data: JSON.stringify({
      "OperationType":3,
      "AirlinePrefix":AirlinePrefix,
      "CommodityGroup":CommodityGroup,
      "CommodityName":CommodityName,
      "SelectedCommodityGroup":"",
      "SelectedCommodityName":"",
      "CreatedByUserId":CreatedByUserId,
      "OrganizationId":OrganizationId,
      "OrganizationBranchId":OrganizationBranchId
      }
      
      ),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
        console.log(response.d);
        console.log(obj);
        if (obj.length > 0) {
          if (obj[0].ERRORMSG == undefined) {
            console.log(response);
            if(obj.length == 1){
                  $("#ddlCommodityTypeList").html('<option value = ' + obj[0].CommodityTypeId +'>' + obj[0].CategoryDescription + '</option>');
                  $("#ddlCommodityNameList").html('<option value = ' + obj[0].CommodityTypeId +'>' + obj[0].NAME + '</option>');
                  $("#ddlCommodityTypeList").attr('disabled', 'disabled');
                  $("#ddlCommodityNameList").attr('disabled', 'disabled');

                  // var CommodityGroup = $('#ddlCommodityTypeList :selected').text();
                  var CommodityName = $('#ddlCommodityNameList :selected').text();
                  var fields = CommodityName.split(': ');
                  console.log(fields[1]);
                  var CommodityGroup = fields[1];
                  if(CTOName == "MABB")
                  getTSPDetailsMABB(CommodityGroup,CommodityName);
                  else if(CTOName == "AISATS")
                  getTSPDetailsAISATS(CommodityGroup,CommodityName);
                  else{
                  getTSPDetailsKaleGHA(CommodityGroup,CommodityName);
                  }
            }else{
              var type;
              var name;
              for (var i = 0; i < obj.length; i++) {
                  type += '<option value = ' + obj[i].CommodityTypeId +'>' + obj[i].CategoryDescription + '</option>';
                  $("#ddlCommodityTypeList").html(type);
                  name += '<option value = ' + obj[i].CommodityTypeId +'>' + obj[i].NAME + '</option>';
                  $("#ddlCommodityNameList").html(name);
                  $("#ddlCommodityTypeList").removeAttr('disabled');
                  $("#ddlCommodityNameList").removeAttr('disabled');
              }
              var CommodityName = $('#ddlCommodityNameList :selected').text();
              var field = CommodityName.split(': ');
              console.log(field[1]);
              var CommodityGroup = field[1];
              if(CTOName == "MABB")
                  getTSPDetailsMABB(CommodityGroup,CommodityName);
                  else if(CTOName == "AISATS")
                  getTSPDetailsAISATS(CommodityGroup,CommodityName);
                  else{
                  getTSPDetailsKaleGHA(CommodityGroup,CommodityName);
                  }
            }
            // $.alert('Details saved successfully');
          }else{
              
            errmsg = "Alert</br>";
            errmsgcont = obj[0].ERRORMSG;
            $.alert(errmsg,errmsgcont);
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
 
  getCommodityNameList = function(){
    if ($('#ddlCommodityTypeList').val() != '-1') {
      //$("#tblAirWayBillInfo").fadeOut();
      //$("#btndiv").fadeOut();
      //$("#btnSignDiv").fadeOut();
      var commodityType = $('#ddlCommodityTypeList :selected').text();
      var commodityTypeId = $('#ddlCommodityTypeList :selected').val();
      }

    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_IMP_Get_ComodityType_ComodityDescription",
      data: JSON.stringify({
        "OperationType":2,
        "AirlinePrefix":AirlinePrefix,
        "CategoryDescription":commodityType,
        "CreatedByUserId":CreatedByUserId,
        "OrganizationId":OrganizationId,
        "OrganizationBranchId":OrganizationBranchId
        }
      
      ),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
        console.log(response.d);
        console.log(obj);
        if (obj.length > 0) {
          if (obj[0].ERRORMSG == undefined) {
            console.log(response);
            var s = '<option value="-1">Select</option>';
            for (var i = 0; i < obj.length; i++) {
         
                  s += '<option value = ' + obj[i].CommodityTypeId +'>' + obj[i].Name + '</option>';
         
                  $("#ddlCommodityNameList").html(s);
           
          }


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
  onChangeCommodityName = function(){
    // var CommodityGroup = $('#ddlCommodityTypeList :selected').text();
    var CommodityName = $('#ddlCommodityNameList :selected').text();
    var fields = CommodityName.split(':');
            console.log(fields[1]);
            var CommodityGroup = fields[1];
            if(CTOName == "MABB")
            getTSPDetailsMABB(CommodityGroup,CommodityName);
            else if(CTOName == "AISATS")
                  getTSPDetailsAISATS(CommodityGroup,CommodityName);
                  else{
                  getTSPDetailsKaleGHA(CommodityGroup,CommodityName);
                  }
  }
 
  CheckTSPConfigurationSetting = function(){

    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_IMP_CheckTSPConfigurationSetting",
    data: JSON.stringify({ "AirlinePrefix":AirlinePrefix,
                  "AwbNumber":AwbNumber,
                  "OrganizationId":OrganizationId,
                  "OrganizationBranchId":OrganizationBranchId,
                  "mode": 'I'}),
   
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
        console.log(response.d);
        console.log(obj);
        if (obj.length > 0) {
          if (obj[0].Msg == undefined || obj[0].Msg == "") {
            if(obj[0].OrgName == "AISATS_BLR"){
              CTOName = "AISATS";
            }else if(obj[0].OrgName == "MABB_BLR"){
              CTOName = "MABB";
            }else{
              CTOName = "KALE_GHA";
            }
            console.log(response)
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

  setPickOrderDamageNoP = function(){
    var AwbNumber = MAWBNo.replace('-', '');
    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/UpdateWHLocationMABB",
    data: JSON.stringify({
                  "AwbNumber":AwbNumber,
                  "HawbNumber":HawbNumber,
                  "IGMNo":IGMNo,
                  "IGMYear": IGMYear}),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
        console.log(response.d);
        console.log(obj);
        if (obj.length > 0) {
          if (obj[0].status == "S") {
            var currXml = obj[0].strInputXML;
            xmlDoc = $.parseXML( currXml ),
            $xml = $( xmlDoc ),
            $details = $xml.find("Details"),
            $DamagedNOP = $details.attr("DamagedNOP");
        
            console.log($details);
            console.log($DamagedNOP);
            DamagedNOP = $DamagedNOP;
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

  getVTDetails = function(){
    var element = document.getElementById("heading7");
    var text = element.getAttribute("aria-expanded");
   // alert(text);
 
   if(text == "true"){
      if(VTStatus== "Pending" && TspStatus== "Approved" ){

        var disablePanel = true;  //or falsey value
        $("#accordionVT").on('hide.bs.collapse show.bs.collapse',  PanelEvent);

        window.location.href = "IMP_AllocateShipment.html";
      }
       else if(TspStatus== "Pending" ){
        var disablePanel = true;  //or falsey value
        $("#accordionVT").on('hide.bs.collapse show.bs.collapse',  PanelEvent);
              
     }else{
          console.log("VT Generated !!!!!!");
          if(VehTokenNos != ""){
          FillControlVTs();
          }
     }    
   }
   function PanelEvent(e){
     $self = (this);  
     if(disablePanel){    
     e.preventDefault();    // this is the trick
     console.log("panel should not behave");
    }
   else{
     console.log("panel opens or closes!");
    }
   };
   }

  FillControlVTs = function(){

    $("#VTlist").empty();
     
    var count = 0;
    var row = "";
    if (VehTokenNos.indexOf(',') > -1) 
    { 
      $("#VTlist").empty();
      var myarray = VehTokenNos.split(','); 
      for (var i = 0; i < myarray.length; i++) {

        if (myarray[i]) {

          var VT =  '"' + myarray[i] + '"';
                row += " <div class= 'div-wrapper' style= 'background-color:#03b6ae !important'>";
                row += " <div onclick='goToVTDetails(" + VT + ")'>";
              
                row += " <h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;margin-top:0px !important'>" + myarray[i] + "</h5>";
                row += " <button id='' class='btn-arrow' style= 'float:right;margin :10px 15px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>";
                row += " </div>";
                row += " </div>";

                count++;
            
            }
           
          }
        }
    else{
      $("#VTlist").empty();
      var myarray = '"' + VehTokenNos + '"';

                row += " <div class= 'div-wrapper' style= 'background-color:#03b6ae !important'>";
                row += " <div onclick='goToVTDetails(" + myarray + ")'>";

                row += " <h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;margin-top:0px !important'>" + VehTokenNos + "</h5>";
                row += " <button id='' class='btn-arrow' style= 'float:right;margin :10px 15px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>";
                row += " </div>";
                row += " </div>";
              
    }
    $("#VTlist").append(row);
    $("body").mLoading('hide');
        } 
     
        goToVTDetails = function (vt) {
          localStorage.setItem('VT', vt);
           console.log(vt)
          // if (vtno.charAt(0) == 'E' || vtno.charAt(1) == 'E') {
          //     localStorage.setItem('Tab', 'Exports');
          // }else{
          //     localStorage.setItem('Tab', 'Imports');
          // }
          window.location.href = 'IMP_viewVehicleTokenDetails.html';
      }

      getApplicableCharges = function(){
var row = "";
             
               for(var i = 0; i<1 ;i++){
                  // var CUSTODIAN = '"' + d.CUSTODIAN + '"';
                    
                  row += " <div class= 'div-wrapper' style= 'background-color:#03b6ae !important'>";
                  row += " <div onclick='goToChargeDetails()'>";
  
                  row += " <h5 class='' style='padding: 10px;display: inline-flex;color:white;'>Invoice No.</h5>";
                  row += " <h5 class='' style='padding: 10px;display: inline-flex;color:white;'>Total Charges(INR)</h5>";
                  row += " <h5 class='' style='padding: 10px;display: inline-flex;color:white;'>INV000001</h5>";
                  row += " <h5 class='' style='padding: 10px;display: inline-flex;color:white;'>844.00</h5>";

                  row += " <button id='' class='btn-arrow' style= 'float:right;margin :0px 15px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>";
                  row += " </div>";
                  row += " </div>";
    
                 
                
                }
                $("#appChargeslist").append(row);
                $("body").mLoading('hide');
      
        // $.ajax({
        //   type: 'POST',
        //   url: ACSServiceURL + "/ACS_IMP_GetCustodianDetails",
        //   data: JSON.stringify({"OperationType": 1 }),
        //   contentType: "application/json; charset=utf-8",
        //   dataType: "json",
        //   success: function (response, xhr, textStatus) {
        //       var obj = JSON.parse(response.d);
        //      console.log(response.d);
        //      console.log(obj);
    
        //      var count = 0;
        //      var row = "";
        //       if (obj.length > 0) {
             
        //         $.each(obj, function (i, d) {
        //           var CUSTODIAN = '"' + d.CUSTODIAN + '"';
                    
        //           row += " <div class= 'div-wrapper' style= 'background-color:#03b6ae !important'>";
        //           row += " <div onclick='goToVTDetails(" + myarray + ")'>";
  
        //           row += " <h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;'>" + VehTokenNos + "</h5>";
        //           row += " <button id='' class='btn-arrow' style= 'float:right;margin :10px 15px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>";
        //           row += " </div>";
        //           row += " </div>";
    
        //             count++;
                
        //         });
        //         $("#CTOlist").append(row);
        //         $("body").mLoading('hide');
        //     } else {
        //         $("body").mLoading('hide');
        //         $("#CTOlist").html('There are no active CTOs').css('color', '#f7347a');
        //     }
        // }
        // });
      }

  clearInputsBoE = function(){
    $("#txtBOENo").val(''); 
    $("#txtBOEDate").val(''); 
    $("#txtBOEPcs").val(''); 
    $("#txtBOEGrWt").val(''); 
    $("#txtBOEChWt").val(''); 
    $("#txtBOECAV").val(''); 
    $("#txtBOECode").val('');
    $("#fileList").val('');  

  }
  clearInputsOoC = function(){
    $("#spnOoCNo").val(''); 
    $("#spnOoCDate").val(''); 
    $("#txtOoCPcs").val(''); 
    $("#txtBOEPcsOoC").val('');    
    $("#fileListOoC").val('');
    
  }
  clearInputsPickOrder = function(){
    $("#spnPcsExam").val(''); 
    $("#spnRemarks").val(''); 
    
  }
  clearInputsBoEASI = function(){
    
  }

  clearTSPInputs  = function() {

    var sel ='<option value="-1">Select</option>';
    $("#ddlCommodityTypeList").html(sel);

    var select ='<option value="-1">Select</option>';
    $("#ddlCommodityNameList").html(select);
    $("#HSNCode").text(''); 
    $("#payMode").text(''); 
    $("#PDAccNo").text(''); 
    $("#LocationCode").text(''); 
    $("#CTOPDBalance").text(''); 
    $("#TSPPayAmount").text(''); 
    $("#TSPFlightNoDate").text(''); 
    $("#TSPCommCode").text(''); 
  }

  clearTSPDetails = function () {
    $("#tspPassword").val(''); 
  }

  function viewPassword() {
    var x = document.getElementById("tspPassword");
    if (x.type === "password") {
        $(".zmdi-eye").hide();
        $(".zmdi-eye-off").show();
      
        x.type = "text";
    } else {
        $(".zmdi-eye").show();
        $(".zmdi-eye-off").hide();
        x.type = "password";
    }
}

   

function downloadPDF() {
  if(DOLevel == "DOHAWBLevel"){
    var number = MAWBNo+ "_" + HawbNumber;
  }else{
    var number = MAWBNo;
  }
  var path = "https://acssrvdev.kalelogistics.com/ACS_SAS_UAT_Upgrade/PDFFile/DOPrint_"+ number +".pdf";
  window.open(path);
}

function sharePDF() {
  if(DOLevel == "DOHAWBLevel"){
    var number = MAWBNo+ "_" + HawbNumber;
  }else{
    var number = MAWBNo;
  }
  var path = "https://bialsrvuat.cargobyblr.in/EDocket_BIAL/DOPrint_"+ number +".pdf";
  window.plugins.socialsharing.share('Here is your PDF file', 'Your PDF', path)
}