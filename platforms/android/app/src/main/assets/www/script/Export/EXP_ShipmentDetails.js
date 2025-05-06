var LocationName = localStorage.getItem('LocationName');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationTypeId = localStorage.getItem('OrganizationTypeId');
var OrganizationId = localStorage.getItem('OrganizationId');
var MAWBNo = localStorage.getItem('mawbNo');
var AirlinePrefix = localStorage.getItem('Prefix');
var AwbNumber = localStorage.getItem('AWBNumber');
var IGMNo = localStorage.getItem('igmNo');
var IGMYear = localStorage.getItem('igmYear');
var HawbNumber = localStorage.getItem('hawbNo');
var awbID = localStorage.getItem('awbID');
var sbID = localStorage.getItem('sbID');
var MAWBID = localStorage.getItem('MAWBID');

var TSPSetting = localStorage.getItem('TSPSetting');

var _SBNumber;
var _SBDate;
var ACSCurrentBalance;
var GHAID;
var SBASIStatus;
localStorage.setItem('FinalVTList',  "");

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
  var boestatus;
  var oocstatus;
  var asistatus;
  var VTStatus;
  var BOEID;
  var OOCID;
  $(function () {
    otherDocumentsList();
    $("#btnPayTSP").attr('disabled', 'disabled'); 
    $("#btnPayTSP").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
    localStorage.setItem('HouseArrayData',"");
  localStorage.setItem('HouseObjectToGenerateVT',  "");
  
   
$('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
  localStorage.setItem('activeTab', $(e.target).attr('href'));
});
var activeTab = localStorage.getItem('activeTab');
if(activeTab){
  $('#myTab a[href="' + activeTab + '"]').tab('show');
}
if(TSPSetting == "M"){
  HawbNumber = "";
  $("#lblSbNo").hide(); 
  $("#txtSBNo").hide(); 
  $("#lblSbDate").hide(); 
  $("#txtSBDate").hide(); 
  $("#accordionSB").hide(); 
  $("#accordionSBASI").hide(); 
}else{
  $("#accordionSBASI").hide(); 
}
CheckTSPConfigurationSetting();

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


 // getBoEDetails();
ExportListingPageDetails('2', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId, awbID, sbID);

//getSBASIDetails();
// getDocumentStorePath();


// getPickOrderDetails();

// getOoCDetails();
// getAsiDetails();


});




function back() {
  if(TSPSetting == ""){
    window.location.href = "EXP_SBHawbList.html";
  }else{window.location.href = "dashboard-export.html"; }
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

              localStorage.setItem('MawbRowId', obj[0].MAWBROWID);
              localStorage.setItem('HawbRowId', obj[0].HAWBROWID);
              localStorage.setItem('IgmRowId', obj[0].IGMROWID);

              $("#txtSBNo").text(obj[0].SBNumber); 
              $("#txtSBDate").text(obj[0].SBDate); 
              if(TSPSetting == ""){
                localStorage.setItem('HouseArrayData',obj[0].SBGUID);
              }else{ 
                  localStorage.setItem('HouseArrayData',obj[0].AWBID);}
              
              _SBNumber = obj[0].SBNumber;
              _SBDate = obj[0].SBDate;
              ACSCurrentBalance = obj[0].ACSCurrentBalance; 
        
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
                        
                        $("#spnPcsTotalMawb").text(obj[0].MAWBPices); 
                        $("#spnPcsRcvdMawb").text(obj[0].MAWBPices); 
                        $("#spnGrWtTotalMawb").text((obj[0].MAWBGrossWeight).toFixed(2)); 
                        $("#spnGrWtRcvdMawb").text((obj[0].MAWBGrossWeight).toFixed(2)); 
                        $("#spnChWtTotalMawb").text((obj[0].MAWBChargableWeight).toFixed(2));
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
                      $("#spnSBType").text(obj[0].SBType); 
                      $("#spnSBNoP").text(obj[0].SBNOP); 
                      $("#spnSBGrWt").text((obj[0].SBGrossWeight).toFixed(2));
                      $("#spnSBVolWt").text((obj[0].VolumetricWeight).toFixed(2)); 
                      $("#spnSBChWt").text((obj[0].ChargeableWeight).toFixed(2)); 
                      $("#spnGrWtTotal").text((obj[0].HAWBGrossWeight).toFixed(2));
                    $("#spnGrWtRcvd").text((obj[0].HAWBGrossWeight).toFixed(2)); 
                      $("#spnChWtTotal").text((obj[0].HAWBChargableWeight).toFixed(2)); 
              }
             
             
      

              
              $("#spnCustomBroker").text(obj[0].CHACode); 
              $("#spnFOBVal").text(obj[0].FOBValue); 
              $("#spnExportName").text(obj[0].ExporterName);

              SBASIStatus = obj[0].ASIStatus;
            //   oocstatus = obj[0].OoCApproved;
            //   asistatus = obj[0].BoEASIStatus;
             VTStatus = obj[0].VTStatus;
              if(obj[0].ASIStatus == "Completed"){
                $("#SBASIDot").css('background-color', '#00AAA2');
                $("#SBASIDot").css('border', '1px solid #00AAA2');
                $("#TSPDot").css('border', '1px solid orange');
                $("#btnSubmitAsi").attr('disabled', 'disabled');
                $("#btnSubmitAsi").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
              }else{
                $("#btnSubmitAsi").removeAttr('disabled');
                $("#btnSubmitAsi").css({ "background-color": "#00AAA2", "color": "white" , "border-color": "#00AAA2"});
                $("#SBASIDot").css('background-color', '#f9f9f9');
                $("#SBASIDot").css('border', '1px solid orange');
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

                    if(obj[0].DocStatus == "Completed"){
                      $("#DocStatus").text(obj[0].DocStatus).css( "color", "#00AAA2" );
                      $("#DocStatusDate").text(obj[0].DocApprovedDate.substring(0, 11));
                        $("#DocStatusTime").text(obj[0].DocApprovedDate.substring(11, 17));
                     }
                      else{
                      $("#DocStatus").text(obj[0].DocStatus).css( "color", "#ff9800" );
                      $("#DocStatusDate").text("--");
                      }
              // if(obj[0].BoEASIStatus == "Pending" && obj[0].BoEApproved == "Approved" && (obj[0].OoCApproved == "Approved")){
              //   $("#btnSubmitAsi").removeAttr('disabled');
              //   $("#btnSubmitAsi").css({ "background-color": "#00AAA2", "color": "white" , "border-color": "#00AAA2"});
              // }else{
              //   $("#btnSubmitAsi").attr('disabled', 'disabled');
              //   $("#btnSubmitAsi").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
              // }

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
                $("#TSPDot").css('border', '1px solid #00AAA2');
                $("#VTDot").css('border', '1px solid orange');
                TspStatus = "Completed";
                $("#TSPStatus").text((obj[0].TSPAmount).toFixed(2)).css( "color", "#00AAA2" );
                $("#TSPStatusDate").text(obj[0].TspDateTime.substring(0, 11));
                  $("#TSPStatusTime").text(obj[0].TspDateTime.substring(11, 17));
               }else{
                  $("#TSPStatus").text(obj[0].TSPStatus).css( "color", "#ff9800" );
                  $("#TSPDot").css('background-color', '#f9f9f9');
                $("#TSPStatusDate").text("--");
                }
            if(obj[0].VTStatus == "Generated"){
              VehTokenNos = obj[0].VehicleTokenNo;
              localStorage.setItem('VehTokenNos',VehTokenNos);
              //VehTokenNos = "IVT2203100543,IVT2203100543";
              $("#VTDot").css('background-color', '#00AAA2');
              $("#VTDot").css('border', '1px solid #00AAA2');
              $("#VTStatus").text(obj[0].VTStatus).css( "color", "#00AAA2" );
              $("#VTStatusDate").text(obj[0].VTDateTime.substring(0, 11));
              $("#VTStatusTime").text(obj[0].VTDateTime.substring(11, 17));}
              
              else{
                $("#VTDot").css('background-color', '#f9f9f9');
                $("#VTStatus").text(obj[0].VTStatus).css( "color", "#ff9800" );
              $("#VTStatusDate").text("--");
              }
          
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
               GHAID = obj[0].CustodianID;
               localStorage.setItem('GhaId', GHAID);
              $("#txtCTO").text(obj[0].Custodian); 
              localStorage.setItem('GhaName', obj[0].Custodian);
              
              $("#spnBalance").text(ACSCurrentBalance); 
              $("#spnAcsCharge").text("INR " + (obj[0].Amount).toFixed(2)); 
              $("#spnCGST").text("INR " +  (obj[0].CGST).toFixed(2)); 
              $("#spnSGST").text("INR " +  (obj[0].SGST).toFixed(2)); 
              console.log(obj[0].SGST)
              $("#spnGSTTotal").text("INR " +  ((obj[0].CGST + obj[0].SGST)).toFixed(2));
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
              insertSBASIDetails();
              // $.alert(errmsg,errmsgcont);
              return;
    
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

  insertSBASIDetails = function(){
  

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
              insertSBASIRequestStatus();
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
  insertSBASIRequestStatus = function(){
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
                updateSBASIFlag();
               
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
  updateSBASIFlag = function(){
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
          "SBID":sbID

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
              $("body").mLoading('hide');
              errmsg = "Alert</br>";
              errmsgcont = obj[0].strErrorMessage;
              $.alert(errmsg,errmsgcont);
              ExportListingPageDetails('2', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId, awbID, sbID);
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
  getTspDetails = function(){
   var element = document.getElementById("heading6"); 
   var text = element.getAttribute("aria-expanded");
  // alert(text)

  if(text == "true"){
    // if(SBASIStatus == "Completed"){
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
            
    // }else{
    //       var disablePanel = true;  //or falsey value
    //       $("#accordionTSP").on('hide.bs.collapse show.bs.collapse',  PanelEvent);

    // }    
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
        // var obj = JSON.parse(response.d);
        // console.log(response.d);
        // console.log(obj);
        //   if (obj[0].StrErrorMsg == undefined) {
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
        // }else{
         
        //   errmsg = "Alert</br>";
        //   errmsgcont = obj[0].StrErrorMsg;
        //   $.alert(errmsg,errmsgcont);
        //   return;
        // }
      
  
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
          // var obj = JSON.parse(response.d);
          // console.log(response.d);
          // console.log(obj);
          //   if (obj[0].StrErrorMsg == undefined) {
              const [clientXml, id] = input.split('~');
              console.log(clientXml); 
              console.log(id);
              var fields = id.split('=');
              console.log(fields[1]);
              var payTspId = fields[1];
              localStorage.setItem('payTspId', payTspId);
              var obj = JSON.parse(clientXml);
              console.log(obj);
              console.log(obj["EXPCHGCALCULATIONRESPONSE"][0].errorMessage);

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
   
              var chageAmount = 0;
             var Gst = 0;
             var totalCharges = 0;
            
              if ((obj["EXPCHGCALCULATIONRESPONSE"][0].chargeDetails).length > 0) {
                for(i = 0; i< (obj["EXPCHGCALCULATIONRESPONSE"][0].chargeDetails).length ; i++){
                  
                  row += " <tr class=''>";
                  row += "<td>" + obj["EXPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].chargeDescription + "</td>";
                  row += "<td>" + (obj["EXPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].totalAmount).toFixed(2) + "</td>";
                  var a = (obj["EXPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].totalAmount).toFixed(2);
                  var gstAmount = obj["EXPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].cgstAmount + obj["EXPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].sgstAmount + obj["EXPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].igstAmount + obj["EXPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].utgstAmount;
                  row += "<td>" + (gstAmount).toFixed(2) + "</td>";
                  chageAmount += parseFloat(a);
                  Gst += parseFloat((gstAmount).toFixed(2));
                  var totalAmt = obj["EXPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].totalAmount + gstAmount;
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
              errmsgcont = obj["EXPCHGCALCULATIONRESPONSE"][0].errorMessage;
              $.alert(errmsg,errmsgcont);
              return;
            }
          // }else{
         
          //   errmsg = "Alert</br>";
          //   errmsgcont = obj[0].StrErrorMsg;
          //   $.alert(errmsg,errmsgcont);
          //   return;
          // }
   
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
        $("body").mLoading('hide');
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
           
              $("#tblChargeDetails").show(); 
              $("#proceedBtn").hide(); 
              
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
        $("body").mLoading('hide');
        var obj = JSON.parse(response.d);
       console.log(response.d);
       console.log(obj);
        if (obj.length > 0) {
          if (obj[0].StrMessage == undefined) {
  
            var ClientResponseXML = "<ReceiptDetails><PaymentMode>PDA</PaymentMode><PDAccountNo>123</PDAccountNo><TotalAmount>1100.25</TotalAmount><TotalTax>198.25</TotalTax><AdjustableAmount>0</AdjustableAmount><PayableAmount>1280.25</PayableAmount><PaidBy /><CreatedBy>ACS</CreatedBy><CreatedOn>2022-03-14T19:42:58.2960483+05:30</CreatedOn><Pieces>30</Pieces><GrossWeight>300.000</GrossWeight><ChargeableWeight>300.000</ChargeableWeight><PDBalance>10000</PDBalance><CommodityGroup>GEN</CommodityGroup><CommodityDesc>AUTO PARTS</CommodityDesc></ReceiptDetails><ChargeDetails><clsImpChargeCalculationResponse><ChargeCode>TER</ChargeCode><ChargeDescription>Terminal Charge</ChargeDescription><TotalAmount>800</TotalAmount><TaxAmount>144</TaxAmount><TaxCode /></clsImpChargeCalculationResponse><clsImpChargeCalculationResponse><ChargeCode>STP</ChargeCode><ChargeDescription>Strapping Charge</ChargeDescription><TotalAmount>200</TotalAmount><TaxAmount>36</TaxAmount><TaxCode /></clsImpChargeCalculationResponse><clsImpChargeCalculationResponse><ChargeCode>DEM</ChargeCode><ChargeDescription>Demurrage Charges</ChargeDescription><TotalAmount>100</TotalAmount><TaxAmount>18</TaxAmount><TaxCode /></clsImpChargeCalculationResponse></ChargeDetails><Status>0</Status></clsImpCalculationResponse>"
     
            console.log(response);
       
              xmlDoc = $.parseXML(ClientResponseXML),
              
           
              $("#tblChargeDetails").show(); 
              $("#proceedBtn").hide(); 
              $("#passwordTag").hide(); 
              
              
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
        $("body").mLoading('hide');
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
  
    PayTSPDetails = function(){
  
     if($("#HSNCode").val() == "" ){
       $("body").mLoading('hide');
       errmsg = "Message</br>";
       errmsgcont = "Please enter HSN Code.</br>";
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
   
 if(commodityType == "Select"){
  $("body").mLoading('hide');
     errmsg = "Alert</br>";
     errmsgcont = "Please select Cargo Type.</br>";
     $.alert(errmsg,errmsgcont);
     return;
 }
 if(commodityName == "Select"){
  $("body").mLoading('hide');
     errmsg = "Alert</br>";
     errmsgcont = "Please select Commodity Name.</br>";
     $.alert(errmsg,errmsgcont);
     return;
 }
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
             }
             else if(obj[0].StrMessage == "Please enter transaction password."){
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
            //$.alert(errmsg,errmsgcont);
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
       // alert('Server not responding...');
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
          //  $.alert(errmsg,errmsgcont);
            return;
        }

    },
    error: function (xhr, textStatus, errorThrown) {
        $("body").mLoading('hide');
        // alert('Server not responding...');
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

            $("#btnPayTSP").removeAttr('disabled', 'disabled'); 
              $("#btnPayTSP").css({ "background-color": "#00AAA2", "color": "white" , "border-color": "#00AAA2"}); 
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
            IsAPIEnable = obj[0].IsAPIEnable;
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
  

 
  getVTDetails = function(){
    var element = document.getElementById("heading7");
    var text = element.getAttribute("aria-expanded");
   // alert(text);
 
   if(text == "true"){
      if(VTStatus== "Pending" && TspStatus== "Completed" ){

        var disablePanel = true;  //or falsey value
        $("#accordionVT").on('hide.bs.collapse show.bs.collapse',  PanelEvent);

        window.location.href = "EXP_AllocateShipment.html";
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


          var VT =  '"' + myarray[i] + '"';
                row += " <div class= 'div-wrapper' style= 'background-color:#00AAA2 !important'>";
                row += " <div onclick='goToVTDetails(" + VT + ")'>";
              
                row += " <h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;margin-top:0px !important'>" + myarray[i] + "</h5>";
                row += " <button id='' class='btn-arrow' style= 'float:right;margin :10px 15px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>";
                row += " </div>";
                row += " </div>";

                count++;
            
           
           
          }
        }
    else{
      $("#VTlist").empty();
      var myarray = '"' + VehTokenNos + '"';

                row += " <div class= 'div-wrapper' style= 'background-color:#00AAA2 !important'>";
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
          window.location.href = 'EXP_viewVehicleTokenDetails.html';
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
    getCommodityTypeAndDescription();
    $("#btnPayTSP").attr('disabled', 'disabled'); 
    $("#btnPayTSP").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
    // var sel ='<option value="-1">Select</option>';
    // $("#ddlCommodityTypeList").html(sel);

    // var select ='<option value="-1">Select</option>';
    // $("#ddlCommodityNameList").html(select);
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

   

function clearData(){
  $("#fileCSD").val("");
  $("#fileList").val("");
  $("#documentList").val("");
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
if( CSDFileFlag == true)
 ActualFileDataCSD = this.documentuploadobj.FileData;
 else if(AWBFileFlag == true)
 ActualFileDataAWB = this.documentuploadobj.FileData;
else 
ActualFileDataDoc = this.documentuploadobj.FileData;

}
  var CSDFileFlag =false;
  var AWBFileFlag =false;
function readCSDFile(event) {
  CSDFileFlag = true;
  this.fileOC = event.target.files[0];
  console.log("file========", event.target.files[0]);

  this.fileName = this.fileOC.name;
  console.log("file Name========", this.fileName);
   var input=  this.fileName;
   documentCSDName = input.substring(0, input.indexOf("."));
  CSDFileSize = this.fileOC.size;
  const fsize = this.fileOC.size;
  this.fileSize = Math.round((fsize / 1024));
  console.log("file size ========", this.fileSize);
  // The size of the file.
  if (this.fileSize >= 2048) {
    this.fileList = '';

    $("#fileCSD").val(''); 
    errmsg = "Alert</br>";
    errmsgcont = "Please select a file less than 2MB.</br>";
    $.alert(errmsg,errmsgcont);
    return;
  } else {
    uploadFlag =false;
  
  }


}
function readFile(event) {
  CSDFileFlag = false;
  AWBFileFlag = false;
  this.fileOC = event.target.files[0];
  console.log("file========", event.target.files[0]);

  this.fileName = this.fileOC.name;
  console.log("file Name========", this.fileName);
   var input = this.fileName;
   documentName = input.substring(0, input.indexOf("."));

  documentsize = this.fileOC.size;
  const fsize = this.fileOC.size;
  this.fileSize = Math.round((fsize / 1024));
  console.log("file size ========", this.fileSize);
  // The size of the file.
  if (this.fileSize >= 2048) {
    this.fileList = '';
    $("#fileList").val(''); 
    errmsg = "Alert</br>";
    errmsgcont = "Please select a file less than 2MB.</br>";
    $.alert(errmsg,errmsgcont);
    return;
  } else {
  }


}
function readAWBFile(event) {
  CSDFileFlag = false;
  AWBFileFlag =true;
  this.fileOC = event.target.files[0];
  console.log("file========", event.target.files[0]);

  this.fileName = this.fileOC.name;
  console.log("file Name========", this.fileName);
   var input=  this.fileName;
   documentAWBName = input.substring(0, input.indexOf("."));
  AWBFileSize = this.fileOC.size;
  const fsize = this.fileOC.size;
  this.fileSize = Math.round((fsize / 1024));
  console.log("file size ========", this.fileSize);
  // The size of the file.
  if (this.fileSize >= 2048) {
    this.fileList = '';

    $("#fileAWB").val(''); 
    errmsg = "Alert</br>";
    errmsgcont = "Please select a file less than 2MB.</br>";
    $.alert(errmsg,errmsgcont);
    return;
  } else {
    uploadFlag =false;
  
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

    reader.onload = imageIsLoaded;
  }
  console.log(JSON.stringify(documentuploadobj))
}
var filePath;
function imageIsLoaded(e) {
  filePath = e.target.result;
  $('#CapPdf').attr('href', e.target.result);
};

openDoc =function(){
  console.log("in open document");
  window.open(filePath);

}

$('#removeFile').click(function () {
  $("#fileList").val("");
  $("#viewFile").text("");
}); 


function otherDocumentsList(){
  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/Get_DocumentTemplate",
    data: JSON.stringify({OrganizationTypeId: 3,CanCreate:true}),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
        console.log(obj)
        if (obj.length > 0) {

            var rson;
            rson += '<option value="" selected>Select Document</option>';
            for (var i = 0; i < obj.length; i++) {
                rson += '<option value="' + obj[i].DocumentTemplateId + '">' + obj[i].Name + '</option>';
            }
                $("#documentList").html(rson);
          
           


        }

    },
    error: function (xhr, textStatus, errorThrown) {
        $("body").mLoading('hide');
        //alert('Server not responding...');
    }
});
}
//var uploadFlag = false;
// uploadDoc = function(){
// // uploadFlag =true;
//  //FillGridDocDetails(ActualFileData);
// }


uploadClick = function(){
  $('body').mLoading({
    text: "Please Wait..",
});

  if($("#fileCSD").val()){
    var templateIdCSD =  $("#CSDDocument").val();
    uploadDoc(ActualFileDataCSD, documentCSDName,CSDFileSize,templateIdCSD );
  }
  // if($("#fileAWB").val()){
  //   var templateIdAWB =  $("#AWBDocument").val();
  //   uploadDoc(ActualFileDataAWB, documentAWBName,AWBFileSize,templateIdAWB );

  // }
      if($("#fileList").val()){
        var templateId =  $("#documentList").val();
        if(templateId ==""){
          $("body").mLoading('hide');
          errmsg = "Alert</br>";
          errmsgcont = "Please select Document Type.</br>";
          $.alert(errmsg,errmsgcont);
          return;
        }
        uploadDoc(ActualFileDataDoc, documentName, documentsize, templateId);
      }
  {
    if(($("#fileCSD").val()) == ""  && ($("#fileList").val()== "") ){
      $("body").mLoading('hide');
    errmsg = "Alert</br>";
    errmsgcont = "Please choose a file to proceed.</br>";
    $.alert(errmsg,errmsgcont);
    return;
    }
  }
  $("#fileCSD").val("");
  $("#fileAWB").val("");
  $("#fileList").val("");

}

uploadDoc = function(fileData,filename,pdfFileSize, templateId){
  console.log("Actual file data === ", fileData);
  $('body').mLoading({
    text: "Please Wait..",
});
  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/Insert_Edocket_Document",
    data: JSON.stringify(
      {
        "fupDocument" :filename,
        "ActualFileData":fileData,
        "FileLength": pdfFileSize,
        "FileExtension": ".pdf",
        "Mode":"",
        "DocumentTemplateId":templateId,
        "JobId":MAWBID,
        "Comments":"TEST",
        "Status":"UPLOADED",
        "CreatedByUserId":CreatedByUserId,
        "OrganizationTypeId":OrganizationTypeId,
        "OrganizationBranchId":OrganizationBranchId,
        "OrganizationId":OrganizationId,
        "UniqueDocId":"",
        "DocumentStoreId":0,
        "EventName" : "EX22",
        "GHABranchID" : GHAID
      }),
      
      
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
      var obj = JSON.parse(response.d);
       console.log(obj);
      
          if (obj.ErrorMSG) {
            $("#documentList").val("");
              GetDocumentsForJobByOrganization_EDocketExport();
          
    
        } else {
          $("#documentList").val("");
          $("#fileCSD").val("");
          $("#fileAWB").val("");
            $("body").mLoading('hide');
            errmsg = "Alert</br>";
            errmsgcont = obj[0].ValidationMsg;
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


var storeIdxml ="";
var GetDocuments;
submitToCTO = function(){
 
  if(storeIdxml== ""){
    errmsg = "Alert</br>";
    errmsgcont = "Please select record to proceed.</br>";
    $.alert(errmsg,errmsgcont);
    return;
  }
  var xml = storeIdxml.replace("\\\\", "\\");
  $('body').mLoading({
    text: "Please Wait..",
});
  
  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/Update_Multiple_Edocket",
    data: JSON.stringify(
      {
        "AWBId":MAWBID, "UserId":CreatedByUserId,"organizationId":OrganizationId,"orgbranchId":OrganizationBranchId,
        "DocumentStoreIdXML":"<Documents>" + xml + "</Documents>"
      }),
      
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
      var obj = JSON.parse(response.d);
      console.log(response.d);
      console.log(obj);
      $("body").mLoading('hide');
        if (obj[0].CTOStatus == undefined) {
 
     
        } else {
            $("body").mLoading('hide');
            errmsg = "Alert</br>";
            errmsgcont = obj[0].CTOStatus;
            $.alert(errmsg,errmsgcont);
            storeIdxml ="";
            var element=document.getElementsByName('checkAll'); 
            element[0].checked = false;
            GetDocumentsForJobByOrganization_EDocketExport();
            ExportListingPageDetails('2', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId, awbID, sbID);
            return;
        }
  
    },
    error: function (xhr, textStatus, errorThrown) {
        $("body").mLoading('hide');
        alert('Server not responding...');
    }
  });
}
GetDocumentsForJobByOrganization_EDocketExport = function(){
  $("#documentList").val("");
    $('body').mLoading({
    text: "Please Wait..",
});
  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/GetDocumentsForJobByOrganization_EDocketExport",
    data: JSON.stringify(
      {
        "jobId":MAWBID,
        "organizationTypeId":OrganizationTypeId,
        "organizationId":OrganizationId,
        "HawbId":0,
      }),
      
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
       var obj = JSON.parse(response.d);
       console.log(response.d);
       console.log(obj);
        if (obj.length > 0) {
          GetDocuments = obj;
          FillGridDocDetails(obj);

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
var count= 1;
var counter = 0;
var countCol = 1;

FillGridDocDetails = function (obj) {
  $("#docTable").empty();
    var count = 0;
    var row = "";
    if (obj.length > 0) {
        $.each(obj, function (i, d) {
          var DocumentStoreId = '"' + d.DocumentStoreId + '"';
          var DocumentTemplateId = '"' + d.DocumentTemplateId + '"';
          var status =  d.Status ;
          path = '' + d.FilePath + '';
          
              $("#tracklabel").show();
              $("#tblTrackInfo").show();
          
              row += "<tr id= " + count + ">";
              if(status == "Completed"){
              row +="<td><input type='checkbox' name='chk' id= 'cbCheck"  + count + "' value= " + DocumentStoreId + " class='checkboxCheck'  disabled/></td>";
              }else{
             row +="<td><input type='checkbox' name='chk' id= 'cbCheck"  + count + "' value= " + DocumentStoreId + " class='checkboxCheck'  onclick='checkClick(this, " + DocumentTemplateId + ");'/></td>";
             }
          
                  //  if(CSDFileFlag == true){
                  //   row += "<td class='text-left' style='color: black;font-size:12px;word-break: break-all;padding-bottom: 5px;' style='text-transform:none !important' ><a id = 'myFile' href='#' onclick='goToDocument(" + ActualFileData + ", " + count + ")'>" + documentCSDName + "</a></td>";
                  //  }else{
                    row += "<td class='text-left' style='color: black;font-size:12px;word-break: break-all;padding-bottom: 5px;' style='text-transform:none !important' ><a id = 'myFile' href='#' onclick='goToDocument(" + count + ")' >" + "<u>" + "<input type='' id= 'file"  + count + "' value= " + path + " style='display:none' />" + d.DocumentName + "</u>" + ".pdf</a></td>";+ ".pdf</a></td>";
                  // }
                    if(d.Status == "Completed"){
                        row += "<td><img src='img/icon_status_completed.png' style='text-transform:none !important'/></td>";
                    }else{
                    row += "<td><img src='img/icon_status_pending.png' style='text-transform:none !important'/></td>";
                    }
            
                  row += "<td class='text-left' style='color: black;' style='text-transform:none !important'></td>";
                  if(d.DocAcceptance == "True"  && status == "Completed"){
                    row += "<td  id= " + count + "><img src='img/icon_delete_disabled.png' value= " + DocumentStoreId + " style='text-transform:none !important' disabled></td>";
                    $("#submitButton").attr('disabled', 'disabled');
                    $("#submitButton").css({ "background-color": "lightgrey", "color": "white !important" , "border": "1 px solid grey !important"});
                    }else{
                      row += "<td  id= " + count + "><img src='img/delete.png' value= " + DocumentStoreId + " style='text-transform:none !important' onclick='deleteRow(this, "+ DocumentTemplateId + ",  " + DocumentStoreId + ");'></td>";
                      $("#submitButton").removeAttr('disabled');
                      $("#submitButton").css({ "background-color": "#20A8D8", "color": "white" , "border-color": "#20A8D8"});
                    }

                    if(d.DocAcceptance == "True"){
                    
                      $("#submitButton").attr('disabled', 'disabled');
                      $("#submitButton").css({ "background-color": "lightgrey", "color": "white !important" , "border": "1 px solid grey !important"});
                      }else{
                       
                        $("#submitButton").removeAttr('disabled');
                        $("#submitButton").css({ "background-color": "#20A8D8", "color": "white" , "border-color": "#20A8D8"});
                      }
               
                  row += "</tr><br><br>";
              
              count++;
              });
        $("#docTable").append(row);
        $("body").mLoading('hide');
    } else {
        $("body").mLoading('hide');
        $("#vehicleDetailsRow").html('There are no Vehicle details available').css('color', '#f7347a');
    }


}
checkClick = function(element, templateId){
  console.log(templateId)

     var rowJavascript = element.parentNode.parentNode;

   var index = rowJavascript.rowIndex - 1;
   var checkId = "#cbCheck" + index;
   var storeId  = $(checkId).val();
   storeIdxml += "<Document Id=\""+ storeId + "\" TemplateId=\""+ templateId + "\"/>";

 }
 $(".selectall").click(function(){
  var element=document.getElementsByName('checkAll'); 
  var ele=document.getElementsByName('chk');
  if((element[0].checked == true)){
    GetDocuments.forEach((element, index, array) => {
      if(ele[index].disabled == false){
      ele[index].checked=true; 
      storeIdxml += "<Document Id=\""+ element.DocumentStoreId + "\" TemplateId=\""+ element.DocumentTemplateId + "\"/>";
      }
  });
//     for(var i=0; i<ele.length; i++){ 
//         if(ele[i].type=='checkbox'){  
//             ele[i].checked=true;  
//             var rowid = '#cbCheck' + i;
//           console.log(rowid);
  
//     if ($(rowid).is(':checked')) {
//       console.log('its checked');
//       var storeId  = $(rowid).val();
//       storeIdxml += "<Document Id=\""+ storeId + "\" TemplateId=\""+ templateId + "\"/>";

//     }
//   }
// }
}else{
for(var i=0; i<ele.length; i++){  
if(ele[i].type=='checkbox')  
    ele[i].checked=false;  
    storeIdxml ="";
}
}
});
 
   deleteRow = function(element, tempId, storeId){
    console.log("Ids ====",  tempId + storeId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/Delete_Edocket_Document",
    data: JSON.stringify(
    {
    
      "DocumentStoreId":storeId,
      "DocumentTemplateId":tempId,
      "OrganizationTypeId":OrganizationTypeId,
      "AWBId":MAWBID,
      "UserId":CreatedByUserId,
      "organizationId":OrganizationId,
      "orgbranchId":OrganizationBranchId
    }),
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: function (response, xhr, textStatus) {
    var obj = JSON.parse(response.d);
        console.log(response.d);
        console.log(obj);
     if (obj[0].Successmessage == "Document deleted successfully.") {
      ExportListingPageDetails('2', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId, awbID, sbID);
      counter = 0;
      countCol = 1;
 
          var rowJavascript = element.parentNode.parentNode;
      document.getElementById("tblTrackInfo").deleteRow(rowJavascript.rowIndex);
        count--;
       
 
        var table   = document.getElementById('tblTrackInfo');
        var trRows  = table.getElementsByTagName('tr');
        var tdRows  = table.getElementsByTagName('td');
        var j = 0;
        var k = 0;
        for (var i = 0; i < trRows.length; i++) 
        {
            trRows[i].id = "row"+counter;
    
            counter++;
        }
 
       for( var i = 0; i< tdRows.length; i++){
          
            for (var j; j < k+5; j++) 
            {
              
              tdRows[j].id = "colum"+countCol;
              var index = i+1;
              $(".checkboxCheck").attr("id", 'cbCheck'+ i);
              // $(input).attr("id", 'cbCheck'+countCol);
            }
          k=j;
          countCol++;
          index++;
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
   

   //   $('#tblTrackInfo tbody').on( 'click', 'td', function () {
   //     alert('Data:'+$(this).html().trim());
   
   // });

   goToDocument =function(index){
    var id = "#file" + index;
    var filePath  = $(id).val();
     console.log("in open document", filePath);
     window.open(filePath);
 

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