
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
var CTOId = localStorage.getItem('ctoID');
var GHANAME = localStorage.getItem('GhaName');

var houseArray = localStorage.getItem('HouseArrayData');
var houseArr = houseArray.split(',');

var arr = localStorage.getItem('HouseArrayData');
var ObjectToGenerateVT =localStorage.getItem('HouseObjectToGenerateVT');
var HouseObjectToGenerateVT;
$(function () {
  if(ObjectToGenerateVT){
    HouseObjectToGenerateVT = JSON.parse(ObjectToGenerateVT);}
  $("#AlloDot").css('border', '1px solid orange');
  // if(HawbNumber == ""){
  //   $("#btnAdd").hide();

  // }

  if(HouseObjectToGenerateVT == "" || HouseObjectToGenerateVT == null || HouseObjectToGenerateVT == undefined){
 
    getHouseDetails();
}else{
    FillSelectedDetails(HouseObjectToGenerateVT);
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
      window.location.href = "IMP_ShipmentDetails.html";
    }
    function goToAirIndiaAppCharges(){
  
      window.location.href = "IMP_selectHAWBtoVT.html";
    }
    function goToMenziesAppCharges(){
  
      window.location.href = "IMP_selectHAWBtoVT.html";
    }
    function toAssignVehicle(){
  
      window.location.href = "IMP_BookSlot.html";
    }
    function addAnotherHAWB(){
  
      window.location.href = "IMP_selectHAWBtoVT.html";
    }
    
  
    getHouseDetails = function () {
      console.log(IGMNo + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
      $.ajax({
          type: 'POST',
          url: TSMServiceUrl + "/ImportPendingBookSlotListCB",
          data: JSON.stringify(
      
              {"UserID": FFCreatedByUserId,
    
                "createdByOrgID": FFOrganizationId,
        
                "organizationBranchID":
        
                FFOrganizationBranchId,        
        
                "filterCondition": "",
        
                "PageNumber": 0,
        
                "RecordsPerPage": 10,
                "sortColumn": "",
                "sortOrder": "DESC",
        
                "GHABranchId": GHAOrganizationBranchId,
        
                "GHAOrganizationID":GHAOrganizationId
        
            }),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (response, xhr, textStatus) {
            var obj = JSON.parse(response.d);
            console.log(response.d);
            console.log(obj);
         var tempArr=[];
             if (obj.length > 0) {
               if (obj[0].ERRORMSG == undefined) {
             
               tempArr.push(obj.filter(function(p){
                if (p.HAWBGUID ==""){
                  return (p.MAWBGUID == arr)
                  }else{
                    return (p.HAWBGUID == arr)
                  }
           
              
              }))
          
                  console.log(tempArr);
                  arr1d = [].concat(...tempArr);
                  console.log(arr1d);
                  localStorage.setItem('HouseObjectToGenerateVT',  JSON.stringify(arr1d));
               $("#activeRecords").text(obj.length); 
          
               $("#selectedCTO").text(GHANAME); 
             
                 
                 FillControl(arr1d);
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
    FillControl = function (obj) {
 
      
      var totalPieces = 0;
      var totalGrWt = 0;
      var count = 0;
      var row = "";
      if (obj.length > 0) {
        localStorage.setItem('HouseObjectToGenerateVT',  JSON.stringify(obj));
                    $.each(obj, function (i, d) {
                  
                      var MawbNo = '"' + d.MAWBNumber + '"';
                      var AirlinePrefix = MawbNo.substring(1, 4);
                      var AwbNumber = MawbNo.substring(4, 12);
                      var MAWBNumber = AirlinePrefix.concat("-", AwbNumber);

                      totalPieces += d.AWBPcs;
                      totalGrWt += d.GrWt;
  

                      row += "<div class='panel-group' id='accordion' role='tablist' aria-multiselectable='true'>";
                      row += "<div class= 'div-wrapper'>";
                      row += "<div class='panel-heading' role='tab' id='heading3' style='font-size: 17px;padding: 5px 10px 0px 10px;display: inline-flex;width: 100%;' data-toggle='collapse' data-parent='#accordion' href='#collapse"+ i +"' aria-expanded='true'>";
                      row += "<div class='col-4' style='padding: 0px !important;'>";
                      row += "<div class='form-group vtMargin' >";
                      if(d.HAWBNumber == null || d.HAWBNumber == "")
                      row += "<label class='lbl' style='font-size: 13px;font-weight: bold;'></label>";
                      else
                      row += "<label class='lbl' style='font-size: 13px;font-weight: bold;'>" + d.HAWBNumber + "</label>";
                      row += "</div>";
                      row += "</div>";
                      row += "<div class='col-4' style='padding: 0px !important;'>";
                      row += "<div class='form-group vtMargin' >";
                      row += "<label class='lbl' style='font-size: 13px;font-weight: bold;'>" + d.AIRLINE_MAWB + "</label>";
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
                      row += "<th>GP No.</th>";
                      row += "<th> NOP</th>";
                      row += "<th>Gr.Wt.</th>";
                      row += "<th>Unit</th></tr>";
                      row += "</thead><tbody>";
                      row += "<tr style='text-align: center;font-size: 13px;height: 25px;'>";
                      row += "<td><span id=''>"+ d.GatePassNo +"</span></td>";
                      row += "<td><span id=''>"+ d.AWBPcs +"</span></td>";
                      row += "<td><span id=''>"+ (d.GrWt) +"</span></td>";
                      row += "<td><span id=''>Kgs</span></td>";
                      row += "</tr></tbody></table>";
                      row += "<table><tbody>";
                      row += "<tr style='text-align: center;font-size: 13px;height: 25px;'>";
                      row += "<td><span id=''>Allocated NOP</span></td>";
                      row += "<td><span id=''>Allocated Gr.Wt.</span></td>";
                      row += "<td><span id='' style = 'margin-right: 13px'>Unit</span></td></tr>";
                      row += "<tr style='text-align: center;font-size: 13px;height: 25px;'>";
                      row += "<td><input type= 'number' id='' value= '"+ d.AWBPcs +"' style='width: 70%;margin: 5px;' disabled/></td>";
                      row += "<td><input type= 'number' id='' value= '"+ (d.GrWt) +"' style='width: 70%;margin: 5px;' disabled/></td>";
                      row += "<td ><span id='' style = 'margin-right: 13px'>Kgs</span></td>";
                      row += "</tr></tbody></table>";
                      row += "</div></div></div>";

                    count++;
                        
                });
              
          $("#houseDetailsRow").append(row);
          $("body").mLoading('hide');
      } else {
          $("body").mLoading('hide');
          $("#houseDetailsRow").html('There are no details available').css('color', '#f7347a');
      }
      console.log("pieces = ",totalPieces)
      localStorage.setItem('TotalNoP', totalPieces)
      console.log("pieces = ",totalGrWt)
      localStorage.setItem('TotalGrWt', totalGrWt)
    }
    
    $("#ckbCheckAll").click(function () {
      $(".cbCheck").attr('checked', this.checked);
  });


   
  FillSelectedDetails = function (obj) {

    
    var totalPieces = 0;
    var totalGrWt = 0;
    var count = 0;
    var row = "";
    if (obj.length > 0) {
      var sbIdArr = arr.split(',');
      var a11=[];
      for(i =0 ; i< sbIdArr.length;i++){
    
          a11.push(obj.filter(function(p){
            if (p.HAWBGUID ==""){
            return (p.MAWBGUID == sbIdArr[i])
            }else{
              return (p.HAWBGUID == sbIdArr[i])
            }
          
          }))
        }
     
        console.log(a11);
        arr1d = [].concat(...a11);
        console.log(arr1d);

 const uniqueIds = [];

// const unique = arr1d.filter(element => {
//   const isDuplicate = uniqueIds.includes(element.BoEID);

//   if (!isDuplicate) {
//     uniqueIds.push(element.BoEID);

//     return true;
//   }

//   return false;
// });
var isDuplicate='';
const unique = arr1d.filter(element => {
  if (element.HAWBGUID ==""){
    isDuplicate = uniqueIds.includes(element.MAWBGUID);
    }else{
    isDuplicate = uniqueIds.includes(element.HAWBGUID);
    }


  if (!isDuplicate) {
    if (element.HAWBGUID ==""){
      uniqueIds.push(element.MAWBGUID);
     }else{
      uniqueIds.push(element.HAWBGUID);
     }
 
   

    return true;
  }

  return false;
});

console.log(unique);
      localStorage.setItem('HouseObjectToGenerateVT',  JSON.stringify(unique));
                  $.each(unique, function (i, d) {
                
             
                    var MawbNo = '"' + d.MAWBNumber + '"';
                    var AirlinePrefix = MawbNo.substring(1, 4);
                    var AwbNumber = MawbNo.substring(4, 12);
                    var MAWBNumber = AirlinePrefix.concat("-", AwbNumber);

                    totalPieces += d.AWBPcs;
                    totalGrWt += d.GrWt;

                    row += "<div class='panel-group' id='accordion' role='tablist' aria-multiselectable='true'>";
                    row += "<div class= 'div-wrapper'>";
                    row += "<div class='panel-heading' role='tab' id='heading3' style='font-size: 17px;padding: 5px 10px 0px 10px;display: inline-flex;width: 100%;' data-toggle='collapse' data-parent='#accordion' href='#collapse"+ i +"' aria-expanded='true'>";
                    row += "<div class='col-3' style='padding: 0px !important;'>";
                    row += "<div class='form-group vtMargin' >";
                    if(d.HAWBNumber == null || d.HAWBNumber == "")
                    row += "<label class='lbl' style='font-size: 13px;font-weight: bold;'></label>";
                    else
                    row += "<label class='lbl' style='font-size: 13px;font-weight: bold;'>" + d.HAWBNumber + "</label>";
                    row += "</div>";
                    row += "</div>";
                    row += "<div class='col-4' style='padding: 0px !important;'>";
                    row += "<div class='form-group vtMargin' >";
                    row += "<label class='lbl' style='font-size: 13px;font-weight: bold;'>" + d.AIRLINE_MAWB + "</label>";
                    row += "</div>";
                    row += "</div>";
                 
                    row += "<div class='col-3' style='padding: 0px !important;'>";
                    row += "<div class='form-group vtMargin' >";
                    if(d.HAWBGUID ==""){
                      row +='<button class="remove" id="delete" onclick="deleteClick(\'' +d.MAWBGUID + '\');" style="font-size: 15px;">Remove</button>';
                    }else{
                      row +='<button class="remove" id="delete" onclick="deleteClick(\'' +d.HAWBGUID + '\');" style="font-size: 15px;">Remove</button>';
                    }

                    row += "</div>";
                    row += "</div>";

                    row += "<div class='col-2'>";
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
                      row += "<th>GP No.</th>";
                      row += "<th> NOP</th>";
                      row += "<th>Gr.Wt.</th>";
                      row += "<th>Unit</th></tr>";
                      row += "</thead><tbody>";
                      row += "<tr style='text-align: center;font-size: 13px;height: 25px;'>";
                      row += "<td><span id=''>"+ d.GatePassNo +"</span></td>";
                      row += "<td><span id=''>"+ d.AWBPcs +"</span></td>";
                      row += "<td><span id=''>"+ (d.GrWt) +"</span></td>";
                      row += "<td><span id=''>Kgs</span></td>";
                      row += "</tr></tbody></table>";
                      row += "<table><tbody>";
                      row += "<tr style='text-align: center;font-size: 13px;height: 25px;'>";
                      row += "<td><span id=''>Allocated NOP</span></td>";
                      row += "<td><span id=''>Allocated Gr.Wt.</span></td>";
                      row += "<td><span id='' style = 'margin-right: 13px'>Unit</span></td></tr>";
                      row += "<tr style='text-align: center;font-size: 13px;height: 25px;'>";
                      row += "<td><input type= 'number' id='' value= '"+ d.AWBPcs +"' style='width: 70%;margin: 5px;' disabled/></td>";
                      row += "<td><input type= 'number' id='' value= '"+ (d.GrWt) +"' style='width: 70%;margin: 5px;' disabled/></td>";
                      row += "<td ><span id='' style = 'margin-right: 13px'>Kgs</span></td>";
                      row += "</tr></tbody></table>";
                      row += "</div></div></div>";

                  count++;
                      
              });
            
        $("#houseDetailsRow").append(row);
        $("body").mLoading('hide');
    } else {
        $("body").mLoading('hide');
        $("#houseDetailsRow").html('There are no details available').css('color', '#f7347a');
    }
    console.log("pieces = ",totalPieces)
    localStorage.setItem('TotalNoP', totalPieces)
    console.log("pieces = ",totalGrWt)
    localStorage.setItem('TotalGrWt', totalGrWt)
  }
    
  deleteClick = function(id){
    var finalArr;
    console.log(id);
      $("#houseDetailsRow").on("click", "#delete", function (ev) {
      var $currentTableRow = $(ev.currentTarget).parents('#accordion')[0];
      $currentTableRow.remove();
      var arrayObject =localStorage.getItem('HouseObjectToGenerateVT');

      newArr = JSON.parse(arrayObject);

        finalArr = newArr.filter(object => {
          if(object.HAWBGUID ==""){
            return object.MAWBGUID !== id;
          }else{
            return object.HAWBGUID !== id;
          }
        
        });
 
  
      localStorage.setItem('HouseObjectToGenerateVT',  JSON.stringify(finalArr));
      console.log("HouseObjectToGenerateVT ===",finalArr); 
      
      var str =localStorage.getItem('HouseArrayData');
      var strArray = str.split(',');
      for (var i = 0; i <strArray.length; i++) {
        if (strArray[i] == (id.toString())) {
            strArray.splice(i, 1);
        }
    }
arr = String(strArray);
localStorage.setItem('HouseArrayData',  arr);
});

  }