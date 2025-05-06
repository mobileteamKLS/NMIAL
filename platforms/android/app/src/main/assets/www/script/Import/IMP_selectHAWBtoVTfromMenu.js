
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
var GHANAME = localStorage.getItem('GHANAME');

var arr = localStorage.getItem('HouseArrayData');
var ObjectToGenerateVT =localStorage.getItem('HouseObjectToGenerateVT');
var HouseObjectToGenerateVT;
var arrayOfObjects =[];
$(function () {

  if(ObjectToGenerateVT){
    HouseObjectToGenerateVT = JSON.parse(ObjectToGenerateVT);}
    else{
      HouseObjectToGenerateVT=[];
    }
  $("#SelCTODot").css('background-color', '#00AAA2');

  $("#SelCTODot").css('border', '1px solid #00AAA2');
  $("#AlloDot").css('border', '1px solid orange');
  console.log(CTOId)
  allVals = [];
  if(arr){
  allVals.push(arr);}
  arrayOfObjects = HouseObjectToGenerateVT;
  getHouseDetails(CTOId);
  });
      
      function logOut() {
      modal.style.display = "block";
    }
    
    function exitModal() {
      modal.style.display = "none";
    }
    function back() {
  
      // modal.style.display = "block";
      window.location.href = "IMP_SelectCTO.html";
    }
    function goToAirIndiaAppCharges(){
  
      window.location.href = "IMP_selectHAWBtoVT.html";
    }
    function goToMenziesAppCharges(){
  
      window.location.href = "IMP_selectHAWBtoVT.html";
    }
  
    function onNext() {
      if( allVals == ""){
        errmsg = "Alert</br>";
        errmsgcont = "Please select atleast one shipment.<br>";
        $.alert(errmsg,errmsgcont);
        return;
      }else{
        window.location.href = "IMP_AllocateShipmentfromMenu.html";
      }
    }
    
    // getHouseDetails = function (id) {
    //   $('body').mLoading({
    //     text: "Please Wait..",
    // });
    //   console.log(IGMNo + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    //   $.ajax({
    //       type: 'POST',
    //       url: ACSServiceURL + "/ACS_Imp_GETHAWB_detailsForVT",
    //       data: JSON.stringify({
    //           "OperationType":2,
    //           "AirlinePrefix":"",
    //           "AwbNumber":"",
    //           "HawbNumber":"",
    //           "IGMNo":0,
    //           "IGMYear":0,
    //           "CreatedByUserId":CreatedByUserId,
    //           "OrganizationBranchId":OrganizationBranchId,
    //           "OrganizationId":OrganizationId,
    //           "GHAID":id
    //           }),
    //       contentType: "application/json; charset=utf-8",
    //       dataType: "json",
    //       success: function (response, xhr, textStatus) {
    //           var obj = JSON.parse(response.d);
    //          console.log(response.d);
    //          console.log(obj);
    //           if (obj.length > 0) {
  
    //             $("#activeRecords").text(obj.length); 
           
    //             $("#selectedCTO").text(GHANAME);
    //             if (obj[0].ERRORMSG == undefined) {
    //               FillControl(response);
    //              // fillDriverImage(response);
    //               $("body").mLoading('hide');
    //               // $.alert('Details saved successfully');
    //             }else{
    //               $("body").mLoading('hide');
    //               errmsg = "Alert</br>";
    //               errmsgcont = obj[0].ERRORMSG;
    //               $.alert(errmsg,errmsgcont);
    //               return;
       
    //             }
    //           } else {
    //             $("#activeRecords").text(0); 
    //               $("#selectedCTO").text(GHANAME);
              
    //               $("body").mLoading('hide');
    //               $("#tblAirWayBillInfo").hide();
    //               $("#tblAirWayBillInfo1").hide();
    //               errmsg = "Wrong MAWB number</br>";
    //               errmsgcont = "Please enter a valid MAWB number</br>";
    //               //$.alert(errmsg,errmsgcont);
    //               return;
    //           }
    
    //       },
    //       error: function (xhr, textStatus, errorThrown) {
    //           $("body").mLoading('hide');
    //           alert('Server not responding...');
    //       }
    //   });
    // }
  
    // FillControl = function (response) {
    //   console.log(response)
    //   var obj = JSON.parse(response.d);
      
    //   var count = 0;
    //   var row = "";
    //   if (obj.length > 0) {
    //       $.each(obj, function (i, d) {
    //         var MawbNo = '"' + d.MAWBNumber + '"';
    //         var AirlinePrefix = MawbNo.substring(1, 4);
    //         var AwbNumber = MawbNo.substring(4, 12);
    //         var MAWBNumber = AirlinePrefix.concat("-", AwbNumber);
    //         var selectedList = arr.slice(",");
    //                   row +="<tr>"
    //                   if(d.HAWBNumber == null || d.HAWBNumber == "")
    //                   row +="<td><span id='spnDriverName'></span></td>"
    //                   else
    //                   row +="<td><span id='spnDriverName'></span>" + d.HAWBNumber + "</td>"
                    
    //                   row +="<td><span id='spnSlotDockDetail'></span>"+ d.BoENumber +"</td>"
    //                   row +="<td><span id='spnMode'></span>"+ d.HAWB_Total_Nop +"</td>"
    //                   if (selectedList.includes(d.BoEID)){
    //                     var checkId = '#cbCheck' + count;
    //                     $('checkId').prop('checked', true);
    //                   row +="<td><input type='checkbox' name='chk' value= "+ d.BoEID+ " id= 'cbCheck"  + count + "' class='cbCheck'  onclick='checkClick(" + count + ");' checked/></td>"
    //                   }
    //                   else{
    //                     row +="<td><input type='checkbox' name='chk' value= "+ d.BoEID+ " id= 'cbCheck"  + count + "' class='cbCheck'  onclick='checkClick(" + count + ");'/></td>"
    //                   }
    //                   row +="</tr>"
                   
                  
    //                 count++;
                        
    //             });
              
    //       $("#vehicleDetailsRow").append(row);
    //       $("body").mLoading('hide');
    //   } else {
    //       $("body").mLoading('hide');
    //       $("#vehicleDetailsRow").html('There are no Vehicle details available').css('color', '#f7347a');
    //   }
  
    // }
  

  var allVals = [];

  function checkClick(id){
    var rowid = '#cbCheck' + id;
    console.log(rowid);
   
    if ($(rowid).is(':checked')) {
      console.log('its checked');
      allVals.push($(rowid).val());
    }else{
      var list = allVals.toString();
      var strArray = list.split(',');
      for (var i = 0; i <strArray.length; i++) {
          if (strArray[i] === $(rowid).val()) {
              strArray.splice(i, 1);
          }
      }
      allVals= strArray.toString();
  
    }
    console.log(allVals);
    localStorage.setItem('HouseArrayData', allVals);
    if(allVals){
 
        getSelectedHouseDetails();
   
    }
  } 
  
  
  $(".selectall").click(function(){
    var element=document.getElementsByName('checkAll');
    var ele=document.getElementsByName('chk');
    if((element[0].checked == true || element[1].checked == true)){
    
            for(var i=0; i<ele.length; i++){ 
                if(ele[i].type=='checkbox'){  
                    ele[i].checked=true;  
                    var rowid = '#cbCheck' + i;
                  console.log(rowid);
          
            if ($(rowid).is(':checked')) {
              console.log('its checked');
              allVals.push($(rowid).val());
            }
          }
        }
    }else{
      for(var i=0; i<ele.length; i++){  
        if(ele[i].type=='checkbox')  
            ele[i].checked=false;  
            allVals =[];
    }
  }
    
    console.log(allVals);
    localStorage.setItem('HouseArrayData', allVals);
    if(allVals){
 
        getSelectedHouseDetails();

    
    }
  });

getSelectedHouseDetails = function () {
  $('body').mLoading({
    text: "Please Wait..",
});
  var finalArray;
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
      // console.log(response.d);
      // console.log(obj);
        if (obj.length > 0) {
          if (obj[0].ERRORMSG == undefined) {
            var array = [];
            for(var i = 0; i< allVals.length; i++){
              console.log("House = " + allVals[i])
              // if(obj[0].HAWBNumber == "" ||  obj[0].HAWBNumber == null){
              var newArray = obj.filter(function(p){
                  return (p.Id == allVals[i])
                });
              // }else{
              //   var newArray = obj.filter(function(p){
              //     return (p.HAWBNumber == houseArr[i])
              //   });
              // }
              finalArray = Object.assign({}, ...newArray);
              console.log(finalArray);
              console.log(arrayOfObjects);
            
             
              arrayOfObjects.push(finalArray)
              array.push(finalArray);
          }
            console.log(array);
       
            localStorage.setItem('HouseObjectToGenerateVT', JSON.stringify(arrayOfObjects));
            var a = localStorage.getItem('HouseObjectToGenerateVT');
            console.log(a);
          
            houseArray(array);
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


houseArray = function (obj) {
  console.log(obj)
  var totalPieces = 0;
    var totalGrWt = 0;
  var count = 0;
  var row = "";
  if (obj.length > 0) {
      $.each(obj, function (i, d) {

        totalPieces += d.Rcvdpcs;
        totalGrWt += d.RcvdGrWt;

     
                    
            });
          
      $("body").mLoading('hide');
  } else {
      $("body").mLoading('hide');
  }
  console.log("pieces = ",totalPieces)
  localStorage.setItem('TotalNoP', totalPieces)
  console.log("pieces = ",totalGrWt)
  localStorage.setItem('TotalGrWt', totalGrWt)

}
clearInputs = function () {
  var element=document.getElementsByName('checkAll');
  var ele=document.getElementsByName('chk');
  element[0].checked = false;
  element[1].checked = false;
  for(var i=0; i<ele.length; i++){  
      if(ele[i].type=='checkbox')  
          ele[i].checked=false;  
          allVals =[];
  }

  console.log(allVals);
  localStorage.setItem('HouseArrayData', allVals);
}

getHouseDetails = function (id) {
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
          if (obj.length > 0) {

            $("#activeRecords").text(obj.length); 
       
            $("#selectedCTO").text(GHANAME); 
            if (obj[0].ERRORMSG == undefined) {
              FillControl(response);
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
            $("#activeRecords").text(0); 
            $("#selectedCTO").text(GHANAME); 
              
          
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

FillControl = function (response) {
      console.log(response)
      var obj = JSON.parse(response.d);
      
      var count = 0;
      var row = "";
      if (obj.length > 0) {
          $.each(obj, function (i, d) {
            var MawbNo = '"' + d.MAWBNumber + '"';
            var AirlinePrefix = MawbNo.substring(1, 4);
            var AwbNumber = MawbNo.substring(4, 12);
            var MAWBNumber = AirlinePrefix.concat("-", AwbNumber);
            var selectedList = arr.slice(",");
                      row +="<tr>"
                      if(d.HAWBNumber == null || d.HAWBNumber == "")
                      row +="<td><span id='spnDriverName'></span></td>"
                      else
                      row +="<td><span id='spnDriverName'></span>" + d.HAWBNumber + "</td>"
                    
                      row +="<td><span id='spnSlotDockDetail'></span>"+ d.GatePassNo +"</td>"
                      row +="<td><span id='spnMode'></span>"+ d.Rcvdpcs +"</td>"
                      if (selectedList.includes(d.Id)){
                        var checkId = '#cbCheck' + count;
                        $('checkId').prop('checked', true);
                      row +="<td><input type='checkbox' name='chk' value= "+ d.Id+ " id= 'cbCheck"  + count + "' class='cbCheck'  onclick='checkClick(" + count + ");' checked/></td>"
                      }
                      else{
                        row +="<td><input type='checkbox' name='chk' value= "+ d.Id+ " id= 'cbCheck"  + count + "' class='cbCheck'  onclick='checkClick(" + count + ");'/></td>"
                      }
                      row +="</tr>"
                   
                  
                    count++;
                        
                });
              
          $("#vehicleDetailsRow").append(row);
          $("body").mLoading('hide');
      } else {
          $("body").mLoading('hide');
          $("#vehicleDetailsRow").html('There are no Vehicle details available').css('color', '#f7347a');
      }
  
    }