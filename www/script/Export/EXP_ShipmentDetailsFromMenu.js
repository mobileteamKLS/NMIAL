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
var MenuTitle= localStorage.getItem('ExportsMenu');
var HawbNumber = localStorage.getItem('hawbNo');
var awbID = localStorage.getItem('awbID');
var sbID = localStorage.getItem('sbID');
var SBIddata = localStorage.getItem('SBdataList');
var SBNosdata = localStorage.getItem('SBNumbersList');

var TSPSetting = localStorage.getItem('TSPSetting');
console.log("SBNosdata =",SBNosdata);
var COStatus;

var SBNosdataArray;
var _SBNumber;
var _SBDate;
var ACSCurrentBalance;
var GHAID;
localStorage.setItem('FinalVTList',  "");

var errmsgcontSBASI;
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

var TspStatus;
var boestatus;
var oocstatus;
var asistatus;
var BOEID;
var OOCID;
  $(function () {
     
    if(MenuTitle == "SB ASI"){
      
      SBIdsdataArray = SBIddata.split(','); 
      SBNosdataArray = SBNosdata.split(','); 

      console.log(SBNosdataArray.length)
      sbID = SBIdsdataArray[0];
      console.log("SBNosdataArray =",SBNosdataArray);
      $("#viewSBlink").show();}
      else{
      $("#viewSBlink").hide();
      $("#accordionSB").show();
    }

    CheckTSPConfigurationSetting();

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
console.log(MenuTitle)
$("#MenuHeading").text(MenuTitle);

if(MenuTitle == "View SB Details"){
    $("#accordionSB").show(); 
}else if(MenuTitle == "SB ASI"){
    $("#accordionSBASI").show(); 
}else if(MenuTitle == "Pay TSP"){
  if(TSPSetting == "M"){
    $("#accordionSB").hide(); 
  }else{
    $("#accordionSB").show(); 
  }
    
    $("#accordionSBASI").hide();
    $("#ASIArrow").hide();  
    $("#accordionTSP").show(); 
}else if(MenuTitle == "Generate Vehicle Token"){
    $("#accordionVT").show(); 
}else{
    $("#accordionCharges").show(); 
}    
if(MenuTitle == "View SB Details"){

    }else{
      if(TSPSetting == "M"){
        HawbNumber = "";
        $("#lblSbNo").hide(); 
        $("#txtSBNo").hide(); 
        $("#lblSbDate").hide(); 
        $("#txtSBDate").hide(); 
        $("#accordionSBASI").hide(); 
      }else{
        // $("#accordionSBASI").show(); 
      }
    }

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

// getSBASIDetails();
// getBoEDetails();
if(MenuTitle == "View SB Details"){
  if(TSPSetting == "M"){
    ExportListingPageDetails('3', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId, awbID, sbID);
  }else{
    ExportListingPageDetails('2', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId, awbID, sbID);  }
}else
{ ExportListingPageDetails('2', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId, awbID, sbID);  }


// getDocumentStorePath();

// getPickOrderDetails();

// getOoCDetails();
// getAsiDetails();


});


function back() {
    window.location.href = "EXP_MenuSearch.html";
  }

  function backButton() {
    window.location.href = "dashboard-export.html";
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


ExportListingPageDetails = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber,CreatedByUserId, OrganizationBranchId, OrganizationId,awbId, sbID) {
  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_Exp_ListingPage",
      data: JSON.stringify({ OperationType: OperationType, AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId ,AWBID :awbId, SBID:sbID}),
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
              _SBNumber = obj[0].SBNumber;
              _SBDate = obj[0].SBDate;
              ACSCurrentBalance = obj[0].ACSCurrentBalance; 
              $("#txtCTO").text(obj[0].GHAName); 
              COStatus = obj[0].COStatus;
              if(MenuTitle == "SB ASI"){
                if(SBNosdataArray.length > 1){
                  $("#txtSBNo").text(_SBNumber + " + " + ((SBNosdataArray.length) -1)); 
                }
              else{
                $("#txtSBNo").text(_SBNumber); 
              }
            } else{
              $("#txtSBNo").text(_SBNumber); 
            }
              $("#txtSBDate").text(obj[0].SBDate); 

              $("#txtCTO").text(obj[0].GHAName); 
              localStorage.setItem('GhaName', obj[0].GHAName);
                GHAID = obj[0].GHAID;
               localStorage.setItem('GhaId', GHAID);

              $("#txtHawbNo").text(obj[0].HouseNo); 
              $("#txtMawbNo").text(obj[0].AirMawbNumber.substring(0, 3) + "-" + obj[0].AirMawbNumber.substring(3, obj[0].AirMawbNumber.length));  
              if(HawbNumber){
              $("#txtHawbDate").text(obj[0].HAWBDate.substring(0, 11)); }
              else{
                $("#txtHawbDate").text(obj[0].MAWBDate.substring(0, 11));
              
              }
          // $("#spnHawbNo").text(obj[0].HAWBNumber); 
          $("#spnPcsTotal").text(obj[0].HAWBNOP); 
          $("#spnPcsRcvd").text(obj[0].HAWBNOP); 
          if( HawbNumber == "" || HawbNumber == null){
                  if(TSPSetting == "M"){

                    if(MenuTitle == "View SB Details"){
                      $("#spnSBType").text(obj[0].SBType); 
                      $("#spnSBNoP").text(obj[0].SBNOP); 
                      $("#spnSBGrWt").text((obj[0].SBGrossWeight).toFixed(2));
                      $("#spnSBVolWt").text((obj[0].VolumetricWeight).toFixed(2)); 
                      $("#spnSBChWt").text((obj[0].VolumetricWeight).toFixed(2));
                      $("#spnPcsTotalMawb").text(obj[0].MAWBPcs); 
                      $("#spnPcsRcvdMawb").text(obj[0].MAWBPcs);  
                      $("#spnGrWtTotalMawb").text((obj[0].MAWBWeight).toFixed(2)); 
                      $("#spnGrWtRcvdMawb").text((obj[0].MAWBWeight).toFixed(2)); 
                      $("#spnChWtTotalMawb").text((obj[0].ChargeableWeight).toFixed(2));
                    }else{
            
                      $("#spnPcsTotalMawb").text(obj[0].MAWBPices); 
                      $("#spnPcsRcvdMawb").text(obj[0].MAWBPices); 
                      $("#spnGrWtTotalMawb").text((obj[0].MAWBGrossWeight).toFixed(2)); 
                      $("#spnGrWtRcvdMawb").text((obj[0].MAWBGrossWeight).toFixed(2)); 
                      $("#spnChWtTotalMawb").text((obj[0].MAWBChargableWeight).toFixed(2));
                    }
                   
                  }else{
                    $("#spnSBType").text(obj[0].SBType); 
                    $("#spnSBNoP").text(obj[0].SBNOP); 
                    $("#spnSBGrWt").text((obj[0].SBGrossWeight).toFixed(2));
                    $("#spnSBVolWt").text((obj[0].VolumetricWeight).toFixed(2)); 
                    $("#spnSBChWt").text((obj[0].ChargeableWeight).toFixed(2));
                    $("#spnPcsTotalMawb").text(obj[0].MAWBPcs); 
                    $("#spnPcsRcvdMawb").text(obj[0].MAWBPcs);  
                    $("#spnGrWtTotalMawb").text((obj[0].MAWBWeight).toFixed(2)); 
                    $("#spnGrWtRcvdMawb").text((obj[0].MAWBWeight).toFixed(2)); 
                    $("#spnChWtTotalMawb").text((obj[0].ChargeableWeight).toFixed(2));
                  }
          }
          else{

            if(TSPSetting == "M"){
              $("#spnSBType").text(obj[0].SBType); 
              $("#spnSBNoP").text(obj[0].SBNOP); 
              $("#spnSBGrWt").text((obj[0].SBGrossWeight).toFixed(2));
              $("#spnSBVolWt").text((obj[0].VolumetricWeight).toFixed(2)); 
              $("#spnSBChWt").text((obj[0].VolumetricWeight).toFixed(2)); 
              $("#spnGrWtTotal").text((obj[0].HAWBGrossWeight).toFixed(2));
              $("#spnGrWtRcvd").text((obj[0].HAWBGrossWeight).toFixed(2)); 
            }else{
                  $("#spnSBType").text(obj[0].SBType); 
                  $("#spnSBNoP").text(obj[0].SBNOP); 
                  $("#spnSBGrWt").text((obj[0].SBGrossWeight).toFixed(2));
                  $("#spnSBVolWt").text((obj[0].VolumetricWeight).toFixed(2)); 
                  $("#spnSBChWt").text((obj[0].ChargeableWeight).toFixed(2)); 
                  $("#spnGrWtTotal").text((obj[0].HAWBGrossWeight).toFixed(2));
                  $("#spnGrWtRcvd").text((obj[0].HAWBGrossWeight).toFixed(2)); 
            }
             //     $("#spnChWtTotal").text((obj[0].HAWBChargableWeight).toFixed(2)); 
          }
              $("#spnCustomBroker").text(obj[0].CHACode); 
              $("#spnFOBVal").text(obj[0].FOBValue); 
              $("#spnExportName").text(obj[0].ExporterName);

              SBASIStatus = obj[0].ASIStatus;
              //   oocstatus = obj[0].OoCApproved;
              //   asistatus = obj[0].BoEASIStatus;
              //   VTStatus = obj[0].VTStatus;
                if(obj[0].ASIStatus == "Completed"){
                  $("#SBASIDot").css('background-color', '#00AAA2');
                  $("#btnSubmitAsi").attr('disabled', 'disabled');
                  $("#btnSubmitAsi").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
                }else{
                  $("#btnSubmitAsi").removeAttr('disabled');
                  $("#btnSubmitAsi").css({ "background-color": "#00AAA2", "color": "white" , "border-color": "#00AAA2"});
                  $("#SBASIDot").css('background-color', '#f9f9f9');
                }
  
                    if(obj[0].ASIStatus == "Completed"){
                      $("#SBAsiStatus").text(obj[0].ASIStatus).css( "color", "#00AAA2" );
                      $("#SBAsiStatusDate").text(obj[0].SBASIDate.substring(0, 11));
                      $("#SBAsiStatusTime").text(obj[0].SBASIDate.substring(11, 17));
                     }
                      else{
                      $("#SBAsiStatus").text(obj[0].ASIStatus).css( "color", "#ff9800" );
                      $("#SBAsiStatusDate").text("--");
                      }
            //   boestatus = obj[0].BoEApproved;
            //   oocstatus = obj[0].OoCApproved;
            //   asistatus = obj[0].BoEASIStatus;
            //   VTStatus = obj[0].VTStatus;
            //   if(obj[0].BoEASIStatus == "Pending"){
            //     $("#BoEASIDot").css('background-color', '#f9f9f9');
            //   }else{
            //     $("#BoEASIDot").css('background-color', '#00AAA2');
            //   }
            //   if(obj[0].BoEASIStatus == "Pending" && obj[0].BoEApproved == "Approved" && (obj[0].OoCApproved == "Approved")){
            //     $("#btnSubmitAsi").removeAttr('disabled');
            //     $("#btnSubmitAsi").css({ "background-color": "#00AAA2", "color": "white" , "border-color": "#00AAA2"});
            //   }else{
            //     $("#btnSubmitAsi").attr('disabled', 'disabled');
            //     $("#btnSubmitAsi").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
            //   }

            //   if(obj[0].BoEApproved == "Approved"){
            //   $("#BoEStatus").text(obj[0].BoEApproved).css( "color", "#00AAA2" );
            //   $("#BoEStatusDate").text(obj[0].BoEDate.substring(0, 11));
            //   $("#BoEStatusTime").text(obj[0].BoEApprovedDatetime.substring(11, 16));}
            //   else if(obj[0].BoEApproved == "Pending"){
            //   $("#spnBoEMode").text("MANUAL"); 
            //   $("#BoEStatus").text(obj[0].BoEApproved).css( "color", "#ff9800" );
            //   $("#BoEStatusDate").text("--");
            //   }else{
            //     $("#BoEStatus").text(obj[0].BoEApproved).css( "color", "red" );
            //     $("#BoEStatusDate").text(obj[0].BoEDate.substring(0, 11));
            //     $("#BoEStatusTime").text(obj[0].BoEApprovedDatetime.substring(11, 16));
            //     $("#statusRowBoE").show(); 
            //     $("#spnStatusBoE").text(obj[0].BoEApproved).css( "color", "red" );
            //   }
             
            //   if(obj[0].OoCApproved == "Approved"){
            //     $("#OoCStatus").text(obj[0].OoCApproved).css( "color", "#00AAA2" );
            //     $("#OoCStatusDate").text(obj[0].OoCDate.substring(0, 11));
            //     $("#OoCStatusTime").text(obj[0].OoCApprovedDatetime.substring(11, 16));}
            //     else if(obj[0].OoCApproved == "Pending"){
            //     $("#spnOoCMode").text("MANUAL"); 
            //     $("#OoCStatus").text(obj[0].OoCApproved).css( "color", "#ff9800" );
            //     $("#OoCStatusDate").text("--");
            //     }else{
            //       $("#OoCStatus").text(obj[0].OoCApproved).css( "color", "red" );
            //       $("#OoCStatusDate").text(obj[0].OoCDate.substring(0, 11));
            //       $("#OoCStatusTime").text(obj[0].OoCApprovedDatetime.substring(11, 16));
            //       $("#statusRowOoC").show(); 
            //       $("#spnStatusOoC").text(obj[0].OoCApproved).css( "color", "red" );
            //     }

                
               

                

            //   $("#AddChargeStatus").text(obj[0].AdditionalChargesStatus).css( "color", "#ff9800" );
             
            //   if(obj[0].BoEASIStatus == "Approved"){
            //     $("#BoEAsiStatus").text(obj[0].BoEASIStatus).css( "color", "#00AAA2" );
            //     $("#BoEAsiStatusDate").text(obj[0].BoEASIDateTime.substring(0, 11));
            //       $("#BoEAsiStatusTime").text(obj[0].BoEASIDateTime.substring(11, 17));
            //    }
            //     else{
            //     $("#BoEAsiStatus").text(obj[0].BoEASIStatus).css( "color", "#ff9800" );
            //     $("#BoEAsiStatusDate").text("--");
            //     }

              

            //   if(obj[0].BoEApproved == "Approved"){
            //     $("#BoEDot").css('background-color', '#00AAA2');
            //     $('#accordionBoE :input').attr('disabled', 'disabled');
            //     $("#removeFile").attr('disabled', 'disabled'); 
            //     $("#btnClearBoE").attr('disabled', 'disabled'); 
               
            //   }else{
            //     $("#BoEDot").css('background-color', '#f9f9f9');
            //     $('#accordionBoE :input').removeAttr('disabled', 'disabled');
            //     $("#removeFile").removeAttr('disabled', 'disabled'); 
            //     $("#btnClearBoE").removeAttr('disabled');
                
            //   }

            //   if(obj[0].OoCApproved == "Approved"){
            //     $("#OoCDot").css('background-color', '#00AAA2');
            //     $('#accordionOoC :input').attr('disabled', 'disabled');
            //     $("#removeFileOoC").attr('disabled', 'disabled');
            //     $("#btnClearOoc").attr('disabled', 'disabled');
              
            //   }else{
            //     $("#OoCDot").css('background-color', '#f9f9f9');
            //     $('#accordionOoC :input').removeAttr('disabled', 'disabled');
            //     $("#removeFileOoC").removeAttr('disabled', 'disabled');
            //     $("#btnClearOoc").removeAttr('disabled');
            //   }

            //   if( HawbNumber == ""){
            //     if(obj[0].ADODONE == 1){
            //       if(obj[0].BoEApproved == "Approved"){
            //         $('#accordionBoE :input').attr('disabled', 'disabled');
            //         $("#removeFile").attr('disabled', 'disabled'); 
            //         $("#btnSubmitBoE").attr('disabled', 'disabled');
            //         $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
            //       }
            //       else {
            //       if(obj[0].BoENumber){
            //         $('#accordionBoE :input').attr('disabled', 'disabled');
            //         $("#removeFile").attr('disabled', 'disabled'); 
            //         $("#btnSubmitBoE").attr('disabled', 'disabled');
            //         $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
            //       }else{
            //         $(".ui-datepicker-trigger").show(); 
            //         $('#accordionBoE :input').removeAttr('disabled', 'disabled');
            //         $("#removeFile").removeAttr('disabled', 'disabled'); 
            //         $("#btnSubmitBoE").removeAttr('disabled');
            //         $("#btnSubmitBoE").css({ "background-color": "#00AAA2", "color": "white" , "border-color": "#00AAA2"});
            //       }
            //     }
            //       if(obj[0].OoCApproved == "Approved"){
            //         $('#accordionOoC :input').attr('disabled', 'disabled');
            //         $("#removeFileOoC").attr('disabled', 'disabled'); 
            //         $("#btnSubmitOoC").attr('disabled', 'disabled');
            //         $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
            //       }
            //       else {
            //       if(obj[0].OoCNumber){
            //         $('#accordionOoC :input').attr('disabled', 'disabled');
            //         $("#removeFileOoC").attr('disabled', 'disabled'); 
            //         $("#btnSubmitOoC").attr('disabled', 'disabled');
            //         $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
            //       }else{
            //         $(".ui-datepicker-trigger").show(); 
            //         $('#accordionOoC :input').removeAttr('disabled', 'disabled');
            //         $("#removeFileOoC").removeAttr('disabled', 'disabled'); 
            //         $("#btnSubmitOoC").removeAttr('disabled');
            //         $("#btnSubmitOoC").css({ "background-color": "#00AAA2", "color": "white" , "border-color": "#00AAA2"});
            //       }
            //     }
            //   }else{
            //     $('#accordionBoE :input').attr('disabled', 'disabled');
            //     $("#removeFile").attr('disabled', 'disabled'); 
            //     $("#btnSubmitBoE").attr('disabled', 'disabled');
            //     $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
            //     $('#accordionOoC :input').attr('disabled', 'disabled');
            //     $("#removeFileOoC").attr('disabled', 'disabled'); 
            //     $("#btnSubmitOoC").attr('disabled', 'disabled');
            //     $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
            //   }
            //   }else{
            //     if(obj[0].CDODONE == true && obj[0].ADODONE == 1){

            //       if(obj[0].BoEApproved == "Approved"){
            //         $('#accordionBoE :input').attr('disabled', 'disabled');
            //         $("#removeFile").attr('disabled', 'disabled'); 
            //         $("#btnSubmitBoE").attr('disabled', 'disabled');
            //         $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
            //       }
            //       else {
            //       if(obj[0].BoENumber){
            //         $('#accordionBoE :input').attr('disabled', 'disabled');
            //         $("#removeFile").attr('disabled', 'disabled'); 
            //         $("#btnSubmitBoE").attr('disabled', 'disabled');
            //         $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
            //       }else{
            //         $(".ui-datepicker-trigger").show(); 
            //         $('#accordionBoE :input').removeAttr('disabled', 'disabled');
            //         $("#removeFile").removeAttr('disabled', 'disabled'); 
            //         $("#btnSubmitBoE").removeAttr('disabled');
            //         $("#btnSubmitBoE").css({ "background-color": "#00AAA2", "color": "white" , "border-color": "#00AAA2"});
            //       }
            //     }
            //       if(obj[0].OoCApproved == "Approved"){
            //         $('#accordionOoC :input').attr('disabled', 'disabled');
            //         $("#removeFileOoC").attr('disabled', 'disabled'); 
            //         $("#btnSubmitOoC").attr('disabled', 'disabled');
            //         $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
            //       }
            //       else {
            //       if(obj[0].OoCNumber){
            //         $('#accordionOoC :input').attr('disabled', 'disabled');
            //         $("#removeFileOoC").attr('disabled', 'disabled'); 
            //         $("#btnSubmitOoC").attr('disabled', 'disabled');
            //         $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
            //       }else{
            //         $(".ui-datepicker-trigger").show(); 
            //         $('#accordionOoC :input').removeAttr('disabled', 'disabled');
            //         $("#removeFileOoC").removeAttr('disabled', 'disabled'); 
            //         $("#btnSubmitOoC").removeAttr('disabled');
            //         $("#btnSubmitOoC").css({ "background-color": "#00AAA2", "color": "white" , "border-color": "#00AAA2"});
            //       }
            //     }
            //   }else{
            //     $('#accordionBoE :input').attr('disabled', 'disabled');
            //     $("#removeFile").attr('disabled', 'disabled'); 
            //     $("#btnSubmitBoE").attr('disabled', 'disabled');
            //     $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
            //     $('#accordionOoC :input').attr('disabled', 'disabled');
            //     $("#removeFileOoC").attr('disabled', 'disabled'); 
            //     $("#btnSubmitOoC").attr('disabled', 'disabled');
            //     $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
            //   }
            //   }
              
            //   if(obj[0].OoCApproved == "Rejected" || obj[0].BoEApproved == "Rejected"){
            //     $("#btnSubmitOoC").removeAttr('disabled');
            //     $("#btnSubmitOoC").css({ "background-color": "#00AAA2", "color": "white" , "border-color": "#00AAA2"});
            //     $("#btnSubmitBoE").removeAttr('disabled');
            //     $("#btnSubmitBoE").css({ "background-color": "#00AAA2", "color": "white" , "border-color": "#00AAA2"});
              
            //   }

            if(obj[0].TSPStatus == "Completed"){
              $("#TSPDot").css('background-color', '#00AAA2');
              TspStatus = "Completed";
              $("#TSPStatus").text((obj[0].TSPAmount).toFixed(2)).css( "color", "#00AAA2" );
              $("#TSPStatusDate").text(obj[0].TspDateTime.substring(0, 11));
                $("#TSPStatusTime").text(obj[0].TspDateTime.substring(11, 17));
             }else{
                $("#TSPStatus").text(obj[0].TSPStatus).css( "color", "#ff9800" );
                $("#TSPDot").css('background-color', '#f9f9f9');
              $("#TSPStatusDate").text("--");
              }
            // if(obj[0].VTStatus == "Approved" || obj[0].VTStatus == "Generated"){
            //   VehTokenNos = obj[0].VehicleTokenNo;
            //   localStorage.setItem('VehTokenNos',VehTokenNos);
            //   //VehTokenNos = "IVT2203100543,IVT2203100543";
            //   $("#VTDot").css('background-color', '#00AAA2');
            //   $("#VTStatus").text(obj[0].VTStatus).css( "color", "#00AAA2" );
            //   $("#VTStatusDate").text(obj[0].VTDateTime.substring(0, 11));
            //   $("#VTStatusTime").text(obj[0].VTDateTime.substring(11, 17));}
              
            //   else{
            //     $("#VTDot").css('background-color', '#f9f9f9');
            //     $("#VTStatus").text(obj[0].VTStatus).css( "color", "#ff9800" );
            //   $("#VTStatusDate").text("--");
            //   }
          
            // $("#AddChargeStatus").text(obj[0].AdditionalChargesStatus).css( "color", "#ff9800" );

            // if(obj[0].PickOrderStatus == "Approved" || obj[0].PickOrderStatus == "Completed"){
            //   $("#PickorderStatus").text(obj[0].PickOrderStatus).css( "color", "#00AAA2" );
            //   $("#PickorderStatusDate").text(obj[0].PickOrderDate.substring(0, 11));
            //   $("#PickorderStatusTime").text(obj[0].PickOrderDate.substring(11, 17));
            //   $("#btnPickorderSave").attr('disabled', 'disabled');
            //   $("#btnPickorderSave").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
            //   $("#btnPickorderClear").attr('disabled', 'disabled'); 
            // }
            //   else{
            //   $("#PickorderStatus").text(obj[0].PickOrderStatus).css( "color", "#ff9800" );
            //   $("#PickorderStatusDate").text("--");
            //   $("#btnPickorderSave").removeAttr('disabled');
            //   $("#btnPickorderSave").css({ "background-color": "#00AAA2", "color": "white" , "border-color": "#00AAA2"});
            //   $("#btnPickorderClear").removeAttr('disabled');
            // }
            
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

viewSBList = function(){
  localStorage.setItem('viewSB', true);
  window.location.href = "EXP_selectSbNo.html";
}

sbAsiSubmit = function(){
  var element = document.getElementById("heading5"); 
  var text = element.getAttribute("aria-expanded");
 // alert(text)

 if(text == "true"){

             if(COStatus == "true"){
              getSBASIDetails();
            }else{
                    var disablePanel = true;  //or falsey value
                    $("#accordionSBASI").on('hide.bs.collapse show.bs.collapse',  PanelEvent);
           
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

getSBASIDetails = function(){

  if( HawbNumber == ""){
    var house =  ""; 
  }else
  var house =  HawbNumber; 


  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_Exp_GetSBASI_ChargeDetails",
    data: JSON.stringify(
      {
          "OperationType":"2",
          "AirlinePrefix":AirlinePrefix,
          "AwbNumber":AwbNumber,
          "HawbNumber":house,
          "CreatedByUserId":CreatedByUserId,
          "OrganizationId":OrganizationId,
          "OrganizationBranchId":OrganizationBranchId,"AWBID":awbID,"SBID":sbID
      }),
      
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
            if(obj[0].IsACSChargesPaidByFF == "1"){
              getSBASIFFDetails();
            }
            $("#orgName").hide();
            $("#accNo").hide();
            $("#bal").hide();
             GHAID = obj[0].CustodianID;
            $("#txtCTO").text(obj[0].Custodian); 
            $("#spnBalance").text(ACSCurrentBalance); 
            $("#spnAcsCharge").text("INR " + (obj[0].Amount).toFixed(2)); 
            $("#spnCGST").text("INR " +  (obj[0].CGST).toFixed(2)); 
            $("#spnSGST").text("INR " +  (obj[0].SGST).toFixed(2)); 
            $("#spnIGST").text("INR " +  (obj[0].IGST).toFixed(2)); 
            console.log(obj[0].SGST)
            $("#spnGSTTotal").text("INR " +  ((obj[0].CGST + obj[0].SGST + obj[0].IGST)).toFixed(2));
            $("#spTotalPayable").text("INR " +  (obj[0].TotalAmount).toFixed(2));
            
            console.log(response);
           
         
          }else{
            $("body").mLoading('hide');
            errmsg = "Alert</br>";
            errmsgcont = obj[0].ERRORMSG;
            // $.alert(errmsg,errmsgcont);
            return;
  
          }
        } else {
            $("body").mLoading('hide');
            errmsg = "Wrong MAWB number</br>";
            errmsgcont = "Please enter a valid BoE number</br>";
      //      $.alert(errmsg,errmsgcont);
            return;
        }
  
    },
    error: function (xhr, textStatus, errorThrown) {
        $("body").mLoading('hide');
        alert('Server not responding...');
    }
  });
}
getSBASIFFDetails = function(){

  if( HawbNumber == ""){
    var house =  ""; 
  }else
  var house =  HawbNumber; 
  var mawb = MAWBNo.replace("-", "")

  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_EXP_GetFFAccountDetails",
    data: JSON.stringify(
      {
          "MODE":"E",
          "AirlinePrefix":AirlinePrefix,
          "MAWBNumber":mawb,
          "HAWBNumber":house,
      }),
      
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
       console.log(response.d);
       console.log(obj);
        if (obj.length > 0) {
          if (obj[0].ERRORMSG == undefined) {
            $("#orgName").show();
            $("#accNo").show();
            $("#bal").show();
            $("#spnPDBalance").text(obj[0].Balance.toFixed(2)); 
            $("#spnPDAccountNo").text(obj[0].PDAccountNumber); 
            $("#spnOrgName").text(obj[0].Name); 
         
            
            console.log(response);
           
         
          }else{
            $("body").mLoading('hide');
            errmsg = "Alert</br>";
            errmsgcont = obj[0].ERRORMSG;
            // $.alert(errmsg,errmsgcont);
            return;
  
          }
        } else {
            $("body").mLoading('hide');
            errmsg = "Wrong MAWB number</br>";
            errmsgcont = "Please enter a valid BoE number</br>";
       //     $.alert(errmsg,errmsgcont);
            return;
        }
  
    },
    error: function (xhr, textStatus, errorThrown) {
        $("body").mLoading('hide');
        alert('Server not responding...');
    }
  });
}
SubmitSBAsiDetails = function(){
  $('body').mLoading({
    text: "Please Wait..",
});
var totalAmount= ($("#spTotalPayable").text()).substring(4); 

  if( HawbNumber == ""){
    var house =  ""; 
  }else
  var house =  HawbNumber; 

  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_EXP_TO_CheckPDABalance",
    data: JSON.stringify(
      {
          "OperationType":"1",
          "AirlinePrefix":AirlinePrefix,
          "AwbNumber":AwbNumber,
          "HawbNumber":house,
          "OrganizationBranchId":OrganizationBranchId,
          "TotalAmountTobeDeducted":totalAmount,
          "strErrorMsg":""
      }),

    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
       console.log(response.d);
       console.log(obj);
        if (obj.length > 0) {
          if (obj[0].strErrorMsg == undefined) {
            
            console.log(response);
           
   
          }else{
            if(obj[0].strErrorMsg  == "OK."){               
              insertTransactionDetails();
             
            return;
            }else{
              $("body").mLoading('hide');
              errmsg = "Alert</br>";
              errmsgcont = obj[0].strErrorMsg;
              $.alert(errmsg,errmsgcont);
              return;
            }
  
          }
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

insertTransactionDetails = function(){

  if( HawbNumber == ""){
    var house =  ""; 
  }else
  var house =  HawbNumber; 

  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_Exp_Insert_TransactionEvents",
    data: JSON.stringify(
     
          {
            "strShipmentMode":"EXP",
            "intFFJObId":"0",
            "intFWDJObId":"0",
            "strCHAJobId":"",
            "strCHACOOId":"",
            "strCHACARRId":"",
            "AirlinePrefix":AirlinePrefix,
            "AwbNumber":AwbNumber,
            "HawbNumber":house,
            "strUserIPAddress":"",
            "strShipperName":"",
            "strConsigneeName":"",
            "CreatedByUserId":CreatedByUserId,
            "OrganizationId":OrganizationId,
            "OrganizationBranchId":OrganizationBranchId,
            "strErrorMsg":""

      }),
      
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
       console.log(response.d);
       console.log(obj);
        if (obj.length > 0) {
          if (obj[0].strErrorMsg == undefined) {
            $("#tblAirWayBillInfo").fadeIn('slow');
            $("#tblAirWayBillInfo1").show();
        
            
            console.log(response);
          }else{
            errmsg = "Alert</br>";
            errmsgcont = obj[0].strErrorMsg;
            insertDataForMultipleSBNumber();
            // $.alert(errmsg,errmsgcont);
            return;
  
          }
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

var j
function insertDataForMultipleSBNumber(){


    SBIdsdataArray.forEach((SBid, index) => {

     j = index;
      console.log('Index: ' + index + ' SBid: ' + SBid  + ' SBNumber: ' + SBNosdataArray[j]);

      insertSBASIDetails(SBid, SBNosdataArray[j]);
     
  
  });



}


insertSBASIDetails = function(_SBID,_SBNumber){


  if( HawbNumber == ""){
    var house =  ""; 
  }else
  var house =  HawbNumber; 

var decTotalAmount = parseFloat($("#spnAcsCharge").text().substring(4)).toFixed(2);
var decTotalTax = parseFloat($("#spnGSTTotal").text().substring(4)).toFixed(2);
var decTotalRcptAmount = parseFloat($("#spTotalPayable").text().substring(4)).toFixed(2);

// var _boEDate = $("#txtBOEDate").val(); 
// var _boENumber = $("#txtBOENo").val();

var today = new Date(_SBDate);
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

_SBDate = mm + '/' + dd + '/' + yyyy + ' 00:00:00';
console.log(_SBDate);

console.log(decTotalAmount + ',' + decTotalTax + ',' + decTotalRcptAmount + ',' + AirlinePrefix + ',' + AwbNumber + ',' + house + ',' + CreatedByUserId + ',' + OrganizationId + ',' + OrganizationBranchId + ',' + _SBNumber + ',' + _SBDate);
  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_Exp_Insert_SBASIDetails",
    data: JSON.stringify(
      {
            "strShipmentMode":"EXP",
            "chrPaymentMode":"PDA",
            "BaseStation":"BLR",
            "decTotalAmount":decTotalAmount,
            "decTotalTax":decTotalTax,
            "decTotalRcptAmount":decTotalRcptAmount,
            "intFFJObId":"0",
            "intFWDJObId":"0",
            "strCHAJobId":"",
            "strCHACOOId":"",
            "strCHACARRId":"ASI",
            "AirlinePrefix":AirlinePrefix,
            "AwbNumber":AwbNumber,
            "HawbNumber":house,
            "strUserIPAddress":"",
            "strShipperName":"",
            "strConsigneeName":"",
            "CreatedByUserId":CreatedByUserId,
            "OrganizationId":OrganizationId,
            "OrganizationBranchId":OrganizationBranchId,
            "strReceiptRegisterXML":"",
            "SBNumber":_SBNumber,
            "strErrorMsg":"",
            "SBDate":_SBDate

      }),
      
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
       console.log(response.d);
       console.log(obj);
        if (obj.length > 0) {
          if (obj[0].strErrorMsg == undefined) {
            $("#tblAirWayBillInfo").fadeIn('slow');
            $("#tblAirWayBillInfo1").show();
          
            console.log(response);
           
          }else{

            errmsg = "Alert</br>";
            errmsgcont = obj[0].strErrorMsg;
            insertSBASIRequestStatus(_SBID,_SBNumber);
            // $.alert(errmsg,errmsgcont);
            return;
            // if(obj[0].ReceiptNumber){
            //   $("#btnSubmitAsi").attr('disabled', 'disabled');
            //   $("#btnSubmitAsi").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
            // }else{
            //   $("#btnSubmitAsi").removeAttr('disabled');
            //   $("#btnSubmitAsi").css({ "background-color": "#00AAA2", "color": "white" , "border-color": "#00AAA2"});
            // }
            // ExportListingPageDetails('1', AirlinePrefix, AwbNumber, HawbNumber, IGMNo, IGMYear, CreatedByUserId, OrganizationBranchId, OrganizationId,awbId, sbID);
            // $("body").mLoading('hide');
            // errmsg = "Alert</br>";
            // errmsgcont = obj[0].strErrorMsg;
            // $.alert(errmsg,errmsgcont);
            // return;
  
          }
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
insertSBASIRequestStatus = function(_SBID,_SBNumber){
  $('body').mLoading({
    text: "Please Wait..",
});
var totalAmount= ($("#spTotalPayable").text()).substring(4); 

  if( HawbNumber == ""){
    var house =  ""; 
  }else
  var house =  HawbNumber; 

  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_Exp_Insert_SBAIS_RequestStatus",
    data: JSON.stringify(
      {
        "Action":"3",
        "status":"0",
        "AWBID":awbID,
        "AirlinePrefix":AirlinePrefix,
        "AwbNumber":AwbNumber,
        "HawbNumber":house,
        "SBNumber":_SBNumber,
        "SBDate":_SBDate,
        "Event_Name":"EX01",
        "OrganizationId":OrganizationId,
        "OrganizationBranchId":OrganizationBranchId,
        "UserID":CreatedByUserId,
        "GHAID":GHAID,
        "CreatedBy":CreatedByUserId,
        "MessageType":"EX01"
      }),

    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
       console.log(response.d);
       console.log(obj);
        if (obj.length > 0) {
          if (obj[0].Result == undefined) {
            
            console.log(response);
           
   
          }else{
            if(obj[0].Result){               
              updateSBASIFlag(_SBID,_SBNumber);
             
            return;
            }else{
              $("body").mLoading('hide');
              errmsg = "Alert</br>";
              errmsgcont = obj[0].strErrorMsg;
              $.alert(errmsg,errmsgcont);
              return;
            }
  
          }
        } else {
            $("body").mLoading('hide');
           
            errmsg = "Wrong MAWB number</br>";
            errmsgcont = "Please enter a valid BoE number</br>";
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
updateSBASIFlag = function(_SBID, _SBNumber){
  if( HawbNumber == ""){
    var house =  ""; 
  }else
  var house =  HawbNumber; 

  var today = new Date(_SBDate);
  var dd = String(today.getDate()).padStart(2, '0');
 var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
 var yyyy = today.getFullYear();
 
 _SBDate = mm + '/' + dd + '/' + yyyy + ' 00:00:00';
 console.log(_SBDate);
 
$.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_UpdateAWBShippingBillASIFlag",
    data: JSON.stringify(
      {
        "CreatedByUserId":CreatedByUserId,
        "SBNumber":_SBNumber,
        "SBDate":_SBDate,
        "AWBID":awbID,
        "SBID":_SBID

      }),
      
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
       console.log(response.d);
       console.log(obj);
        if (obj.length > 0) {
          if (obj[0].strErrorMessage == undefined) {
            $("#tblAirWayBillInfo").fadeIn('slow');
            $("#tblAirWayBillInfo1").show();
          
            console.log(response);
           
          }else{
            if(obj[0].strErrorMessage){
              $("#btnSubmitAsi").attr('disabled', 'disabled');
              $("#btnSubmitAsi").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
            }else{
              $("#btnSubmitAsi").removeAttr('disabled');
              $("#btnSubmitAsi").css({ "background-color": "#00AAA2", "color": "white" , "border-color": "#00AAA2"});
            }
            ExportListingPageDetails('2', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId, awbID, _SBID);
            $("body").mLoading('hide');
            errmsgcontSBASI = obj[0].strErrorMessage;
            if(j == ((SBNosdataArray.length - 1))){
              errmsg = "Alert</br>";
              $.alert(errmsg,errmsgcontSBASI);
             
            
          }
     
     
  
          }
        } else {
            $("body").mLoading('hide');
           
            errmsg = "Wrong MAWB number</br>";
            errmsgcont = "Please enter a valid BoE number</br>";
     //       $.alert(errmsg,errmsgcont);
            return;
        }
  
    },
    error: function (xhr, textStatus, errorThrown) {
        $("body").mLoading('hide');
        alert('Server not responding...');
    }
  });
}


 getDocumentStorePath = function(){

   console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
   $.ajax({
   type: 'POST',
   url: ACSServiceURL + "/ACS_Imp_get_DocumentStorPath",
   data: JSON.stringify({"ParameterCode":"DocumentStorePath"}),
   contentType: "application/json; charset=utf-8",
   dataType: "json",
   success: function (response, xhr, textStatus) {
       var obj = JSON.parse(response.d);
       console.log(response.d);
       console.log(obj);
       if (obj.length > 0) {
         if (obj[0].ERRORMSG == undefined) {
       documentStorePath = obj[0].ParameterValue;
           console.log(response)
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
 getTspDetails = function(){
  var element = document.getElementById("heading6"); 
  var text = element.getAttribute("aria-expanded");
 // alert(text)

 if(text == "true"){
  //  if(SBASIStatus == "Completed"){
       $('body').mLoading({
         text: "Please Wait..",
       });
             if(TspStatus == "Completed"){
               var CommodityGroup = "";
               var CommodityName = "";
               getTSPDetailsApproved(CommodityGroup,CommodityName);
             }else{
               getCTOStatusDetails();
             }
           
  //  }else{
  //        var disablePanel = true;  //or falsey value
  //        $("#accordionTSP").on('hide.bs.collapse show.bs.collapse',  PanelEvent);

  //  }    
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

  
 getTSPDetailsMABBisApiEnable = function(CommodityGroup,CommodityName){
  if(TSPSetting == ""){
  }else{
    HawbNumber = "";
    sbID = "0";
  }
   $('body').mLoading({
     text: "Please Wait..",
 });
 $("#viewList").empty();
   var boENum=  $("#txtBOENo").val(); 
 
   console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
   $.ajax({
   type: 'POST',
   url: ACSServiceURL + "/ACS_EXP_TSPGetDetails",
   data: JSON.stringify({
       "OperationType":2,
       "AirlinePrefix":AirlinePrefix,
       "AwbNumber":AwbNumber,
       "HawbNumber":HawbNumber, //IF HAWB IS THERE THEN SEND
       "SBID":sbID,
       "CreatedByUserId":CreatedByUserId,
       "OrganizationBranchId":OrganizationBranchId,
       "OrganizationId":OrganizationId,
       "CommodityType":CommodityGroup,
       "CommodityName":CommodityName,
       "TSPSettings":TSPSetting
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
       if (obj.ErrorMessage == "" || obj.ErrorMessage == "Success" || obj.ErrorMessage == null) {
       $("#PDAccNo").text(obj["ReceiptDetails"].PDAccountNo); 
       $("#CTOPDBalance").text((obj["ReceiptDetails"].PDBalance).toFixed(2)); 
       $("#TSPPayAmount").text((obj["ReceiptDetails"].PayableAmount).toFixed(2)); 
       $("#payMode").text("PD Account"); 
           var count = 0;
           var row = "";
           var chageAmount = 0;
           var Gst = 0;
           var totalCharges = 0;
       
         
           if (obj["ChargeDetails"].length > 0) {
             for(i = 0; i< obj["ChargeDetails"].length ; i++){
               
               row += " <tr class=''>";
               row += "<td>" + obj["ChargeDetails"][i].ChargeDescription + "</td>";
               row += "<td>" + (obj["ChargeDetails"][i].TotalAmount).toFixed(2) + "</td>";
               // var gstAmount = obj["ChargeDetails"][i].CGSTAmount + obj["ChargeDetails"][i].IGSTAmount + obj["ChargeDetails"][i].SGSTAmount + obj["ChargeDetails"][i].UTGSTAmount;
               row += "<td>" + (obj["ChargeDetails"][i].TaxAmount).toFixed(2) + "</td>";
               var a = (obj["ChargeDetails"][i].TotalAmount).toFixed(2);
               var b = (obj["ChargeDetails"][i].TaxAmount).toFixed(2);
               chageAmount += parseFloat(a);
               Gst += parseFloat(b);
               var totalAmt =  (obj["ChargeDetails"][i].TaxAmount)  + (obj["ChargeDetails"][i].TotalAmount);
               row += "<td>" + totalAmt.toFixed(2) + "</td>";
               totalCharges += parseFloat(totalAmt.toFixed(2));
               row += "</tr>";
              
               count++;
             }
             
             row += " <tr class=''>";   
             row += "<td>" + "Total Charges" + "</td>";
             row += "<td>" + chageAmount.toFixed(2) + "</td>";
             row += "<td>" + Gst.toFixed(2) + "</td>";
      
             row += "<td>" + totalCharges.toFixed(2) + "</td>";
             row += "</tr>"; 
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
 getTSPDetailsMABB = function(CommodityGroup,CommodityName){
  if(TSPSetting == ""){
  }else{
    HawbNumber = "";
    sbID = "0";
  }
  $('body').mLoading({
    text: "Please Wait..",
});
$("#viewList").empty();
  var boENum=  $("#txtBOENo").val(); 

  console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_EXP_TSPGetDetails",
    data: JSON.stringify({
        "OperationType":2,
        "AirlinePrefix":AirlinePrefix,
        "AwbNumber":AwbNumber,
        "HawbNumber":HawbNumber, //IF HAWB IS THERE THEN SEND
        "SBID":sbID,
        "CreatedByUserId":CreatedByUserId,
        "OrganizationBranchId":OrganizationBranchId,
        "OrganizationId":OrganizationId,
        "CommodityType":CommodityGroup,
        "CommodityName":CommodityName,
        "TSPSettings":TSPSetting
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
        // console.log(obj.EXP_TSP_Calculation_Response);
        // console.log(obj.EXP_TSP_Calculation_Response.Header);
        // console.log(obj.EXP_TSP_Calculation_Response.Details);
  
        if (obj.EXP_TSP_Calculation_Response.Details.ErrorCode == "" || obj.EXP_TSP_Calculation_Response.Details.ErrorCode == null) {
        $("#PDAccNo").text(obj.EXP_TSP_Calculation_Response.Details.ReceiptDetails.PDAccountNo); 
        $("#CTOPDBalance").text((obj.EXP_TSP_Calculation_Response.Details.ReceiptDetails.PDBalance));  
        $("#TSPPayAmount").text((obj.EXP_TSP_Calculation_Response.Details.ReceiptDetails.PayableAmount)); 
        $("#payMode").text(obj.EXP_TSP_Calculation_Response.Details.ReceiptDetails.PaymentMode); 
            var count = 0;
            var row = "";
            var chageAmount = 0;
            var Gst = 0;
            var totalCharges = 0;
            if (obj.EXP_TSP_Calculation_Response.Details.ChargeDetails.length > 0) {
              for(i = 0; i< obj.EXP_TSP_Calculation_Response.Details.ChargeDetails.length ; i++){
                
                 row += " <tr class=''>";
                row += "<td>" +obj.EXP_TSP_Calculation_Response.Details.ChargeDetails[i].ChargeDescription + "</td>";
                row += "<td>" + (obj.EXP_TSP_Calculation_Response.Details.ChargeDetails[i].TotalAmount) + "</td>";
                // var gstAmount = obj["ChargeDetails"][i].CGSTAmount + obj["ChargeDetails"][i].IGSTAmount + obj["ChargeDetails"][i].SGSTAmount + obj["ChargeDetails"][i].UTGSTAmount;
                row += "<td>" + (obj.EXP_TSP_Calculation_Response.Details.ChargeDetails[i].TaxAmount) + "</td>";
                var a = Number(obj.EXP_TSP_Calculation_Response.Details.ChargeDetails[i].TotalAmount);
                var b = Number(obj.EXP_TSP_Calculation_Response.Details.ChargeDetails[i].TaxAmount);
                chageAmount += (a);
                Gst += (b);

                var totalAmt =  Number(obj.EXP_TSP_Calculation_Response.Details.ChargeDetails[i].TaxAmount)  + Number(obj.EXP_TSP_Calculation_Response.Details.ChargeDetails[i].TotalAmount);
                row += "<td>" + totalAmt.toFixed(2) + "</td>";
                totalCharges += (totalAmt);
                row += "</tr>";
               
                count++;
              }

              row += " <tr class=''>";   
              row += "<td>" + "Total Charges" + "</td>";
              row += "<td>" + chageAmount + "</td>";
              row += "<td>" + Gst + "</td>";
       
              row += "<td>" + totalCharges.toFixed(2)+ "</td>";
              row += "</tr>"; 
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
    if(TSPSetting == ""){
    }else{
      HawbNumber = "";
      sbID = "0";
    }
     $('body').mLoading({
       text: "Please Wait..",
   });
   $("#viewList").empty();
     var boENum=  $("#txtBOENo").val(); 
  
     console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
     $.ajax({
     type: 'POST',
     url: ACSServiceURL + "/ACS_EXP_TSPGetDetails",
     data: JSON.stringify({
         "OperationType":2,
         "AirlinePrefix":AirlinePrefix,
         "AwbNumber":AwbNumber,
         "HawbNumber":HawbNumber, //IF HAWB IS THERE THEN SEND
         "SBID":sbID,
         "CreatedByUserId":CreatedByUserId,
         "OrganizationBranchId":OrganizationBranchId,
         "OrganizationId":OrganizationId,
         "CommodityType":CommodityGroup,
         "CommodityName":CommodityName,
         "TSPSettings":TSPSetting
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
             if (obj["EXPCHGCALCULATIONRESPONSE"][0].errorMessage == "" || obj["EXPCHGCALCULATIONRESPONSE"][0].errorMessage == "Success"  || obj["EXPCHGCALCULATIONRESPONSE"][0].errorMessage == null) {
             console.log(obj["EXPCHGCALCULATIONRESPONSE"][0].chargeDetails);
             console.log(obj["EXPCHGCALCULATIONRESPONSE"][0].receiptDetails.pdAccountNo);
             console.log(obj["EXPCHGCALCULATIONRESPONSE"][0].status);
             $("#PDAccNo").text(obj["EXPCHGCALCULATIONRESPONSE"][0].receiptDetails.pdAccountNo);
             $("#CTOPDBalance").text((obj["EXPCHGCALCULATIONRESPONSE"][0].receiptDetails.pdBalance).toFixed(2));
             $("#TSPPayAmount").text((obj["EXPCHGCALCULATIONRESPONSE"][0].receiptDetails.payableAmount).toFixed(2)); 
             $("#payMode").text("PD Account"); 
             var count = 0;
             var row = "";
  
          
           
             if ((obj["EXPCHGCALCULATIONRESPONSE"][0].chargeDetails).length > 0) {
               for(i = 0; i< (obj["EXPCHGCALCULATIONRESPONSE"][0].chargeDetails).length ; i++){
                 
                 row += " <tr class=''>";
                 row += "<td>" + obj["EXPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].chargeDescription + "</td>";
                 row += "<td>" + (obj["EXPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].totalAmount).toFixed(2) + "</td>";
                 var gstAmount = obj["EXPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].cgstAmount + obj["EXPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].sgstAmount + obj["EXPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].igstAmount + obj["EXPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].utgstAmount;
                 row += "<td>" + (gstAmount).toFixed(2) + "</td>";
                 var totalAmt = obj["EXPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].totalAmount + gstAmount;
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
             errmsgcont = obj["EXPCHGCALCULATIONRESPONSE"][0].errorMessage;
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
    if(TSPSetting == ""){
    }else{
      HawbNumber = "";
      sbID = "0";
    }
     $('body').mLoading({
       text: "Please Wait..",
   });
   $("#viewList").empty();
     var boENum=  $("#txtBOENo").val(); 
 
     console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
     $.ajax({
     type: 'POST',
     url: ACSServiceURL + "/ACS_EXP_TSPGetDetails",
     data: JSON.stringify({
         "OperationType":2,
         "AirlinePrefix":AirlinePrefix,
         "AwbNumber":AwbNumber,
         "HawbNumber":HawbNumber, //IF HAWB IS THERE THEN SEND
         "SBID":sbID,
         "CreatedByUserId":CreatedByUserId,
         "OrganizationBranchId":OrganizationBranchId,
         "OrganizationId":OrganizationId,
         "CommodityType":CommodityGroup,
         "CommodityName":CommodityName,
         "TSPSettings":TSPSetting
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
           $("#payMode").text("PD Account");
           $("#CTOPDBalance").text((obj[0].PDBalance).toFixed(2)); 
           $("#TSPPayAmount").text((obj[0].PayableAmount).toFixed(2)); 
 
           // var ClientResponseXML = "<?xml version='1.0' encoding='utf-16'?><clsImpCalculationResponse xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema'><ReceiptDetails><PaymentMode>PDA</PaymentMode><PDAccountNo>123</PDAccountNo><TotalAmount>1100.25</TotalAmount><TotalTax>198.25</TotalTax><AdjustableAmount>0</AdjustableAmount><PayableAmount>1280.25</PayableAmount><PaidBy /><CreatedBy>ACS</CreatedBy><CreatedOn>2022-03-14T19:42:58.2960483+05:30</CreatedOn><Pieces>30</Pieces><GrossWeight>300.000</GrossWeight><ChargeableWeight>300.000</ChargeableWeight><PDBalance>10000</PDBalance><CommodityGroup>GEN</CommodityGroup><CommodityDesc>AUTO PARTS</CommodityDesc></ReceiptDetails><ChargeDetails><clsImpChargeCalculationResponse><ChargeCode>TER</ChargeCode><ChargeDescription>Terminal Charge</ChargeDescription><TotalAmount>800</TotalAmount><TaxAmount>144</TaxAmount><TaxCode /></clsImpChargeCalculationResponse><clsImpChargeCalculationResponse><ChargeCode>STP</ChargeCode><ChargeDescription>Strapping Charge</ChargeDescription><TotalAmount>200</TotalAmount><TaxAmount>36</TaxAmount><TaxCode /></clsImpChargeCalculationResponse><clsImpChargeCalculationResponse><ChargeCode>DEM</ChargeCode><ChargeDescription>Demurrage Charges</ChargeDescription><TotalAmount>100</TotalAmount><TaxAmount>18</TaxAmount><TaxCode /></clsImpChargeCalculationResponse></ChargeDetails><Status>0</Status></clsImpCalculationResponse>"
   
           //   xmlDoc = $.parseXML(ClientResponseXML);
             
           //   console.log(xmlDoc);
          
            //  $("#tblChargeDetails").show(); 
            //  $("#proceedBtn").hide(); 
             
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
                 var a = obj[0].STotalAmount;
                 var b = obj[0].STaxAmount;
                 var totalS = parseInt(a) + parseInt(b);
                 row += "<td>" + totalS.toFixed(2)+ "</td>";
                 row += "</tr>"; 
 
 
                 // row += " <tr class=''>";
                 // row += "<td>" + obj[0].DChargeDescription + "</td>";
                 // row += "<td>" + parseInt(obj[0].DTotalAmount).toFixed(2) + "</td>";
                 // row += "<td>" + parseInt(obj[0].DTaxAmount).toFixed(2) + "</td>";
                 // var a = obj[0].DTotalAmount;
                 // var b = obj[0].DTaxAmount;
                 // var totalD = parseInt(a) + parseInt(b);
                 // row += "<td>" + totalD.toFixed(2)+ "</td>";
                 // row += "</tr>"; 
  
             //});
                  
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
    if(TSPSetting == ""){
    }else{
      HawbNumber = "";
      sbID = "0";
    }
     $('body').mLoading({
       text: "Please Wait..",
   });
   $("#viewList").empty();
     var boENum=  $("#txtBOENo").val(); 
 
     console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
     $.ajax({
     type: 'POST',
     url: ACSServiceURL + "/ACS_EXP_TSPGetDetails",
     data: JSON.stringify({
         "OperationType":2,
         "AirlinePrefix":AirlinePrefix,
         "AwbNumber":AwbNumber,
         "HawbNumber":HawbNumber, //IF HAWB IS THERE THEN SEND
         "SBID":sbID,
         "CreatedByUserId":CreatedByUserId,
         "OrganizationBranchId":OrganizationBranchId,
         "OrganizationId":OrganizationId,
         "CommodityType":CommodityGroup,
         "CommodityName":CommodityName,
         "TSPSettings":TSPSetting
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
             
          
            //  $("#tblChargeDetails").show(); 
            //  $("#proceedBtn").hide(); 
            //  $("#passwordTag").hide(); 
             
             
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
   getTSPDetailsApproved = function(CommodityGroup,CommodityName){
    if(TSPSetting == ""){
      var tspSettings = "";
    }else{
      var tspSettings = "M";
      HawbNumber = "";
      sbID = "0";
    }
     $('body').mLoading({
       text: "Please Wait..",
   });
   $("#viewList").empty();
     console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
     $.ajax({
     type: 'POST',
     url: ACSServiceURL + "/ACS_EXP_TSPGetDetails",
     data: JSON.stringify({
         "OperationType":2,
         "AirlinePrefix":AirlinePrefix,
         "AwbNumber":AwbNumber,
         "HawbNumber":HawbNumber, //IF HAWB IS THERE THEN SEND
         "SBID":sbID,
         "CreatedByUserId":CreatedByUserId,
         "OrganizationBranchId":OrganizationBranchId,
         "OrganizationId":OrganizationId,
         "CommodityType":CommodityGroup,
         "CommodityName":CommodityName,
         "TSPSettings":tspSettings
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
           
           
             $("#HSNCode").val(obj[0].HSNCode).attr('disabled','disabled');
             $("#payMode").text(obj[0].PDAMode); 
             xmlDoc = $.parseXML( obj[0].ClientResponseXML),

             $("#ddlCommodityTypeList").html('<option>' + obj[0].CargoType + '</option>'); 
             $("#ddlCommodityNameList").html('<option>' + $(xmlDoc).find('CommodityDesc').text() + '</option>'); 

             $("#PDAccNo").text($(xmlDoc).find('PDAccountNo').text()); 
             $("#CTOPDBalance").text(Number($(xmlDoc).find('PDBalance').text()).toFixed(2)); 
             $("#TSPPayAmount").text(Number($(xmlDoc).find('PayableAmount').text()).toFixed(2)); 
          
             $("#tblChargeDetails").show(); 
             $("#proceedBtn").hide(); 
             $("#passwordTag").hide(); 
             
             
             $("#btnPayTSP").attr('disabled', 'disabled'); 
             $("#btnPayTSP").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
 
             if(CTOName == "KALE_GHA" || tspSettings == "M"){
               $eventItem = $(xmlDoc).find("clsChargeDetails");  
             }else{
               $eventItem = $(xmlDoc).find("clsInvoiceDetailsResponseTSPNew");  
             }
             var chageAmount = 0;
             var Gst = 0;
             var totalCharges = 0;
           
             var row = "";
             row += " <tr class=''>";
             $eventItem.each(function(index, element) {     
                 row += "<td>" + ($(element).find('ChargeDescription').text()) + "</td>";
                 row += "<td>" + parseInt($(element).find('TotalAmount').text()).toFixed(2) + "</td>";
                 row += "<td>" + parseInt($(element).find('TaxAmount').text()).toFixed(2) + "</td>";
                 var a = $(element).find('TotalAmount').text();
                 var b = $(element).find('TaxAmount').text();
                 var totalAmt = parseFloat(a) + parseFloat(b);
                 chageAmount += parseFloat(a);
                 Gst += parseFloat(b);
                 row += "<td>" + totalAmt.toFixed(2) + "</td>";
                 totalCharges += parseFloat(totalAmt.toFixed(2));
                 row += "</tr>";  
             });
             row += " <tr class=''>";   
             row += "<td>" + "Total Charges" + "</td>";
             row += "<td>" + chageAmount.toFixed(2) + "</td>";
             row += "<td>" + Gst.toFixed(2) + "</td>";
      
             row += "<td>" + totalCharges.toFixed(2) + "</td>";
             row += "</tr>"; 

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
     //      $.alert(errmsg,errmsgcont);
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
 
    if($("#HSNCode").val() == "" ){
      $("body").mLoading('hide');
      errmsg = "Message</br>";
      errmsgcont = "Please enter HSN Code.</br>";
      $.alert(errmsg,errmsgcont);
      return;
    }

    if($("#tspPassword").val() == "" ){
      $("body").mLoading('hide');
      errmsg = "Alert</br>";
      errmsgcont = "Please enter transaction password.</br>";
      $.alert(errmsg,errmsgcont);
      return;
    }
    $('body').mLoading({
      text: "Please Wait..",
  });

 
  var awb_id;
  if(TSPSetting == "M"){
   var sbPcs = $("#spnPcsTotalMawb").text(); 
   var sbGrWt = $("#spnGrWtTotalMawb").text(); 
   var sbChWt = $("#spnChWtTotalMawb").text();
   _SBNumber = "";
   _SBDate = "";
   HawbNumber = "";
   awb_id = awbID;
   sbID = 0;
  }else{
   var today = new Date(_SBDate);
   var dd = String(today.getDate()).padStart(2, '0');
   var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
   var yyyy = today.getFullYear();
   
   _SBDate = mm + '/' + dd + '/' + yyyy + ' 00:00:00';
   console.log(_SBDate);
   
      var sbPcs = $("#spnSBNoP").text(); 
      var sbGrWt = $("#spnSBGrWt").text(); 
      var sbChWt = $("#spnSBChWt").text();
      awb_id = 0;
      sbID = localStorage.getItem('sbID');
      console.log(sbID)

  }
    var HSNCode = $("#HSNCode").val(); 
    var password = $("#tspPassword").val(); 
    var RequestID = localStorage.getItem('payTspId');
    if(RequestID == null || RequestID == ""){
      RequestID = "12345";
    }
    var commodityType = $('#ddlCommodityTypeList :selected').text();
   var commodityTypeId = $('#ddlCommodityNameList :selected').val();
  var commodityName = $('#ddlCommodityNameList :selected').text();
 
    $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_EXP_Insert_OR_Pay_TSPDetails",
      data: JSON.stringify(
        {
          "OperationType":1,
          "AirlinePrefix":AirlinePrefix,
          "AwbNumber":AwbNumber,
          "HawbNumber":HawbNumber,
          "SBDate":_SBDate,
          "SBNumber":_SBNumber,
          "CreatedByUserId":CreatedByUserId,
          "OrganizationBranchId":OrganizationBranchId,
          "OrganizationId":OrganizationId,
          "CommodityType":commodityType,
          "CommodityName":commodityName,
          "mode":"E",
          "SBPices":sbPcs,
          "SBGrossWeight":sbGrWt,
          "SBCharWeight":sbChWt,
          "HSNCode":HSNCode,
          "CommodityTypeID":commodityTypeId,
          "SBID":sbID,
          "RequestID":RequestID,
          "CalculationResponse":"",
          "Transactionpassword":password,
          "AWBID":awb_id,
          "TSPSettings":TSPSetting
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
             ExportListingPageDetails('2', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId, awbID, sbID);
            getTSPDetailsApproved(commodityType,commodityName);
            $("body").mLoading('hide');
            errmsg = "Alert</br>";
            errmsgcont = obj[0].StrMessage;
            $.alert(errmsg,errmsgcont);
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
   

   console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
   $.ajax({
   type: 'POST',
   url: ACSServiceURL + "/ACS_EXP_spAWB_GET_CTOStatus",
   data: JSON.stringify({
       "AWBID":awbID,
       "SBID":sbID,
       "Message":""
       }),
   
   contentType: "application/json; charset=utf-8",
   dataType: "json",
   success: function (response, xhr, textStatus) {
       var obj = JSON.parse(response.d);
       console.log(response.d);
       console.log(obj);
       if (obj.length > 0) {
         if (obj[0].ERRORMSG == "") {
           getCommodityTypeAndDescription();
           console.log(response);
           $("body").mLoading('hide');
         }else{
             $("body").mLoading('hide');
             $("#btnSubmitTSP").attr('disabled', 'disabled');
             $("#btnSubmitTSP").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
             errmsg = "Alert</br>";
             errmsgcont = obj[0].ERRORMSG;
             $.alert(errmsg,errmsgcont);
             return;
         }
       } else {
           $("body").mLoading('hide');
           errmsg = "Wrong MAWB number</br>";
           errmsgcont = "Please enter a valid MAWB number</br>";
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
 proceedTSPDetails = function(){
   
  if($("#ddlCommodityTypeList").val() == "" ){
    $("body").mLoading('hide');
    errmsg = "Message</br>";
    errmsgcont = "Please select Commodity Type</br>";
    $.alert(errmsg,errmsgcont);
    return;
  }

  if($("#ddlCommodityNameList").val() == "" ){
    $("body").mLoading('hide');
    errmsg = "Message</br>";
    errmsgcont = "Please select Commodity Name</br>";
    $.alert(errmsg,errmsgcont);
    return;
  }
   if($("#viewList").val() == ""){
     $("#tblChargeDetails").show(); 
   }else{
     $("#tblChargeDetails").show(); 
   }
 }

 getCommodityTypeAndDescription = function(){
   
   console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
   $.ajax({
   type: 'POST',
   url: ACSServiceURL + "/ACS_EXP_Get_ComodityType_ComodityDescription",
   data: JSON.stringify({
     "OperationType":1,
     "AirlinePrefix":AirlinePrefix,
     "CategoryDescription":"",
     "CreatedByUserId":CreatedByUserId,
     "OrganizationId":OrganizationId,
     "OrganizationBranchId":OrganizationBranchId,
     "AWBID":awbID
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
                 $("body").mLoading('hide');
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



 getCommodityNameList = function(){
   $('body').mLoading({
     text: "Please Wait..",
   });
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
     url: ACSServiceURL + "/ACS_EXP_Get_ComodityType_ComodityDescription",
     data: JSON.stringify({
       "OperationType":2,
       "AirlinePrefix":AirlinePrefix,
       "CategoryDescription":commodityType,
       "CreatedByUserId":CreatedByUserId,
       "OrganizationId":OrganizationId,
       "OrganizationBranchId":OrganizationBranchId,"AWBID":awbID
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
                 $("body").mLoading('hide');
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
 onChangeCommodityName = function(){
   var commodityType = $('#ddlCommodityTypeList :selected').text();
   console.log(commodityType)
   var CommodityName = $('#ddlCommodityNameList :selected').text();
   var fields = CommodityName.split(':');
           console.log(fields[1]);
           var CommodityGroup = fields[1];
           if(CTOName == "WFS_BLR")
            getTSPDetailsMABB(CommodityGroup,CommodityName);
          else if(CTOName == "MABB_BLR")
            getTSPDetailsMABB(CommodityGroup,CommodityName);
          else{
          getTSPDetailsKaleGHA(CommodityGroup,CommodityName);
          }
 }
CheckTSPConfigurationSetting = function(){

  console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
  type: 'POST',
  url: ACSServiceURL + "/ACS_EXP_CheckTSPConfigurationSetting",
  data: JSON.stringify({ "AirlinePrefix":AirlinePrefix,
                "AwbNumber":AwbNumber,
                "OrganizationId":OrganizationId,
                "OrganizationBranchId":OrganizationBranchId}),
 
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: function (response, xhr, textStatus) {
      var obj = JSON.parse(response.d);
      console.log(response.d);
      console.log(obj);
      if (obj.length > 0) {
        if (obj[0].Msg == undefined || obj[0].Msg == "") {
          if(obj[0].OrgName == "WFS_BLR"){
            CTOName = "WFS_BLR";
          }
         else if(obj[0].OrgName == "MABB_BLR"){
            CTOName = "MABB_BLR";
          }
          else{
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

 
 getApplicableCharges = function(){
  var row = "";
               
                 for(var i = 0; i<1 ;i++){
                    // var CUSTODIAN = '"' + d.CUSTODIAN + '"';
                      
                    row += " <div class= 'div-wrapper' style= 'background-color:#00AAA2 !important'>";
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
                      
          //           row += " <div class= 'div-wrapper' style= 'background-color:#00AAA2 !important'>";
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

 }
 clearInputsOoC = function(){
   $("#spnOoCNo").val(''); 
   $("#spnOoCDate").val(''); 
   $("#txtOoCPcs").val(''); 
   $("#txtBOEPcsOoC").val(''); 
   
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
  $("#HSNCode").val(''); 
  $("#payMode").val(''); 
  $("#PDAccNo").val(''); 
  $("#LocationCode").val(''); 
  $("#CTOPDBalance").val(''); 
  $("#TSPPayAmount").val(''); 
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