
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
var otp;
$(function () {
     Get_TerminalName();


  setTimeout(function () {
      window.location.href = 'loginScreen2.html'
  }, 1200000);


  console.log(Tab)
  $("#MenuHeading").text(Tab);
//   $(".primary-heading").text(MenuTitle);
var code = "+91"; // Assigning value from model.
// if(mobile){
//   $("#mobileNo").intlTelInput("getSelectedCountryData").val("+" + Mobcode + mobile);
// }else{
  $('#mobileNo').val(code);
//}
$('#mobileNo').intlTelInput({
    autoHideDialCode: true,
    autoPlaceholder: "ON",
    dropdownContainer: document.body,
    formatOnDisplay: true,
    hiddenInput: "full_number",
    initialCountry: "auto",
    nationalMode: true,
    placeholderNumberType: "MOBILE",
    preferredCountries: ['US'],
    separateDialCode: true
});
$('#btnSubmit').on('click', function () {
    var code = $("#mobileNo").intlTelInput("getSelectedCountryData").dialCode;
    var phoneNumber = $('#mobileNo').val();
    var name = $("#mobileNo").intlTelInput("getSelectedCountryData").name;
    alert('Country Code : ' + code + '\nPhone Number : ' + phoneNumber + '\nCountry Name : ' + name);
});
  
 
});
 
Get_TerminalName = function () {
        $.ajax({
            type: 'POST',
            url: TSMServiceUrl + "/GetTerminal",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response, xhr, textStatus) {
                var obj = JSON.parse(response.d);
                if (obj.length > 0) {
    
                  var termName;
                  for (var i = 0; i < obj.length; i++) {
                    termName += '<option value="' + obj[i].CUSTODIAN + '">' + obj[i].CustodianName + '</option>';
                  }
                  $("#terminalName").html(termName);
    
                }
    
            },
            error: function (xhr, textStatus, errorThrown) {
                $("body").mLoading('hide');
                alert('Server not responding...');
            }
        });
    }


function back() {
    window.location.href = "TPSUserDashboard.html";
  }


  function logOut() {
    modal.style.display = "block";
 
 }
function exitModal() {
 modal.style.display = "none";
}


    function SendSMS() {
        if ($("#terminalName").val() == '') {
            errmsg = "Alert</br>";
            errmsgcont ="Please select Terminal Name</br>";
            $.alert(errmsg,errmsgcont);
            return;
        }
        if ($("#vehicleNo").val() == '') {
            errmsg = "Alert</br>";
            errmsgcont ="Please enter Vehicle No.</br>";
            $.alert(errmsg,errmsgcont);
            return;
        }
        if ($("#driverName").val() == '') {
            errmsg = "Alert</br>";
            errmsgcont ="Please enter Driver Name</br>";
            $.alert(errmsg,errmsgcont);
            return;
        }
        if ($("#mobileNo").val() == '') {
            errmsg = "Alert</br>";
            errmsgcont ="Please enter Mobile No.</br>";
            $.alert(errmsg,errmsgcont);
            return;
        }
        var counter = 120;
        var interval = setInterval(function() {
            counter--;
            // Display 'counter' wherever you want to display it.
            if (counter <= 0) {
                    clearInterval(interval);
                    $('#timerShow').hide();  
                    $('#resndOTP').show();  
                    return;
            }else{
                $('#time').text("Resend OTP in "+ counter + " seconds");
                $('#timer').show(); 
                $('#timerShow').show();  
                $('#resndOTP').hide(); 
            console.log("Timer --> " + counter);
            }
        }, 1000);
        if(Tab == "Exports"){
            var OperationType = "2";
        }else{
            var OperationType = "1";
        }
        var mobileNo = $('#mobileNo').val();
 
        var Mobilecode = $("#mobileNo").intlTelInput("getSelectedCountryData").dialCode;/* iOS: ensure number is actually a string */
        var message = "OTP is 1234 for your mobile no"+ Mobilecode + "-"+ mobileNo + " ";
        var number = Mobilecode+ mobileNo;
        console.log("number=" + mobileNo+Mobilecode + ", message= " + message);
        $.ajax({
            type: 'POST',
            url: TSMServiceUrl + "/SendSMSWithOTP",
            data: JSON.stringify({  OperationType: OperationType, DriverMobileNo: mobileNo,DriverCountryCode: Mobilecode }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response, xhr, textStatus) {
                var obj = JSON.parse(response.d);
                console.log("obj --> " + JSON.stringify(obj));
                otp = obj[0].OTP;
                $(".getOtpBtn").attr('disabled', 'disabled');
                $(".getOtpBtn").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
             
            },
            error: function (xhr, textStatus, errorThrown) {
                $("body").mLoading('hide');
                alert('Server not responding...');
            }
        });
    }

    
    function reSendOTP() {
        if(Tab == "Exports"){
            var OperationType = "2";
        }else{
            var OperationType = "1";
        }
        var mobileNo = $('#mobileNo').val();
 
        var Mobilecode = $("#mobileNo").intlTelInput("getSelectedCountryData").dialCode;/* iOS: ensure number is actually a string */
        var message = "OTP is 1234 for your mobile no"+ Mobilecode + "-"+ mobileNo + " ";
        var number = Mobilecode+ mobileNo;
        console.log("number=" + mobileNo+Mobilecode + ", message= " + message);
        $.ajax({
            type: 'POST',
            url: TSMServiceUrl + "/SendSMSWithOTP",
            data: JSON.stringify({  OperationType: OperationType, DriverMobileNo: mobileNo,DriverCountryCode: Mobilecode }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response, xhr, textStatus) {
                var obj = JSON.parse(response.d);
                otp = obj[0].OTP;
                var counter = 120;
                var interval = setInterval(function() {
                    counter--;
                    // Display 'counter' wherever you want to display it.
                    if (counter <= 0) {
                            clearInterval(interval);
                            $('#timerShow').hide();  
                            $('#resndOTP').show();  
                            return;
                    }else{
                        $('#time').text("Resend OTP in "+ counter + " seconds");
                        $('#timer').show(); 
                        $('#timerShow').show();  
                        $('#resndOTP').hide(); 
                    console.log("Timer --> " + counter);
                    }
                }, 1000);
            },
            error: function (xhr, textStatus, errorThrown) {
                $("body").mLoading('hide');
                alert('Server not responding...');
            }
        });
    }
    // function validateOTP() {
    //     var inputOTP =  $("#OtpValue").val();
    //    if (inputOTP == "" ){
    //     $("#spnMsg").text('Please enter OTP').css({ 'color': 'red', 'font-size': '18px' });
    //    }
    //    else if (inputOTP == otp ){
    //     $("#spnMsg").text('OTP validated').css({ 'color': 'green', 'font-size': '18px' });
    //    }
    //    else{
    //     $("#spnMsg").text("Invalid OTP").css({ 'color': 'red' , 'font-size': '18px'});

    //    }
    // }

    function submitVehicleDetails(){
        var inputOTP =  $("#OtpValue").val();
        $('#timer').text(""); 
        $('#timerShow').hide();   
        if (inputOTP == "" ){
            $("#spnMsg").text('Please enter OTP').css({ 'color': 'red', 'font-size': '15px' });
            return;
           }
        else if (inputOTP != otp ){
            $("#spnMsg").text("Invalid OTP,Kindly check & try again.").css({ 'color': 'red' , 'font-size': '15px', 'display': 'ruby-text'});
            return;
        }
        else{
            $("#spnMsg").text("Access Allowed.").css({ 'color': 'green' , 'font-size': '15px'});
    
      
        $('body').mLoading({
            text: "Please Wait..",
        });
      
        if(Tab == "Exports"){
            var OperationType = "2";
        }else{
            var OperationType = "1";
        }
        var mobileNo = $('#mobileNo').val();
 
        var Mobilecode = $("#mobileNo").intlTelInput("getSelectedCountryData").dialCode;/* iOS: ensure number is actually a string */
     
        $.ajax({
            type: 'POST',
            url: TSMServiceUrl + "/CreateWalkinVTwithVehicle",
            data: JSON.stringify({  OperationType: OperationType, TerminalBranchId: $('#terminalName').val(), VehicleNo: $('#vehicleNo').val(), DriverName: $('#driverName').val() , DriverMobileNo: mobileNo,DriverCountryCode: Mobilecode, CreatedByUserId :"59970" }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response, xhr, textStatus) {
                var obj = JSON.parse(response.d);
                $("body").mLoading('hide');
                console.log("obj --> " + JSON.stringify(obj));
                $(".submitBtn").attr('disabled', 'disabled');
                $(".submitBtn").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
                errmsg = "Alert</br>";
                errmsgcont = "VT No. "+obj[0].TokenNo+ " generated successfully.</br>";
                $.alert(errmsg,errmsgcont);
                return;
               
               
            },
            error: function (xhr, textStatus, errorThrown) {
                $("body").mLoading('hide');
                alert('Server not responding...');
            }
        });
    }
    }
    function onChangeMobNo(){
        $('#resndOTP').hide(); 
        $('#timer').show(); 
        $('#timerShow').show();  
        $(".getOtpBtn").removeAttr('disabled');
        $(".getOtpBtn").css({ "background-color": "#00AAA2", "color": "white" , "border-color": "#00AAA2"});
        $(".submitBtn").removeAttr('disabled');
        $(".submitBtn").css({ "background-color": "#00AAA2", "color": "white" , "border-color": "#00AAA2"});
    }