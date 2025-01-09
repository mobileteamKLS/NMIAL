var LocationName = localStorage.getItem('LocationName');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');
//var fromExport = localStorage.getItem('fromExport');
var errmsg = "";
var isCOSubmit = '';
var COList;

$(function () {
   // GetPuspupNotificationList(CreatedByUserId, OrganizationBranchId, OrganizationId);
    ExportCartingOrder('4', CreatedByUserId, OrganizationBranchId, OrganizationId);
    // $("#submit").hide();
    // $("#revoke").hide();

    localStorage.removeItem('fromMenus')
    setTimeout(function () {
        window.location.href = 'loginScreen2.html'
    }, 1200000);

    // $("#tblAirWayBillInfo").hide();

    $("#spnFlightDt").datepicker({
        showOn: 'button',
        buttonImageOnly: true,
        buttonImage: 'img/Calendar_28x32.png'
    });

    $(".ui-datepicker-trigger").mouseover(function () {
        $(this).css('cursor', 'pointer');
    });

});

var dd_mm_yyyy;
$("#spnFlightDt").change(function () {

    changedDate = $(this).val(); //in yyyy-mm-dd format obtained from datepicker
    var date = new Date(changedDate);

    var str = $.datepicker.formatDate("MM", date)

    dd_mm_yyyy = twoDigitDate(date) + " " + str.substring(0, 3) + " " + date.getFullYear(); // in dd-mm-yyyy format
    $('#spnFlightDt').val(dd_mm_yyyy);
    //console.log($(this).val());
    //console.log("Date picker clicked");

    var d = new Date();

    function twoDigitDate(d) {
        return ((d.getDate()).toString().length == 1) ? "0" + (d.getDate()).toString() : (d.getDate()).toString();
    };

    function twoDigitMonth(d) {
        return ((d.getMonth() + 1).toString().length == 1) ? "0" + (d.getMonth() + 1).toString() : (d.getMonth() + 1).toString();
    };
});

function logOut() {
    modal.style.display = "block";
}

function exitModal() {
    modal.style.display = "none";
}

function exitRevokeModal() {
    revokemodal.style.display = "none";
}

// $("#spnFlightDt").click(function () { // button click event
//   $( "#spnFlightDt" ).datepicker("show");
// });

function back() {
    localStorage.setItem('fromMenus', '1')
    // modal.style.display = "block";
    window.location.href = "AirlineDashboard.html";
}


function searchAWBNumber() {
    if ($("#txtFlightPrefix").val() == '' || $("#txtFlightNo").val() == '') {
      // $("#txtFlightPrefix").css("border", "solid thin red");
      // $("#txtFlightNo").css("border", "solid thin #ccc");
      $("#tblAirWayBillInfo").hide();
      errmsg = "No MAWB Number</br>";
      errmsgcont = "Please enter a valid MAWB number</br>";
      $.alert(errmsg,errmsgcont);
      return;
    } else {
      AirlinePrefix = $("#txtFlightPrefix").val();
      AwbNumber = $("#txtFlightNo").val();
      HawbNumber = '';
      localStorage.setItem('prefix', AirlinePrefix);
      localStorage.setItem('awbNo', AwbNumber);
      window.location.href = "EXP_CO.html";
      // $('body').mLoading({
      //   text: "Please Wait..",
      // });
      //ExportCartingOrder('1', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);
    }
  }
  
  function MovetoNext(current, nextFieldID) {
    if (current.value.length >= current.maxLength) {
      document.getElementById(nextFieldID).focus();
    }
  }
  

ExportCartingOrder = function (OperationType, CreatedByUserId, OrganizationBranchId, OrganizationId) {
    //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/ACS_Exp_CartingOrderDetails",
        data: JSON.stringify({ OperationType: "4", AirlinePrefix: "", AwbNumber: "", HawbNumber: "", CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId, FlightNo: "", FlightDate: "", CARRIERCODE: "", FlightOffPoint: "", CartingOrderStatus: "", CartingOrderStatusComments: "" }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            $("body").mLoading('hide');
            var obj = JSON.parse(response.d);
            COList = obj;
            console.log(response.d);
            console.log(obj);

                    FillControl(obj);
                    // fillDriverImage(response);
                    //  $("body").mLoading('hide');
                    // $.alert('Details saved successfully');
               
           

        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}







FillControl = function (obj) {
    $("#docTable").empty();
    var count = 0;
    var row = "";
    if (obj.length > 0) {
        $.each(obj, function (i, d) {
            var MawbNo = '"' + d.AWBNo + '"';
            var AirlinePrefix = MawbNo.substring(1, 4);
            var AwbNumber = MawbNo.substring(5, 13);

            // $("#tracklabel").show();
            // $("#tblTrackInfo").show();

            row += "<tr id= " + count + ">";
           
            //row +="<td><input type='checkbox' name='chk' id= 'cbCheck"  + count + "' value= "+ d.AWBNumber +" class='checkboxCheck'  onclick='checkClick(this,"+ d.AWBID +");' style='margin:7px'/></td>";
         
            row += "<td class='text-left' style='color: black;' style='text-transform:none !important'>" + d.AWBNo + "</td>";
          
            row += "<td class='text-left' style='color: black;text-align: right !important' style='text-transform:none !important'>" + d.NoofPcs + "</td>";
                      
            row += "<td class='text-left' style='color: black;text-align: right !important' style='text-transform:none !important'>" + d.GrossWt + "</td>";
                      
            row += "<td class='text-left' style='color: black;text-align: center !important' style='text-transform:none !important'>" + d.FlightNo + "</td>";
            row += "<td class='text-left' style='color: black;text-align: center !important' style='text-transform:none !important'>" + d.JobDate + "</td>";
            row += "<td><img src='img/icon_submit.png' style='margin:10px' onclick='approve(this);'><input type='hidden' id= 'myImg"  + count + "' value= "+ d.AWBNumber +"></td>";
            // <input id= 'myImg"  + count + "' value= "+ d.AWBNumber +"></input>
            row += "</tr>";

            count++;
        });
        $("#docTable").append(row);
        $("body").mLoading('hide');
    } else {
        $(".theadClass").hide();
        $("body").mLoading('hide');
        $("#docTable").html('There are no records available').css('color', '#f7347a','display', 'inline','position', 'absolute');
    }


}



var CheckListArray =[];
checkClick = function(element, awbId){

       var rowJavascript = element.parentNode.parentNode;
        console.log(awbId)
     var index = rowJavascript.rowIndex - 1;
    //  var rowid = "#cbCheck" + index;
    //  var awbId  = $(rowid).val();


  if ($(rowid).is(':checked')) {
    console.log('its checked');
    // allVals.push($(rowid).val());
    var checkedCO = COList.filter(function(p){return (p.AWBID == awbId)});
    console.log(checkedCO);
  }else{
    // var list = allVals.toString();
    // var strArray = list.split(',');
    // for (var i = 0; i <strArray.length; i++) {
    //     if (strArray[i] === $(rowid).val()) {
    //         strArray.splice(i, 1);
    //     }
    // }
    // allVals= strArray.toString();

  }
//   console.log(allVals);

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
approve = function(element){
     var rowJavascript = element.parentNode.parentNode;

    var index = rowJavascript.rowIndex - 1;

    var rowid = "#myImg" + index;
     var awbNo  = $(rowid).val();
     console.log(awbNo);
    localStorage.setItem('prefix', awbNo.substring(0, 3));
    localStorage.setItem('awbNo', awbNo.substring(3,11));
    window.location.href = "EXP_CO.html";
}


  
  
  
  openNotification = function(){
    window.location.href = "notificationList.html";
  }


  function clearInputs(){
    $("#txtFlightPrefix").val(''); 
    $("#txtFlightNo").val('');
 
  }