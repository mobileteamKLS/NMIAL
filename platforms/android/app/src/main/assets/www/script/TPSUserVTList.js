
var LocationName = localStorage.getItem('LocationName');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');
var OrganizationTypeId = localStorage.getItem('OrganizationTypeId');
var MAWBNo = localStorage.getItem('mawbNo');
var AirlinePrefix = localStorage.getItem('Prefix');
var AwbNumber = localStorage.getItem('AWBNumber');
var MenuTitle= localStorage.getItem('MenuTitle');
var Tab = localStorage.getItem('Tab');
var eventType = localStorage.getItem('event');
var TSPSetting;
var fileParm;
var fileUploadParm;
  var base64textString;
  var documentuploadobj = { };
var  ActualFileDataCSD;
var  ActualFileDataAWB;
var  ActualFileDataDoc;
var documentCSDName;
var documentAWBName;
var documentName;
var CSDFileSize;
var AWBFileSize;
var documentsize;
var AWBid;
var path;
var errmsg = "";
var MAWBASIStatus;
var GHAID;
var MAWBID;
$(function () {
  if(Tab == "Exports"){
    Get_DockInDetailsExports("2", "95715", eventType);
}else{
    Get_DockInDetailsImports("1", "95715" ,eventType );
}

  setTimeout(function () {
      window.location.href = 'loginScreen2.html'
  }, 1200000);


  console.log(Tab)
  $("#MenuHeading").text(Tab);
  $(".primary-heading").text(MenuTitle);

  
 
});
 
function back() {
    window.location.href = "TPSUserDashboard.html";
  }


  function logOut() {
    modal.style.display = "block";
 
 }
function exitModal() {
 modal.style.display = "none";
}
Get_DockInDetailsExports = function (OperationType, OrganizationBranchId, event) {
    $.ajax({
        type: 'POST',
        url: TSMServiceUrl + "/Get_VTDetailsCheckInCheckOut",
        data: JSON.stringify({ OperationType: OperationType, OrganizationBranchId: OrganizationBranchId,OperationEvent: event }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
      
        success: function (response, xhr, textStatus) {
            var obj = JSON.parse(response.d);
            FillGridExports(response)
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}
Get_DockInDetailsImports = function (OperationType, OrganizationBranchId, event) {
    $.ajax({
        type: 'POST',
        url: TSMServiceUrl + "/Get_VTDetailsCheckInCheckOut",
        data: JSON.stringify({  OperationType: OperationType, OrganizationBranchId: OrganizationBranchId,OperationEvent: event }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            var obj = JSON.parse(response.d);
            FillGridImports(response)
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}

FillGridExports = function (response) {
    var obj = JSON.parse(response.d);
    
    var count = 0;
    var row = "";
    if (obj.length > 0) {
        $.each(obj, function (i, d) {
            var _vtno = '"' + d.VTNo + '"';
            var slotDateTime = d.SLOTTIME  //d.DOCKNAME;
            var slotTime = slotDateTime.substring(0, 11);
            var slotDate = slotDateTime.substring(12, 24);
            row += "<div class='row  contacts-radius' onclick='edit(" + _vtno + ")' style=' background-color: #00AAA2;margin: 10px 0px;'>";
            row += "<div class='col-5 borderforcenter' style = 'padding:7px;'>";
            row += "<div class='centerdiv' style=' padding-left: 0px !important;padding-top: 5px;'>";
            row += "<span style='font-weight:bold;color: white;font-size: 15px;'>" + d.VTNo + "</span><br>"; 
        
            if(d.DOCKNAME == "") 
                row += "<div class='text-left dockname' style='display:flex'><label class='dock'>" + ' -- ' + "</label><span class='slotDatetime'style='color:white;'> " + slotDateTime + "</span></div>";
                else
                row += "<div class='text-left dockname' style='display:flex'><label class='dock'>" + d.DOCKNAME + "</label><span class='slotDatetime'style='color:white;'> " + slotDateTime + "</span></div>";
          
            row += "</div>";
            row += "</div>";
    
            row += "<div class='col-5 icon-align' style = 'padding:10px;'>";
            row += "<div class='text-left'><span style='color:white;font-size:15px;font-weight: bold;'><i class='zmdi zmdi-account' style= 'margin-right: 10px';></i> " + d.DRIVERNAME + "</span></div>";
            row += "<div class='text-left' style='font-size:10px;font-weight:bold;margin-top: 2px;;display:flex'><img src='img/Icon_Truck.png' class='png-Icon' style = 'height:25px;'><span style='color:white;margin: 15px 10px 0px;font-size: 15px;'> " + d.VEHICLENO + "</span></div>";
            row += "</div>";
           
            row += "<div class='col-2 text-center'>";
            row += "<button  class='btn btn-secondary btn--icon zmdiIconButton'><i class='zmdi zmdi-chevron-right zmdi-hc-lg zmdiIconSize'></i></button>";
            row += "</div>";
            row += "</div>";
            count++;
    });
        $("#divVTNoList").append(row);
        $("body").mLoading('hide');
    } else {
      
           $("body").mLoading('hide');
           $("#divVTNoList").html('There are no active Vehicle Token(s) available for '+ MenuTitle.substring(0, MenuTitle.length-8) +'.').css('color', '#f7347a');
         
    }
}
FillGridImports = function (response) {
    var obj = JSON.parse(response.d);
    var count = 0;
    var row = "";
    if (obj.length > 0) {
        $.each(obj, function (i, d) {
            var _vtno = '"' + d.VTNo + '"';
            var slotDateTime = d.SLOTTIME  //d.DOCKNAME;
            var slotTime = slotDateTime.substring(0, 11);
            var slotDate = slotDateTime.substring(12, 24);
            
            row += "<div class='row  contacts-radius' onclick='edit(" + _vtno + ")' style=' background-color: #00AAA2;margin: 10px 0px;'>";
            row += "<div class='col-5 borderforcenter' style = 'padding:7px;'>";
            row += "<div class='centerdiv' style=' padding-left: 0px !important;padding-top: 5px;'>";
            row += "<span style='font-weight:bold;color: white;font-size: 15px;'>" + d.VTNo + "</span><br>"; 
        
            if(d.DOCKNAME == "") 
                row += "<div class='text-left dockname' style='display:flex'><label class='dock'>" + ' -- ' + "</label><span class='slotDatetime'style='color:white;'> " + slotDateTime + "</span></div>";
                else
                row += "<div class='text-left dockname' style='display:flex'><label class='dock'>" + d.DOCKNAME + "</label><span class='slotDatetime'style='color:white;'> " + slotDateTime + "</span></div>";
          
            row += "</div>";
            row += "</div>";
    
            row += "<div class='col-5 icon-align' style = 'padding:10px;'>";
            row += "<div class='text-left'><span style='color:white;font-size:15px;font-weight: bold;'><i class='zmdi zmdi-account' style= 'margin-right: 10px';></i> " + d.DRIVERNAME + "</span></div>";
            row += "<div class='text-left' style='font-size:10px;font-weight:bold;margin-top: 2px;;display:flex'><img src='img/Icon_Truck.png' class='png-Icon' style = 'height:25px;'><span style='color:white;margin: 15px 10px 0px;font-size: 15px;'> " + d.VEHICLENO + "</span></div>";
            row += "</div>";
           
            row += "<div class='col-2 text-center'>";
            row += "<button  class='btn btn-secondary btn--icon zmdiIconButton'><i class='zmdi zmdi-chevron-right zmdi-hc-lg zmdiIconSize'></i></button>";
            row += "</div>";
            row += "</div>";
            count++;
    });
    $('#divVTNoList').empty();
        $("#divVTNoList").append(row);
        $("body").mLoading('hide');
    } else {
   
     
           $("body").mLoading('hide');
           $("#divVTNoList").html('There are no active Vehicle Token(s) available for '+ MenuTitle.substring(0, MenuTitle.length-8) +'.').css('color', '#f7347a');
     
       
    }
}

edit = function (vtno) {
    localStorage.setItem('VTNo', vtno);
 
    window.location.href = 'TpsUserVehicleScanning.html';
}

function searchVT(){
    localStorage.setItem('VTNo', "");
    window.location.href = 'TpsUserVehicleScanning.html';

}
// function Get_ImportsDockInDetails(){
//     Get_DockInDetails('1', OrganizationBranchId);
// }

