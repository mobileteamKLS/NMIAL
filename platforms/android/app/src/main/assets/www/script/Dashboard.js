var OrgName = localStorage.getItem('OrgName');
(function () {

    setTimeout(function () {
        window.location.href = 'Login.html'
    }, 1200000);
    document.addEventListener('backbutton', onBackKeyDown, false);
    //document.addEventListener('deviceready', DropDown, false);
    $(".titleFont").html(OrgName);
}
)();
function onBackKeyDown() {
    if ($('#divDashBoardImport').is(':visible')) {
        $('#divMode').show();
        $('#divDashBoardImport').hide();
        $('#divDashBoardExport').hide();
    }
    else if ($('#divDashBoardExport').is(':visible')) {
        $('#divMode').show();
        $('#divDashBoardImport').hide();
        $('#divDashBoardExport').hide();
    }
    else {
        navigator.app.backHistory();
    }
}
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    document.addEventListener("backbutton", function (e) {
        e.preventDefault();
        navigator.notification.confirm("Are you sure want to Logout from App?", onConfirmExit, "Confirmation", "Yes,No");
    }, false);
}
function onConfirmExit(button) {
    if (button == 2) { //If User select a No, then return back;
        return;
    } else {
        location.href = "Login.html";
    }
}
function DropDownClick() {
    //if (element.id == "aImport") {
    //    if ($('#aImport').attr('aria-expanded').toString() == "false") {
    //        $('#divMain').removeClass("VerticallyCenter");
    //    }
    //    else {
    //        $('#divMain').addClass("VerticallyCenter");
    //    }
    //}
    //else if (element.id == "aExport") {
    //    if ($('#aExport').attr('aria-expanded').toString() == "false") {
    //        $('#divMain').removeClass("VerticallyCenter");
    //    }
    //    else {
    //        $('#divMain').addClass("VerticallyCenter");
    //    }
    //}

    if ($('#btnnavbar').attr('aria-expanded').toString() == "false") {
        $('#divMain').removeClass("VerticallyCenter");
    }
    else {
        $('#divMain').addClass("VerticallyCenter");
    }

}
function DisplayScreen(Mode) {
    if (Mode == "Import") {
        //$('#divMode').hide();
        //$('#divDashBoardImport').show();
        //$('#divDashBoardExport').hide();
        window.location.href = "ImportOperations.html";
        localStorage.setItem('Mode', 'Import');
    }
    else if (Mode == "Export") {
        window.location.href = "ExportOperations.html";
        localStorage.setItem('Mode', 'Export');
        //$('#divMode').hide();
        //$('#divDashBoardExport').show();
        //$('#divDashBoardImport').hide();
    } else if (Mode == "DeliveryOrder") {
        window.location.href = "DeliveryOpration.html";
    } else if (Mode == "Help") {
        window.location.href = "GHAHelp.html";
    } else if (Mode == "Feedback") {
        localStorage.setItem('feedBackLocation', 'GHA');
        window.location.href = "Feedback.html";
    }
    
}
