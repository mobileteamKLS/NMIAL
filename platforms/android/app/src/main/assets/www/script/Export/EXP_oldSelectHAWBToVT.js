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
var awbID = localStorage.getItem('awbID');
var sbID = localStorage.getItem('sbID');
var ArrayOfAwbId = localStorage.getItem('ArrayOfAwbId');
var arr = localStorage.getItem('HouseArrayData');

var GHAID = localStorage.getItem('GhaId');
var GHANAME = localStorage.getItem('GhaName');
var TSPSetting = localStorage.getItem('TSPSetting');

var HouseObjectToGenerateVT = JSON.parse(localStorage.getItem('HouseObjectToGenerateVT'));
var arrayOfObjects;
$(function () {

  allVals = [];
  allVals.push(arr);
  arrayOfObjects = HouseObjectToGenerateVT;
  if(TSPSetting =="M"){
    sbID = 0;
    getHouseDetailsMaster(GHAID);
  }else{
    getHouseDetails(GHAID);
  }


  if(HawbNumber){
    // alert("hi")
    awbID = ArrayOfAwbId;
  }
  $("#AlloDot").css('background-color', '#00AAA2');

  $("#SelCTODot").css('border', '1px solid #00AAA2');
  $("#AlloDot").css('border', '1px solid orange');
  $("#AssDot").css('border', '1px solid orange');
 
});
    
    function logOut() {
    modal.style.display = "block";
  }
  
  function exitModal() {
    modal.style.display = "none";
  }
  function back() {

    // modal.style.display = "block";
    window.location.href = "EXP_AllocateShipment.html";
  }
  function goToAirIndiaAppCharges(){

    window.location.href = "EXP_selectHAWBtoVT.html";
  }
  function goToMenziesAppCharges(){

    window.location.href = "EXP_selectHAWBtoVT.html";
  }

  function onNext(){
    if( allVals == ""){
      errmsg = "Alert</br>";
      errmsgcont = "Please select atleast one shipment.<br>";
      $.alert(errmsg,errmsgcont);
      return;
    }else{
      window.location.href = "EXP_AllocateShipment.html";
    }
  }
  getHouseDetailsMaster = function (id) {
    console.log(IGMNo + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/ACS_EXP_Get_Multiple_SBDetailsForGenerateToken",
        data: JSON.stringify({
          "OperationType":3,
          "AirlinePrefix":AirlinePrefix,
          "AwbNumber":AwbNumber,
          "HawbNumber":HawbNumber,
          "SBID":sbID,
          "AWBID":awbID,
          "OrganizationBranchId":OrganizationBranchId,
          "OrganizationId":OrganizationId,
          "CustodianID":id,
          "CreatedByUserId":CreatedByUserId
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
                FillControlMaster(response);
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

  FillControlMaster = function (response) {
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
          $("#tableVehicleMaster").show();
        var selectedList = arr.slice(",");
          row +="<tr>"
          if(d.HAWBNumber == null || d.HAWBNumber == "")
          row +="<td class='tdalign'><span id='spnDriverName'></span>" + d.MAWBNumber + "</td>"
          else
          row +="<td class='tdalign'><span id='spnDriverName'></span>" + d.HAWBNumber + "</td>"


          row +="<td class='tdalign'><span id='spnMode'></span>"+ d.SBNOP +"</td>"
          row +="<td class='tdalign'><span id='spnMode'></span>"+ (d.SBGrossWeight.toFixed(2)) +"</td>"
          row +="<td class='tdalign'><span id='spnMode'></span>"+ d.WeightUnitText +"</td>"
            if (selectedList.includes(d.AWBID)){
              var checkId = '#cbCheck' + count;
              $('#checkId').prop('checked', true);
              row +="<td class='tdalign'><input type='checkbox' name='chk' value= "+ d.AWBID+ " id= 'cbCheck"  + count + "' class='cbCheck'  onclick='checkClick(" + count + ");' checked/></td>"
            }else{
              row +="<td class='tdalign'><input type='checkbox' name='chk' value= "+ d.AWBID+ " id= 'cbCheck"  + count + "' class='cbCheck'  onclick='checkClick(" + count + ");'/></td>"
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

  $("#ckbCheckAll").click(function () {
    $(".cbCheck").attr('checked', this.checked);
});


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
    if(TSPSetting =="M"){
      getSelectedHouseDetailsMaster();
    }else{
      getSelectedHouseDetails();
    }
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
        
          if ($(rowid).is(':checked')){
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
    if(TSPSetting =="M"){
      getSelectedHouseDetailsMaster();
    }else{
      getSelectedHouseDetails();
    }
  
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
      url: ACSServiceURL + "/ACS_EXP_Get_Multiple_SBDetailsForGenerateToken",
      data: JSON.stringify({
        "OperationType":2,
        "AirlinePrefix":AirlinePrefix,
        "AwbNumber":AwbNumber,
        "HawbNumber":HawbNumber,
        "SBID":sbID,
        "AWBID":awbID,
        "OrganizationBranchId":OrganizationBranchId,
        "OrganizationId":OrganizationId,
        "CustodianID":GHAID,
        "CreatedByUserId":CreatedByUserId
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
                  return (p.SBID == allVals[i])
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
            //console.log(abs);
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

getSelectedHouseDetailsMaster = function () {
  $('body').mLoading({
    text: "Please Wait..",
});
  var finalArray;
  console.log(IGMNo + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_EXP_Get_Multiple_SBDetailsForGenerateToken",
      data: JSON.stringify({
        "OperationType":3,
        "AirlinePrefix":AirlinePrefix,
        "AwbNumber":AwbNumber,
        "HawbNumber":HawbNumber,
        "SBID":sbID,
        "AWBID":awbID,
        "OrganizationBranchId":OrganizationBranchId,
        "OrganizationId":OrganizationId,
        "CustodianID":GHAID,
        "CreatedByUserId":CreatedByUserId
          }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
       console.log(response.d);
       console.log(obj);
        if (obj.length > 0) {
          if (obj[0].ERRORMSG == undefined) {
            var array = [];
            for(var i = 0; i< allVals.length; i++){
              console.log("House = " + allVals[i])
              // if(obj[0].HAWBNumber == "" ||  obj[0].HAWBNumber == null){
              var newArray = obj.filter(function(p){
                  return (p.AWBID == allVals[i])
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
           
            //console.log(abs);
            console.log(array);
            console.log(arrayOfObjects);
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

              totalPieces += d.SBNOP;
              totalGrWt += d.SBGrossWeight;

     
                    
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
      url: ACSServiceURL + "/ACS_EXP_Get_Multiple_SBDetailsForGenerateToken",
      data: JSON.stringify({
        "OperationType":2,
        "AirlinePrefix":AirlinePrefix,
        "AwbNumber":AwbNumber,
        "HawbNumber":HawbNumber,
        "SBID":sbID,
        "AWBID":awbID,
        "OrganizationBranchId":OrganizationBranchId,
        "OrganizationId":OrganizationId,
        "CustodianID":id,
        "CreatedByUserId":CreatedByUserId
          }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response, xhr, textStatus) {
          var obj = JSON.parse(response.d);
      //   console.log(response.d);
      //   console.log(obj);
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

        $("#tableVehicle").show();
                  row +="<tr>"
                  row +="<td class='tdalign'><span id='spnSlotDockDetail'></span>"+ d.SBNumber +"</td>"
                  if(d.HAWBNumber == null || d.HAWBNumber == "")
                  row +="<td class='tdalign'><span id='spnDriverName'></span>" + d.MAWBNumber + "</td>"
                  else
                  row +="<td class='tdalign'><span id='spnDriverName'></span>" + d.HAWBNumber + "</td>"
                
                  
                  row +="<td class='tdalign'><span id='spnMode'></span>"+ d.SBNOP +"</td>"
                  if (selectedList.includes(d.SBID)){
                    var checkId = '#cbCheck' + count;
                    $('checkId').prop('checked', true);
                    row +="<td class='tdalign'><input type='checkbox' name='chk' value= "+ d.SBID+ " id= 'cbCheck"  + count + "' class='cbCheck'  onclick='checkClick(" + count + ");' checked/></td>"
                  }else{
                    row +="<td class='tdalign'><input type='checkbox' name='chk' value= "+ d.SBID+ " id= 'cbCheck"  + count + "' class='cbCheck'  onclick='checkClick(" + count + ");'/></td>"
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