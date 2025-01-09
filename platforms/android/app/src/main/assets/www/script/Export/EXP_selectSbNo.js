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
var ViewSBFlag = localStorage.getItem('viewSB'); 
var _SBNumber;
var _SBDate;
var allVals = [];
var SBArray;

localStorage.setItem('FinalVTList',  "");


  $(function () {
     if(ViewSBFlag == "true"){
      $("#nextHeading").hide();
      $("#SubmitRow").hide();
      $("#sbHeading").hide();
      $("#checkboxLabel").hide();
      $("#checkboxRow").hide();
      $(".cbCheck").hide();
      
      
     }
    console.log(MenuTitle)
    $("#MenuHeading").text(MenuTitle);

    if(HawbNumber == "" || HawbNumber == null)
        {
            $("#houseData").hide();
        }else{
            $("#houseData").show();
        }
        $("#txtMawbNo").text(AirlinePrefix + "-" + AwbNumber);  
    ExportListingPageDetails('2', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId, awbID);

});


function back() {
    window.location.href = "EXP_ShipmentDetailsFromMenu.html";
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




ExportListingPageDetails = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber,CreatedByUserId, OrganizationBranchId, OrganizationId,awbId) {
  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_Exp_ListingPage_ForMenuFlow",
      data: JSON.stringify({ OperationType: OperationType, AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId ,AWBID :awbId, SBID:0}),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response, xhr, textStatus) {
          var obj = JSON.parse(response.d);
         console.log(response.d);
         console.log(obj);
          if (obj.length > 0) {
            if (obj[0].ERRORMSG == undefined) {
    
              console.log(response)

              FillControl(response);

              $("#txtSBNo").text(obj[0].SBNumber); 
              $("#txtSBDate").text(obj[0].SBDate); 

              _SBNumber = obj[0].SBNumber;
              _SBDate = obj[0].SBDate;
              ACSCurrentBalance = obj[0].ACSCurrentBalance; 

              $("#txtHawbNo").text(obj[0].HouseNo); 
            
     
             

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
              errmsgcont = "No Shipping bills to proceed with SB ASI</br>";
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


function onNext() {
    if( allVals == ""){
      errmsg = "Alert</br>";
      errmsgcont = "Please select atleast one SB Number.<br>";
      $.alert(errmsg,errmsgcont);
      return;
    }else{
      var sbNumberArray=[];
      for(var i = 0; i< allVals.length; i++){
        var sbId = allVals[i];
      var checkObj = SBArray.find(o => o.SBID == sbId)
      console.log("Sorted =",checkObj);
      console.log("Sorted =",checkObj.SBNumber);
      sbNumberArray.push(checkObj.SBNumber);

      }
      console.log("sbNumberArray =",sbNumberArray);
      localStorage.setItem('SBNumbersList', sbNumberArray);
     window.location.href = "EXP_ShipmentDetailsFromMenu.html";
    }
  }
  
  
  FillControl = function (response) {
    console.log(response)
    var obj = JSON.parse(response.d);
    console.log("Array = ",obj);
    SBArray = obj;
    var count = 0;
    var row = "";
    if (obj.length > 0) {
        $.each(obj, function (i, d) {
          var MawbNo = '"' + d.MAWBNumber + '"';
          var AirlinePrefix = MawbNo.substring(1, 4);
          var AwbNumber = MawbNo.substring(4, 12);
          var MAWBNumber = AirlinePrefix.concat("-", AwbNumber);

                    row +="<tr>"            
                    row +="<td style = 'padding-left:15px'><span id='spnSlotDockDetail'></span>"+ d.SBNumber +"</td>"
                    row +="<td><span id='spnMode'></span>"+ d.SBNOP +"</td>"
                    if(ViewSBFlag == "true"){
                    }else{
                      row +="<td id='checkboxRow'><input type='checkbox' name='chk' value= "+ d.SBID+ " id= 'cbCheck"  + count + "' class='cbCheck'  onclick='checkClick(" + count + ");'/></td>"
                    }
                    row +="</tr>"
                 
                
                  count++;
                      
              });
            
        $("#sbDetailsRow").append(row);
        $("body").mLoading('hide');
    } else {
        $("body").mLoading('hide');
        $("#sbDetailsRow").html('There are no SB details available').css('color', '#f7347a');
    }

  }

//   $("#ckbCheckAll").click(function () {
//     $(".cbCheck").attr('checked', this.checked);
// });



function checkClick(id){
var rowid = '#cbCheck' + id;
console.log(rowid);

if ($(rowid).is(':checked')) {
  console.log('its checked');
  allVals.push($(rowid).val());
}else{
      const index = allVals.indexOf($(rowid).val());
      if (index > -1) {
    allVals.splice(index, 1);
}

}
console.log(allVals);
localStorage.setItem('SBdataList', allVals);

} 
$("#ckbCheckAll").click(function(){
  var element=document.getElementsByName('checkAll'); 
  var ele=document.getElementsByName('chk');
  if((element[0].checked == true)){
  
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
localStorage.setItem('SBdataList', allVals);
});

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

 clearInputs = function () {
  var ele=document.getElementsByName('chk');  
  for(var i=0; i<ele.length; i++){  

  var ele=document.getElementsByName('chk');  
  $('#ckbCheckAll').prop('checked', false); // Unchecks it
  for(var i=0; i<ele.length; i++){  
      if(ele[i].type=='checkbox')  
          ele[i].checked=false;  
          allVals =[];
  }

  }  
  console.log(allVals);
  localStorage.setItem('SBdataList', allVals);
  }