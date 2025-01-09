var LocationName = localStorage.getItem('LocationName');
var departsStatus = localStorage.getItem('departsStatus');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationTypeId = localStorage.getItem('OrganizationTypeId');
var OrganizationId = localStorage.getItem('OrganizationId');
var errmsg = "";
var FF_ID;
$(function () {

    setTimeout(function () {
        window.location.href = 'Login.html'
    }, 1200000);

    $("#txtHAWBNo").hide();
    $("#lblHAWBNo").hide();
    document.getElementById("rbtno").checked = true;
    //$('#submit_button').click(function () {
    //    if ($("input:radio[id='rbtno']").is(":checked")) {
    //        IsIsolated
    //        //  alert('no');
    //    } else if ($("input:radio[id='rbtyes']").is(":checked")) {
    //        //  alert('yes');
    //    } else {
    //        // alert('nothing');
    //    }
    //});
    //$('#sa-basic').click(function () {

    //});
    $('#txtHAWBFlightNo').change(function () {
        var inAWBno = document.getElementById('txtHAWBFlightNo').value;
        var temp = inAWBno.substr(0, 7);
        var awbSeries = parseInt(temp, 10);
        var checkDigit = awbSeries % 7;
        if (temp.toString() + checkDigit.toString() == inAWBno) {
            AirlinePrefix = $('#txtFlightPrefix').val();
            MAWBNumber = $('#txtHAWBFlightNo').val();
            IMP_CheckMawbnumber(AirlinePrefix, MAWBNumber);
        } else {
            $("#txtHAWBFlightNo").val('');
            errmsg = "Please enter valid AWB No.</br>";
            $.alert(errmsg);
            return;
        }
    });

    //if (temp.toString() + checkDigit.toString() == inAWBno) {
    //$('#txtHAWBFlightNo').change(function () {
    //    AirlinePrefix = $('#txtFlightPrefix').val();
    //    MAWBNumber = $('#txtHAWBFlightNo').val();
    //    IMP_CheckMawbnumber(AirlinePrefix, MAWBNumber);
    //});


    //IMP_CheckMawbnumber(AirlinePrefix, MAWBNumber);

    $('#txtAirportofDeparture').change(function () {
        if ($("#txtAirportofDeparture").val() != $("#txtAirportofArrival").val()) {
            txtairportofdeparture = $('#txtAirportofDeparture').val();
            operationtype = '1';
            validateAirportCodeDeparture(operationtype, txtairportofdeparture);
        } else {
            $('#txtAirportofDeparture').val('');
            errmsg = "Departure and Arrival Airport code should be different</br>";
            $.alert(errmsg);
        }
    });
    $('#txtAirportofArrival').change(function () {
        if ($("#txtAirportofDeparture").val() != $("#txtAirportofArrival").val()) {
            txtairportofdeparture = $('#txtAirportofArrival').val();
            operationtype = '1';
            validateAirportCodeArrival(operationtype, txtairportofdeparture);
        } else {
            $('#txtAirportofArrival').val('');
            errmsg = "Departure and Arrival Airport code should be different</br>";
            $.alert(errmsg);
        }
    });
    //$('#txtFlightNo').change(function () {
    //    alert('l');
    //    var k;
    //    document.all ? k = e.keyCode : k = e.which;
    //    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
    //});


    $('#txtFlightNo').keyup(function () {
        var $th = $(this);
        $th.val($th.val().replace(/[^a-zA-Z0-9]/g, function (str) {
            //alert('You typed " ' + str + ' ".\n\nPlease use only letters and numbers.');
            return '';
        }));
    });


    GetFFDetails('1');

    $("#ddlFFList").change(function () {
        FF_ID = $(this).children("option:selected").val();
    });
    var dateFormat = 'dd M yy';
    $("#txtFlightDate").datepicker({
        dateFormat: dateFormat,// 'd M yy',//'dd/mm/yy',
        minDate: 0,
        changeMonth: true,
        changeYear: true,
        defultDate: '1-1-1994'

    });
    //$("#txtFlightDate").datepicker({ dateFormat: 'dd-mm-yy' });

});
function setDeliveryOrder() {
    var isConsole;
    if ($("#ddlFFList").val() == '-1') {
        errmsg = "Please select Freight Forwarder</br>";
        $.alert(errmsg);
        return;
    } else if ($("#txtFlightNo").val() == '') {
        errmsg = "Please enter Flight No.</br>";
        $.alert(errmsg);
        return;
    } else if ($("#txtFlightDate").val() == '') {
        errmsg = "Please enter Flight Date</br>";
        $.alert(errmsg);
        return;
    } else if ($("#txtAirportofDeparture").val() == '') {
        errmsg = "Please enter Airport of Departure</br>";
        $.alert(errmsg);
        return;
    } else if ($("#txtAirportofArrival").val() == '') {
        errmsg = "Please enter Airport of Arrival</br>";
        $.alert(errmsg);
        return;
    } else if ($("#txtFlightPrefix").val() == '') {
        errmsg = "Please enter MAWB No.</br>";
        $.alert(errmsg);
        return;
    } else if ($("#txtFlightPrefix").val().length != 3) {
        errmsg = "Please enter 3 digit MAWB No. in Prefix</br>";
        $.alert(errmsg);
        return;
    } else if ($("#txtHAWBFlightNo").val() == '') {
        errmsg = "Please enter MAWB No.</br>";
        $.alert(errmsg);
        return;
    } else if ($("#txtHAWBFlightNo").val().length != 8) {
        errmsg = "Please enter 8 digit MAWB No.</br>";
        $.alert(errmsg);
        return;
    } else if ($("#txtNOP").val() == '') {
        errmsg = "Please enter NOP (No. of pieces)</br>";
        $.alert(errmsg);
        return;
    } else if ($("#txtGrsWt").val() == '') {
        errmsg = " Please enter Gross Weight</br>";
        $.alert(errmsg);
        return;
    } else if ($("#txtChargeableWeight").val() == '') {
        errmsg = "Please enter Chargeable Weight</br>";
        $.alert(errmsg);
        return;
    }
    else if ($("#txtCommodity").val() == '') {
        errmsg = "Please enter Commodity</br>";
        $.alert(errmsg);
        return;
    }
    else {
        if ($("input:radio[id='rbtno']").is(":checked")) {
            isConsole = false;
            FlightNo = $("#txtFlightNo").val();
            FlightDate = $("#txtFlightDate").val();
            AirportofDeparture = $("#txtAirportofDeparture").val();
            AirportofArrival = $("#txtAirportofArrival").val();
            FlightPrefix = $("#txtFlightPrefix").val();
            HAWBFlightNo = $("#txtHAWBFlightNo").val();
            HAWBNo = $("#txtHAWBNo").val();
            NOP = $("#txtNOP").val();
            GrsWt = $("#txtGrsWt").val();
            ChargeableWeight = $("#txtChargeableWeight").val();
            Commodity = $("#txtCommodity").val();
            CreatedBy = CreatedByUserId;
            $('body').mLoading({
                text: "Please Wait..",
            });
            Insert_MAWBDetails_GHA(FlightNo, FlightDate, AirportofDeparture, AirportofArrival, FlightPrefix, HAWBFlightNo, HAWBNo, NOP, GrsWt, ChargeableWeight, Commodity, CreatedBy, isConsole, FF_ID, CreatedByUserId, OrganizationBranchId, OrganizationId);

        } else if ($("input:radio[id='rbtyes']").is(":checked")) {

            isConsole = true;
            FlightNo = $("#txtFlightNo").val();
            FlightDate = $("#txtFlightDate").val();
            AirportofDeparture = $("#txtAirportofDeparture").val();
            AirportofArrival = $("#txtAirportofArrival").val();
            FlightPrefix = $("#txtFlightPrefix").val();
            HAWBFlightNo = $("#txtHAWBFlightNo").val();
            HAWBNo = $("#txtHAWBNo").val();
            NOP = $("#txtNOP").val();
            GrsWt = $("#txtGrsWt").val();
            ChargeableWeight = $("#txtChargeableWeight").val();
            Commodity = $("#txtCommodity").val();
            CreatedBy = CreatedByUserId;
            $('body').mLoading({
                text: "Please Wait..",
            });
            Insert_MAWBDetails_GHA(FlightNo, FlightDate, AirportofDeparture, AirportofArrival, FlightPrefix, HAWBFlightNo, HAWBNo, NOP, GrsWt, ChargeableWeight, Commodity, CreatedBy, isConsole, FF_ID, CreatedByUserId, OrganizationBranchId, OrganizationId);

        } else {
            // alert('nothing');
        }

    }
}

function exitFunction() {
    window.location.href = 'ImportOperations.html';
}
function clearFunction() {
    $("#txtFlightNo").val('');
    $("#txtFlightDate").val('');
    $("#txtAirportofDeparture").val('');
    $("#txtAirportofArrival").val('');
    $("#txtFlightPrefix").val('');
    $("#txtHAWBFlightNo").val('');
    $("#txtHAWBNo").val('');
    $("#txtNOP").val('');
    $("#txtGrsWt").val('');
    $("#txtGrsWt").val('');
    $("#txtChargeableWeight").val('');
    $("#txtCommodity").val('');
    $("#ddlFFList").val('-1');
    //$('input[name="ab"]').attr('checked', false);

}

Insert_MAWBDetails_GHA = function (FlightNo, FlightDate, AirportofDeparture, AirportofArrival, FlightPrefix, HAWBFlightNo, HAWBNo, NOP, GrsWt, ChargeableWeight, Commodity, CreatedBy, isConsole, FF_ID, CreatedByUserId, OrganizationBranchId, OrganizationId) {
    console.log(FlightNo + '-' + FlightDate + '-' + AirportofDeparture + '-' + AirportofArrival + '-' + FlightPrefix + '-' + HAWBFlightNo + '-' + HAWBNo + '-' + NOP + '-' + GrsWt + '-' + ChargeableWeight + '-' + Commodity + '-' + CreatedBy + '-' + isConsole + '-' + CreatedByUserId + '-' + OrganizationBranchId + '-' + OrganizationTypeId);
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/Insert_MAWBDetails_GHA",
        data: JSON.stringify({ FlightNo: FlightNo, FlightDate: FlightDate, AirportofDeparture: AirportofDeparture, AirportofArrival: AirportofArrival, FlightPrefix: FlightPrefix, HAWBFlightNo: HAWBFlightNo, HAWBNo: HAWBNo, NOP: NOP, GrsWt: GrsWt, ChargeableWeight: ChargeableWeight, Commodity: Commodity, CreatedBy: CreatedBy, isConsole: isConsole, FF_ID: FF_ID, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.length > 0) {
                $("body").mLoading('hide');
                clearFunction();
                successMessage();
                $(".swal2-confirm").click(function () {
                    window.location.href = "Dashboard.html";
                });
            } else {
                errmsg = jQuery.parseJSON(response.responseText);
                $.alert(errmsg);
            }
        },
        error: function (response) {
            // HideLoader();
            errmsg = jQuery.parseJSON(response.responseText);
            $.alert(errmsg);
        }
    });
}
GetFFDetails = function (OperationType) {
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetFFDetails",
        data: JSON.stringify({ OperationType: OperationType }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);

            var s = '<option value="-1">--Select--</option>';
            for (var i = 0; i < obj.length; i++) {
                s += '<option value="' + obj[i].OrganizationId + '">' + obj[i].Name + '</option>';
            }
            $("#ddlFFList").html(s);

        },
        error: function (requestObject, error, errorThrown) {
        }
    });
}

IMP_CheckMawbnumber = function (AirlinePrefix, MAWBNumber) {
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/IMP_CheckMawbnumber",
        data: JSON.stringify({ AirlinePrefix: AirlinePrefix, MAWBNumber: MAWBNumber }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.length > 0) {
                if (obj[0].ErrorMSG != '') {
                    $("#txtHAWBFlightNo").val('');
                    errmsg = obj[0].ErrorMSG;
                    $.alert(errmsg);
                }
            }
        },
        error: function (requestObject, error, errorThrown) {
        }
    });
}

validateAirportCodeDeparture = function (OperationType, AirportCode) {
    //console.log(OperationType + "___" + AirportCode)
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/ValidateAirportCode",
        data: JSON.stringify({ OperationType: OperationType, AirportCode: AirportCode }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            //console.log(response.d)
            if (response.d != null) {
                if (response.d != '') {
                    if (response.d != 'null') {
                        if (obj.length > 0) {
                            //txtvalidCheckforCountryCodeandAirportCode = $("#txtAirportofCountryCode").val(); + '' + $("#txtAirportofDeparture").val();
                            //validCheckforCountryCodeandAirportCode = obj[0].PortCountryCode + '' + obj[0].AirportCode;
                            //alert(txtvalidCheckforCountryCodeandAirportCode+'+++++'+ validCheckforCountryCodeandAirportCode)
                            //if (txtvalidCheckforCountryCodeandAirportCode != validCheckforCountryCodeandAirportCode) {
                            //    $("#txtAirportofDeparture").val('');
                            //    errmsg = "Airport Code not match with Country Code</br>";
                            //    $.alert(errmsg);
                            //}
                        } else {
                            $("#txtAirportofDeparture").val('');
                            errmsg = "Invalid airport code</br>";
                            $.alert(errmsg);
                        }
                    }
                }
            }
        },
        error: function (response) {
            // HideLoader();
            errmsg = jQuery.parseJSON(response.responseText);
            $.alert(errmsg);
        }
    });
}
validateAirportCodeArrival = function (OperationType, AirportCode) {
    console.log(OperationType + "___" + AirportCode)
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/ValidateAirportCode",
        data: JSON.stringify({ OperationType: OperationType, AirportCode: AirportCode }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            console.log(response.d)
            if (response.d != null) {
                if (response.d != '') {
                    if (response.d != 'null') {
                        if (obj.length > 0) {
                            //txtvalidCheckforCountryCodeandAirportCode = $("#txtAirportofCountryCode").val(); + '' + $("#txtAirportofDeparture").val();
                            //validCheckforCountryCodeandAirportCode = obj[0].PortCountryCode + '' + obj[0].AirportCode;
                            //alert(txtvalidCheckforCountryCodeandAirportCode+'+++++'+ validCheckforCountryCodeandAirportCode)
                            //if (txtvalidCheckforCountryCodeandAirportCode != validCheckforCountryCodeandAirportCode) {
                            //    $("#txtAirportofDeparture").val('');
                            //    errmsg = "Airport Code not match with Country Code</br>";
                            //    $.alert(errmsg);
                            //}
                        } else {
                            $('#txtAirportofArrival').val('');
                            errmsg = "Invalid airport code</br>";
                            $.alert(errmsg);
                        }
                    }
                }
            }
        },
        error: function (response) {
            // HideLoader();
            errmsg = jQuery.parseJSON(response.responseText);
            $.alert(errmsg);
        }
    });
}



function successMessage() {
    swal({
        //title: "DO saved successfully.",
        ////buttonsStyling: false,
        //confirmButtonClass: 'popup-btn'
        title: '',
        text: "DO saved successfully.",
        type: 'success',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-primary'
    });
}

function MovetoNext(current, nextFieldID) {
    if (current.value.length >= current.maxLength) {
        document.getElementById(nextFieldID).focus();
    }
}

function check() {
    $("#txtHAWBNo").hide();
    $("#lblHAWBNo").hide();
    document.getElementById("rbtno").checked = true;
}

function uncheck() {
    $("#txtHAWBNo").show();
    $("#lblHAWBNo").show();
    document.getElementById("rbtyes").checked = true;
}

//function blockSpecialCharForDO(e) {
//    var k;
//    document.all ? k = e.keyCode : k = e.which;
//    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
//}


function checkLength(el) {
    if (el.value.length != 6) {
        //alert("length must be exactly 6 characters")
        errmsg = "Flight No. must be exactly 6 characters</br>";
        $.alert(errmsg);
        $('#txtFlightNo').val('');
    }
}