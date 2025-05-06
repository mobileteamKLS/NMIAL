
var LocationName = localStorage.getItem('LocationName');
var GHACreatedByUserId = localStorage.getItem('TSMCreatedByUserId');
var GHAOrganizationBranchId = localStorage.getItem('TSMOrganizationBranchId');
var GHAOrganizationId = localStorage.getItem('TSMOrganizationId');

var MAWBNo = localStorage.getItem('mawbNo');
var AirlinePrefix = localStorage.getItem('Prefix');
var AwbNumber = localStorage.getItem('AWBNumber');
var IGMNo = localStorage.getItem('igmNo');
var IGMYear = localStorage.getItem('igmYear');
var HawbNumber = localStorage.getItem('hawbNo');
var arr = localStorage.getItem('HouseArrayData');
var awbID = localStorage.getItem('awbID');
var sbID = localStorage.getItem('sbID');

var GHAID = localStorage.getItem('GhaId');
var GHANAME = localStorage.getItem('GhaName');
var TSPSetting = localStorage.getItem('TSPSetting');
var ObjectToGenerateVT =localStorage.getItem('HouseObjectToGenerateVT');
var HouseObjectToGenerateVT;
var selectedSlot;
var currDate;
$(function () {
  localStorage.setItem("Slot","");
  $('body').mLoading({
    text: "Please Wait..",
});
  selFirstHalfSlot(12);
    if(ObjectToGenerateVT){
  HouseObjectToGenerateVT = JSON.parse(ObjectToGenerateVT);}

  console.log("arr", arr)
  $("#AlloDot").css('background-color', '#00AAA2');
  $("#AlloDot").css('border', '1px solid #00AAA2');
  $("#slotDot").css('border', '1px solid orange');
//   if(TSPSetting =="M"){
//     $("#btnAdd").val("+ Add Another MAWB");
//   }

//       if(HouseObjectToGenerateVT == "" || HouseObjectToGenerateVT == null || HouseObjectToGenerateVT == undefined){
//           if(TSPSetting =="M"){
//             getMasterDetails();
//           }else{
//           getHouseDetails();
//           }
//       }else{
     
//         if(TSPSetting =="M"){
//           FillSelectedDetailsMaster(HouseObjectToGenerateVT);
//         }else{
//           FillSelectedDetails(HouseObjectToGenerateVT);
//         }
      
//       }


  
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
    function toAssignVehicle(){
      if(selectedSlot =="" || selectedSlot ==undefined){
        errmsg = "Alert</br>";
        errmsgcont = "Please select slot details";
        $.alert(errmsg,errmsgcont);
        return;
      }
        window.location.href = "EXP_AssignVehicle.html";
      }
    
    function addAnotherHAWB(){
  
      window.location.href = "EXP_selectHAWBtoVT.html";
    }
    
  
    selFirstHalfSlot = function (time) {
      $("#selectFirstSlot").css({"border": "1px solid red", "color": "black"});
      $("#selectSecondSlot").css({"border": "1px solid #ccc", "color": "grey"});

        var objToday = new Date(),
        dayOfMonth = ( objToday.getDate() < 10) ? '0' + objToday.getDate(): objToday.getDate(),
        months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'),
        curMonth = months[objToday.getMonth()],
        curYear = objToday.getFullYear()
  
      var today = dayOfMonth + " " + curMonth + " " + curYear;
      
      console.log(today);
      currDate = today;
      
      $("#slotDetailsRow").empty();
      $("#dateShow").val("Date: " + today +", "+ "Monday");
      // console.log(IGMNo + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
      $.ajax({
          type: 'POST',
          url: TSMServiceUrl + "/ExportGetSlotsCB",
          data: JSON.stringify({
      
                "Organizationid": GHAOrganizationId,
          
                "SlotBookDate": today,
          
                "terminal": GHAOrganizationBranchId,
          
                "dropdownvehiclevalue": "15",
          
                "CommodityTypeIds": "2"
          
              }),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (response, xhr, textStatus) {
              var obj = JSON.parse(response.d);
             console.log(response.d);
             console.log(obj);
              if (obj.length > 0) {
                if (obj[0].ERRORMSG == undefined) {
                  FillControlFirstHalfSlot(response,time);
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
    FillControlFirstHalfSlot = function (response,time) {
      $("#slotDetailsRow").empty();
      console.log(response)
      var obj = JSON.parse(response.d);
      
      var count = 0;
      var row = "";
      if (obj.length > 0) {
          $.each(obj, function (i, d) {
            var FromTime =  d.FromTime;
            var t = parseInt(FromTime.substring(0, 2));
            var ToTime = d.ToTime ;
            var timeSlot = FromTime +" - "+ ToTime;
           
                    if(t< time){
                      row +="<div class='col-6'>";
                      row +="<div class='form-group'>";
                      if(d.SlotAvailability == "U  "){
                        row +="<input type='button' style='background-color: #dee2e6;' id='selectSlot"+ FromTime.substring(0, 2)+"' class='selectSlot' value="+ FromTime +"-"+ ToTime+" onclick='getselectedSlot("+FromTime.substring(0, 2)+");' disabled/>";
                      }else{
                      row +="<input type='button'  id='selectSlot"+ FromTime.substring(0, 2)+"' class='selectSlot' value="+ FromTime +"-"+ ToTime+" onclick='getselectedSlot("+FromTime.substring(0, 2)+");' />";
                      }
                      row +="</div>";
                      row +="</div>";
                    }
                    count++;
                        
                });
              
          $("#slotDetailsRow").append(row);
          $("body").mLoading('hide');
      } else {
          $("body").mLoading('hide');
          $("#slotDetailsRow").html('There are no Vehicle details available').css('color', '#f7347a');
      }
    
    }

    selSecondHalfSlot = function (time) {
      $('body').mLoading({
        text: "Please Wait..",
    });
      $("#selectFirstSlot").css({"border": "1px solid #ccc", "color": "grey"});
      $("#selectSecondSlot").css({"border": "1px solid red", "color": "black"});
      var objToday = new Date(),
      dayOfMonth = ( objToday.getDate() < 10) ? '0' + objToday.getDate(): objToday.getDate(),
      months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'),
      curMonth = months[objToday.getMonth()],
      curYear = objToday.getFullYear()

    var today = dayOfMonth + " " + curMonth + " " + curYear;
    
    console.log(today);
    $("#slotDetailsRow").empty();
    $("#dateShow").val("Date: " + today +", "+ "Monday");
    // console.log(IGMNo + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
        type: 'POST',
        url: TSMServiceUrl + "/ExportGetSlotsCB",
        data: JSON.stringify({
    
              "Organizationid": GHAOrganizationId,
        
              "SlotBookDate": today,
        
              "terminal": GHAOrganizationBranchId,
        
              "dropdownvehiclevalue": "15",
        
              "CommodityTypeIds": "2"
        
            }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            var obj = JSON.parse(response.d);
           console.log(response.d);
           console.log(obj);
            if (obj.length > 0) {
              if (obj[0].ERRORMSG == undefined) {
                FillControlSecondHalfSlot(response,time);
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
  FillControlSecondHalfSlot = function (response,time) {
    $("#slotDetailsRow").empty();
    console.log(response)
    var obj = JSON.parse(response.d);
    
    var count = 0;
    var row = "";
    if (obj.length > 0) {
        $.each(obj, function (i, d) {
          var FromTime =  d.FromTime;
          var t = parseInt(FromTime.substring(0, 2));
          var ToTime = d.ToTime ;
          var timeSlot = FromTime +" - "+ ToTime;
         
                  if(t >= time){
                    row +="<div class='col-6'>";
                    row +="<div class='form-group'>";
                    if(d.SlotAvailability == "U  "){
                      row +="<input type='button' style='background-color: #dee2e6;' id='selectSlot"+ FromTime.substring(0, 2)+"' class='selectSlot'  value="+ FromTime +"-"+ ToTime+" onclick='getselectedSlot("+FromTime.substring(0, 2)+");' disabled/>";
                      
                    }else{
                    row +="<input type='button' id='selectSlot"+ FromTime.substring(0, 2)+"' class='selectSlot'  value="+ FromTime +"-"+ ToTime+" onclick='getselectedSlot("+FromTime.substring(0, 2)+");' />";
                    }
                    row +="</div>";
                    row +="</div>";
                  }
                  count++;
                      
              });
            
        $("#slotDetailsRow").append(row);
        $("body").mLoading('hide');
    } else {
        $("body").mLoading('hide');
        $("#slotDetailsRow").html('There are no Vehicle details available').css('color', '#f7347a');
    }
  
  }
  getselectedSlot = function(id){
    selectedSlot = "";
    $(".selectSlot").css({"border": "1px solid #ccc", "color": "grey"});
    if(id<10){
      $("#selectSlot0"+id+"").css({"border": "1px solid red", "color": "black"});
      selectedSlot = $("#selectSlot0"+id).val(); 
    }else{
      $("#selectSlot"+id+"").css({"border": "1px solid red", "color": "black"});
      selectedSlot = $("#selectSlot"+id).val(); 
    }

   console.log(selectedSlot);
   localStorage.setItem("Slot",currDate.concat(" ", selectedSlot));
  }

  function clearInputs(){
    var id = selectedSlot.substring(0,2);

      $("#selectSlot"+id+"").css({"border": "1px solid #ccc", "color": "grey"});
  
    selectedSlot = "";
  }